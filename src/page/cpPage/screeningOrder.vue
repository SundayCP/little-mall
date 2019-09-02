<template>
  <div class="screeningOrder">
 	<scroller style="width: 100%;overflow: unset;" :bounce="true"   lock-x 
      :scroll-bottom-offset=0
      @on-scroll-bottom="getDataList">
    <div>
	  	<div class="mask" v-show="isShow" @click="cancel"></div>
	  	<div class="input-header">
	  		<div class="input-header-top">
	  			<a href="javascript:history.go(-1);"  class="trans"></a>
		  		<input type="text" name="" ref="input_search" v-model.trim="input_value" @focus="focusClick" placeholder="请输入手机号快速查询" class="input-title"/>
		  		<div style="color: #0b95ff;font-size: 12px;" @click="screen">筛选</div>
	  		</div>
	  		<div v-show="isScreen" class="input_screen">
		  		<div>
		  			<div class="listHead">日期</div>
		  			<div style="display: inline-block;color: #959595;">
		  				<span class="listItem" v-for="(item,index) in dateArr" :class="{active: selectedDate == item.value}" @click="selectDateBtn(item.value)">{{item.dateStutas}}</span>
		  			</div>
		  		</div>
		  		<div style="margin: 16px 0;">
		  			<div class="listHead" style="vertical-align: top;">类型</div>
		  			<div style="display: inline-block;color: #959595;width: 85%;">
		  				<span class="listItem" :class="{active: selectedType == ''}" @click="selectTypeBtn('')">全部</span>
		  				<span class="listItem"   v-for="(item,index) in dateArrType" :class="{active: selectedType == item.value}" @click="selectTypeBtn(item.value)">{{item.value}}</span>
		  			</div>
		  		</div>
		  		<div>
		  			<div class="listHead" style="vertical-align: top;">状态</div>
		  			<div style="display: inline-block;color: #959595;width: 85%;">
		  				<span class="listItem" style="margin-bottom: 10px;" v-for="(item,index) in statusArr" :class="{active: selectedStatus == item.value}" @click="selectStatusBtn(item.value)">{{item.status}}</span>
		  			</div>
		  		</div>
		  		<div class="confirmBtn" @click="confirmBtn">确认</div>
		  	</div>
	  	</div>
	  	
	  	<div style="padding: 42px 0 ;">
				<div class="main-con01" v-for="(item,index) in dataList">
		  			<router-link :to="'/integralIncomeOrderDetail/'+item.id">
		  				<div>
		  					 	<div style="display: flex;flex-direction: row;justify-content: space-between;"  v-if="item.isRefund == 'N'">
					  				<div style="#333333;font-size: 15px;font-weight: 700;color: #000;">{{item.orderAmount}}元</div>
					  				<div style="color: #00a714;font-size: 12px;" v-if="item.status == 'SUCCESS'">交易成功</div>
					  				<div style="color: #ec0000;font-size: 12px;" v-else-if="item.status == 'FAIL'">交易失败</div>
					  				<div style="color: #ec7500;font-size: 12px;" v-else-if="item.status == 'WAIT'">待支付</div>
					  				<div style="color: #666666;font-size: 12px;" v-else-if="item.status == 'BACK'">退款成功</div>
					  			</div>
				  				<div style="display: flex;flex-direction: row;justify-content: space-between;"  v-else-if="item.isRefund == 'Y'">
					  				<div style="#333333;font-size: 15px;font-weight: 700;color: #000;">{{item.orderAmount}}元</div>
					  				<div style="color: #666666;font-size: 12px;">退款成功</div>
					  			</div>
					  			
					  			<div class="main-con01-con02">
					  				<div>{{item.mobile}}</div>
					  				<div>{{item.createTime | dateFormat}}</div>
					  			</div>
					  			<div style="color: #999999;font-size: 11px;">{{item.merchantUsername}}</div>
		  				</div>
		  			</router-link>
		  		</div>
				<load-more :tip="tips" :show-loading="loadState"></load-more>
			</div>
		</div>
   </scroller>
  </div>
</template>

