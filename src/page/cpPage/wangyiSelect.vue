<template>
  <div class="netEase">
    <div class="header">
      <x-header :left-options="{showBack: true}">{{title}}</x-header>
    </div>
    <div class="tab">
      <div class="tab-nav-i" :class="{active: tab == 'tab02'}" @click="tab = 'tab02'">短信兑换</div>
      <div class="tab-nav-i" :class="{active: tab == 'tab03'}" @click="tab = 'tab03'">核销</div>
    </div>
    <div class="main" v-show="tab == 'tab02'">
      <div style=" padding: 20px 0 30px; width: 96%; margin: 0 auto;">
        <grid :cols="2" :show-lr-borders="false">
          <grid-item v-for="(item,index) in dataArr" :key="index">
			        <span class="grid-center">
			        		<p class="main-text">{{item.score}}积分兑换</p>
			        		<p class="main-text02"><span style="font-size: 26px;font-weight: 700;">{{item.orderAmount}} </span>面值</p>
			        		<div class="main-code" @click="clickBtn(item.smsContent,item.smsTo,item.score)">
			        			点我扫码
			        		</div>
			        </span>
          </grid-item>
        </grid>
      </div>
    </div>
    <div v-show="tab == 'tab03'">
      <div style="padding: 1.25rem 0.881rem 2.5rem;background-color: #FFF;">
        <div class="input_box">
          <x-input class="input_con" title="订单号:" placeholder="请输入订单号" v-model.trim="orderNum"
                   :max="20" :show-clear="false" placeholder-align="left"></x-input>
          <x-input class="input_con" title="手机号:" placeholder="请输入手机号码" v-model.trim="mobile"
                   :max="11" :show-clear="false" placeholder-align="left"></x-input>
          <div style="padding: 10px 15px;display: flex;align-items: center;">
            <div style="width: 4.5rem;font-size: 0.9rem;">商品面额:</div>
            <div style="-webkit-box-flex: 1;flex: 1;">
              <select name="" id="" class="selectValue" ref="selectedValue">
                <option value="-1" selected="selected">--请选择商品面额--</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
              </select>
            </div>
          </div>
        </div>
        <div class="resetKefu" style="margin-top: 20px;" @click="hexiaoBtn">核销</div>
      </div>
    </div>
    <!-- 弹出二维码  -->
    <div id="codeMask" v-show='isShow'>
      <div
        style="position: fixed;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,0.5);z-index: 99;max-width: 750px;margin: 0 auto;"></div>
      <div style="position: fixed;z-index: 100;top: 20%;left: 50%;transform: translateX(-50%);">
        <div style="background-color: #FFF;padding: 15px 15px;">
          <div class="codePic"
               :style="'background:url('+codePics+') no-repeat center center;background-size: contain;'">
          </div>
        </div>
        <div
          style="background:url('//c1.51jujibao.cn/static/mkt/2018/09/sto/images/close-btn.png') center center/100% auto no-repeat; width: 32px;height: 32px; margin: 20px auto 0;"
          @click="closeBtn"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader, Scroller, Group, Cell, Grid, GridItem, XInput} from 'vux'
  import * as core from '@/core/cpApi'

  export default {
    name: 'netEase',
    components: {
      XHeader,
      Scroller,
      Group,
      Cell,
      Grid, GridItem, XInput
    },
    data() {
      return {
        title: '',
        tab: 'tab02',
        isShow: false,
        dataArr: [],
        codePics: '',
        orderNum: '',
        mobile: '',
      }
    },

    created() {
      let title = this.$route.query.name;
      this.title = title;

      this.fetchDataList(title);
    },


    methods: {
      fetchDataList(m) {
        this.$vux.loading.show({text: '正在加载'})
        core.fetchList({
          "category": m,
        }).then(data => {
          this.$vux.loading.hide()
          if (data.code && '00' == data.code) {

            this.dataArr = data.result;

          } else {
            this.$vux.toast.text(data.message, 'middle')
          }
        })
      },

      clickBtn(m, n, d) {
        this.isShow = true;
        this.codePics = '/exchange/qrCode?mobile=' + n + '&content=' + m + '&score=' + d;
      },

      closeBtn() {
        this.isShow = false
      },
      // 核销 -- 核销
      hexiaoBtn() {
        if (!this.orderNum) {
          this.$vux.toast.text('请输入订单号', 'middle')
          return;
        }
        if (!this.mobile) {
          this.$vux.toast.text('请输入手机号码', 'middle')
          return;
        }
        if (this.$refs.selectedValue.value < 0) {
          this.$vux.toast.text('请选择商品面额', 'middle')
          return;
        }
        this.$vux.loading.show({text: '正在加载'})
        core.hexiaoWangyi({
          orderNum: this.orderNum,
          mobile: this.mobile,
          price: this.$refs.selectedValue.value,
          channel: '97'
        }).then(data => {
          this.$vux.loading.hide()
          if (data.code && '00' == data.code) {
            if(data.result == '1'){

              this.$vux.toast.text('核销成功', 'middle')

            }else {

              this.$vux.toast.text('核销请求已提交, 请稍后在订单列表中进行查看', 'middle')

            }
            setTimeout(() => {
              window.location.reload();
            }, 2000)
          } else {
            this.$vux.toast.text(data.message, 'middle')
          }
        })
      },
    }
  }

