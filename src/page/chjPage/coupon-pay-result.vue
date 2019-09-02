<template>
  <div class="coupon-pay-result">
    <page-header title="电子券收款"
                 bg-color="#ff8810"
                 ft-color="#fff"
                 bd-color="#fff"></page-header>

    <div class="result-container" v-if="pageType==='fail'">
      <img :src="require('../../../static/chjImg/pay-fail.png')" class="result-pic">
      <p class="result-text">收款失败</p>
    </div>

    <div class="result-container" v-if="pageType==='success'">
      <img :src="require('../../../static/chjImg/pay-success.png')" class="result-pic">
      <p class="result-text">收款成功</p>
    </div>

    <div class="btn-container">
      <button class="btn-top" @click="continuePay">继续收款</button>
      <button class="btn-bottom" @click="backHome">返回首页</button>
    </div>
  </div>

</template>

<script>
  import PageHeader from './base/page-header'

  export default {
    name: "coupon-pay-result",
    data(){
      return{
        pageType:this.$route.query.type
      }
    },
    methods:{
      continuePay(){
        this.$router.push({
          path:'/couponpay'
        })
      },
      backHome(){
        this.$router.push({
          path:'/'
        })
      }
    },
    components: {
      PageHeader
    }
  }
</script>

<style scoped lang="less">
  .result-container {
    padding-top: 3.75rem;
    .result-pic {
      display: block;
      width: 6rem;
      margin: 0 auto;
    }
    .result-text {
      color: #000;
      font-size: 1.125rem;
      text-align: center;
      padding-top: 1.844rem;
    }
  }

  .btn-container {
    margin-top: 5rem;
    button {
      padding: 0;
      margin: 0;
      border: none;
      outline: none;
      background: none;
      width: 91.47%;
      height: 2.75rem;
      border-radius: .25rem;
      font-size: 1.125rem;
      display: block;
      margin: 0 auto;

    }
    .btn-top {
      background-color: #ff8810;
      color: #fff;
    }
    .btn-bottom {
      border: .064rem solid #ff8810;
      background-color: #fff;
      color: #ff8810;
      margin-top: 1.188rem;
    }
  }
</style>
