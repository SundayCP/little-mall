<template>
  <div class="dxHexiao">
  	<div class="header">
      <x-header :left-options="{showBack: true}">天翼阅读核销</x-header>
    </div>

    <group>
      <x-input v-model.trim="phone"  placeholder="请输入手机号"></x-input>
    </group>

  <div class="resetKefu" style="margin-top: 80px;" @click="hexiaoBtn">核销</div>

  <div style="margin-top: 30px;font-size: 14px;margin-left: 15px;">
  	<a href="http://jfdb.tyread.com:8080/cms/duobao/home.jsp?enterpriseId=10003&qdid=22806402" style="text-decoration: underline;color: #f09a1a;">翼积分消费入口</a>
  </div>
  </div>
</template>

<script>
  import {XHeader, XInput, Group} from 'vux'
import * as core from '@/core/cpApi'
  export default {
    name: 'dxHexiao',
    components: {
      XHeader, XInput, Group
    },
    data() {
      return {
					phone: '',
      }
    },

    created() {

    },
    methods: {

				// 核销 -- 核销  （待对接口）
    	hexiaoBtn(){
    		if(!this.phone){
    			this.$vux.toast.text('请输入手机号', 'middle')
    		}else{
    			this.$vux.loading.show({ text: '正在加载' })

    			console.log(this.phone)
    			core.phoneHexiao({
	    		 		'mobile': this.phone,
	    		 }).then(data => {
	    		 		this.$vux.loading.hide()
	            if (data.code && '00' == data.code) {

                  console.log('jj:'+data.result);
									this.$vux.toast.text('核销成功'+data.result, 'middle')
									setTimeout(()=>{
										window.location.reload();
									},2000)


	            }else {
	              this.$vux.toast.text(data.message, 'middle')
	            }
	          })
	    	}
    	},
    }
  }

</script>

<style scoped>

</style>

<style lang="less">
	.dxHexiao{
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

	      .resetKefu{
    	text-align: center;
	    border: 1px solid #c2e0ff;
	    border-radius: 5px;
	    padding: 12px 0;
	    border: 1px solid gainsboro;
	    font-size: 0.9rem;
	    background-color: #ff8810;
	    color: #FFF;
	    letter-spacing: 5px;
    text-align: center;
    width: 80%;
    margin: 0 auto;
    }
	}
</style>
