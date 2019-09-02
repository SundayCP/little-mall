<template>
  <div>
    <router-link class="mine-item" :to="toLink">
      <div class="item-icon-container">
        <img :src="itemIcon" class="item-icon">
      </div>
      <p class="item-title">{{itemTitle}}</p>
    </router-link>
  </div>

</template>

<script>
  export default {
    name: "mine-item",
    props: {
      toLink: {
        default: ''
      },
      itemIcon: {
        default: ''
      },
      itemTitle: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="less">
  .mine-item {
    display: block;
    width: 100%;
    height: 3.125rem;
    display: flex;
    justify-content: left;
    align-items: center;
    background-color: #fff;
    .item-icon-container {
      width: 1.625rem;
      height: 1.625rem;
      border-radius: 50%;
      overflow: hidden;
      margin-left: .875rem;
      .item-icon {
        height: 100%;
      }
    }
    .item-title {
      margin-left: 1.125rem;
      color: #333;
      font-size: .813rem;
    }

  }
</style>
