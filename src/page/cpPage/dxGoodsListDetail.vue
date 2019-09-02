<template>
  <div class="dxGoodsList">
		<div class="header">
      <x-header :left-options="{showBack: true}">{{title}}</x-header>
    </div>
    <div class="tab">
    	<div class="tab-nav-i" :class="{active: tab == 'tab02'}" @click="tab = 'tab02'">短信兑换</div>
    	<div class="tab-nav-i" :class="{active: tab == 'tab03'}" @click="tab = 'tab03'">核销</div>
    </div>
    <div class="main" v-show="tab == 'tab02'">
    	<div style=" padding: 20px 0 30px; width: 96%; margin: 0 auto;">
				<grid :cols="2" :show-lr-borders="false">
			      <grid-item v-for="(item,index) in dataArr" :key="index">
			        <span class="grid-center">
			        		<p class="main-text">{{item.score}}积分兑换</p>
			        		<p class="main-text02"><span style="font-size: 26px;font-weight: 700;">{{item.orderAmount}} </span>面值</p>
                  <!-- <router-link :to="item.jumpUrl"> -->
					        		<div class="main-code" style="margin: 0 auto 14px;" @click="jumpUrl(item.jumpUrl)">
			        				         点我跳转
					        		</div>
                      <div class="main-code" @click="openCode(item.score)" v-show="isShow">
                        扫码
					        		</div>
			        </span>
			      </grid-item>
			    </grid>
    	</div>
    </div>
    <div v-show="tab == 'tab03'">
    	<div style="padding: 1.25rem 0.881rem 2.5rem;background-color: #FFF;">
    		<div v-show="isShow" style="margin-bottom: 10px;">
    			<div style="margin: 0rem 0 1rem 0.5rem;font-size: 1rem;color: #212121;font-weight: 700;">请选择核销面额</div>
	    		<div style="display: flex;flex-wrap: wrap;justify-content: space-between;width: 90%;    margin: 0 auto;">
	    			<div class="money-con" :class="{active: moneyValue == '5'}" @click="moneyValue = '5'">
	    				<p style="font-size: 12px;margin-left: -10px;">￥<span class="money-value">5</span></p>
	    				<p style="font-size: 12px;margin-top: 6px;">沃尔玛折扣服务券</p>
	    			</div>

            <div class="money-con"  :class="{active: moneyValue == '10'}" @click="moneyValue = '10'">
	    				<p style="font-size: 12px;margin-left: -10px;">￥<span class="money-value">10</span></p>
	    				<p style="font-size: 12px;margin-top: 6px;">沃尔玛折扣服务券</p>
	    			</div>

            <div class="money-con"  :class="{active: moneyValue == '20'}" @click="moneyValue = '20'">
	    				<p style="font-size: 12px;margin-left: -10px;">￥<span class="money-value">20</span></p>
	    				<p style="font-size: 12px;margin-top: 6px;">沃尔玛折扣服务券</p>
	    			</div>

            <div class="money-con"  :class="{active: moneyValue == '50'}" @click="moneyValue = '50'">
	    				<p style="font-size: 12px;margin-left: -10px;">￥<span class="money-value">50</span></p>
	    				<p style="font-size: 12px;margin-top: 6px;">沃尔玛折扣服务券</p>
	    			</div>

            <div class="money-con"  :class="{active: moneyValue == '100'}" @click="moneyValue = '100'">
              <p style="font-size: 12px;margin-left: -10px;">￥<span class="money-value">100</span></p>
              <p style="font-size: 12px;margin-top: 6px;">沃尔玛折扣服务券</p>
            </div>

	    		</div>
    		</div>

    		 <div style="margin: 0rem 0 1rem 0.5rem;font-size: 1rem;color: #212121;font-weight: 700;">卡密</div>
            <textarea name="" rows="" ref="textArea" cols="" placeholder="粘贴短信或者卡密（可复制多条）"
            style="font-size: 0.875rem;line-height: 1.313rem;width: 100%;height: 6.25rem;border-radius: 0.313rem;border:1px solid #e0e0e0;"></textarea>
          <div class="resetKefu" style="margin-top: 20px;" @click="hexiaoBtn">核销</div>
    	</div>
    </div>

    <!-- 弹出二维码 -->
    <div id="codeMask" v-show='isShowCode'>
      <div style="position: fixed;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,0.5);z-index: 99;max-width: 750px;margin: 0 auto;"></div>
      <div style="position: fixed;z-index: 100;top: 20%;left: 50%;transform: translateX(-50%);">
        <div style="background-color: #FFF;padding: 15px 15px;">
          <div class="codePic" :style="'background:url('+codePics+') no-repeat center center;'">
          </div>
        </div>
        <div style="background:url('//c1.51jujibao.cn/static/mkt/2018/09/sto/images/close-btn.png') center center/100% auto no-repeat; width: 32px;height: 32px; margin: 20px auto 0;" @click="closeBtn"></div>
      </div>
    </div>

  </div>
