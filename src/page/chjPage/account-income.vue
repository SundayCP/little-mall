<template>
  <div class="account-income">
    <page-header title="账户收入" bg-color="#ff8810" ft-color="#fff" bd-color="#fff"
                 :need-bottom-border="false"></page-header>
    <div class="table-head">
      <p>时间</p>
      <p>总订单数</p>
      <p>总收入</p>
    </div>
    <scroller lock-x
              :bounce="false"
              :use-pullup="canLoad"
              @on-pullup-loading="load"
              :pullup-config="pullupConfig"
              ref="scroll"
              :height="scrollHeight">
      <div class="table-content" style="padding-bottom: 8rem;">
        <div class="content-group" v-for="(group,month) in dataList.format" :key="month">
          <p class="group-name">
            {{group.groupName}}
          </p>
          <account-income-item v-for="(item,index) in group.data" :key="index" :item="item"
                               @downUp="itemDownUp"></account-income-item>
        </div>
        <load-more :show-loading="loading" :tip="loadTip"></load-more>
      </div>

    </scroller>

    <!--<button @click="_getData">请求</button>-->
  </div>
</template>

<script>
  import PageHeader from './base/page-header'
  import AccountIncomeItem from './base/account-income-item'
  import {LoadMore, Scroller, Toast} from 'vux'

  import {accountIncomeList, accountIncomeListDetail} from "../../core/chjApi";
  import {debug} from "./js/util";

  const PAGE_SIZE = 20

  export default {
    name: "account-income",
    data() {
      return {
        dataList: {
          origin: [],
          filterList: [],
          format: []
        },

        scrollHeight: '',

        loading: true,
        loadTip: '加载中...',

        pageIndex: 1,

        canLoad: true,
        canPull: true,
        pullupConfig: {
          content: '',
          downContent: '',
          upContent: '',
          loadingContent: ''
        }
      }
    },
    created() {
      this._getData()
    },
    methods: {
      load() {
        if (this.canLoad && this.canPull) {
          this._getData()
          setTimeout(() => {
            this.$refs.scroll.donePullup();
          }, 100)
        } else {
          setTimeout(() => {
            this.$refs.scroll.donePullup();
          }, 100)
        }
      },
      _getDetailData(i, success) {
        accountIncomeListDetail({
          day: this.dataList.filterList[i].title
        }).then(data => {
          if (data.code && data.code === '00') {
            this.dataList.filterList[i].detailList = data.result
            this.dataList.filterList[i].needLoad = 'N'
            success()
          }
        })
      },
      itemDownUp(i) {
        this._getDetailData(i, () => {
          this.dataList.format = []
          this._formatData(this.dataList.filterList, this.dataList.format)
          debug(this.dataList.format)
        })

      },
      _getData() {
        this.canPull = false
        this.loadTip = '加载中';
        this.loading = true;
        accountIncomeList({
          pageIndex: this.pageIndex,
          pageSize: PAGE_SIZE
        }).then(data => {
          if (data.code && data.code === '00') {

            if (data.result.amount == 0) {
              this.loadTip = '暂无数据';
              this.loading = false;
              this.canLoad = false
            } else {
              if ((this.pageIndex * PAGE_SIZE) >= data.result.amount) {
                this.canLoad = false
                this.loadTip = '暂无更多数据';
                this.loading = false;
              } else {
                this.loadTip = '上拉加载';
                this.loading = false;
              }
              this.dataList.origin = this.dataList.origin.concat(data.result.data);
              this.dataList.filterList = this.dataList.origin.map((item, index) => Object.assign(item, {
                detailList: [],
                index,
                needLoad: 'Y'
              }))
              debug('this.dataList.filterList',this.dataList.filterList)
              this.dataList.format = []
              this._formatData(this.dataList.filterList, this.dataList.format)
              debug('this.dataList.format',this.dataList.format)
            }
            this.pageIndex += 1;
          } else {
            this.$vux.toast.text(data.message, 'middle')
            this.loadTip = '上拉加载';
            this.loading = false;
          }
          this.canPull = true
        })

      },
      _formatData(oList, fList) {
        let groupIndex = 0;
        oList.forEach((item, index, arr) => {
          if (index === 0) {
            let itemGroup = {
              groupName: arr[index].month,
              data: [arr[index]]
            };
            fList.push(itemGroup)
          } else {
            if (arr[index].month === arr[index - 1].month) {
              fList[groupIndex].data.push(arr[index])
            } else if (arr[index].month !== arr[index-1].month) {
              groupIndex += 1
              let itemGroup = {
                groupName: arr[index].month,
                data: [arr[index]]
              };
              fList.push(itemGroup)
            }
          }
        })
      }
    },
    components: {
      PageHeader, AccountIncomeItem, Scroller, Toast, LoadMore
    }
  }
</script>

<style scoped lang="less">
  .table-head {
    height: 2.063rem;
    background-color: #ffffff;
    box-shadow: 0rem 0.063rem 0.188rem 0rem #dddddd;
    display: flex;
    align-items: center;
    p {
      flex: 1;
      color: #333;
      font-size: 1rem;
      text-align: center;
    }
  }

  .table-content {
    .content-group {
      padding-top: .4rem;
      .group-name {
        color: #999;
        font-size: .75rem;
        padding-left: 1rem;
      }
    }
  }
</style>
