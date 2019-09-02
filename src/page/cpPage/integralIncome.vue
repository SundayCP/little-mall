<template>
  <div class="integralIncome">
  	<div class="header">
      <x-header :left-options="{showBack: false}">我的收入<div	 slot="right" class='iconfont  icon-shaixuan' @click="condition" style="font-size: 20px;"></div></x-header>
    </div>
    
    <div>
    	<div class="main-top">
    		<p style="font-size: 12px;">今日收款金额(元)</p>
	    	<p style="font-size: 45px;margin: 20px 0 40px;">
			      <spinner type="ios-small" size="40px" v-show="isLoading"></spinner>
			      {{todayData}}
	    	</p>
	    	<div style="display: flex;flex-direction: row;">
	    		<div style="width: 50%;">
	    			<p style="margin-bottom: 8px;font-size: 12px;">昨日收款</p>
	    			<p style="font-weight: 700;font-size: 16px;">
	    				 <spinner type="ios-small" size="20px" v-show="isLoading"></spinner>
	    				 {{yesData}}
	    			</p>
	    		</div>
	    		<div class="vertical-line01">
	    			<p style="margin-bottom: 8px;font-size: 12px;">本月收款</p>
	    			<p style="font-weight: 700;font-size: 16px;">
	    				 <spinner type="ios-small" size="20px" v-show="isLoading"></spinner>
	    				{{monthData}}
	    			</p>
	    		</div>
	    	</div>	
    	</div>
    	
    	<div style="display: flex;flex-direction: row;background-color: #FFF;" v-show="isHasData">
    		<div class="sectin-out">
    			<div style="width: 40%;text-align: center;">
    				<div :style="'background: url('+yesStarPic+') no-repeat center center;background-size: contain;'" class="icon-bg"></div>
    				<p class="sectin-left-text">昨日之星</p>
    			</div>
    			<div class="section-right">
    				<p style="margin: 3px 0 0;">
    					{{yesterdayStar.merchantName}}
    				</p>
    				<p style="margin: 12px 0;">￥<span style="font-size: 16px;font-weight: 700;">
    					 {{yesterdayStar.orderAmount}}
    				</span></p>
    				<p>
    					 {{yesterdayStar.orderCount}}笔
    				</p>
    			</div>
    		</div>
    		<div  class="vertical-line02 sectin-out">
    			<div style="width: 40%;text-align: center;">
    				<div :style="'background: url('+monthStarPic+') no-repeat center center;background-size: contain;'" class="icon-bg"></div>
    				<p class="sectin-left-text">当月之星</p>
    			</div>
    			<div class="section-right">
    				<p style="margin: 3px 0 0;">
    					{{monthStar.merchantName}}
    				</p>
    				<p style="margin: 12px 0;">￥<span style="font-size: 16px;font-weight: 700;">
    					 {{monthStar.orderAmount}}
    				</span></p>
    				<p>
    					{{monthStar.orderCount}}笔
    				</p>
    			</div>
    		</div>
    	</div>
    	<div style="padding: 0 0 30px;">
    		<p class="sectin-middle">近三日数据</p>
    		<div class="sectin-middle-one">
    				<input type="text" name="" v-model.trim="merchantName" placeholder="请输入商户名进行查询" @blur="clickBlur" class="sectin-middle-two"/>
    				<div class="sectin-middle-three" @click="checkSearch">查询</div>
    		</div>
    		<div>
    				<div v-for="(item,index) in dataList">
	    				<p v-if="item.day == ''"></p>
	    				<p style="padding: 10px 0 10px 10px;font-size: 12px;color: #999999;" v-else>{{item.day}}</p>
	    				<div class="contain-list">
	    					<router-link :to="'/integralIncomeDetail/'+item.merchantPidPath+'?date=近一天&beginTime='+item.dayCopy+'&status=SUCCESS'">
	    							<div style="display:flex;justify-content:space-between;font-size: 0.9375rem;">
			    						<div style="color: #000;">{{item.merchantName}}</div>
				    					<div style="font-size: 12px;color: #fd9124;">￥<span style="font-size: 0.9375rem;font-weight: 700;">{{item.orderAmount}}</span> 
				    						<span class="trans"></span> 
				    					</div>	
			    					</div>
			    					<div style="display:flex;justify-content:space-between;font-size: 12px;color: #999;margin-top: 15px;">
			    						<div>商户: {{item.merchantCount}}个  
			    							<span> / 操作员：{{item.operatorCount}}个</span>
			    						</div>
			    						<div style="margin-right: 12px;">订单：{{item.orderCount}}笔</div>
			    					</div>
	    					</router-link>
	    				</div>
	    			</div>
    			<load-more :tip="tips" :show-loading="loadState"></load-more>
    		</div>
    	</div>
    </div>
  </div>
