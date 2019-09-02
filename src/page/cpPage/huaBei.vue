<template>
  <div class="HuaBei">
  	<div class="header">
      <x-header :left-options="{showBack: true}">花呗分期<div	 slot="right"  @click="orderBtn" style=" font-size: 16px; color: #000; font-weight: 700; margin-right: 5px;">订单</div></x-header>
    </div>
    <div>
    	<group>
	      <x-input title="￥"  v-model.trim="buyMoney" placeholder="购买产品价格"> </x-input>
	      <x-input title="￥" v-model.trim="canUseHuabei"  placeholder="花呗可用额度">
	      	 <x-button slot="right" type="warn" mini @click.native="calculate">计算</x-button>
	      </x-input>
	    </group>
    </div>
    <div style="padding: 25px 0; background-color: #FFF; margin: 10px 12px;">
	    	<div class="list" v-for="(item,index) in Radio" @click="select(item,index)">
	    		<span class="circle">
	    			<span :class="{circleIn: selectIndex == index}"></span>
	    		</span>
	    		<div style="vertical-align: middle; display: inline-block;  font-size: 16px; font-weight: 700;">{{item}}</div><span style="display: none;" :class="{show: selectIndex == index && flag}"> * {{perMoney}}元</span>
	    	</div>
	    	<div  class="payMethods">
	    		<div style="color: #ff9024;width: 50%;">
	    			<div style="margin-bottom: 15px;">顾客需补差价</div>
	    			<div>￥{{supplyMoney}}</div>
	    		</div>
	    		<div class="huaBei">
	    			<div style="margin-bottom: 15px;">花呗支付金额</div>
	    			<div>￥{{huaBeiPay}}</div>
	    		</div>
	    	</div>
	    	<div style="text-align: center;padding: 15px 0 0;font-weight: 700;">
						<div style="margin-bottom: 15px;">顾客支付总金额</div>
						<div>￥{{payMoney}}</div>
	    	</div>
    </div>
    <div class="resetKefu" @click="nextBtn">下一步</div>
  
  	 <!-- 弹出二维码 -->
		<div id="codeMask" v-show='isShow'>
			<div style="position: fixed;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,0.5);z-index: 99;max-width: 750px;margin: 0 auto;"></div>
			<div style="position: fixed;z-index: 100;top: 20%;left: 50%;transform: translateX(-50%);">
				<div style="background-color: #FFF;padding: 15px 15px;">	
					<div class="codePic" :style="'background:url('+codePics+') no-repeat center center;background-size: contain;'">
					</div>
				</div>
				<div style="background:url('//c1.51jujibao.cn/static/mkt/2018/09/sto/images/close-btn.png') center center/100% auto no-repeat; width: 32px;height: 32px; margin: 20px auto 0;" @click="closeBtn"></div>
			</div>
		</div>
  
  </div>
</template>

<script>
  import {XHeader, XInput, Group,XButton,Radio} from 'vux'
	import * as core from '@/core/cpApi'
	
	
  export default {
    name: 'HuaBei',
    components: {
      XHeader,
       XInput, Group,XButton,
       Radio
    },
    data() {
      return {
				Radio: [ '3期', '6期','12期','24期' ],
				buyMoney: '',
				canUseHuabei: '',
				selectIndex: '10',
				supplyMoney: '-',
				huaBeiPay: '-',
				payMoney: '-',
				periods: '',
				isShow: false,
				codePics: '',
				timer: '',
				perMoney: '',
				poundageAmount: '',
				flag: false,
      }
    },

    created() {
				
				this.isShouQuan();
				
    },
    
    methods: {
				orderBtn(){
					this.$router.push({path: "/huaBeiOrderList"})
				},
				select (m,s) {
					this.periods = parseInt(m);
		      this.selectIndex = s;
		      this.calculate();
		    },
		    nextBtn(){
		    	this.$router.push({path:'/huaBeiOrderDetail',query: {
						timer: this.periods,
						perMoney: this.perMoney,
						chajia: this.supplyMoney,
						huaBeiPay: this.huaBeiPay,
						payMoney: this.payMoney,
						totalAmout: (this.huaBeiPay - this.poundageAmount)+'',				
					}}) 
		    	
		    },
		    
		    calculate(){
		    	if(!this.buyMoney){
		    		 this.$vux.toast.text('请输入产品价格', 'middle')
		    		 return
		    	}
		    	if(!this.canUseHuabei){
		    		 this.$vux.toast.text('请输入花呗可用额度', 'middle')
		    		 return
		    	}
		    	if(!this.periods){
		    		 this.$vux.toast.text('请选择期数', 'middle')
		    		 return
		    	}
		    	this.flag = false;
		    	this.$vux.loading.show({ text: '正在加载' })
					core.calculate({
						periods: this.periods,
						capitalAmount: this.buyMoney,
						hbMoney: this.canUseHuabei,
						marketingFlag: 'F',
				 	}).then(data => {
				 		this.$vux.loading.hide()
		        if (data.code && '00' == data.code) {	
		        		if(data.result.code == "G001"){
		        			this.flag = true;
		        			this.supplyMoney =  data.result.spreadAmount,// 补差价
		        			this.huaBeiPay =  data.result.orderAmount, // 花呗支付
		        			this.payMoney =  data.result.totalAmount // 顾客支付
		        			this.poundageAmount = data.result.poundageAmount
		        			
		        			this.perMoney = data.result.repayPerMonth // 分期钱数
		        			
		        		}else{
		        			this.$vux.toast.text(data.result.msg, 'middle')
		        			
		        			this.supplyMoney =  '',// 补差价
		        			this.huaBeiPay = '', // 花呗支付
		        			this.payMoney =  '' // 顾客支付
		        			this.poundageAmount = ''
		        			this.perMoney = '' // 分期钱数
		        			this.flag = false;
		        		}
		         	
		        }else {
		          this.$vux.toast.text(data.message, 'middle')
		        }
		      })	  	
		    	
		    },
		    isShouQuan(){
		    	core.isShouQuan({
				 	}).then(data => {
		        if (data.code && '00' == data.code) {	
		        	if(data.result.code == 'H000'){
		        		this.shouQuanCode();
		        		
		        		var t = 1;
		        		this.timer = setInterval(()=>{
		        				core.isShouQuan({
										 	}).then(data => {
								        if (data.code && '00' == data.code) {	
								        	if(data.result.code == 'H000'){
								        			console.log('2222---')
								        	}else if(data.result.code == 'H001' || data.result.code == 'F007'){
								        			clearInterval(this.timer)
								        			this.isShow = false
								        	}else{
								        			while(t < 2){
								        				this.$vux.toast.text(data.result.msg, 'middle')
								        				t++;
								        			}
								        	}
								        }
								      })	
		        		},5000)
		        		
		        	}else if(data.result.code == 'H001' || data.result.code == 'F007'){
		        		
		        		// 审核成功
		        		this.isShow = false
		        		
		        	}else{
		        		this.$vux.toast.text(data.result.msg, 'middle')
		        		setTimeout(()=>{
									window.history.go(-1)
								},2000)
		        	}
		         	
		        }else {
		          this.$vux.toast.text(data.message, 'middle')
		          setTimeout(()=>{
								window.history.go(-1)
							},2000)
		        }
		      })	
		    },
		    closeBtn(){
	    		this.isShow = false
	    		clearInterval(this.timer)
	    		window.history.go(-1)
	    	},
		    shouQuanCode(){
		    	core.shouQuanCode({
					 	}).then(data => {
			        if (data.code && '00' == data.code) {	
			         	
			         		this.isShow = true;
    							this.codePics = data.result;
			         	
			        }else {
			          this.$vux.toast.text(data.message, 'middle')
			        }
			      })	
		    }
    }
  }

