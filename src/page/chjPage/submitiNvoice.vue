<template>
  <div class="addAccount">
    <div class="header">
      <x-header :left-options="{showBack: true}">上传发票</x-header>
    </div>
    <div style="padding: 0.906rem 0.938rem 1.156rem;background-color: #FFF;margin-top: 1px">
      <span class="line"></span><span style="vertical-align: middle;font-weight: 700;font-size: 1rem;color: #333333;margin-left: 0.313rem">个体工商账号</span>
      <div style="    position: relative;">
        <select name="" class="select-box" v-model="selectVal" @change="selectValue">
          <option  v-for="(item,index) in selectA"  :value="item.value" :disabled="item.frozen" :label="item.label" :key="index">{{item.label}}</option>
        </select>
        <span class="iconfont icon-sanjiaoxing" style="position: absolute;top: 50%;right: 5%"></span>
      </div>
    </div>

    <div style="padding: 0.906rem 0.938rem 4.715rem;background-color: #FFF;margin-top: 0.625rem">
      <span class="line"></span>
      <span style="vertical-align: middle;font-weight: 700;font-size: 1rem;color: #333333;margin-left: 0.313rem">上传方式（二选一即可）</span>
      <div>
        <div style="margin-top: 1rem">
          <div class="bgk" :style="'background: #fff url('+uploadImg1+') center center / 100% auto no-repeat;height:9.75rem; width:17.5rem;margin: 0 auto;position: relative;'">
            <div v-show="isLoading1" style="position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);">
              <inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">上传中</span>
            </div>
            <form name="headForm1" action="/file/upload" enctype="multipart/form-data" method="post"
                  id="headForm1">
              <input type="file" id="input_file_headimg1" name="file" class="input_file_headimg1"
                     accept="image/png, image/jpeg, image/gif, image/jpg" @change="fileChange(1)">

            </form>
          </div>
        </div>
        <div style="margin-top: 0.625rem">
          <div class="bgk" :style="'background: #fff url('+uploadImg2+') center center / 100% auto no-repeat;height: 9.75rem;width:17.5rem;margin: 0 auto;position: relative;'">
            <div v-show="isLoading2" style="position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);">
              <inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">上传中</span>
            </div>
            <form name="headForm1" action="/file/upload" enctype="multipart/form-data" method="post"
                  id="headForm2">
              <input type="file" id="input_file_headimg2" name="file" class="input_file_headimg1"
                     accept="image/png, image/jpeg, image/gif, image/jpg" @change="fileChange(2)">
            </form>
          </div>
        </div>
      </div>
      <div style="color: #999999;font-size: 0.75rem;margin: 0.688rem 0 0.531rem">
        <p style="line-height: 1.219rem;">*注意事项<br>个体工商户本月如有提现记录，需上传相对应的发票否则次月将无法继续提现。</p>
      </div>
      <div class="applyOpen" @click="submitTicket">提交</div>
    </div>
  </div>
</template>

<script>
  import {XHeader, XInput, Group, XTable,InlineLoading } from 'vux'
  import * as core from '../../core/chjApi'
  import axios from 'axios'
  export default {
    name: "addAccount",
    components: {
      XHeader, XInput, Group, XTable,InlineLoading
    },
    data(){
      return{
        selectVal: '-1',
        // 个体工商
        selectA:[],
        uploadImg1: require('../../../static/chjImg/E-invoice.png'),
        uploadImg2:  require('../../../static/chjImg/Mailing-List.png'),
        flag1: false,
        flag2: false,

        loadImg1: '',
        loadImg2: '',

        isLoading1: false,
        isLoading2: false,
      }
    },
    created(){
      this.getVal();
    },
    methods:{
      selectValue(){
        console.log(this.selectVal + 'ppppp')
      },
      //上传图片
      fileChange(num) {
        let _formData = new FormData(document.getElementById('headForm' + num))
        num == 1 ? this.isLoading1=true : this.isLoading2=true;
        axios.post('/file/upload', _formData).then(response => {
          if (response.data.code && response.data.code == '00') {
            if (num === 1) {
              this.flag1 = true;
              this.isLoading1 = false
              this.uploadImg1 = response.data.result;
              this.loadImg1 = response.data.result;
            } else if (num === 2) {
              this.flag2 = true;
              this.isLoading2 = false
              this.uploadImg2 = response.data.result;
              this.loadImg2 = response.data.result;
            }
          } else {
            this.$vux.toast.text(response.data.message, 'middle') //错误提示
          }
        })
      },
      submitTicket(){
        if(this.selectVal < 0){
          this.$vux.toast.text('请选择个体工商账号', 'middle')
          return
        }
        if(!this.flag1){
          this.loadImg1 = ''
        }
        if(!this.flag2){
          this.loadImg2 = ''
        }

        core.submitTicket({
          withdrawId: this.selectVal,
          imageUrl: this.loadImg1 ? this.loadImg1 : this.loadImg2,
          type: this.loadImg1 ? '电子单' : '邮寄单',
        }).then(data => {
          if (data.code && '00' == data.code) {
            this.$vux.toast.text('提交发票成功！', 'middle')
            setTimeout(()=>{
              window.location.reload()
            },1500)
          } else {
            this.$vux.toast.text(data.message, 'middle')
          }
        })
      },
      getVal(){
        core.getVal({
          type: '个体工商',
        }).then(data => {
          if (data.code && '00' == data.code) {
            this.selectA= data.result.map((item,index,arr) =>{
              return {
                "label": item.type + ' ' + item.name + ' 可提现额度 ' + item.ableWithdrawMoney,
                "value": item.id,
                "frozen": item.frozen,
              }
            })
            this.selectA.unshift({
              "value": '-1',
              "label": '请选择上传个体工商账号',
            })

          } else {
            this.$vux.toast.text(data.message, 'middle')
          }
        })
      }
    }
  }
</script>

<style lang="less">

.addAccount{
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
  .line{
    display: inline-block;
    width: 0.188rem;
    height: 1.063rem;
    background-color: #fd9124;
    border-radius: 0.094rem;
    vertical-align: middle;
  }
  .select-box{
    width: 100%;
    height: 2.75rem;
    border-radius: 0.25rem;
    border: solid 0.063rem #bebebe;
    background-color: #FFF;
    margin-top: 1rem;
    text-indent: 0.563rem;
    -webkit-appearance: none;/*兼容苹果手机*/
    font-size: 0.875rem;
  }
  .applyOpen{
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
 .modal-body-new select option[disabled]{
    background-color: red;
  }
}
</style>
<style>
  @import '//at.alicdn.com/t/font_880620_o9wvfrse7rl.css'
</style>
