<template>

  <div class="select-picker picker-modal" v-show="showModal!==show">
    <div class="picker-wrapper">
      <div class="picker-head">
        <p class="close" @click="showModal=!showModal">取消</p>
        <p class="confirm" @click="confirm">确定</p>
      </div>
      <div class="picker-container">
        <p class="picker-item" :class="{active:chooseIndex==index}" v-for="(item,index) in pickerData"
           @click="chooseIndex=index">{{item}}</p>
      </div>
    </div>
  </div>


</template>

<script>
  export default {
    name: "select-picker",
    props: {
      show: {
        type: Boolean,
        default: false,
      },
      pickerData: {
        type: Array,
        default: []
      },
      defaultItem: {
        default: ''
      }
    },
    data() {
      return {
        showModal: false,
        chooseIndex: 0
      }
    },
    mounted() {
      if (!this.defaultItem) {
        this.chooseIndex = 0;
      } else {
        this.chooseIndex = this.pickerData.indexOf(this.defaultItem) > -1 ? this.pickerData.indexOf(this.defaultItem) : 0
      }
    },

    methods: {
      confirm() {
        this.showModal = !this.showModal;
        this.$emit('choose', this.pickerData[this.chooseIndex])
      }
    }
  }
</script>

<style scoped lang="less">
  .picker-modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .5);
    .picker-wrapper {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #fff;
      .picker-head {
        height: 2.5rem;
        border-bottom: .032rem solid #e7e7e7;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .close {
          margin-left: 1rem;
          color: #999;
          font-size: 1rem;
        }
        .confirm {
          margin-right: 1rem;
          color: #ff8810;
          font-size: 1rem;
        }
      }
      .picker-container {
        padding: 2rem 0;
        .picker-item {
          width: 100%;
          margin: 0 auto;
          height: 2.5rem;
          line-height: 2.5rem;
          font-size: 1rem;
          color: #666;
          text-align: center;
        }
        .picker-item.active {
          background-color: #e7e7e7;
        }
      }
    }

  }
</style>
