<template>
  <div class="Login">
  	<div class="login-bg">
  			<div style="padding: 85px 18px 150px;">
  				<div class="logo"></div>
  				<!--<div style="margin: 24px 0 38px;text-align: center;font-size: 24px;font-weight: 700;">聚乐汇收银台</div>-->
          <div style="margin: 14px 0px 48px;text-align: center;font-size: 22px;font-weight: 700;">积分兑换及支付宝拉新平台</div>
  				<group class="input-user">
			      <x-input placeholder="请输入帐号" v-model.trim="userValue" autocomplete="new-password">
			        <img slot="label" style="padding-right:23px;display:block;" :src="userPic" width="17" height="19">
			      </x-input>
			    </group>
			    <group class="input-psw">
			    	<x-input placeholder="请输入密码" v-model.trim="userPassword" type='password' autocomplete="new-password">
			        <img slot="label" style="padding-right:23px;display:block;" :src="pswPic" width="17" height="19">
			      </x-input>
			    </group>
			    <div style="padding: 0 0 0 16px;">
			    	<span class="noRemember" :class="{remember: isRemember}" @click="isRemember = !isRemember"></span>
			    	<span style="vertical-align: middle;font-size: 16px;color: #333;font-weight: 700;" @click="isRemember = !isRemember">记住密码</span>
			    </div>
			    <div class="loginBtn" @click="loginBtn">
			    	登录
			    </div>
  			</div>
  	</div>
  </div>
</template>

<script>
  import {XHeader,XInput , Group} from 'vux'
 	import * as core from '@/core/cpApi';

  export default {
    name: 'Login',
    components: {
      XHeader,XInput , Group
    },
    data() {
      return {
				userPic: require('@/../static/cpImages/user.png'),
				pswPic: require('@/../static/cpImages/psw.png'),
				userValue: '',
				userPassword: '',
				isRemember: true,
      }
    },

    created() {
				this.isHasValue();
    },
    methods: {
				loginBtn(){
					 if (!this.userValue) {
            this.$vux.toast.text(' 请输入账号 ', 'middle')
            return;
          }
          if (!this.userPassword) {
            this.$vux.toast.text(' 请输入密码 ', 'middle')
            return;
          }
          let data = {
            username: this.userValue,
            password: this.userPassword
          }
          core.loginAccount(data).then(data => {
            if (data.code && '00' == data.code) {
              this.$router.push({
                path: '/'
              })

              	// 登陆成功后 保存数据
							if(this.isRemember){
									window.localStorage.setItem('user',this.userValue)
									window.localStorage.setItem('password',this.userPassword)
							}else{
								window.localStorage.removeItem('user')
								window.localStorage.removeItem('password')
							}

            } else {
              this.$vux.toast.text(data.message, 'middle')
            }
          })



				},
				isHasValue(){
					if(!window.localStorage.getItem('user') || !window.localStorage.getItem('password')){

					}else{
						this.userValue = window.localStorage.getItem('user')
						this.userPassword = window.localStorage.getItem('password')
						console.log("1213131------------")
					}

				}
    }
  }

</script>

<style scoped>

</style>
<style lang="less">
	// body{ background-color: #d5e0e6; }
	.Login{
		.login-bg{
			background: url(http://c1.51jujibao.com/static/mkt/2018/10/juleV2/images/loginBg.jpg) no-repeat center center;
			background-size: cover;
		}
		.logo{
			width: 125px;
			height: 125px;
			/*background: url(http://c1.51jujibao.com/static/mkt/2018/10/juleV2/images/juleLogo.png) no-repeat center center;*/
			background-size: contain;
			margin: 0 auto;
		}
		input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
			color: #999;font-size:14px;
		}
		input:-moz-placeholder, textarea:-moz-placeholder {
			color:#999;font-size:14px;
		}
		input::-moz-placeholder, textarea::-moz-placeholder {
			color:#999;font-size:14px;
		}
		input:-ms-input-placeholder, textarea:-ms-input-placeholder {
			color:#999;font-size:14px;
		}
		.input-user .weui-cells{
			margin-top: unset;
			border-radius: 8px;
		}
		.input-psw .weui-cells{
			margin-top: 7px;
			margin-bottom: 20px;
			border-radius: 8px;
		}
		.noRemember{
			display: inline-block;width: 15px;height: 15px;border: solid 1px #4a90e2;border-radius: 3px;vertical-align: middle;
		}
		.remember{
			background: url(../../../static/cpImages/agree.png) no-repeat center center;background-size: contain;
		}
		.loginBtn{
			margin-top: 42px;background-color: #ff8810;border-radius: 6px;height: 46px;line-height: 46px;letter-spacing:2px;text-align: center;color: #FFF;font-size: 18px;
		}
	}

</style>
