<template>
  <div class="huaBeiDetail">
  	<div class="header">
      <x-header :left-options="{showBack: true}">花呗分期</x-header>
    </div>
    <div style="width: 88%;margin: 18px auto 24px;background-color: #f98b2a;padding: 20px 13px;">
    	<div class="list">分期信息：{{HBInfo.timer}}期  x 每期{{HBInfo.perMoney}}</div>
    	<div class="list">顾客需补差价：￥{{HBInfo.chajia}}</div>
    	<div class="list">花呗支付金额：￥{{HBInfo.huaBeiPay}}</div>
    	<div class="list">顾客支付总金额：￥{{HBInfo.payMoney}}</div>
    	<div class="list">商家花呗到账金额：￥{{HBInfo.totalAmout}}</div>
    </div>
    <div>
			<group>
	      <x-input title="顾客姓名|" v-model.trim="userInfo.name"  placeholder="请输入顾客姓名"></x-input>
	      <x-input title="手机号码|" v-model.trim="userInfo.mobile"   placeholder="请输入顾客手机号码"></x-input>
	      <x-input title="手机品牌|" v-model.trim="userInfo.brand"   placeholder="请输入购买的产品品牌"></x-input>
	      <x-input title="手机型号|" v-model.trim="userInfo.model"  placeholder="请输入购买的产品型号"></x-input>
	      <x-input title="手机编码|" v-model.trim="userInfo.code"   placeholder="请输入购买的产品编码"></x-input>
	    </group>
    </div>
    
    <div class="resetKefu" @click="clickBtn">提交此订单并生成支付二维码</div>
    
     <!-- 弹出二维码 -->
		<div id="codeMask" v-show='isShow'>
			<div style="position: fixed;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,0.5);z-index: 99;max-width: 750px;margin: 0 auto;"></div>
			<div style="position: fixed;z-index: 100;top: 20%;left: 50%;transform: translateX(-50%);">
				<div style="background-color: #FFF;padding: 15px 15px;">	
					<div class="codePic" :style="'background:url('+codePics+') no-repeat center center;background-size: contain;'">
					</div>
					<!--<div style="text-align: center;color: #999999;font-size: 14px;width: 80%;margin: 15px auto 0;line-height: 18px;">请使用<span>{{phone}}</span>号码的手机进行扫描</div>-->
				</div>
				<div style="background:url('//c1.51jujibao.cn/static/mkt/2018/09/sto/images/close-btn.png') center center/100% auto no-repeat; width: 32px;height: 32px; margin: 20px auto 0;" @click="closeBtn"></div>
			</div>
		</div>
    
  </div>
</template>

<script>
  import {XHeader, XInput, Group,} from 'vux'
  import * as core from '@/core/cpApi'

  export default {
    name: 'huaBeiDetail',
    components: {
      XHeader,
       XInput, Group,
    },
    data() {
      return {
				HBInfo:{},
				userInfo:{
					name: '',
					mobile: '',
					brand: '',
					model: '',
					code: "",
				},
				isShow: false,
				codePics: '',
				timer: '',
      }
    },
    created() {
    	
    	this.HBInfo = {
    			timer: this.$route.query.timer,
					perMoney: this.$route.query.perMoney,
					chajia:this.$route.query.chajia,
					huaBeiPay: this.$route.query.huaBeiPay,
					payMoney: this.$route.query.payMoney,
					totalAmout: this.$route.query.totalAmout,
    	}

    },
    methods: {
    	clickBtn(){
//  		this.isShow = true;
//  		this.codePics = 'http://prev-quan.51jujibao.com/exchange/qrCodeXiami?mobile='+n+'&content='+m+'&ticket='+this.ticket+'&score='+d; 
//  		this.codePics = 'http://prev-quan.51jujibao.com/front/huabei/createOrderStaging?modelName='+this.userInfo.model+'&hbMoney='+this.HBInfo.huaBeiPay+'&brandName='+this.userInfo.brand+
//  		'&goodsID='+this.userInfo.code+'&periods='+this.HBInfo.timer+'&marketingFlag=F&capitalAmount='+this.HBInfo.totalAmout+'&telNo='+this.userInfo.mobile+'&customerName='+this.userInfo.name
				this.$vux.loading.show({ text: '正在加载' })
    		core.getPayCode({
    				modelName: this.userInfo.model,
    				hbMoney: this.HBInfo.huaBeiPay,
	    			brandName: this.userInfo.brand,
	    			goodsID: this.userInfo.code,
	    			periods: this.HBInfo.timer,
	    			marketingFlag: 'F',
	    			capitalAmount: this.HBInfo.totalAmout,
	    			telNo: this.userInfo.mobile,
	    			customerName: this.userInfo.name,
			 	}).then(data => {
			 		this.$vux.loading.hide()
	        if (data.code && '00' == data.code) {	
	         		if(data.result.code && data.result.code == 'G002'){
	         			this.isShow = true;
								this.codePics = '/front/huabei/payQrCode?payCodeUrl=' + data.result.payCodeUrl;
								
								if(data.result.huabeiOrderId){
									
									var t = 1;
									this.timer = setInterval(()=>{
			        				core.isPay({
			        						orderID: data.result.huabeiOrderId
											 	}).then(data => {
									        if (data.result.code && 'TRADE_SUCCESS' == data.result.code) {	
									        		
									        		clearInterval(this.timer)
									        		this.isShow = false
									        		this.$vux.toast.text(data.result.msg, 'middle')
									        		
									        		setTimeout(()=>{
																window.history.go(-1)
															},2000)
									        		
									        }else{
								        			while(t < 2){
								        				this.$vux.toast.text(data.result.msg, 'middle')
								        				t++;
								        			}
									        }
									      })	
			        		},5000)
								}
	         		}else{
	         				this.$vux.toast.text(data.result.msg, 'middle')
	         		}
	         	
	        }else {
	          this.$vux.toast.text(data.message, 'middle')
	        }
	      })	
    		
    	},
    	closeBtn(){
    		this.isShow = false
    		clearInterval(this.timer)
    	},

    }
  }

</script>

<style scoped>

</style>
<style lang="less">
	.huaBeiDetail{
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
    .list{
    	margin-bottom: 15px;
    	color: #f7f2d5;
    }
    .list:last-child{
    	margin-bottom: 0;
    }
    .weui-label{
    	margin-right: 10px;
    	width: unset!important;
    	font-size: 16px;
    font-weight: 700;
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
	}
	
</style>
