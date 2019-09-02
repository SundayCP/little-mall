<template>
  <div class="account-income-item">
    <div class="main-line" :class="{active:showSlide}">
      <div class="main-line-part main-line-left">
        <p>{{item.title}}</p>
      </div>
      <div class="main-line-part main-line-center">
        <p>{{item.count}}</p>
      </div>
      <div class="main-line-part main-line-right" @click="downUp">
        <p>{{item.sum}}</p>
        <img src="@/../static/chjImg/arrow-down.png">
      </div>
    </div>
    <div class="child-container" v-show="showSlide">
      <p class="child-tip" v-show="!item.detailList.length">暂无数据</p>
      <div class="child-item" v-for="(itemIn,indexIn) in item.detailList" :key="indexIn">
        <div class="child-part child-part-name">
          <p>{{itemIn.title}}</p>
        </div>
        <div class="child-part child-part-order">
          <p>{{itemIn.count}}</p>
        </div>
        <div class="child-part child-part-money">
          <p>{{itemIn.sum}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "account-income-item",
    props: {
      item: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        showSlide: false,
      }
    },
    methods:{
      downUp(){
        // this.showSlide=!this.showSlide
        if(this.item.needLoad==='Y'){
          this.$emit('downUp',this.item.index)
          setTimeout(()=>{
            this.showSlide=!this.showSlide
          },500)
        }else{
          this.showSlide=!this.showSlide
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .main-line {
    height: 3.125rem;
    background-color: #fff;
    box-shadow: 0rem 0.063rem 0.188rem 0rem #eee;
    display: flex;
    margin-top: .313rem;
    .main-line-part {
      flex: 1;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .main-line-right {
      p {
        margin-right: 1rem;
      }
      img {
        width: .813rem;
        transition: all .2s ease;
      }
    }
  }

  .main-line.active {
    background-color: #fef9f3;
    border-bottom: .032rem solid #ededed;
    transition: background-color .2s ease;
    .main-line-right {
      img {
        transform: rotate(180deg);
        transition:transform .2s ease;
      }
    }
  }
  .child-container{
    background-color: #fff;
    box-shadow: 0rem 0.125rem 0.359rem 0.016rem #eee;
    border-radius: 0rem 0rem 0.5rem 0.5rem;
    transition: all .2s ease;
    .child-tip{
      font-size: .75rem;
      color: #aaa;
      text-align: center;
      padding-top: 2rem;
      padding-bottom: 2rem;
    }
    .child-item{
      height: 2.313rem;
      display: flex;
      align-items: center;
      .child-part{
        flex: 1;
        display: flex;
        justify-content: center;
        p{
          width: 80%;
          color: #999;
          font-size: .75rem;
        }
      }
      .child-part-name{
        p{
          text-align: right;
        }
      }
      .child-part-order{
        p{
          text-align: center;
        }
      }
      .child-part-money{
        p{
          text-align: left;
        }
      }
    }
  }
</style>
