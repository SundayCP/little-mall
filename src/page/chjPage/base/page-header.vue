<template>
  <div class="page-header" ref="pageheader">
    <h1 class="title" ref="title">{{title}}</h1>
    <div class="arrow" ref="arrow" @click="back" v-if="hasBack"></div>
    <slot name="right" class="right-slot"></slot>
  </div>
</template>

<script>
  export default {
    name: "page-header",
    props:{
      title:{
        type:String,
        default:''
      },
      bgColor: {
        type: String,
        default: '#fff'
      },
      ftColor:{
        type:String,
        default:'#000'
      },
      bdColor:{
        type:String,
        default:'#999'
      },
      isBack:{
        type:Boolean,
        default:true
      },
      hasBack:{
        type:Boolean,
        default:true
      },
      needBottomBorder:{
        type:Boolean,
        default:true
      }

    },
    mounted(){
      this.$refs.pageheader.style.backgroundColor=this.bgColor
      this.$refs.title.style.color=this.ftColor
      if(this.hasBack){
        this.$refs.arrow.style.borderColor=this.bdColor
      }
      if(!this.needBottomBorder){
        this.$refs.pageheader.style.border='none'
      }

    },
    methods:{
      back(){
        if(this.isBack){
          history.back()
        }else{
          this.$emit('backArrow')
        }

      }
    }
  }
</script>

<style scoped lang="less">
  .page-header {
    width: 100%;
    height: 2.75rem;
    border-bottom: 0.032rem solid #e9e9e9;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .title {
      font-size: 1.125rem;
      line-height: 1.125rem;
    }
    .arrow {
      position: absolute;
      width: .707rem;
      height: .707rem;
      top: 50%;
      left: 1.2rem;
      border-width: 2px 0 0 2px;
      border-style: solid;
      transform: translate3d(0,-50%,0) rotate(315deg);

    }
    .right-slot{
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }




</style>