</template>

<script>
  import {XHeader, Scroller,Group,XInput,LoadMore, Spinner, Cell } from 'vux'
import * as core from '@/core/cpApi'

  export default {
    name: 'integralIncome',
    components: {
      XHeader,
      Scroller,
      Group,XInput,
      LoadMore ,
       Spinner, Cell
      
    },
    data() {
      return {
      	
      	tips: '正在加载',
      	loadState: true,
      	pageIndex: 0,
      	pageSize: 6,
      	
      	isLoading: true,
      	todayData: '',
      	yesData: '',
      	isHasData: false,
      	
      	monthData: '',
        dataList:[],
        dataArr: [],
        merchantName: '',
        yesStarPic: require('../../../static/cpImages/yestedayStar.png'),
        monthStarPic: require('../../../static/cpImages/nowStar.png'),
        
        monthStar:{
        	'merchantName': '',
					'orderAmount':  '',
					'orderCount': '',
        },
        yesterdayStar: {
        	'merchantName': '',
    			'orderAmount': '',
    			'orderCount': '',
        },
      }
    },

    created() {
    	this.getData()
    	this.fetchDataList();
    },
    methods: {
    	fetchDataList(){
    		this.loadState=true
        core.fetchDataList({
        }).then(data => {
          if (data.code && '00' == data.code) {
	            if(data.result.length==0){
	            	this.loadState = false;
	              this.tips = '暂无数据'
	              return
	            }else{
	            	this.loadState = false;
	              this.tips = '加载完成'
	              
		            	// 重组数据
			            var datas = data.result;
			            
			            for(var y=0;y<datas.length-1;y++){
			            	for(var m=0;m<datas.length-1;m++){
			            		if(y <= m){
			            			if(datas[y].day == datas[m+1].day){
					            		datas[m+1].day = '';
					            	}	
			            		}
			            	}
			            }
			            this.dataList = datas
		            	this.dataArr =  datas
	            }
	            
          } else {
            this.$vux.toast.text(data.message, 'center')
          }

        })
    	},
    	getData(){
    		this.isLoading = true;
    		core.getMyData({
	    		 }).then(data => {
	    		 		this.isLoading = false;
	            if (data.code && '00' == data.code) {
	            	this.todayData = data.result.todaySum
				      	this.yesData = data.result.yesterdaySum
				      	this.monthData = data.result.monthSum
	            }else {
	              this.$vux.toast.text(data.message, 'middle')
	            }
	          })
	    		 
	    	core.getMyDataMoney({
	    		 }).then(data => {
	            if (data.code && '00' == data.code) {
	            	if(data.result){
	            		if(!data.result.monthStar){
	            			
	            		}else{
	            			this.monthStar = {
		            			'merchantName': data.result.monthStar.merchantName ? data.result.monthStar.merchantName : '',
		            			'orderAmount':  data.result.monthStar.orderAmount ? data.result.monthStar.orderAmount : '',
		            			'orderCount': data.result.monthStar.orderCount ? data.result.monthStar.orderCount : '',
		            		};
	            		}
	            		if(!data.result.yesterdayStar){
	            			
	            		}else{
	            			this.yesterdayStar = {
		            			'merchantName': data.result.yesterdayStar.merchantName  ? data.result.yesterdayStar.merchantName : '',
		            			'orderAmount':  data.result.yesterdayStar.orderAmount  ? data.result.yesterdayStar.orderAmount : '',
		            			'orderCount': data.result.yesterdayStar.orderCount  ? data.result.yesterdayStar.orderCount : '',
		            		}
	            		}
	            		
	            		if(!data.result.monthStar || !data.result.yesterdayStar){
	            				this.isHasData = false;
            			}else{
            				this.isHasData = true;
            			}
	            	}
	            		
	            }else {
	              this.$vux.toast.text(data.message, 'middle')
	            }
	        })
    	},
    	
    	// 查询
    	checkSearch(){
    		if(!this.merchantName){
    			this.$vux.toast.text('请输入商户名查询', 'middle')
    		}else{
    			this.$vux.loading.show({ text: '正在加载' })
	    		this.loadState=true
	        core.fetchDataList({
	        	}).then(data => {
	        		this.$vux.loading.hide()
	         		if (data.code && '00' == data.code) {
		            if(data.result.length==0){
		            	this.loadState = false;
		              this.tips = '暂无数据'
		              return
		            }else{
		            	this.loadState = false;
		              this.tips = '加载完成'
		              
		              var dataArr = data.result;
		              
		              var name = this.merchantName;
				    			var arr = [];
				    			for(var i=0;i<dataArr.length;i++){
				    				if(name == dataArr[i].merchantName){
				    					arr.push(dataArr[i])
				    				}
				    			}
				    			
					        for(var y=0;y<arr.length-1;y++){
					        	for(var m=0;m<arr.length-1;m++){
					        		if(y <= m){
					        			if(arr[y].day == arr[m+1].day){
						            		arr[m+1].day = '';
						            	}	
					        		}
					        	}
					        }
					        this.dataList = arr
		            }
		          }
	
	        })
    		}
    	},
    	clickBlur(){
    		if(!this.merchantName){
    			this.dataList = this.dataArr
    		}
    	},
    	
    	condition(){
    		console.log("12343")
    		this.$router.push({ path: '/ScreeningOrder' })
    	}
    	
    }
  }

