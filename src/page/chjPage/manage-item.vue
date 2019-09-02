<template>
  <div class="manage-item">
    <page-header :title="pageTitle" :need-bottom-border="false">
      <p class="header-right" slot="right" @click="add">+新增</p>
    </page-header>

    <div class="search-line">
      <div class="search-line-left">
        <div class="search-input-container">
          <input type="text" v-model="searchName" :placeholder="placeholder">
        </div>
      </div>
      <div class="search-line-right">
        <button class="search-btn" @click="search">查询</button>
      </div>
    </div>
    <scroller lock-x
              :bounce="false"
              :use-pullup="canLoad"
              @on-pullup-loading="load"
              :pullup-config="pullupConfig"
              :height="scrollHeight"
              ref="scroll">
      <div class="item-container" style="padding-bottom: 8rem;">

        <manage-item-item class="item"
                          :item="item"
                          v-for="(item,index) in itemData"
                          :key="index"
                          @switchItem="switchItem"
                          @editItem="editItem"></manage-item-item>
        <load-more :show-loading="loading" :tip="loadTip"></load-more>
      </div>
    </scroller>


  </div>
</template>

<script>
  import PageHeader from './base/page-header'
  import ManageItemItem from './base/manage-item-item'

  import {LoadMore, Scroller, Toast} from 'vux'

  import {lockUnlockStore, manageStoreOperatorList} from '../../core/chjApi'

  import {debug} from "./js/util";

  const PAGE_SIZE = 20;

  export default {
    name: "manage-item",
    data() {
      return {
        pageType: '',//1为商户，2为操作员

        searchName: '',
        allData: [],

        itemData: [
        //   {
        //   type: 1,
        //   index: 0,
        //   name: '商户A',
        //   isOpen: 'Y',
        //   merchantId: 110
        // }, {
        //   type: 1,
        //   index: 1,
        //   name: '商户A',
        //   isOpen: 'N',
        //   merchantId: 110
        // }, {
        //   type: 2,
        //   index: 2,
        //   name: '商户A',
        //   isOpen: 'N',
        //   merchantId: 110
        // }, {
        //   type: 2,
        //   index: 3,
        //   name: '商户A',
        //   isOpen: 'Y',
        //   merchantId: 110
        // }
        ],

        pageIndex: 1,

        loading: true,
        loadTip: '加载中...',

        canLoad: true,
        canPull: true,
        scrollHeight: '',
        pullupConfig: {
          content: '',
          downContent: '',
          upContent: '',
          loadingContent: ''
        }

      }
    },
    computed: {
      pageTitle() {
        if (this.pageType === 1) {
          return '商户管理'
        } else if (this.pageType === 2) {
          return '操作员管理'
        }
      },
      placeholder() {
        if (this.pageType === 1) {
          return '请输入商户名进行查询'
        } else if (this.pageType === 2) {
          return '请输入操作员名进行查询'
        }
      }
    },
    mounted(){
      this.pageType=this.$route.query.type == 'sh' ? 1 : 2
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

      //查询
      search(){
        this.allData=[];
        this.itemData=[];
        this.pageIndex=1;
        this._getData()
      },
      //新增
      add() {

        this.$router.push({
          path: '/additem',
          query: {
            type: this.pageType === 1 ? 'sh' : 'czy'
          }
        })

      },

      switchItem(index) {
        debug(index)
        this._lockUnlock(index)
      },
      editItem(index) {

        this.$router.push({
          path: '/additem',
          query: {
            type: this.pageType === 1 ? 'sh' : 'czy',
            merchantId: this.itemData[index].merchantId,
            id:this.itemData[index].id
          }
        })

      },
      _getData() {
        this.canPull = false
        this.loadTip = '加载中';
        this.loading = true;
        manageStoreOperatorList({
          pageIndex: this.pageIndex,
          pageSize: PAGE_SIZE,
          username: this.searchName,
          type: this.pageType === 2 ? 2 : 1
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
              this.allData = this.allData.concat(data.result.data);
              debug(this.allData)
              this.itemData = this.allData.map((item,index) => ({
                type: this.pageType,
                index,
                name: item.username,
                isLock: item.isLock,
                merchantId: item.merchantId,
                id:item.id
              }))
              debug(this.itemData)

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
      _lockUnlock(index) {
        lockUnlockStore({
          merchantId: this.itemData[index].merchantId
        }).then(data => {
          if (data.code && data.code === '00') {
            this.itemData[index].isLock = this.itemData[index].isLock === 'Y' ? 'N' : 'Y'
          } else {
            this.$vux.toast.text(data.message, 'middle')
          }
        })
      }
    },


    components: {
      PageHeader, ManageItemItem,
      Scroller, Toast, LoadMore
    }
  }
</script>

<style scope lang="less">
  .header-right {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: .938rem;
  }

  .search-line {
    height: 2.625rem;
    background-color: #fff;
    display: flex;
    .search-line-left {
      flex: 4;
      display: flex;
      justify-content: center;
      align-items: center;
      .search-input-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90%;
        height: 1.875rem;
        background-color: #f4f4f4;
        border-radius: 0.313rem;
        border: solid 0.032rem #ebebeb;
        box-sizing: border-box;
        input {
          outline: none;
          border: none;
          background: none;
          color: #333;
          width: 90%;
          height: .9rem;
          line-height: .9rem;
          font-size: .75rem;
        }
        input::placeholder {
          color: #ddd;
          font-size: .75rem;
        }
      }
    }
    .search-line-right {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .search-btn {
        outline: none;
        border: none;
        padding: 0;
        margin: 0;
        width: 3.125rem;
        height: 1.875rem;
        background-color: #fd9124;
        border-radius: 0.313rem;
        color: #fff;
        font-size: .75rem;
      }
    }
  }

  .item-container {
    .item {
      border-bottom: solid 0.032rem #ebebeb;
    }
    .item:nth-last-child(1) {
      border: none;
    }
  }
</style>
