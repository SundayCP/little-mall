<template>
  <div id="sliderBottom">
    <tabbar slot="bottom" @on-index-change="onIndexChange">
      <tabbar-item :selected="onRoutes == 'integralCash'" link="/integralCash">
        <img slot="icon" src="../assets/cash01.png">
        <img slot="icon-active" src="../assets/cash02.png">
        <span slot="label">积分收银台</span>
      </tabbar-item>
      <tabbar-item :selected="onRoutes == 'integralIncome'" link="/integralIncome" class='goodsCar'>
  			<img slot="icon" src="../assets/income01.png">
    		<img slot="icon-active" src="../assets/income02.png">	
        <span slot="label">积分收入</span>
      </tabbar-item>
       <tabbar-item :selected="onRoutes == 'increaseIncome'" link="/increaseIncome">
        <img slot="icon" src="../assets/increase01.png">
        <img slot="icon-active" src="../assets/increase02.png">
        <span slot="label">增收</span>
      </tabbar-item>
      <tabbar-item :selected="onRoutes == 'myCenter'" link="/myCenter">
        <img slot="icon" src="../assets/myCenter01.png">
        <img slot="icon-active" src="../assets/myCenter02.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import {Tabbar, TabbarItem} from 'vux'
  
  export default {
    name: "sliderBottom",
    components: {
      Tabbar,
      TabbarItem
    },
    data() {
			return {
			}
	  },
    props: {
      message: String
    },
    computed: {
    	onRoutes() {
        let _this = this
        let replaceKey = this.$route.path.replace('/', '')
				console.log(this.$route.path);
        return replaceKey
			},
		
	  },

    data() {
      return {}
    },
    
    created() {
//			this.$store.getters.getCartNum ? this.isShow = true : this.isShow = false
//		    console.log(this.$store.getters.getCartNum + 'num')
    },
    methods: {
      onIndexChange(newIndex, oldIndex) {
//      console.log(newIndex, oldIndex)
      },

    }
  }
</script>

<style lang="less" scoped>
  .weui-tabbar {
    position: fixed;
  }

</style>
<style>
  #sliderBottom .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
    color: #ff8810;
  }
  
  #sliderBottom .weui-tabbar__item{
  	padding: 7px 0 0 0;
  }

  #sliderBottom .weui-tabbar:before {
    color: #e1e1e1;
    border-top: 1px solid #e1e1e1;
  }

  #sliderBottom .weui-tabbar__label {
    color: #666666;
    /*font-weight: 700;*/
  }

  #sliderBottom .weui-tabbar {
    background-color: #fff;
    max-width: 750px;
    margin: 0 auto;
  }

  #sliderBottom .weui-tabbar__icon {
    width: 1.3125rem;
    height: auto;
  }
  
  #sliderBottom .goodsCar{
  	position: relative;
  }
  #sliderBottom .cartNum{
  	position: absolute;
    display: block;
    width: 18px;
    height: 18px;
    background-color: red;
    top: 0;
    left: 52%;
    color: #FFF;
    border-radius: 50%;
    line-height: 18px;
    font-size: 12px;
    text-align: center;
    
  }
  
</style>
