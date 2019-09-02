<template>
  <div class="goodsList">
    <div class="header">
      <x-header :left-options="{showBack: true}">{{title}}</x-header>
    </div>
    <div class="tab">
      <div class="tab-nav-i" :class="{active: tab == 'tab01'}" v-show="!fuwuPassword" @click="tab = 'tab01'">服务密码</div>
      <div class="tab-nav-i" :class="{active: tab == 'tab02', active02:fuwuPassword }" @click="tab = 'tab02'">短信兑换</div>
      <div class="tab-nav-i" :class="{active: tab == 'tab03', active02:fuwuPassword }" @click="tab = 'tab03'">核销</div>
    </div>
    <div v-show="tab == 'tab01'" style="padding: 1.25rem 0.881rem; background-color: #FFF;">
      <input type="text" name="" placeholder="请输入客户手机号" v-model.trim="user_mobile" class="sectin-middle-two"/>
      <div class="resetKefu" @click="reset_Btn">
        重置客服密码
      </div>
    </div>
    <div class="main" v-show="tab == 'tab02'">
      <div v-show="!fuwuPassword && smsChange"
           style="padding: 1.25rem 0.881rem; background-color: #FFF;margin: 10px 0 0;">
        <input type="text" name="" v-model.trim="phone" placeholder="请输入手机号码" class="sectin-middle-two"
               style="margin: 1rem 0 1rem;"/>

        <div style="color: red;font-size: 14px;line-height: 18px;font-weight: 700;">
          请仔细填写您要兑换的手机号码，确保输入的号码与兑换的号码一致，如果输入的号码与兑换的号码不一致，将导致无法结算。
        </div>

        <div class="resetKefu" @click="nextBtn" style="margin-top: 1rem;">
          下一步
        </div>
        <div style="line-height: 20px;font-size: 14px;color: #000;font-weight: 700;margin-top: 30px;">
          <div style="color: red;margin-bottom: 8px;font-size: 16px;">注意事项：</div>
          <!--<p>1.虾米可以使用短信兑换，淘游助手请通过链接到积分商城兑换。</p>-->
          <p>1.在系统内登记号码以后进行兑换，则不需要核销。</p>
          <p style="color: red">2.{{title}}必须先登记号码再兑换，登记以后务必在1小时内完成兑换，否则无法结算。</p>
          <p>3.自动核销受移动系统影响可能有一定延迟。</p>
          <p v-show="!isXIAMI">4.非系统内兑换{{title}}的需人工核销。</p>
        </div>
      </div>
      <div style=" padding: 20px 0 30px; width: 96%; margin: 0 auto;" v-show="!fuwuPassword && !smsChange && !flag">
        <grid :cols="2" :show-lr-borders="false">
          <grid-item v-for="(item,index) in dataArr" :key="index">
            <a :href="item.jumpUrl">
			        <span class="grid-center">
			        		<p class="main-text">{{item.score}}积分兑换</p>
			        		<p class="main-text02"><span style="font-size: 26px;font-weight: 700;">{{item.orderAmount}} </span>面值</p>
                  <div class="main-code" v-if="isProvince == 'Y'">
			        			点我跳转
			        		</div>
			        		<div class="main-code" @click.prevent="clickBtn(item.smsContent,item.smsTo,item.score)"  v-else>
			        			点我扫码
			        		</div>
			        </span>
            </a>
          </grid-item>
        </grid>
      </div>

      <div style=" padding: 20px 0 30px; width: 96%; margin: 0 auto;" v-show="fuwuPassword">
        <grid :cols="2" :show-lr-borders="false">
          <grid-item v-for="(item,index) in dataArr" :key="index">
			        <span class="grid-center">
			        		<p class="main-text">{{item.score}}积分兑换</p>
			        		<p class="main-text02"><span style="font-size: 26px;font-weight: 700;">{{item.orderAmount}} </span>面值</p>
			        		<div class="main-code" @click="clickBtn(item.smsContent,item.smsTo,item.score)">
			        				点我扫码
			        		</div>
                <!--<p class="main-content">或发送短信{{item.smsContent}} 到{{item.smsTo}}</p>-->
			        </span>
          </grid-item>
        </grid>
      </div>


      <div style=" padding: 20px 0 30px; width: 96%; margin: 0 auto;" v-show="!fuwuPassword && !smsChange && flag">
        <div class="listTable" v-for="(item,index) in dataArr">
          <div style="color: #959595;">{{item.score}}积分兑换{{item.orderAmount}}面值</div>
          <div><a :href="item.jumpUrl" style="color: #ff8000;">立即兑换>></a></div>
        </div>
      </div>

    </div>
    <div v-show="tab == 'tab03'">
      <div style="padding: 1.25rem 0.881rem 2.5rem;background-color: #FFF;">
        <div style="display: flex;flex-direction: row;justify-content: space-between;">
          <div style="width: 100%;">
            <input type="" name="" id="" v-model.trim="mobileSearch" placeholder="请输入客户手机号"
                   style="outline: none;text-indent: 10px;width: 100%;height: 40px;border-radius: 5px;border: 1px solid gainsboro;"/>
          </div>
          <!--<div style="width: 25%;text-align: center;color: #FFF;background-color: #ff8810;border-radius: 5px;height: 42px;line-height: 42px;" @click="search"> 查询 </div>-->
        </div>

        <div style="display: flex;flex-direction: row;justify-content: space-between;margin-top: 20px;"
             v-show="fuwuPassword && isHasSms">
          <div style="width: 60%;">
            <input type="" name="" id="" v-model.trim="mobileCode" placeholder="请输入验证码"
                   style="outline: none;text-indent: 10px;width: 100%;height: 40px;border-radius: 5px;border: 1px solid gainsboro;"/>
          </div>
          <button class="getCodeText" @click="getCode" :class="{gray: isGray}" :disabled='isClick'> {{codeText}}
          </button>
        </div>

        <div class="resetKefu" style="margin-top: 20px;" @click="search">查询</div>

        <div class="" v-show="fuwuPassword"
             style="    font-size: 13px; padding: 10px 0 0 3px; line-height: 19px; color: slategray;">
          兑换成功后若未查询到卡密信息，可能是系统延迟，请稍后再试
        </div>

        <div style="margin: 2rem 0 1rem 0.5rem;font-size: 1rem;color: #212121;font-weight: 700;">卡密</div>
        <textarea name="" rows="" ref="textArea" cols="" placeholder="" :readonly="fuwuPassword"
                  style="font-size: 0.875rem;line-height: 1.313rem;width: 100%;height: 6.25rem;border-radius: 0.313rem;border:1px solid #e0e0e0;"></textarea>
        <div class="resetKefu" style="margin-top: 20px;" @click="hexiaoBtn">核销</div>
      </div>
    </div>

    <!-- 弹出二维码 -->
    <div id="codeMask" v-show='isShow'>
      <div
        style="position: fixed;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,0.5);z-index: 99;max-width: 750px;margin: 0 auto;"></div>
      <div style="position: fixed;z-index: 100;top: 20%;left: 50%;transform: translateX(-50%);">
        <div style="background-color: #FFF;padding: 15px 15px;">
          <div class="codePic"
               :style="'background:url('+codePics+') no-repeat center center;background-size: contain;'">
          </div>
          <!-- <div style="text-align: center;color: #999999;font-size: 14px;width: 80%;margin: 15px auto 0;line-height: 18px;" v-show="fuwuPassword">编辑短信XXX到XXXX进行兑换</div> -->
          <div
            style="text-align: center;color: #999999;font-size: 14px;width: 80%;margin: 15px auto 0;line-height: 18px;"
            v-show="!fuwuPassword">请使用<span>{{phone}}</span>号码的手机进行扫描
          </div>
        </div>
        <div
          style="background:url('//c1.51jujibao.cn/static/mkt/2018/09/sto/images/close-btn.png') center center/100% auto no-repeat; width: 32px;height: 32px; margin: 20px auto 0;"
          @click="closeBtn"></div>
      </div>
    </div>

    <!--卡密的弹窗-->
    <div v-show="returnInfo">
      <div
        style="position: fixed;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,0.5);z-index: 99;max-width: 750px;margin: 0 auto;"
        @click="cancel"></div>
      <div style="position: fixed;z-index: 100;top: 30%;left: 50%;transform: translateX(-50%);width: 80%;">
        <div style="background-color: #FFF;padding: 15px 15px;border-radius: 3px;">
          <div style="display: flex;justify-content: space-between;margin: 6px 0;" v-for="item in hexiaoArr">
            <div>{{item.cardNo}}</div>
            <div style="color: red;" v-if="item.status == 'FAIL'">核销失败</div>
            <div style="color: #0abf65;" v-else-if="item.status == 'SUCCESS'">核销成功</div>
          </div>
        </div>
      </div>
    </div>

    <!--弹窗-->
    <div v-show="mobileToast">
      <div
        style="position: fixed;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,0.5);z-index: 99;max-width: 750px;margin: 0 auto;"></div>
      <div style="position: fixed;z-index: 100;top: 30%;left: 50%;transform: translateX(-50%);width: 75%;">
        <div style="background-color: #FFF;padding: 15px 15px;border-radius: 3px;">
          <div style="text-align: center;padding: 10px 0 20px;border-bottom: 1px dashed gray" class="ToastLine">
            号码登记成功，请放心兑换。
          </div>
          <div style="text-align: center;padding: 10px 0 0" @click='confirmToast'>确认</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {XHeader, Scroller, Group, Cell, Grid, GridItem} from 'vux'
  import * as core from '@/core/cpApi'

  export default {
    name: 'goodsList',
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
        isShow: false,
        codePics: '',
        tab: 'tab02',
        smsChange: true,

        mobileToast: false,

        user_mobile: '',
        phone: '',
        dataArr: [],
        kind: '',
        ticket: '',
        mobileSearch: '',
        flag: false,
        fuwuPassword: true,
        isHasSms: false,

        codeText: '获取验证码',
        isClick: false,
        isGray: false,
        mobileCode: '',
        returnInfo: false,
        returnResult: [],
        hexiaoArr: [],


        isProvince: '',
        isXIAMI: false,

      }
    },

    created() {

      let title = this.$route.query.name;
      this.title = title;

      this.fetchDataList(title);
      if (title == '移动淘游卡' || title == '移动虾米音乐') {
        this.smsChange = true;
      } else {
        this.smsChange = false;
      }
      if(title == '移动虾米音乐'){
        this.isXIAMI = true;
      }
      if (title == '移动淘游卡') {
        this.flag = true
      }

      if (title == '移动麦德龙' || title == '移动沃尔玛') {
        this.fuwuPassword = true;
      } else {
        this.fuwuPassword = false;
      }

    },
    methods: {
      clickBtn(m, n, d) {

        this.isShow = true;
        if (this.fuwuPassword) {
          this.codePics = '/exchange/qrCode?mobile=' + n + '&content=' + m + '&score=' + d;
        } else {
          this.codePics = '/exchange/qrCodeXiami?mobile=' + n + '&content=' + m + '&ticket=' + this.ticket + '&score=' + d;
        }


      },
      closeBtn() {
        this.isShow = false
      },
      cancel() {
        this.returnInfo = false;
        window.location.reload();
      },
      confirmToast() {
        this.mobileToast = false;
        this.smsChange = false;
      },
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
      reset_Btn() {
        if (!this.user_mobile) {
          this.$vux.toast.text('请输入手机号', 'middle')
        } else {
          this.$vux.loading.show({text: '正在加载'})
          core.resetkefu({
            "mobile": this.user_mobile,
          }).then(data => {
            this.$vux.loading.hide()
            if (data.code && '00' == data.code) {
              window.location.href = '/front/forgotPassword.html?isNeedIdCard=' + data.result.cardNeed
                + '&isNeedNewPwd=' + data.result.servicePwdNeed + '&mobile=' + this.user_mobile + '&isNeedCall=' + data.result.type + '&newContent=' +
                data.result.template;

            } else {
              this.$vux.toast.text(data.message, 'middle')
            }
          })
        }
      },
      nextBtn() {
        if (!this.phone) {
          this.$vux.toast.text('请输入手机号', 'middle')
        } else {
          this.$vux.loading.show({text: '正在加载'})
          core.exChange({
            'mobile': this.phone,
          }).then(data => {
            this.$vux.loading.hide()
            if (data.code && '00' == data.code) {

              this.mobileToast = true;

              this.ticket = data.result;

              this.getMobileAddr();

            } else {
              this.$vux.toast.text(data.message, 'middle')
            }
          })
        }
      },
      // 获取用户的手机号归属地
      getMobileAddr(){
        core.getMobileAddr({
          mobile: this.phone,
        }).then(data =>{
          if(data.code && '00' == data.code){
            if(data.result.province == '浙江'){
              this.isProvince = "Y"
            }
          }
        })
      },
      // 麦德龙 + 沃尔玛的核销 获取验证码
      getCode() {
        if (!this.mobileSearch) {
          this.$vux.toast.text('请输入手机号', 'middle')
        } else {
          this.$vux.loading.show({text: '正在加载'})
          core.getCode({
            'mobile': this.mobileSearch,
          }).then(data => {
            this.$vux.loading.hide()
            if (data.code && '00' == data.code) {

              this.$vux.toast.text("短信验证码已发送，请注意查收", 'middle')
              let time = 60;
              let that = this;
              this.timer = setInterval(() => {
                if (time == 0) {
                  that.codeText = '获取验证码'
                  that.isClick = false;
                  that.isGray = false;
                  clearInterval(that.timer)
                } else {
                  time--;
                  that.isGray = true;
                  that.isClick = true;
                  that.codeText = time + 's后重新发送'
                }
              }, 1000)

            } else {
              this.$vux.toast.text(data.message, 'middle')
            }
          })
        }

      },

      // 查询--核销
      search() {
        if (!this.mobileSearch) {
          this.$vux.toast.text('请输入手机号', 'middle')
        } else {

          // 移动麦德龙 + 移动沃尔玛的接口
          if (this.fuwuPassword) {

            if (!this.isHasSms) {
              this.$vux.loading.show({text: '正在加载'})
              core.isHasSms({
                "mobile": this.mobileSearch,
              }).then(data => {
                this.$vux.loading.hide()
                if (data.code && '00' == data.code) {
                  if (data.result == '0') {
                    this.isHasSms = true;
                    return;
                  } else if (data.result == '1') {
                    this.isHasSms = false;
                    this.sendCode();
                    return;
                  }

                } else {
                  this.$vux.toast.text(data.message, 'middle')
                }
              })
            } else {
              this.sendCode();
            }


            // if(!this.mobileCode){
            // 		this.$vux.toast.text('请输入验证码', 'middle')
            // 		return;
            // }


          } else {
            // 不是移动麦德龙 和 沃尔玛
            this.$vux.loading.show({text: '正在加载'})
            core.hexiaoSearch({
              'mobile': this.mobileSearch,
            }).then(data => {
              this.$vux.loading.hide()
              if (data.code && '00' == data.code) {

                var _result = data.result;
                var _val = ''
                if (_result.length > 0) {
                  _val = _result.toString()
                  console.log(_val)
                  this.$refs.textArea.value = _val
                } else {
                  this.$vux.toast.text("没有找到对应的卡密", 'middle')
                }
              } else {
                this.$vux.toast.text(data.message, 'middle')
              }
            })
          }

        }
      },

      // 移动沃尔玛 和  麦德龙 的接口
      sendCode() {
        if (!this.isHasSms) {
          if (this.title == '移动沃尔玛') {
            var data = {
              'mobile': this.mobileSearch,
              // 'smsCode': this.mobileCode,
              'channel': '93',
            }
          }
          if (this.title == '移动麦德龙') {
            var data = {
              'mobile': this.mobileSearch,
              // 'smsCode': this.mobileCode,
              'channel': '94',
            }
          }
          this.$vux.loading.show({text: '正在加载'})
          core.hexiaoSearchMOM(data).then(data => {
            this.$vux.loading.hide()
            if (data.code && '00' == data.code) {
              var _result = data.result;
              var _val = ''
              var arr = [];
              if (_result.length > 0) {
                this.returnResult = _result;
                for (var y in _result) {
                  arr.push(_result[y].voucherNum)
                }
                _val = arr.toString();
                console.log(_val)
                this.$refs.textArea.value = _val
              } else {
                this.$vux.toast.text("没有找到对应的卡密", 'middle')
              }
            } else {
              this.$vux.toast.text(data.message, 'middle')
            }
          })
        } else {

          if (!this.mobileCode) {
            this.$vux.toast.text('请输入验证码', 'middle')
            return;
          }

          if (this.title == '移动沃尔玛') {
            var data = {
              'mobile': this.mobileSearch,
              'smsCode': this.mobileCode,
              'channel': '93',
            }
          }
          if (this.title == '移动麦德龙') {
            var data = {
              'mobile': this.mobileSearch,
              'smsCode': this.mobileCode,
              'channel': '94',
            }
          }
          this.$vux.loading.show({text: '正在加载'})
          core.hexiaoSearchMON(data).then(data => {
            this.$vux.loading.hide()
            if (data.code && '00' == data.code) {
              var _result = data.result;
              var _val = ''
              var arr = [];
              if (_result.length > 0) {
                this.returnResult = _result;
                for (var y in _result) {
                  arr.push(_result[y].voucherNum)
                }
                _val = arr.toString();
                console.log(_val)
                this.$refs.textArea.value = _val
              } else {
                this.$vux.toast.text("没有找到对应的卡密", 'middle')
              }
            } else {
              this.$vux.toast.text(data.message, 'middle')
            }
          })

        }
      },

      // 核销 -- 核销
      hexiaoBtn() {

        if (!this.$refs.textArea.value) {
          this.$vux.toast.text('没有卡密', 'middle')
        } else {

          if (this.title == '移动沃尔玛') {
            var data = {
              'mobile': this.mobileSearch,
              'channel': '93',
              'hxReqs': this.returnResult,
            }
          }
          if (this.title == '移动麦德龙') {
            var data = {
              'mobile': this.mobileSearch,
              'channel': '94',
              'hxReqs': this.returnResult,
            }
          }


          // 移动麦德龙 + 移动沃尔玛核销的接口
          if (this.fuwuPassword) {
            if (!this.mobileSearch) {
              this.$vux.toast.text('请输入手机号', 'middle')
              return;
            }
            this.$vux.loading.show({text: '正在加载'})
            core.hexiaoMo(data).then(data => {
              this.$vux.loading.hide()
              if (data.code && '00' == data.code) {
                if (data.result == '1') {

                  this.$vux.toast.text('核销成功', 'middle')

                } else {

                  this.$vux.toast.text('核销失败', 'middle')

                }
                setTimeout(() => {
                  window.location.reload();
                }, 2000)

              } else {
                this.$vux.toast.text(data.message, 'middle')
                console.log('12324-----++++')
              }
            })
          } else {
            // 不是 移动麦德龙 + 移动沃尔玛的接口
            this.$vux.loading.show({text: '正在加载'})
            core.hexiao({
              'tbCards': this.$refs.textArea.value,
            }).then(data => {
              this.$vux.loading.hide()
              if (data.code && '00' == data.code) {

                this.returnInfo = true;
                this.hexiaoArr = data.result;

              } else {
                this.$vux.toast.text(data.message, 'middle')
              }
            })
          }
        }
      },

    }
  }

</script>
<style lang="less" scoped>


</style>
<style lang="less">
  .goodsList {

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
      width: 33%;
      position: relative;
    }
    .tab-nav-i.active {
      color: #ff8810;
    }
    .tab-nav-i.active02 {
      width: 50%;
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
      padding: 23px 18px 22px;
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
      width: 80%;
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
    .codePic {
      width: 200px;
      height: 200px;
      margin: 0 auto;
    }
    .listTable {
      padding: 16px 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border: solid 1px #c0c0c0;
      border-radius: 5px;
      margin-bottom: 10px;
      background-color: #FFF;
    }

    .getCodeText {
      width: 35%;
      text-align: center;
      color: #FFF;
      background-color: #ff8810;
      border-radius: 5px;
      height: 42px;
      border: none;
    }
    .getCodeText.gray {
      color: lightgray;
      font-weight: normal;
      background-color: #FFF;
      border: 1px solid lightgray;
    }

  }
</style>