</script>
<style lang="less" scoped>
  @import "//at.alicdn.com/t/font_880620_6daa1e99y26.css";
  
</style>

<style lang="less">
  .integralIncome {
    .vux-header {
      background-color: #fff;
      color: #333;
    }
    .vux-header-title, .vux-header-back {
      color: #333;
    }
    .vux-header .vux-header-title {
      color: #333;
    }
    .vux-header-back {
      display: none;
    }
    .vux-header .vux-header-left .left-arrow:before {
      content: "";
      position: absolute;
      width: 12px;
      height: 12px;
      border: 1px solid #FFF;
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
    svg[type='ios-search']{
    	width: 25px;
    }
    
    .main-top{
    	background-color: #fd9124;padding: 20px 0 28px;text-align: center;color: #ffffff;
    }
    .vertical-line01{
    	position: relative;
    	width: 50%;text-align: center;
    }
    .vertical-line01:before{
    	content: '';
    	width: 1px;
    	background-color: #ffd4a8;
    	position: absolute;
    	top: 0;
    	left: 0;
    	right: 0;
    	bottom: 0;
    }
     .vertical-line02{
    	position: relative;
    }
    .vertical-line02:before{
    	content: '';
    	width: 1px;
    	background-color: #f0f1f2;
    	position: absolute;
    	top: 0;
    	left: 0;
    	right: 0;
    	bottom: 0;
    }
    
    .icon-bg{
    	width: 45px;height: 45px;margin: 0 auto;
    }
    
    .sectin-out{
    	width: 50%;display: flex;flex-direction: row;padding: 16px 0 13px;
    }
    .section-right{
    	width: 60%;text-align: left;font-size: 12px;padding-left: 5px;box-sizing: border-box;
    }
    .sectin-left-text{
    	color: #333333;font-size: 12px;margin: 10px 0 0;
    }
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
			color: #dddddd;font-size:12px;
		}
		input:-moz-placeholder, textarea:-moz-placeholder {
			color:#dddddd;font-size:12px;
		}
		input::-moz-placeholder, textarea::-moz-placeholder {
			color:#dddddd;font-size:12px;
		}
		input:-ms-input-placeholder, textarea:-ms-input-placeholder {
			color:#dddddd;font-size:12px;
		}
    .sectin-middle{
    	font-size: 16px;color: #333333;font-weight: 700;padding: 14px 0 14px 10px;
    }
    .sectin-middle-one{
    	padding: 15px 10px;background-color: #FFF;display: flex;flex-direction: row;justify-content: space-between;
    }
    .sectin-middle-two{
    	outline: none;width: 80%;font-size: 12px;text-indent: 10px; border-radius: 5px; border: solid 1px #ebebeb; background-color: #f4f4f4;
    }
    .sectin-middle-three{
    	width: 15%;font-size: 12px;color: #ffffff;background-color: #fd9124;border-radius: 5px;padding: 10px;text-align: center;box-sizing: border-box;
    }
    .trans{
    	width: 8px;height: 8px;
    	border: 1px solid #dddddd;
    	border-bottom: unset;
    	border-left: unset;
    	display: inline-block;
    	transform:rotate(45deg);
			-ms-transform:rotate(45deg); 	/* IE 9 */
			-moz-transform:rotate(45deg); 	/* Firefox */
			-webkit-transform:rotate(45deg); /* Safari 和 Chrome */
			-o-transform:rotate(45deg); 	/* Opera */
    }
    
    .contain-list{
    	padding: 20px 5px 20px 10px;background-color: #FFF;position: relative;
    	cursor: pointer;
    }
    .contain-list:after{
    	content: '';
    	width: 96%;
    	/*height: 2px;*/
    	background-color: #f0f1f2;
    	position: absolute;
    	top: 99%;
    	left: 10px;
    	right: 0;
    	bottom: 0;
    }
    
  }
</style>