</script>

<style scoped>

</style>
<style lang="less">
	body {
    background-color: #f7f7f7;
    max-width: 750px;
    margin: 0 auto;
	}
	.HuaBei{
		.vux-header {
      background-color: #fff;
      color: #333;
    }
    .vux-header-title, .vux-header-back {
      color: #333;
    }
    .vux-header .vux-header-title {
      font-size: 18px;
	    color: #000;
	    font-weight: 700;
    }
    .vux-header-back {
      display: none;
    }
    .vux-header .vux-header-left .left-arrow:before {
      content: "";
      position: absolute;
      width: 12px;
      height: 12px;
      border: 2px solid #000;
      border-width: 1px 0 0 1px;
      -webkit-transform: rotate(315deg);
      transform: rotate(315deg);
      top: 8px;
      left: 7px;
    }
    .vux-header .vux-header-right{
    	 line-height: unset; 
    	 font-size: unset; 
    	  right: 10px;
    	  color: #999999;
    }
    .weui-label{
    	color: rgb(248, 141, 42);
    }
    .weui-cells{
    	margin-top: 10px;
    }
    .list{
    	margin-bottom: 20px;
    }
    .circle{
    	display: inline-block;width: 16px;height: 16px;border: 1px solid #e3c7a0;border-radius: 50%;margin: 0 6px 0 13px;vertical-align: middle;position: relative;
    }
    .circleIn{
    	display: inline-block;width: 10px;height: 10px;border: 1px solid #e3c7a0;border-radius: 50%;background-color: red;position: absolute;top: 50%;left: 50%;
    	transform: translate(-50%,-50%);
    }
    .payMethods{
    	display: flex;
    	flex-direction: row;
    	justify-content: space-around;
    	text-align: center;
    	padding: 15px 0;
    	position: relative;
    	font-weight: 700;
    }
    .payMethods:before{
    	content: "";
      position: absolute;
      border: 1px solid #ececec;
      border-width:1px 0 0 0 ;
      top: 0;
      left: 5%;
      right: 5%;
    }
    .payMethods:after{
    	content: "";
      position: absolute;
      border: 1px solid #ececec;
      border-width:1px 0 0 0;
      top: 100%;
      left: 5%;
      right: 5%;
    }
    .huaBei{
    	position: relative;
    	width: 50%;
    	
    }
    .huaBei:before{
    	content: "";
      position: absolute;
      top: 5%;
	    bottom: 5%;
	    left: 0;
	    right: 0;
	    width: 1px;
	    background-color:  #ececec;
    }
     .resetKefu{
    	text-align: center;
	    border: 1px solid #c2e0ff;
	    border-radius: 5px;
	    padding: 12px 0;
	    border: 1px solid gainsboro;
	    font-size: 0.9rem;
	    background-color: #ff8810;
	    color: #FFF;
	    width: 96%;
    	margin: 0 auto;
      margin-top: 6rem;
    }
    .codePic{
			width: 260px;
			height: 260px;
		}
		.show{
			display: inline-block!important;
			margin-left: 6px;
			font-weight: 700;
		}
	}
	
</style>