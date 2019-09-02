<template>
  <div class="integralIncomeDetail">
    <scroller style="width: 100%;" :bounce="true" lock-x :scroll-bottom-offset=0 @on-scroll-bottom="getDataList">
      <div>
        <div class="header">
          <x-header :left-options="{showBack: true}">详细列表</x-header>
        </div>
        <div class="main">
          <div class="main-con01" v-for="(item,index) in dataList">
            <router-link :to="'/integralIncomeOrderDetail/'+item.id">
              <div>
                <div style="display: flex;flex-direction: row;justify-content: space-between;"
                     v-if="item.isRefund == 'N'">
                  <div style="#333333;font-size: 15px;font-weight: 700;color: #000;">{{item.orderAmount}}元</div>
                  <div style="color: #00a714;font-size: 12px;" v-if="item.status == 'SUCCESS'">交易成功</div>
                  <div style="color: #ec0000;font-size: 12px;" v-else-if="item.status == 'FAIL'">交易失败</div>
                  <div style="color: #ec7500;font-size: 12px;" v-else-if="item.status == 'WAIT'">待支付</div>
                </div>
                <div style="display: flex;flex-direction: row;justify-content: space-between;"
                     v-else-if="item.isRefund == 'Y'">
                  <div style="#333333;font-size: 15px;font-weight: 700;color: #000;">{{item.orderAmount}}元</div>
                  <div style="color: #666666;font-size: 12px;">退款成功</div>
                </div>
                <div class="main-con01-con02">
                  <div>{{item.mobile ? item.mobile : ''}}</div>
                  <div>{{item.createTime | dateFormat}}</div>
                </div>
                <div style="color: #999999;font-size: 11px;">{{item.merchantUsername}}</div>
              </div>
            </router-link>
          </div>
          <load-more :tip="tips" :show-loading="loadState"></load-more>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
  import {XHeader, Scroller, LoadMore} from 'vux'
  import * as core from '@/core/cpApi'

  export default {
    name: 'integralIncomeDetail',
    components: {
      XHeader,
      Scroller, LoadMore
    },

    data() {
      return {
        tips: '正在加载',
        loadState: true,
        pageIndex: 1,
        pageSize: 6,
        searchPidPath: '',
        isState: false,
        dataList: [],
        timer: '',
        beginTime: '',
        status: '',
      }
    },

    filters: {
      dateFormat(value) {
        let dateStr = '';
        let date = new Date(value)
        let year = date.getFullYear()
        let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
        let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
        let hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
        let min = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
        let sec = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
        dateStr = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec
        return dateStr
      },
    },
    created() {
      let id = this.$route.params.id;
      this.searchPidPath = id;

      let time = this.$route.query.date;
      this.timer = time;

      let beginTime = this.$route.query.beginTime;
      this.beginTime = beginTime;

      let status = this.$route.query.status;
      this.status = status;


      this.fetchDataList(this.pageIndex, this.pageSize, id, this.timer, this.beginTime, this.status)
    },


    methods: {
      fetchDataList(e, f, m, a, b, c) {
        this.loadState = true
        core.getDataList({
          pageIndex: e,
          pageSize: f,
          searchPidPath: m,
          date: a,
          beginTime: b,
          status: c,
        }).then(data => {
          if (data.code && '00' == data.code) {
            this.isState = false;
            if (data.result.amount == 0) {
              this.loadState = false;
              this.isState = true;
              this.tips = '暂无数据'
              return
            }

            // 重组数据
            var dataListArr = data.result.data;
            this.dataList = this.dataList.concat(dataListArr)

            if (this.pageIndex >= Math.ceil(data.result.amount / this.pageSize)) {
              this.loadState = false;
              this.isState = true;
              this.tips = '没有更多了'
              return
            } else {
              this.loadState = false;
              this.tips = '上拉加载更多'
              this.isPull = true;
              return
            }
          } else {
            this.$vux.toast.text(data.message, 'center')
          }

        })
      },
      getDataList() {
        if (!this.isState) {
          this.loadState = true;
          this.tips = '正在加载'
          this.pageIndex++;
          this.pageSize = 6;
          this.isState = true;

          this.fetchDataList(this.pageIndex, this.pageSize, this.searchPidPath, this.timer, this.beginTime, this.status)
        }
      },
    }
  }

</script>

<style scoped>

</style>

<style lang="less">
  .integralIncomeDetail {
    .vux-header {
      background-color: #FFF;
      color: #333;
    }
    .vux-header-title, .vux-header-back {
      color: #000;
    }
    .vux-header .vux-header-title {
      color: #000;
    }
    .vux-header-back {
      display: none;
    }
    .vux-header .vux-header-left .left-arrow:before {
      content: "";
      position: absolute;
      width: 12px;
      height: 12px;
      border: 1px solid #999;
      border-width: 1px 0 0 1px;
      -webkit-transform: rotate(315deg);
      transform: rotate(315deg);
      top: 8px;
      left: 7px;
    }
    .main-con01 {
      padding: 15px 10px 20px;
      background-color: #FFF;
      border-top: 1px solid #f4f4f4;
      border-bottom: 1px solid #f4f4f4;
      cursor: pointer;
    }
    .main-con01-con02 {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 13px 0;
      color: #999999;
      font-size: 12px;
    }
  }
</style>
