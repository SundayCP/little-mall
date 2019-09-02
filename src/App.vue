<template>
  <div id="app">
    <router-view ></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '../static/css/rest.css';
body {
  background-color: #f3f4f6;
  max-width: 750px;
  margin: 0 auto;
}
</style>
