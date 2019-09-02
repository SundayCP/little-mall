<template>
  <div class="notfound-view">
    <div class="header">
      <x-header :left-options="{backText: ''}">聚乐支付</x-header>
    </div>
    <div class="notfoundContainer">
    <h1>404</h1>
    <p>
      <strong>File not found</strong>
    </p>
  
    <p>
      The site configured at this address does not contain the requested file.
    </p>
    </div>

  </div>
</template>

<script>
import { XHeader } from 'vux'

export default {
  components: {
    XHeader
  },
  data() {
    return {
      loadingTip: '正在加载',
    }
  }
}
</script>

<style lang="less" scoped>
.notfound-view{
  background-color: #fff;
  height: 100%;
  position: fixed;
  width: 100%;
}
.notfoundContainer {
  background-color: #fff;
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-align: center;
  padding: 40px 20px 0 20px;
}

.notfoundContainer a {
  color: #4183c4;
  text-decoration: none;
}

.notfoundContainer a:hover {
  text-decoration: underline;
}

.notfoundContainer h1 {
  line-height: 60px;
  font-size: 60px;
  font-weight: 100;
  margin: 0px 0 50px 0;
  text-shadow: 0 1px 0 #fff;
}

.notfoundContainer p {
  color: rgba(0, 0, 0, 0.5);
  margin: 20px 0;
  line-height: 1.6;
}
</style>
