<template>
  <div class="manage-item-item">
    <div class="item-part item-left">
      <img :src="itemIcon" alt="" class="item-icon">
      <p class="item-name">{{item.name}}</p>
    </div>
    <div class="item-part item-center" @click="editItem(item.index)">
      <p class="item-edit">编辑</p>
    </div>
    <div class="item-part item-right">
      <div class="item-switch" :class="{active:item.isLock==='N'}" @click="switchItem(item.index)">
        <div class="switch-handle"></div>
      </div>
    </div>


  </div>

</template>

<script>
  export default {
    name: "manage-item-item",
    props: {
      item: {
        type: Object,
        default: {}
      }

    },
    computed: {
      itemIcon() {
        if (this.item.type === 1) {
          if (this.item.isLock === 'N') {
            return require('../../../../static/chjImg/icon-store-s.png')
          } else if (this.item.isLock === 'Y') {
            return require('../../../../static/chjImg/icon-store-u.png')
          }
        } else if (this.item.type === 2) {
          if (this.item.isLock === 'N') {
            return require('../../../../static/chjImg/icon-operator-s.png')
          } else if (this.item.isLock === 'Y') {
            return require('../../../../static/chjImg/icon-operator-u.png')
          }
        }
      }
    },
    methods: {
      switchItem(index) {
        this.$emit('switchItem', index)
      },
      editItem(index) {
        this.$emit('editItem', index)
      }
    }
  }
</script>

<style scoped lang="less">
  .manage-item-item {
    background-color: #fff;
    display: flex;
    height: 3.75rem;
    align-items: center;
    .item-part {
      height: 1.719rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .item-left {
      flex: 3;
      justify-content: left;
      .item-icon {
        width: 1.25rem;
        margin-left: .78rem;
        margin-right: .65rem;
      }
      .item-name {
        color: #333;
        font-size: .938rem;
      }
    }
    .item-center {
      flex: 1;
      border-right: .032rem solid #ebebeb;
      .item-edit {
        color: #37c1f2;
        font-size: .75rem;
      }
    }
    .item-right {
      flex: 1;
      .item-switch {
        width: 2.344rem;
        height: 1.188rem;
        background-color: #e5e5e5;
        border-radius: 0.578rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        transition: all .2s ease;
        .switch-handle {
          width: 0.938rem;
          height: 0.938rem;
          background-color: #ffffff;
          border-radius: 50%;
          margin: 0 .15rem;
        }
      }
      .item-switch.active {
        background-color: #ffbf39;
        justify-content: flex-end;
      }
    }

  }
</style>
