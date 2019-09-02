<template>
  <div class="Home">
      <iframe id="defaulIframePage" width="100%"  :style="'height:'+height+';'" frameborder="0" vspace="0" scrolling="yes"  :src="'http://prev01.m.51jujibao.com/act/alipayPushNew?userToken=jule1&sign=c2efb7444f35a74fea49359d3752657c'"></iframe>
  </div>
</template>

<script>
  import {XHeader} from 'vux'

  export default {
    name: 'Home',
    components: {
      XHeader,
    },
    data() {
      return {

      }
    },
    computed: {
      height(){

        // var isIOS =  (navigator.userAgent.indexOf("iPhone") > -1 || navigator.userAgent.indexOf("iPad") > -1);
        var high = window.innerHeight + 'px'
        // if(isIOS){
        //   if(!window.localStorage.getItem('openTwoIOS')){
        //     window.localStorage.setItem('openTwoIOS', 'one')
        //     high = window.innerHeight - 45 + 'px'
        //   }else{
        //     high = window.innerHeight + 'px'
        //   }
        // }else{
        //   high = window.innerHeight + 'px'
        // }
        return high;
      }

    },
    created() {

    },
    methods: {

    }
  }

</script>

<style scoped>

</style>
