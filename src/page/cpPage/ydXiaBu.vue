<template>
  <div class="dxGoodsList">
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
					        		<div class="main-code" style="margin: 0 auto 14px;" @click="jumpUrl(item.jumpUrl)">
			        				         点我跳转
					        		</div>
			        </span>
          </grid-item>
        </grid>
      </div>
    </div>
    <div v-show="tab == 'tab03'">
      <div style="padding: 1.25rem 0.881rem 2.5rem;background-color: #FFF;">
        <div style="margin: 0rem 0 1rem 0.5rem;font-size: 1rem;color: #212121;font-weight: 700;">卡密</div>
        <textarea name="" rows="" ref="textArea" cols="" placeholder="请输入卡密或者包含卡密的短信" style="font-size: 0.875rem;line-height: 1.313rem;width: 100%;height: 6.25rem;border-radius: 0.313rem;border:1px solid #e0e0e0;"></textarea>

        <!--<form action="http://wxhsplus.umfintech.com:80/webpbmp/pm/coup5on.pm" method="post" ref="formSub">-->
          <!--<input type="hidden" ref="formInput" hinden="true" style="display: none;" name="issueno">-->
        <!--</form>-->

        <div class="resetKefu" style="margin-top: 20px;" @click="hexiaoBtn">核销</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader, Scroller, Group, Cell, Grid, GridItem} from 'vux'
  import * as core from '@/core/cpApi'

  export default {
    name: 'dxGoodsList',
    components: {
      XHeader,
      Scroller,
      Group,
      Cell,
      Grid, GridItem
    },
    data() {
      return {
        title: '',
        tab: 'tab02',
        dataArr: [],
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
      // 核销 -- 核销
      hexiaoBtn() {
        if (!this.$refs.textArea.value) {
          this.$vux.toast.text('没有卡密', 'middle')
        } else{
          // this.$refs.formInput.value = this.$refs.textArea.value;
          // this.$refs.formInput.setAttribute('value',this.$refs.textArea.value);
          // this.$refs.formSub.submit();
          var reg = /[0-9]{12}/
          var _val = this.$refs.textArea.value.match(reg) ? this.$refs.textArea.value.match(reg) : '';

          if(!_val){
            this.$vux.toast.text('没有匹配到十二位的卡密', 'middle')
            return
          }
          // console.log(_val.join(',') + '-------')
          this.$vux.loading.show({text: '正在加载'})
          core.hexiaoXP({
            "username": "heyuan5001",
            "issueno": _val ? _val.join(',') : '',
          }).then(data => {
            this.$vux.loading.hide()
            if (data.code && '00' == data.code) {
              if(data.result == '1'){
                this.$vux.toast.text('核销成功', 'middle')
                setTimeout(function(){
                  window.reload();
                },2000)
              }else if(data.result == '0'){
                this.$vux.toast.text('核销失败', 'middle')
              }
            } else {
              this.$vux.toast.text(data.message, 'middle')
            }
          })
        }
      },
      jumpUrl(m) {
        var re = /http/;
        if (re.test(m)) {
          window.location.href = m;
        } else {
          this.$router.push({path: m})
        }
      },
      check(check) {
        check = check.replace(/\s/g, "")
        var myreg = /^[0-9]*$/;
        if (!myreg.test(check)) {
          this.$vux.toast.text("请输入正确的券码", 'middle')
          return false;
        }
        if (!(check.length == 12)) {
          this.$vux.toast.text("请输入十二位券码", 'middle')
          return false;
        }
        return true;
      }
    }
  }

</script>
<style lang="less" scoped>


</style>
<style lang="less">
  .dxGoodsList {

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
      font-size: 12px;
    }
    input:-moz-placeholder, textarea:-moz-placeholder {
      color: #b5aeae;
      font-size: 12px;
    }
    input::-moz-placeholder, textarea::-moz-placeholder {
      color: #b5aeae;
      font-size: 12px;
    }
    input:-ms-input-placeholder, textarea:-ms-input-placeholder {
      color: #b5aeae;
      font-size: 12px;
    }
    .sectin-middle-two {
      outline: none;
      font-size: 12px;
      text-indent: 10px;
      border-radius: 5px;
      border: solid 1px #ebebeb;
      background-color: #fff;
      width: 100%;
      padding: 5px 0;
      margin: 1rem 0 2rem;
      padding: 12px 0;
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
    .main-text {
      font-size: 16px;
      color: #ff8810;
      text-align: center;
      font-weight: normal;
      font-stretch: normal;
    }
    .main-text02 {
      margin: 11px 0 25px;
      font-size: 16px;
      color: #ff8810;
      text-align: center;
    }
    .main-code {
      padding: 9px 0;
      width: 70%;
      margin: 0 auto 24px;
      border-radius: 30px;
      background-color: #ff8810;
      color: #FFF;
      text-align: center;
      font-size: 14px;
    }
    .main-content {
      color: #666666;
      line-height: 20px;
      font-size: 12px;
      text-align: center;
    }

    .listTable {
      padding: 16px 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border: solid 1px #c0c0c0;
      border-radius: 5px;
      margin-bottom: 10px;
    }

    .money-con {
      padding: 8px 5px;
      width: 30%;
      border-radius: 5px;
      border: 1px solid #62615e;
      color: #64615e;
      text-align: center;
      margin-bottom: 15px;
      width: 40%;
    }
    .money-con.active {
      border: 1px solid #ff8810;
      color: #ff8810;
    }
    .codePic {
      width: 200px;
      height: 200px;
      background-size: contain !important;
    }

    .money-value {
      font-size: 20px;
      font-weight: 700;
      font-family: Impact;
    }

  }
</style>