</template>

<script>
  import {XHeader, Scroller,Group ,Cell,Grid, GridItem} from 'vux'
  import * as core from '@/core/cpApi'

  export default {
    name: 'dxGoodsList',
    components: {
      XHeader,
      Scroller,
      Group,
      Cell,
      Grid, GridItem
    },
    data() {
      return {
	     title: '',
	     tab: 'tab02',
        codePics: '',
	     dataArr: [],
	     mobileSearch: '',
	     isShow: false,
        isShowCode: false,
       moneyValue: '5',
      }
    },

    created() {
			let title = this.$route.query.name;
			this.title = title;
			if(this.title == '电信麦德龙'){
				this.isShow = false;
			}else if(this.title == '电信沃尔玛'){
				this.isShow = true;
			}
			this.fetchDataList(title);
    },


    methods: {
    	fetchDataList(m){
    		this.$vux.loading.show({ text: '正在加载' })
			  core.fetchList({
			 		"category": m,
			 	}).then(data => {
			 		this.$vux.loading.hide()
	        if (data.code && '00' == data.code) {

	         	this.dataArr = data.result;

	        }else {
	          this.$vux.toast.text(data.message, 'middle')
	        }
	      })
    	},
    	// 核销 -- 核销
    	hexiaoBtn(){
    		if(!this.$refs.textArea.value){
    			this.$vux.toast.text('没有卡密', 'middle')
    		}else{
    			this.$vux.loading.show({ text: '正在加载' })

    			if(this.title == '电信沃尔玛'){
    				var data = {
    					price: this.moneyValue,
    					channel: '95',
    					cardStr: this.$refs.textArea.value,
    				}
    			}
    			if(this.title == '电信麦德龙'){
    				var data = {
    					price: '',
    					channel: '96',
    					cardStr: this.$refs.textArea.value,
    				}
    			}
    			core.hexiaoDX(data).then(data => {
	    		 		this.$vux.loading.hide()
	            if (data.code && '00' == data.code) {

                  if(data.result == '1'){
                    this.$vux.toast.text('核销成功', 'middle')
                  }else {
                    this.$vux.toast.text('核销请求已提交, 请稍后在订单列表中进行查看', 'middle')
                  }
									setTimeout(()=>{
										window.location.reload();
									},2000)

	            }else {
	              this.$vux.toast.text(data.message, 'middle')
	            }
	          })
	    	}
    	},
      closeBtn(){
        this.isShowCode = false
      },
      openCode(val){
        this.isShowCode = true;
    	  if(val == '520'){
    	    this.codePics = 'https://c1.51jujibao.com/static/mod/julePayV2/static/cpImages/code01.png'
        }else if(val == '1040'){
          this.codePics = 'https://c1.51jujibao.com/static/mod/julePayV2/static/cpImages/code02.png'
        }else if(val == '2079'){
          this.codePics = 'https://c1.51jujibao.com/static/mod/julePayV2/static/cpImages/code03.png'
        }else if(val == '5198'){
          this.codePics = 'https://c1.51jujibao.com/static/mod/julePayV2/static/cpImages/code04.png'
        }else if(val == '10395'){
          this.codePics = 'https://c1.51jujibao.com/static/mod/julePayV2/static/cpImages/code05.png'
        }
      },
      jumpUrl(m){
        // console.log("1232244");
        var re = /http/;
        // console.log("匹配的："  + m.match(re));
        // console.log("正则的Boolean：" + re.test(m));
        if(re.test(m)){
            window.location.href = m;
        }else {
            this.$router.push({path: m})
        }
      }

    }
  }

