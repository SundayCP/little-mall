<template>
  <div class="goodsListDetail">
		<div class="header">
      <x-header :left-options="{showBack: true}">{{title}}</x-header>
    </div>
    <div class="main">
    	<div v-for="(item,index) in dataListArr">
    		<!-- <router-link :to="item.linkUrl"> -->
    			<group @click.native="jumpUrl(item.linkUrl)">
  			      <cell :title="item.name"  is-link v-if="item.isCollect == 'N'" class='active'>
  			      	<div slot  v-on:click.stop="setBtn(item.id)">设为常用</div>
  			      	<img slot="icon" width="35" style="display:block;margin-right:5px;" :src="item.icon">
  			      </cell>
  			       <cell :title="item.name" is-link v-else-if="item.isCollect == 'Y'"  class='cancelActive' >
  			       	<div slot v-on:click.stop="cancelBtn(item.id)">取消常用</div>
  			      	<img slot="icon" width="35" style="display:block;margin-right:5px;" :src="item.icon">
  			      </cell>
			    </group>
    		<!-- </router-link> -->
    	</div>

    </div>
  </div>
</template>

<script>
  import {XHeader, Scroller,Group ,Cell} from 'vux'
import * as core from '@/core/cpApi'

  export default {
    name: 'goodsListDetail',
    components: {
      XHeader,
      Scroller,
      Group,
      Cell
    },
    data() {
      return {
	  		title: '',
	  		listId: '',
	      dataListArr: []
      }
    },

    created() {
    	let id = this.$route.params.type;
    	this.listId = id
    	this.getItemList(id)
    },
    methods: {
    	setBtn(m){
    		core.setList({
    		 		"id": m,
    		 }).then(data => {
            if (data.code && '00' == data.code) {
              // 获取数据
              this.$vux.toast.text('设置成功', 'middle')
              this.getItemList(this.listId)

            }else {
              this.$vux.toast.text(data.message, 'middle')
            }
          })
    	},
    	cancelBtn(m){
    		core.cancelList({
    		 		"id": m,
    		 }).then(data => {
            if (data.code && '00' == data.code) {
              // 获取数据
              this.$vux.toast.text('设置成功', 'middle')
              this.getItemList(this.listId)

            }else {
              this.$vux.toast.text(data.message, 'middle')
            }
          })
    	},
    	getItemList(m){
    		 core.getItemList({
    		 		"id": m,
    		 }).then(data => {
            if (data.code && '00' == data.code) {
              // 获取数据
             this.dataListArr = data.result;
             this.title = data.message;

             console.log(this.dataListArr)
            }else {
              this.$vux.toast.text(data.message, 'middle')
            }
          })
    	},
      jumpUrl(m){
        console.log("1232244");
        var re = /http/;
        console.log("匹配的："  + m.match(re));
        console.log("正则的Boolean：" + re.test(m));
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
  .goodsListDetail {
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
    .main .weui-cell_access.active .weui-cell__ft{
	    text-decoration: underline;
	    padding-right: 30px;
	    font-size: 12px;
	    color: #11bc0c;
	  }
	  .main .weui-cell_access.cancelActive .weui-cell__ft{
	    text-decoration: underline;
	    padding-right: 30px;
	    font-size: 12px;
	    color: #ff8810;
	  }
	  .main .weui-cell{
	  	padding: 15px;
	  }
	  .main .vux-label{
	  	color: #333;
	  	font-size: 14px;
	  }
	  .main .weui-cells{
	  	margin-top: 15px;
	  }
  }
</style>
