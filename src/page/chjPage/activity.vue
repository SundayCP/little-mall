<template>
  <div class="activity">
    <page-header title="活动" ft-color="#fff" bg-color="#ff8810" :has-back="false" ref="pageHeader"
                 v-if="showHeader"></page-header>
    <scroller lock-x
              :bounce="false"
              :use-pullup="canLoad"
              @on-pullup-loading="load"
              :pullup-config="pullupConfig"
              ref="scroll"
              :height="scrollHeight">
      <div class="content-container" style="padding-bottom: 2rem">
        <a :href="item.link" class="link-item" v-for="(item,index) in dataList.format" :key="index">
          <img :src="item.img">
        </a>
        <load-more :show-loading="loading" :tip="loadTip"></load-more>
      </div>
    </scroller>


  </div>
</template>

<script>
  import PageHeader from './base/page-header'
  import {LoadMore, Scroller, Toast} from 'vux'

  import {getIncrementData} from '../../core/chjApi'

  import {debug} from "./js/util";

  const PAGE_SIZE = 50

  export default {
    name: "activity",
    data() {
      return {
        showHeader: window.CONFIG.isApp !== '1' && window.CONFIG.isWeixin !== '1',

        dataList: {
          origin: [],
          format: [
          //   {
          //   img: require('./img/demo-banner.png'),
          //   link: 'https://www.baidu.com'
          // },
          ]
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
    mounted() {
      window.scrollTo(0, 0);
      if (this.showHeader) {
        this.scrollHeight = (window.innerHeight - this.$refs.pageHeader.$el.clientHeight) + 'px'
      } else {
        this.scrollHeight = (window.innerHeight) + 'px'
      }
      debug(this.scrollHeight)
      setTimeout(()=>{
        this._getData()
      },100)

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
      _getData() {
        this.canPull = false
        this.loadTip = '加载中';
        this.loading = true;
        getIncrementData({
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
              this.dataList.format = this.dataList.origin.map(item => ({
                img: item.banner,
                link: item.linkUrl
              }))
            }
            this.pageIndex += 1;
          } else {
            this.$vux.toast.text(data.message, 'middle')
            this.loadTip = '上拉加载';
            this.loading = false;
          }
          this.canPull = true
        })
      }
    },
    components: {
      PageHeader, Scroller, LoadMore, Toast
    }
  }
</script>

<style scoped>
  .link-item {
    display: block;
    margin-top: .625rem;
    box-shadow: 0 .1rem .07rem .07rem #ddd;
    img {
      width: 100%;
    }
  }

  .link-item:nth-child(1) {
    margin-top: .938rem;
  }
</style>