</script>
<style lang="less" scoped>


</style>
<style lang="less">
  .netEase {
    .mask {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 9999;
    }
    .vux-header {
      background-color: #ff8810;
      color: #333;
    }
    .vux-header-title, .vux-header-back {
      color: #FFF;
    }
    .vux-header .vux-header-title {
      color: #FFF;
    }
    .vux-header-back {
      display: none;
    }
    .vux-header .vux-header-left .left-arrow:before {
      content: "";
      position: absolute;
      width: 12px;
      height: 12px;
      border: 1px solid #FFF;
      border-width: 1px 0 0 1px;
      -webkit-transform: rotate(315deg);
      transform: rotate(315deg);
      top: 8px;
      left: 7px;
    }
    .tab {
      display: flex;
      flex-direction: row;
      text-align: center;
      color: #999;
      padding: 0.8rem 0;
      background-color: #FFF;
    }
    .tab-nav-i {
      width: 50%;
      position: relative;
    }
    .tab-nav-i.active {
      color: #ff8810;
    }
    .tab-nav-i.active:after {
      content: "";
      position: absolute;
      border: 2px solid #ff8810;
      top: 150%;
      left: 40%;
      right: 40%;
      border-radius: 3px;
    }
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
      color: #b5aeae;
      font-size: 0.9rem;
    }
    input:-moz-placeholder, textarea:-moz-placeholder {
      color: #b5aeae;
      font-size: 0.9rem;
    }
    input::-moz-placeholder, textarea::-moz-placeholder {
      color: #b5aeae;
      font-size: 0.9rem;
    }
    input:-ms-input-placeholder, textarea:-ms-input-placeholder {
      color: #b5aeae;
      font-size: 0.9rem;
    }

    .resetKefu {
      text-align: center;
      border: 1px solid #c2e0ff;
      border-radius: 5px;
      padding: 12px 0;
      border: 1px solid gainsboro;
      font-size: 0.9rem;
      background-color: #ff8810;
      color: #FFF;
    }

    .main .grid-center {
      width: 100%;
      margin: 0 auto;
      background-color: #FFF;
      display: block;
      content: none;
      padding: 23px 8px 22px;
      box-sizing: border-box;
    }
    .main .weui-grid {
      padding: 10px 5px 10px;
      border-radius: 10px;
    }
    .main .weui-grids:before {
      content: none;
    }
    .main .weui-grid:before {
      content: none;
    }
    .main .weui-grid:after {
      content: none;
    }
    .main .weui-grids:after {
      content: none;
    }
    .main .main-text {
      font-size: 16px;
      color: #ff8810;
      text-align: center;
      font-weight: normal;
      font-stretch: normal;
    }
    .main .main-text02 {
      margin: 11px 0 25px;
      font-size: 16px;
      color: #ff8810;
      text-align: center;
    }
    .main .main-code {
      padding: 9px 0;
      width: 80%;
      margin: 0 auto 24px;
      border-radius: 30px;
      background-color: #ff8810;
      color: #FFF;
      text-align: center;
      font-size: 14px;
    }
    #codeMask .codePic {
      width: 200px;
      height: 200px;
    }
    .input_box .weui-input {
      height: 2rem;
      line-height: 2rem;
      border: 1px solid #c8bcbc;
      border-radius: 5px;
      text-indent: 10px;
      font-size: 0.9rem;
    }
    .weui-cell:before {
      content: none;
    }
    .selectValue {
      width: 100%;
      height: 2rem;
      line-height: 2rem;
      border: 1px solid #c8bcbc;
      border-radius: 5px;
      text-indent: 10px;
      font-size: 0.9rem;
      outline: none;
    }
    .weui-label {
      width: 4.5rem !important;
      font-size: 0.9rem;
      padding-right: 18px;
      box-sizing: border-box;
      text-align: right;
    }

  }
</style>
