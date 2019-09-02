<template>
  <div class="Home">
    <router-view></router-view>
    <BottomBar></BottomBar>
  </div>
</template>

<script>
  import BottomBar from '@/components/SliderBottom'
  import {XHeader} from 'vux'

  export default {
    name: 'Home',
    components: {
      XHeader,
      BottomBar
    },
    data() {
      return {

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