</script>
<style lang="less" scoped>



</style>
<style lang="less">
  .dxGoodsList {

  	.mask{position: fixed;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,0.6);z-index: 9999;}
    .vux-header {
      background-color: #ff8810;
      color: #333;
    }
    .vux-header-title, .vux-header-back {
      color: #FFF;
    }
    .vux-header .vux-header-title {
      color: #FFF;
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
    .tab{
    	display: flex;flex-direction: row;text-align: center;color: #999;padding: 0.8rem 0;
    	background-color: #FFF;
    }
    .tab-nav-i{
    	width: 50%;
    	position: relative;
    }
    .tab-nav-i.active{
    	color: #ff8810;
    }
    .tab-nav-i.active:after{
    	  content: "";
	      position: absolute;
	      border: 2px solid #ff8810;
	      top: 150%;
	      left: 40%;
	      right: 40%;
	      border-radius: 3px;
    }
		 input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
			color: #b5aeae;font-size:12px;
		}
		input:-moz-placeholder, textarea:-moz-placeholder {
			color:#b5aeae;font-size:12px;
		}
		input::-moz-placeholder, textarea::-moz-placeholder {
			color:#b5aeae;font-size:12px;
		}
		input:-ms-input-placeholder, textarea:-ms-input-placeholder {
			color:#b5aeae;font-size:12px;
		}
    .sectin-middle-two{
    	outline: none;font-size: 12px;text-indent: 10px; border-radius: 5px; border: solid 1px #ebebeb;
     	background-color: #fff;
	    width: 100%;
	    padding: 5px 0;
	    margin: 1rem 0 2rem;
	    padding: 12px 0;
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
    }

    .main .grid-center{
    	  width:  100%;
		    margin: 0 auto;
		    background-color: #FFF;
		    display: block;
		    content: none;
		    padding: 23px 8px 22px;
    		box-sizing: border-box;
    }
    .main .weui-grid{
    	padding: 10px 5px 10px;
    	border-radius: 10px;
    }
    .main .weui-grids:before{
    	content: none;
    }
    .main .weui-grid:before{
    	content: none;
    }
    .main .weui-grid:after{
    	content: none;
    }
    .main .weui-grids:after{
    	content: none;
    }
    .main-text{
    	font-size: 16px;color: #ff8810;text-align: center;font-weight: normal;font-stretch: normal;
    }
    .main-text02{
    	margin: 11px 0 25px;font-size: 16px;color: #ff8810;text-align: center;
    }
    .main-code{
    	padding: 9px 0;    width: 70%; margin: 0 auto 24px;border-radius: 30px;background-color: #ff8810;color: #FFF;text-align: center;font-size: 14px;
    }
    .main-content{
    	color: #666666;line-height: 20px;font-size: 12px;text-align: center;
    }

		.listTable{
			padding: 16px 10px;display: flex;flex-direction: row;justify-content: space-between;border: solid 1px #c0c0c0;border-radius: 5px;margin-bottom: 10px;
		}

    .money-con{
      padding: 8px 5px;
      width: 30%;border-radius: 5px;
      border: 1px solid #62615e;
      color: #64615e;
      text-align: center;margin-bottom: 15px;    width: 40%;
    }
    .money-con.active{
      border: 1px solid #ff8810;
      color: #ff8810;
    }
    .codePic{
      width: 200px;
      height: 200px;
      background-size: contain!important;
    }

    .money-value{
      font-size: 20px;font-weight: 700;font-family: Impact;
    }

  }
</style>
