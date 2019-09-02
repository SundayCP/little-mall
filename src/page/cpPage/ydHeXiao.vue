<template>
  <div class="ydHeXiao">
    <div class="header">
      <x-header :left-options="{showBack: true}">移动畅由核销</x-header>
    </div>
    <div class="tab">
      <div class="tab-nav-i" :class="{active: tab == 'tab02'}" @click="tab = 'tab02'">找回服务密码</div>
      <div class="tab-nav-i" :class="{active: tab == 'tab03'}" @click="tab = 'tab03'">核销</div>
    </div>
    <div v-show="tab == 'tab02'" style="padding: 1.25rem 0.881rem; background-color: #FFF;margin-top: 5px;">
      <input type="text" name="" placeholder="请输入客户手机号" v-model.trim="user_mobile" class="sectin-middle-two"/>
      <div class="resetKefu" @click="reset_Btn">
        重置客服密码
      </div>
    </div>

    <div v-show="tab == 'tab03'" style="margin-top: 5px;background-color: #FFF;padding: 0 0 20px;">
      <div class="" style="width: 90%;margin:  0 auto;">
        <group>
          <x-input title="手机号:" placeholder="请输入手机号" v-model.trim="mobile" :show-clear="false"
                   @on-change="mobile_getToken" placeholder-align="left"></x-input>

          <div style="display: flex;flex-direction: row;justify-content: space-between;margin-top: 20px;">
            <div class="code-text">
              <label for="inputCode"
                     style="width: 3.5rem;font-size:14px;display: inline-block;width: 4.5em;padding-top: 2px;">验证码：</label>
              <input type="" name="" id="inputCode" maxlength="4" onkeyup="value=value.replace(/[^0-9]/g,'')"
                     onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')"
                     v-model.trim="mobileCode" placeholder="请输入验证码" class="yanCodeInput"/>
            </div>
            <button class="getCodeText" @click="getCode" :class="{gray: isGray}" :disabled='isClick'> {{codeText}}
            </button>
          </div>

          <x-input title="实付:" placeholder="请输入实付积分" v-model.trim="payMoney" pattern="^[1-9]{1}[0-9]*$"
                   :show-clear="false" @on-change="confirmMoney" placeholder-align="left"></x-input>
          <x-input title="畅由扣费" placeholder="" :disabled=true v-model.trim="cyMoney" :show-clear="false" @on-blur=""
                   placeholder-align="right" class="xInput">
            <span class="" slot="right" style='font-size: 14px;'>积分</span>
          </x-input>
          <x-input title="积分消费" placeholder="" :disabled=true v-model.trim="jfMoney" :show-clear="false" @on-blur=""
                   placeholder-align="right" class="xInput">
            <span class="" slot="right" style='font-size: 14px;'>积分</span>
          </x-input>
        </group>

        <div class="hexiaoBtn" @click='HeXiaoBtn'>
          立即核销
        </div>
        <div class="" style="color: #999999;font-size: 12px;">
          <p class="text-des">说明：</p>
          <p class="text-des">1.点击畅由首页右上角“兑换积分”，进入移动绑定页面。</p>
          <p class="text-des">2.绑定成功后，直接跳转到兑换积分页面，输入要兑换的积分进行兑换。</p>
          <p class="text-des">3.最后一步大功告成，在下面输入手机号码按提示的验证码上报即可。</p>
          <p class="text-des">4.说明：单笔交易畅由收取用户2%的服务费。</p>
          <p class="text-des">5.提示：如遇“积分不匹配请重试提示”，可将提交分值分次消费即可，如5000积分可以2000+3000分次消费！</p></p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {XHeader, XInput, Group, XButton} from 'vux'
  import * as core from '@/core/cpApi'

  export default {
    name: 'ydHeXiao',
    components: {
      XHeader,
      XInput, Group,
      XButton
    },
    data() {
      return {
        tab: 'tab03',
        user_mobile: '',


        mobile: '',
        mobileCode: '',
        codeText: '获取验证码',
        isClick: false,
        isGray: false,
        payMoney: '',
        cyMoney: '',
        jfMoney: '',
        token: '',
      }
    },

    created() {
      // this.getToken();
    },
    methods: {
      // 重置 客服密码
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
      // 获取token
      mobile_getToken() {
        if (!this.mobile) {
          this.$vux.toast.text('请输入手机号', 'middle')
          return;
        }
        if (this.mobile.length < 11) {
          // this.$vux.toast.text('请输入手机号', 'middle')
          return;
        }
        core.getToken({
          mobile: this.mobile,
        }).then(data => {
          if (data.code && '00' == data.code) {
            this.token = data.result.token;
            // this.getCodeContent()
          } else {
            this.$vux.toast.text(data.message, 'middle')
          }
        })
      },
      // 计算扣费 + 积分消费
      confirmMoney() {
        if (this.isNumber(this.payMoney)) {
          if (this.payMoney < 100) {
            this.$vux.toast.text('输入的积分数量最小为100', 'middle')
          }
          this.cyMoney = parseInt(this.payMoney - this.payMoney / 1.02)
          this.jfMoney = parseInt(this.payMoney - this.cyMoney)
        }
        if (!this.payMoney) {
          this.cyMoney = '';
          this.jfMoney = '';
        }
      },
      // 是否是数字
      isNumber(val) {
        var regPos = /^\d+(\.\d+)?$/; //非负浮点数
        var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
        if (regPos.test(val) || regNeg.test(val)) {
          return true;
        } else {
          return false;
        }

      },
      // 获取短信验证码
      getCode() {
        if (!this.mobile) {
          this.$vux.toast.text('请输入手机号', 'middle')
        } else {

          // this.getToken();
          this.getCodeContent()
        }
      },


      getCodeContent() {
        this.$vux.loading.show({text: '正在加载'})
        core.getCodeHexiao({
          'mobile': this.mobile,
          'token': this.token,
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
      },
      HeXiaoBtn() {
        if (!this.mobile) {
          this.$vux.toast.text('请输入手机号', 'middle')
          return;
        }
        if (!this.mobileCode) {
          this.$vux.toast.text('请输入验证码', 'middle')
          return;
        } else if (this.mobileCode.length > 4) {

        }
        this.$vux.loading.show({text: '正在加载'})
        core.ydHexiao({
          mobile: this.mobile,
          mobileCode: this.mobileCode,
          payMoney: this.payMoney,
          token: this.token,
        }).then(data => {
          this.$vux.loading.hide()
          if (data.code && '00' == data.code) {
            this.$vux.toast.text('核销成功', 'middle')
            setTimeout(function () {
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
  .ydHeXiao {
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
      left: 45%;
      right: 45%;
      border-radius: 3px;
    }
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
      color: #b5aeae;
      font-size: 14px;
    }
    input:-moz-placeholder, textarea:-moz-placeholder {
      color: #b5aeae;
      font-size: 14px;
    }
    input::-moz-placeholder, textarea::-moz-placeholder {
      color: #b5aeae;
      font-size: 14px;
    }
    input:-ms-input-placeholder, textarea:-ms-input-placeholder {
      color: #b5aeae;
      font-size: 14px;
    }
    .sectin-middle-two {
      outline: none;
      font-size: 14px;
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

    .weui-cells {
      margin-top: 0 !important;
    }
    .weui-cell {
      border-radius: 3px;
      border: solid 1px #cdcdcd;
      padding: 7px 15px;
      margin-top: 15px;
      height: 20px;
      line-height: 20px;
    }
    .weui-label {
      font-size: 14px;
      // height: 20px;
      // line-height: 20px;
      width: 3.5rem !important;
      padding-top: 2px;
    }
    .weui-input {
      font-size: 14px;
      height: 22px !important;
      line-height: 22px !important;
    }
    .xInput .weui-input {
      text-align: right;
      padding-right: 10px;
      box-sizing: border-box;
      color: #000 !important;
    }
    .weui-cell__bd {
      flex: 1;
      // height: 20px;
      // line-height: 20px;
    }

    .hexiaoBtn {
      width: 100%;
      height: 44px;
      line-height: 44px;
      text-align: center;
      font-size: 18px;
      color: #FFF;
      background-color: #ff8a00;
      border-radius: 5px;
      margin-top: 30px;
      margin-bottom: 25px;
    }
    .text-des {
      margin-bottom: 0px;
      line-height: 20px;
    }

    .getCodeText {
      width: 34%;
      text-align: center;
      color: #FFF;
      background-color: #ff8810;
      border-radius: 3px;
      height: 36px;
      border: none;
      text-decoration: underline;
      font-size: 14px;
    }
    .getCodeText.gray {
      color: lightgray;
      font-weight: normal;
      background-color: #FFF;
      border: 1px solid lightgray;
    }
    .code-text {
      width: 64%;
      border-radius: 3px;
      border: solid 1px #cdcdcd;
      padding: 7px 15px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
    }

    .yanCodeInput {
      display: inline-block;
      outline: none;
      width: 60%;
      font-size: 14px;
      height: 20px;
      line-height: 20px;
    }
    input[disabled] {
      color: #000;
      opacity: 1
    }
  }
</style>
