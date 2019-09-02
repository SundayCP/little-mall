<template>
  <div class="IntegralCash">
	 		<div class="header">
	      <x-header :left-options="{showBack: false}">收银台</x-header>
	    </div>

	    <div class="contain">
	    	<div>
				    <div style="padding: 15px 0 10px 16px;font-size: 16px;color: #282828;" v-if="dataImages.length > 0">
				    	{{name}}
				    </div>
	    			<div class="list">
	    				<grid :cols="4" :show-lr-borders="false">
					      <grid-item v-for="(items,index) in dataImages" :key="index">
					      	<!-- <router-link :to="items.linkUrl"> -->
						        <span class="grid-center" @click="jumpUrl(items.linkUrl)">
						        		<div :style="'width: 40px;height: 40px;background: url('+items.icon+') no-repeat center center;background-size: contain;margin: 0 auto;'"></div>
						        		<p style="font-size: 12px;text-align: center;color: #282828;margin: 10px 0 0;">{{items.name}}</p>
						        </span>
					        <!-- </router-link> -->
					      </grid-item>
					    </grid>
	    			</div>
	    	</div>

	    	<div v-for="item in dataList">
				    <div style="padding: 15px 0 10px 16px;font-size: 16px;color: #282828;">
				    	{{item.name}}
				    </div>
	    			<div class="list">
	    				<grid :cols="4" :show-lr-borders="false">
					      <grid-item v-for="(items,index) in item.subList" :key="index">
					      	<router-link :to="'/lists/'+items.id">
						        <span class="grid-center">
						        		<div :style="'width: 40px;height: 40px;background: url('+items.icon+') no-repeat center center;background-size: contain;margin: 0 auto;'"></div>
						        		<p style="font-size: 12px;text-align: center;color: #282828;margin: 10px 0 0;">{{items.name}}</p>
						        </span>
					        </router-link>
					      </grid-item>
					    </grid>
	    			</div>
	    	</div>
	    </div>
  </div>
</template>

<script>
  import {XHeader, Scroller,Grid, GridItem} from 'vux'
	import * as core from '@/core/cpApi';

  export default {
    name: 'IntegralCash',
    components: {
      XHeader,
      Scroller,
      Grid,
      GridItem
    },
    data() {
      return {
	   		name: '常用业务',
	   		dataImages:[],
       	dataList:[]
      }
    },

    created() {

    	this.getCommonUseData();
    	this.getListData();

    },
    methods: {
    	getCommonUseData(){
    		 core.getCommonUseData({}).then(data => {
            if (data.code && '00' == data.code) {
              // 获取常用数据

              this.dataImages = data.result;
            }
          })
    	},
    	getListData(){
    		 core.getListData({}).then(data => {
            if (data.code && '00' == data.code) {
              // 获取数据
              this.dataList = data.result;

            }else {
            	if(data.isLogin && data.isLogin == 'false'){
            		this.$router.push({ path: '/login' })
           	 	}else{
           	 		this.$vux.toast.text(data.message, 'middle')
           	 	}
            }
          })
    	},
      jumpUrl(m){
        // console.log("1232244");
        var re = /http/;
        // var res = /https/;
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
  .list .weui-grids{
  	background-color: #FFF;
  }
  .list .weui-grid{
  	padding: 16px 0;
  }

</style>
<style lang="less">
  .IntegralCash {
  	padding-bottom: 100px;
    .vux-header {
      background-color: #ff8810;
      color: #FFF;
    }
    .vux-header-title, .vux-header-back {
      color: #333;
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
  }
</style>
