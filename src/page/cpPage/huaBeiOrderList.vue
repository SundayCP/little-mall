<template>
  <div class="huaBeiOrderList">
  	<scroller style="width: 100%;" :bounce="true"   lock-x 
      :scroll-bottom-offset=0
      @on-scroll-bottom="getDataList">
	  	<div>
		  	<div class="header">
		      <x-header :left-options="{showBack: true}">订单列表<div slot="right"  @click="search" style="font-size: 16px;margin-right: 5px;">搜索</div></x-header>
		    </div>
		    <div style="background-color: #bfbfbf; padding: 10px;">
		    	<group>
			      <x-input placeholder="请输入手机号搜索" v-model.trim="mobile">
			      	 <icon type="search" slot="label"></icon>
			      </x-input>
			    </group>
		    </div>
		    <div style="padding: 10px;">
		    	<div style="display: flex;flex-direction: row;text-align: center;border: 2px solid rgb(249, 140, 42);border-radius: 5px;color: rgba(249, 140, 42);">
		    		<div style="width: 25%;padding: 6px 0;font-size: 14px;" :class="{active: status == ''}" @click="clickBtn('')">全部</div>
		    		<div style="width: 25%;padding: 6px 0;font-size: 14px;border-left: 1px solid rgb(249, 140, 42);border-right: 1px solid rgb(249, 140, 42);" :class="{active: status == 'SUCCESS'}" @click="clickBtn('SUCCESS')">支付成功</div>
		    		<div style="width: 25%;padding: 6px 0;font-size: 14px;border-right: 1px solid rgb(249, 140, 42);" :class="{active: status == 'FAIL'}" @click="clickBtn('FAIL')">支付失败</div>
		    		<div style="width: 25%;padding: 6px 0;font-size: 14px;" :class="{active: status == 'WAIT'}" @click="clickBtn('WAIT')">等待支付</div>
		    	</div>
		    </div>
		    <div style="padding: 0px 10px 10px;">
		    	<div class="text-contain" v-for="(item,index) in dataListArr">
		    		<div style="margin: 9px 0;"><span class="text">订单号: </span><span>{{item.huabeiOrderId}}</span></div>
						<div style="margin: 9px 0;"><span class="text">订单金额: </span><span>{{item.totalAmount}}</span></div>
						<div style="margin: 9px 0;"><span class="text">订单本金: </span><span>{{item.capitalAmount}}</span></div>
						<div style="margin: 9px 0;"> <span class="text">手机号: </span><span>{{item.telNo}}</span></div>
						<div style="margin: 9px 0 0;"><span class="text">订单日期: </span><span>{{item.createTime | dateFormat}}</span></div>
						
						<div class="payStatus">
							<div class="copy" v-clipboard:copy="item.huabeiOrderId" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</div>
							<div v-if="item.status == 'SUCCESS'">支付成功</div>
							<div v-if="item.status == 'FAIL'" style="color: #ff3e00;">支付失败</div>
							<div v-if="item.status == 'WAIT'">等待支付</div>
						</div>
					</div>
		   	</div>
		   	<load-more :tip="tips" :show-loading="loadState"></load-more>
		  </div>
	  </scroller>
  </div>
</template>

<script>
 	import {XHeader, XInput, Group,Icon,Scroller,LoadMore} from 'vux'
  import * as core from '@/core/cpApi'

  export default {
    name: 'huaBeiOrderList',
    components: {
      XHeader, XInput, Group,Icon,Scroller,LoadMore
    },
    data() {
      return {
				status: '',
				mobile: '',
				
      	tips: '正在加载',
      	pageIndex: 1,
      	pageSize: 6,
      	loadState: true,
      	isState: false,
      	
      	dataListArr:[]
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
		},

    created() {
			
			this.fetchDataList(this.mobile,this.status,this.pageIndex,this.pageSize)
    },
    methods: {
				search(){
					this.pageIndex = 1;
					this.dataListArr = [];
					this.fetchDataList(this.mobile,this.status,this.pageIndex,this.pageSize)
				},
				clickBtn(i){
					this.status = i;
					this.pageIndex = 1;
					this.dataListArr = [];
					this.fetchDataList(this.mobile,this.status,this.pageIndex,this.pageSize)
				},
				// 请求分页数据
				fetchDataList(a,b,c,d){
	    		this.loadState=true
	        core.fetchOrderPayList({
	        	'mobile': a,
	        	'status': b,
	          'pageIndex': c,
	          'pageSize': d,
	        }).then(data => {
	          if (data.code && '00' == data.code) {
	          		this.isState = false;
		            if(data.result.amount==0){
		            	this.loadState = false;
		              this.tips = '暂无数据'
		              this.isState = true;
		              return
		            }
		            // 重组数据
		            var dataArr = data.result.data
		            this.dataListArr = this.dataListArr.concat(dataArr)
		
		            if (this.pageIndex >= Math.ceil(data.result.amount / this.pageSize)) {
		              this.loadState = false;
		              this.tips = '没有更多了'
		              this.isState = true;
		              return
		            }else {
		              this.loadState = false;
		              this.tips = '上拉加载更多'
		              return
		            }
	          } else {
	            this.$vux.toast.text(data.message, 'center')
	          }
	
	        })
	    	},
				
				// 下拉刷新
	    	getDataList(){
	    		if (!this.isState) {
		    		this.loadState = true;
		    		this.tips = '正在加载';
		    		this.pageIndex++;
		    		this.pageSize = 6
		    		this.isState = true;
		    		this.fetchDataList(this.mobile,this.status,this.pageIndex,this.pageSize)
	    		}
	    	},
	    	
	    	onCopy(e){
	    		this.$vux.toast.text('复制成功', 'center')
	    	},
	    	onError(e){
	    		this.$vux.toast.text('复制失败', 'center')
	    	}
    }
  }

</script>

<style scoped>

</style>
<style lang="less">
	.huaBeiOrderList{
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
    .weui-input{
    	padding-left: 8px;
    }
    .weui-cells{
    	margin-top: 0;
    	border-radius: 16px;
    }
    .weui-cell {
    	padding: 6px 15px;
		}
		.active{
			background-color: rgb(249, 140, 42);
			color:#FFF;
		}
		.text{
			width: 20%;
			display: inline-block;
			text-align: right;
			padding-right: 10px;
			box-sizing: border-box;
			
		}
		.text-contain{
			font-size: 14px;margin-bottom: 12px;font-weight: 700;
			position: relative;
			padding: 0 0 10px;
		}
		.text-contain:after{
			content: "";
      position: absolute;
      border: 0.5px solid #e3e4e3;
      top: 100%;
      left: 2%;
      right: 0;
		}
		.payStatus{
			position: absolute;top: -5px;right: 2%;text-align: center;color: rgb(244, 138, 40);
		}
		.copy{
			padding: 5px 10px;border: 1px solid coral;border-radius: 5px;margin-bottom: 5px;font-size: 12px;
		}
		
	}
	
</style>