<script>
  import {XHeader,Scroller,LoadMore} from 'vux'
	import * as core from '@/core/cpApi'
  export default {
    name: 'screeningOrder',
    components: {
      XHeader,LoadMore,Scroller
    },
    data() {
      return {
      	isShow: false,
      	tips: '正在加载',
      	pageIndex: 1,
      	pageSize: 6,
      	loadState: true,
      	isState: false,
      	
      	input_value: '',
      	isScreen: false,
      	
      	selectedDate: '',
      	selectedType: '',
      	selectedStatus: '',
      	
      	dateArr:[
      		{
      			dateStutas: '全部',
      			value: '',
      		},
      		{
      			dateStutas: '近一周',
      			value: '近一周',
      		},
      		{
      			dateStutas: '近一月',
      			value: '近一月',
      		}
      	],
      	
      	dateArrType:[],
      	
      	statusArr:[
      		{
      			status: '全部',
      			value: '',
      		},
      		{
      			status: '成功',
      			value: 'SUCCESS',
      		},
      		{
      			status: '失败',
      			value: 'FAIL',
      		},
      		{
      			status: '待支付',
      			value: 'WAIT',
      		},
      		{
      			status: '退款成功',
      			value: 'REFUND',
      		},
      	],
      	
			dataList:[]
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
			this.fetchDataList(this.selectedDate,this.selectedType,this.selectedStatus,this.input_value,this.pageIndex,this.pageSize)
			this.getTabType();
    },
    methods: {
				
				focusClick(){
					this.isShow = true;
					this.isScreen = true
				},
				cancel(){
					this.isShow = false;
					this.input_value = '';
					this.isScreen = false 
				},
				screen(){
					this.isShow = !this.isShow
					this.isScreen = !this.isScreen
				},
				selectDateBtn(index){
					this.selectedDate = index;
				},
				selectTypeBtn(index){
					this.selectedType = index;
				},
				selectStatusBtn(n){
					this.selectedStatus = n;
				},
				// 获取类型 
				getTabType(){
					core.getTabType({
	    		 }).then(data => {
	            if (data.code && '00' == data.code) {
	            			for(var u in data.result){
	            				var arr = {
	            					'dateStutas': data.result[u],
      									'value': data.result[u],
	            				}
	            				this.dateArrType.push(arr)
	            			}
	            			console.log(this.dateArrType)
	            }else {
	              this.$vux.toast.text(data.message, 'middle')
	            }
	          })
				},
				// 请求分页数据
				fetchDataList(a,b,c,d,e,f){
	    		this.loadState=true
	        core.fetchOrderDataList({
	        	'date':  a, // 近一周
	        	'orderType': b,  // 类型
	        	'status': c, // 状态
	        	'mobile': d, // 筛选的手机号
	        	'isSearch': 'Y',
	          'pageIndex': e,
	          'pageSize': f,
	        }).then(data => {
							this.isShow = false;
							this.input_value = '';
							this.isScreen = false 
	          if (data.code && '00' == data.code) {
	          		this.isState = false;
		            if(data.result.amount==0){
		            	this.loadState = false;
		              this.tips = '暂无数据'
		              this.isState = true;
		              return
		            }
		            // 重组数据
		            var dataListArr = data.result.data
		            this.dataList = this.dataList.concat(dataListArr)
		
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
	    	
	    	confirmBtn(){
	    		this.pageIndex = 1;
	    		this.dataList = [];
	    		this.fetchDataList(this.selectedDate,this.selectedType,this.selectedStatus,this.input_value,this.pageIndex,this.pageSize)
	    	},
	    	// 下拉刷新
	    	getDataList(){
	    		if (!this.isState) {
		    		this.loadState = true;
		    		this.tips = '正在加载';
		    		this.pageIndex++;
		    		this.pageSize = 6
		    		this.isState = true;
		    		this.fetchDataList(this.selectedDate,this.selectedType,this.selectedStatus,this.input_value,this.pageIndex,this.pageSize)
	    		}
	    	},
				
				
    }
  }

</script>

<style lang="less">
	.screeningOrder{
		.mask{
			position: fixed;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,0.5);z-index: 99;max-width: 750px;margin: 0 auto;
		}
		.trans{
    	width: 10px;height: 10px;
    	border: 2px solid #666;
    	border-top: unset;
    	border-right: unset;
    	display: inline-block;
    	transform:rotate(45deg);
			-ms-transform:rotate(45deg); 	/* IE 9 */
			-moz-transform:rotate(45deg); 	/* Firefox */
			-webkit-transform:rotate(45deg); /* Safari 和 Chrome */
			-o-transform:rotate(45deg); 	/* Opera */
    }
    .input-header{
    	position: fixed;top: 0;left: 0;right: 0;z-index: 100;
    	background-color: #FFF;
    }
    .input-header-top{
    	display: flex;flex-direction: row;padding: 6px 10px;align-items: center;justify-content: space-between;
    }
    .input-title{
    	height: 30px;line-height: 30px;background-color: rgba(226, 226, 226, 0.5);width: 82%;border-radius: 5px;
    	text-indent: 10px;outline: none;font-size:12px;
    }
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
			color: #c8c8c8;font-size:12px;text-align: center;
		}
		input:-moz-placeholder, textarea:-moz-placeholder {
			color:#c8c8c8;font-size:12px;text-align: center;
		}
		input::-moz-placeholder, textarea::-moz-placeholder {
			color:#c8c8c8;font-size:12px;text-align: center;
		}
		input:-ms-input-placeholder, textarea:-ms-input-placeholder {
			color:#c8c8c8;font-size:12px;text-align: center;
		}
		.main-con01{
    	padding: 15px 10px 20px;background-color: #FFF;border-top: 1px solid  #f4f4f4;border-bottom: 1px solid  #f4f4f4;
    	cursor: pointer;
    }
    .main-con01-con02{
    	display: flex;flex-direction: row;justify-content: space-between;margin: 13px 0;color: #999999;font-size: 12px;
    }
    .input_screen{
    	padding: 11px 16px 27px;
    }
    .confirmBtn{
    	color: #FFF;background-color: #fd9124;width: 175px;height: 30px;line-height: 30px;text-align: center;margin:  0 auto;border-radius: 5px;
    	margin-top: 28px;
    }
    .listHead{
    	display: inline-block;color: #959595;width: 12%;font-size: 12px;
    }
    .listItem{
    	padding:10px 13px;display: inline-block;background-color: #f0f0f0;border-radius: 5px;font-size: 12px;
    	margin: 0 5px 0;margin-bottom: 10px;
    }
    .listItem.active{
    	background-color: #fd9124;
    	color: #FFF;
    }
	}
</style>
