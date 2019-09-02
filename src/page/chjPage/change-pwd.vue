<template>
  <div class="change-pwd">
    <page-header title="修改登录密码" bd-color="#333"></page-header>

    <div class="page-content">
      <div class="input-wrapper input-mobile">
        <p class="input-label">旧密码</p>
        <div class="input-container"><input type="password" v-model="input.oldPwd" placeholder="请输入旧密码"></div>
      </div>
      <div class="input-wrapper input-pwd">
        <p class="input-label">新密码</p>
        <div class="input-container"><input type="password" v-model="input.newPwd" placeholder="请输入6-16位数字密码"></div>
      </div>
      <div class="input-wrapper input-pwd-again">
        <p class="input-label">再次输入</p>
        <div class="input-container"><input type="password" v-model="input.newPwdAgain" placeholder="请再次输入密码"></div>
      </div>
      <button class="confirm-btn" @click="confirm">确认修改</button>
    </div>
  </div>
</template>

<script>
  import PageHeader from './base/page-header'
  import {Toast} from 'vux'

  import {changePwd} from '../../core/chjApi'

  const pwdReg=/^[0-9]{6,15}$/

  export default {
    name: "change-pwd",
    data() {
      return {
        input: {
          oldPwd: '',
          newPwd: '',
          newPwdAgain: ''
        }
      }
    },
    methods:{
      confirm(){
        if(!this.input.oldPwd||!this.input.newPwd||!this.input.newPwdAgain){
          this.$vux.toast.text('请输入完整的信息！','middle')
          return;
        }
        if(!pwdReg.test(this.input.newPwd)||!pwdReg.test(this.input.newPwdAgain)){
          this.$vux.toast.text('请输入正确格式的密码！','middle')
          return;
        }
        if(this.input.newPwd!==this.input.newPwdAgain){
          this.$vux.toast.text('前后输入的新密码不一致！','middle')
          return;
        }
        changePwd({
          oldPassword:this.input.oldPwd,
          newPassword:this.input.newPwd
        }).then(data=>{
          if(data.code&&data.code==='00'){
            this.$vux.toast.text('修改成功！','middle')
            this.$router.push({
              path:'/login'
            })
          }else{
            this.$vux.toast.text(data.message,'middle')
          }
        })

      }
    },
    components: {
      PageHeader,Toast
    }
  }
</script>

<style scoped lang="less">

  .input-wrapper {
    height: 3.281rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    .input-label {
      height: 100%;
      width: 20%;
      text-align: left;
      margin-left: 1rem;
      line-height: 3.281rem;
      color: #333;
      font-size: 1rem;
    }
    .input-container {
      height: 100%;
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      input {
        width: 90%;
        height: 1rem;
        line-height: 1rem;
        font-size: .938rem;
        color: #333;
        padding: 0;
        margin: 0;
        border: none;
        outline: none;
      }
      input::placeholder {
        color: #999;
        font-size: .938rem;

      }
    }
  }

  .input-mobile, .input-pwd {
    border-top: .032rem solid #ececec;
    border-bottom: .032rem solid #ececec;
    margin-top: .563rem;
  }

  .input-pwd-again {
    border-bottom: .032rem solid #ececec;
  }

  .confirm-btn {
    display: block;
    width: 93.33%;
    margin: 3.281rem auto 0;
    height: 2.75rem;
    border: none;
    outline: none;
    border-radius: .313rem;
    background-color: #ff8a00;
    color: #fff;
    font-size: 1.125rem;
  }

</style>
