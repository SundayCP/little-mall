<template>
  <div class="coupon-pay" ref="couponPay">
    <page-header title="电子券收款" bd-color="#333"></page-header>
    <div class="pay-money-container">
      <p class="pay-money-title">收款金额</p>
      <div class="pay-money-input-container">
        <div class="pay-money-input-wrapper">
          <p class="pay-money-label">￥</p>
          <div class="number-wrapper">
            <input type="number" placeholder="0.00" v-model="step1.amount" class="pay-money-input">
          </div>

        </div>

      </div>
    </div>

    <div class="input-group">
      <div class="input-container">
        <div class="left"><p class="label">支付手机号</p></div>
        <div class="center"><input type="text" v-model="step1.mobile" placeholder="请输入手机号"></div>
        <div class="right"><p class="right"></p></div>
      </div>
      <div class="input-container" v-show="step===2">
        <div class="left"><p class="label">和包验证码</p></div>
        <div class="center"><input type="text" v-model="step2.password" placeholder="请输入6位动态密码"></div>
        <div class="right" @click="showModal=true"><p class="right">获取验证码</p></div>
      </div>
    </div>
    <p class="tip" v-show="step===2">如何获取和包验证码？<br>1.前往App Store 下载“和包支付”app<br>2.进入和包支付首页，点击首付款-动态密码</p>

    <button class="submit-order" @click="submitOrder">提交订单</button>

    <!--<div class="switch">-->
    <!--<p class="switch-text" @click="payType=(payType===1?2:1)">{{switchText}}</p>-->
    <!--</div>-->

    <div class="dialog" v-show="showModal">
      <div class="modal">
        <div class="modal-head">
          <p>请前往App Store 下载“和包支付”App，以获取动态密码</p>
        </div>
        <p class="modal-foot" @click="showModal=false">明白</p>
      </div>
    </div>

  </div>
</template>

<script>
  import PageHeader from './base/page-header'

  import {Toast} from 'vux'

  import {couponPayStep1, couponPayStep2} from "../../core/chjApi";

  const amountReg = /^[0-9]*(\.[0-9]{0,2})?$/;
  const telReg = /^1[34578][0-9]{9}$/;
  const pwdReg = /^[0-9A-Za-z]{6}$/
  export default {
    name: "coupon-pay",
    data() {
      return {
        step: 1,//1为动态密码，2为支付密码
        showModal: false,

        step1: {
          amount: '',
          mobile: ''
        },
        step2: {
          orderId: '',
          password: ''
        }
      }
    },
    computed: {
      switchText() {
        if (this.payType === 1) {
          return '使用支付密码收款'
        } else if (this.payType === 2) {
          return '使用动态密码收款'
        }
      }
    },
    mounted() {
      this.$refs.couponPay.style.height = window.innerHeight + 'px'
    },
    methods: {
      submitOrder() {
        if (this.step === 1) {
          if (!this.step1.amount) {
            this.$vux.toast.text('请输入金额！', 'middle')
            return;
          }
          if (!amountReg.test(this.step1.amount)) {
            this.$vux.toast.text('请输入正确的金额！', 'middle')
            return;
          }
          if (!this.step1.mobile) {
            this.$vux.toast.text('请输入手机号！', 'middle')
            return;
          }
          if (!telReg.test(this.step1.mobile)) {
            this.$vux.toast.text('请输入正确的手机号！', 'middle')
            return;
          }

          couponPayStep1({
            mobile: this.step1.mobile,
            amount: this.step1.amount
          }).then(data => {
            if (data.code && data.code === '00') {
              this.step2.orderId = data.result.orderId
              if (data.result.payMethod === 'sdWap') {
                window.location.href = data.result.url
              } else if (data.result.payMethod === 'dynPass') {
                this.step = 2
              }
            } else {
              this.$vux.toast.text(data.message, 'middle')
            }
          })
        } else if (this.step === 2) {
          if (!this.step2.password) {
            this.$vux.toast.text('请输入动态密码！', 'middle')
            return;
          }
          if (!pwdReg.test(this.step2.password)) {
            this.$vux.toast.text('请输入正确的动态密码！', 'middle')
            return;
          }
          couponPayStep2({
            orderId: this.step2.orderId,
            password: this.step2.password
          }).then(data => {
            if (data.code && data.code === '00') {

            } else {
              this.$vux.toast.text(data.message, 'middle')
            }
          })
        }
      }
    },
    components: {
      PageHeader, Toast
    }
  }
</script>

<style scoped lang="less">
  input, button {
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
    background: none;
  }

  .coupon-pay {
    height: 100%;
    background-color: #ededed;
    .pay-money-container {
      height: 7.6rem;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      .pay-money-title {
        color: #3e3e3e;
        font-size: .875rem;
        line-height: 2.875rem;
        padding-left: 1rem;
      }
      .pay-money-input-container {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        .pay-money-input-wrapper {
          width: 91.46%;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .pay-money-label {
            width: 10%;
            align-self: flex-end;
            color: #888;
            font-size: 1.5rem;
            padding-bottom: .3rem;
          }
          .number-wrapper {
            width: 90%;
            height: 100%;
            .pay-money-input {
              width: 100%;
              height: 100%;
              font-size: 2.5rem;
              line-height: 2.5rem;
              color: #333;
            }
            .pay-money-input::placeholder {
              color: #c8c7cf;
              font-size: 2.5rem;
            }
          }

        }

      }
    }

    .input-group {
      background-color: #fff;
      margin-top: .5rem;
      .input-container {
        height: 3.125rem;
        display: flex;
        div {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .left {
          flex: 1;
          p {
            color: #010101;
            font-size: .844rem;
          }
        }
        .center {
          flex: 2;
          input {
            width: 100%;
            font-size: .844rem;
            color: #010101;
            line-height: 1rem;

          }
          input::placeholder {
            font-size: .844rem;
            line-height: 1rem;
            color: #c6c6c6;
          }
        }
        .right {
          flex: 1;
          p {
            color: #537cfb;
            font-size: .75rem;
          }
        }
      }
      .input-container:nth-child(2) {
        border-top: .032rem solid #ebebeb;
      }
    }
    .tip {
      color: #696969;
      font-size: .75rem;
      line-height: 1.1rem;
      padding: 1.188rem .938rem 0 .938rem;
    }
    .submit-order {
      width: 92%;
      height: 2.75rem;
      margin: 0 auto;
      margin-top: 1.188rem;
      display: block;
      border-radius: .25rem;
      background-color: #ef9134;
      color: #fff;
      font-size: 1rem;
    }
    .switch {
      height: 2.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .switch-text {
        font-size: .75rem;
        color: #ef9134;
      }
    }
    .dialog {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, .5);
      display: flex;
      justify-content: center;
      align-items: center;
      .modal {
        width: 75%;
        background-color: #fff;
        border-radius: .25rem;

        .modal-head {
          height: 6rem;
          display: flex;
          justify-content: center;
          align-items: center;
          p {
            width: 85%;
            color: #010101;
            font-size: .875rem;
            line-height: 1.1rem;
            text-align: center;
          }
        }
        .modal-foot {
          line-height: 2.5rem;
          font-size: 1rem;
          color: #ef9134;
          text-align: center;
          border-top: .032rem solid #ececec;
        }
      }
    }
  }


</style>
