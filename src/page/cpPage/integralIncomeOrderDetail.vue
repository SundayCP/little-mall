<template>
  <div class="integralIncomeOrderDetail">
  	<div class="header">
      <x-header :left-options="{showBack: true}">订单详情</x-header>
    </div>
    <div >
    	<div style="background-color: #FFF;padding: 15px 0 43px;border-top: 1px solid lightgray;">
    		<div style="margin: 0 0 0 10px;font-size: 15px;color: #999999;">
	    		交易金额
	    	</div>
	    	<div style="margin: 33px 0 0;text-align: center;font-size: 55px;color: #333333;font-weight: 700;">
						+{{dataObj.orderAmount}}
	    	</div>
    	</div>
    	<div style="background-color: #FFF;    margin-top: 10px;">
    		<div style="margin: 0 11px;">
    			<div class="list-text">
    				<div>支付手机号</div>
    				<div class="list-text-right">{{dataObj.mobile}}</div>
    			</div>
    			<div class="list-text">
    				<div>订单编号</div>
    				<div class="list-text-right">{{dataObj.id}}</div>
    			</div>
    			<div class="list-text">
    				<div>交易时间</div>
    				<div class="list-text-right">{{dataObj.createTime | dateFormat}}</div>
    			</div>
    			<div class="list-text">
    				<div>支付时间</div>
    				<div class="list-text-right">{{dataObj.payTime | hasValue}}</div>
    			</div>
    				<div class="list-text">
    				<div>交易状态</div>
    				<div v-if="dataObj.isRefund == 'N'">
    					<div class="list-text-right" v-if="dataObj.status == 'SUCCESS'">交易成功</div>
    					<div class="list-text-right" v-else-if="dataObj.status == 'FAIL'">交易失败</div>
    					<div class="list-text-right" v-else-if="dataObj.status == 'WAIT'">待支付</div>
    				</div>
    				<div v-if="dataObj.isRefund == 'Y'">
    					<div class="list-text-right">退款成功</div>
    				</div>
    			</div>
    			<div class="list-text">
    				<div>类型</div>
    				<div class="list-text-right">{{dataObj.orderType}}</div>
    			</div>

          <div class="list-text">
    				<div>商品名</div>
    				<div class="list-text-right">{{dataObj.categoryName}}</div>
    			</div>
    				<div class="list-text">
    				<div>操作员</div>
    				<div class="list-text-right">{{dataObj.merchantUsername}}</div>
    			</div>
    		</div>
    	</div>

    </div>
  </div>
</template>

<script>
  import {XHeader} from 'vux'
	import * as core from '@/core/cpApi'

  export default {
    name: 'integralIncomeOrderDetail',
    components: {
      XHeader,
    },
    data() {
      return {
				dataObj:{}
      }
    },

    filters:{
		    dateFormat(value){
			    let dateStr='';
		        let date=new Date(value)
		        let year=date.getFullYear()
		        let month=(date.getMonth()+1)>9?(date.getMonth()+1):'0'+(date.getMonth()+1)
		        let day=date.getDate()>9?date.getDate():'0'+date.getDate()
		        let hour=date.getHours()>9?date.getHours():'0'+date.getHours()
		        let min=date.getMinutes()>9?date.getMinutes():'0'+date.getMinutes()
		        let sec=date.getSeconds()>9?date.getSeconds():'0'+date.getSeconds()
		        dateStr=year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec
		        return dateStr
		    },
		    hasValue(value){
		    	if(!value){
		    		return value
		    	}else{
					    let dateStr='';
			        let date=new Date(value)
			        let year=date.getFullYear()
			        let month=(date.getMonth()+1)>9?(date.getMonth()+1):'0'+(date.getMonth()+1)
			        let day=date.getDate()>9?date.getDate():'0'+date.getDate()
			        let hour=date.getHours()>9?date.getHours():'0'+date.getHours()
			        let min=date.getMinutes()>9?date.getMinutes():'0'+date.getMinutes()
			        let sec=date.getSeconds()>9?date.getSeconds():'0'+date.getSeconds()
			        dateStr=year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec
			        return dateStr
		    	}
		    }

		},

    created() {
			let id = this.$route.params.id;
			console.log(id)
    	this.getDetailData(id)
    },
    methods: {
    	getDetailData(id){
    		this.$vux.loading.show({ text: '正在加载' })
    		core.getDetailData({
			 		'orderId': id,
				}).then(data => {
				 		this.$vux.loading.hide()
			    if (data.code && '00' == data.code) {

			    		this.dataObj = data.result;

			    }else {
			      this.$vux.toast.text(data.message, 'middle')
			    }
			  })
    },
    }
  }

</script>

<style scoped>

</style>
<style lang="less">
	.integralIncomeOrderDetail{
			.vux-header{
      background-color: #FFF;
      color: #333;
    }
    .vux-header-title, .vux-header-back {
      color: #000;
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

    .list-text{
    	display: flex;
    	flex-direction: row;
    	justify-content: space-between;
    	color: #666666;
    	font-size: 12px;
    	border-bottom: 1px solid #eaeaea;
    	padding: 16px 0;
    }
     .list-text:last-child{
    	border-bottom: unset;
    }
    .list-text-right{
    	color: #999;
    }
	}
</style>
