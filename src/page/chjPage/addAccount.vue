<template>
  <div class="addAccount">
    <div class="header">
      <x-header :left-options="{showBack: true}">新增账号</x-header>
    </div>
    <div style="padding: 0.906rem 0.938rem 1.156rem;background-color: #FFF;margin-top: 1px">
      <span class="line"></span><span
      style="vertical-align: middle;font-weight: 700;font-size: 1rem;color: #333333;margin-left: 0.313rem">请上传您的营业执照</span>
      <div style="margin-top: 1rem">
        <div class="bgk" :style="'background: #fff url('+uploadImg1+') center center / 100% auto no-repeat;height:9.75rem; width:17.5rem;margin: 0 auto;position: relative;'">
          <div v-show="isLoading1" style="position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);">
            <inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">上传中</span>
          </div>
          <form name="headForm1" action="/file/upload" enctype="multipart/form-data" method="post"
                id="headForm">
            <input type="file" id="input_file_headimg1" name="file" class="input_file_headimg1"
                   accept="image/png, image/jpeg, image/gif, image/jpg" @change="fileChange()">
          </form>
        </div>
      </div>
    </div>

    <div style="padding: 0.906rem 0.938rem 4.715rem;background-color: #FFF;margin-top: 0.625rem">
      <span class="line"></span>
      <span style="vertical-align: middle;font-weight: 700;font-size: 1rem;color: #333333;margin-left: 0.313rem">请添加营业执照所属人信息</span>
      <div>
        <div class="input-con" style="margin-top: 1.25rem"><span class="input-header">所属人姓名：</span><input type="text"
                                                                                                          class="input-box"
                                                                                                          v-model="shop.name"
                                                                                                          placeholder="请输入所属人姓名">
        </div>
        <div class="input-con" style="margin: 0.625rem 0"><span class="input-header">身份证号：</span><input type="text"
                                                                                                        class="input-box"
                                                                                                        v-model="shop.idCard"
                                                                                                        placeholder="请输入身份证号">
        </div>
        <div class="input-con" style="margin: 0 0 1.875rem"><span class="input-header">支付宝账号：</span><input type="text"
                                                                                                           class="input-box"
                                                                                                           v-model="shop.alipayAccount"
                                                                                                           placeholder="请输入支付宝账号">
        </div>
      </div>
      <div class="applyOpen" @click="submitShopInfo">申请开启</div>
    </div>
  </div>
</template>

<script>
  import {XHeader, XInput, Group, XTable,InlineLoading} from 'vux'
  import {checkInfo} from './js/util'
  import * as core from '../../core/chjApi'
  import axios from 'axios'
  export default {
    name: "addAccount",
    components: {
      XHeader, XInput, Group, XTable,InlineLoading
    },
    data() {
      return {
        shop: {
          name: '',
          idCard: '',
          alipayAccount: '',
        },
        uploadImg1: require('../../../static/chjImg/bussinessPic.png'),
        isFlag: false,
        isLoading1: false,
      }
    },
    computed: {},
    created() {


    },
    methods: {
      submitShopInfo() {
        if(!this.isFlag){
          this.$vux.toast.text('请上传营业执照', 'middle')
          return
        }
        if (!this.shop.name) {
          this.$vux.toast.text('姓名不能为空！', 'middle')
          return
        }

        if (!this.shop.idCard) {
          this.$vux.toast.text('身份证号不能为空！', 'middle')
          return
        } else if (!checkInfo(this.shop.idCard)) {
          this.$vux.toast.text('请输入正确的身份证号码！', 'middle')
          return
        }
        if (!this.shop.alipayAccount) {
          this.$vux.toast.text('支付宝账号不能为空！', 'middle')
          return
        }
        this.$vux.loading.show({text: '正在加载'})
        core.submitPresonInfo({
          zfb: this.shop.alipayAccount,
          name: this.shop.name,
          idCardNumber: this.shop.idCard,
          type: '个体工商',
          businessLicense: this.uploadImg1,
        }).then(data => {
          this.$vux.loading.hide()
          if (data.code && '00' == data.code) {
            this.$vux.toast.text('新增账号成功！', 'middle')
            setTimeout(()=>{
              this.$router.push({path:'/quotaDetail'})
            },1500)
          } else {
            this.$vux.toast.text(data.message, 'middle')
          }
        })
      },
      //上传图片
      fileChange() {
        let _formData = new FormData(document.getElementById('headForm'))
        this.isLoading1=true
        axios.post('/file/upload', _formData).then(response => {
          if (response.data.code && response.data.code == '00') {
            this.isLoading1=false
            this.isFlag = true;
              this.uploadImg1 = response.data.result;
          } else {
            this.isLoading1=false
            this.$vux.toast.text(response.data.message, 'middle') //错误提示
          }

        })
      },
    }
  }
</script>

<style lang="less">
  .addAccount {
    .vux-header {
      background-color: #FFF;
      color: #333;
    }
    .vux-header-title, .vux-header-back {
      color: #FFF;
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
    .line {
      display: inline-block;
      width: 0.188rem;
      height: 1.063rem;
      background-color: #fd9124;
      border-radius: 0.094rem;
      vertical-align: middle;
    }
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
      color: #999999;
      font-size: 0.875rem;
    }
    input:-moz-placeholder, textarea:-moz-placeholder {
      color: #999999;
      font-size: 0.875rem;
    }
    input::-moz-placeholder, textarea::-moz-placeholder {
      color: #999999;
      font-size: 0.875rem;
    }
    input:-ms-input-placeholder, textarea:-ms-input-placeholder {
      color: #999999;
      font-size: 0.875rem;
    }
    .photo-pic {
      width: 17.5rem;
      height: 9.75rem;
      background: url("../../../static/chjImg/bussinessPic.png") no-repeat center center/contain;
      margin: 0 auto;
    }
    .input-con {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .input-box {
      display: inline-block;
      border-radius: 0.313rem;
      border: solid 0.063rem #bebebe;
      color: #000;
      font-size: 0.875rem;
      padding: 0.844rem 0;
      width: 90%;
      text-indent: 10px;
      outline: none;
    }
    .input-header {
      display: inline-block;
      color: #333333;
      font-size: 0.938rem;
      font-weight: 700;
      width: 33%;
    }
    .applyOpen {
      font-size: 1.125rem;
      color: #ffffff;
      background-color: #fd9124;
      border-radius: 0.313rem;
      height: 2.75rem;
      line-height: 2.75rem;
      width: 100%;
      margin: 0 auto;
      text-align: center;
    }
    .input_file_headimg1{
      width: 100%;
      height: 100%;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
    }
    .bgk{
      background-size: contain!important;
    }
  }
</style>
