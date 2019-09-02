<template>
<div class="userDetail">
  <div class="header">
    <x-header :left-options="{showBack: true}">账户信息</x-header>
  </div>

  <div class="">
    <group>
      <cell title="工号" :value="userInfo.username ? userInfo.username : '--'"></cell>
      <cell title="商户名称" :value="userInfo.merchantName ? userInfo.merchantName : '--'"></cell>
      <cell title="角色" :value="userInfo.roleName ? userInfo.roleName : '--'" v-show='isOperator'></cell>
      <cell title="省市" :value="userInfo.province+userInfo.city ? userInfo.province+userInfo.city : '--'"  v-show='isOperator'></cell>
    </group>
    <group v-show='isOperator'>
      <cell title="银行名称" :value="userInfo.bankName ? userInfo.bankName : '--'"></cell>
      <cell title="银行卡号" :value="userInfo.bankNum ? userInfo.bankNum : '--'"></cell>
      <cell title="真实姓名" :value="userInfo.realname ? userInfo.realname : '--'"></cell>
      <cell title="支付宝账户" :value="userInfo.alipay ? userInfo.alipay : '--'"></cell>
      <cell title="手机号码" :value="userInfo.mobile ? userInfo.mobile : '--'"></cell>
    </group>
    <div style="background-color: #FFF;padding: 15px;" v-show='isOperator'>
      <group-title>证件信息</group-title>
      <grid :show-lr-borders="false" :show-vertical-dividers="false">
        <grid-item  label="">
          <!-- <div slot="icon" :style="'background: url('+items.icon+') no-repeat center center;background-size: contain;'"> -->
          <div slot="icon" class="icon" :style="'background-image: url('+userInfo.businessLicense+')'"> </div>
        </grid-item>
        <grid-item  label="">
          <div slot="icon" class="icon" :style="'background-image: url('+userInfo.idCardFront+')'"></div>
        </grid-item>
        <grid-item label="">
          <div slot="icon" class="icon" :style="'background-image: url('+userInfo.idCardReverse+')'"></div>
        </grid-item>
      </grid>
    </div>
    <group class="bottom" v-show='isOperator'>
      <cell title="备注信息" :value="userInfo.remark ? userInfo.remark : '--'"></cell>
    </group>
  </div>
</div>
</template>

<script>
import {
  XHeader,
  XInput,
  Group,
  Cell,
  Grid, GridItem, GroupTitle
} from 'vux'
import * as core from '@/core/cpApi'

export default {
  name: 'userDetail',
  components: {
    XHeader,
    XInput,
    Group,
    Cell,
    Grid, GridItem, GroupTitle
  },
  data() {
    return {
        icon: '',
        userInfo: {},
        isOperator: false,
    }
  },

  created() {
    let id = this.$route.query.id;
    this.fetchUserInfo(id);
  },
  methods: {
    fetchUserInfo(id){
      core.fetchUserInfo({
        'merchantId': id,
      }).then(data => {
        if (data.code && '00' === data.code) {
            this.userInfo = data.result;
            if(data.result.roleId == '2' || data.result.roleId == '0'){
              this.isOperator = false;
            }else {
              this.isOperator = true;
            }
        } else {
            this.$vux.toast.text(data.message, 'middle')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
<style lang="less">
.userDetail {
    .vux-header {
        background-color: #ff8810;
        color: #333;
    }
    .vux-header-back,
    .vux-header-title {
        color: #FFF;
    }
    .vux-header .vux-header-title {
        color: #FFF;
    }
    .vux-header-back {
        display: none;
    }
    .vux-header .vux-header-left .left-arrow:before {
        content: "";
        position: absolute;
        width: 12px;
        height: 12px;
        border: 1px solid #FFF;
        border-width: 1px 0 0 1px;
        -webkit-transform: rotate(315deg);
        transform: rotate(315deg);
        top: 8px;
        left: 7px;
    }
    .weui-grid__icon {
        width: 100px;
        height: 65px;
        margin: 0 auto;
        background-color: #eeeeee;
    }

    .weui-cells {
      margin-top: 10px;
    }
    .weui-grid:before {
      content: none;
    }
    .weui-grids:before {
      content: none;
    }
    .weui-grid:after {
      content: none;
    }
    .weui-grids:after {
      content: none;
    }
    .weui-grid {
      padding: 10px 10px;
    }
    .weui-cell:before {
      right: 15px;
    }
    .weui-cells:after {
      left: 15px;
      right: 15px;
    }
    .weui-cells__title {
      margin-top: unset;
      margin-bottom: 0.3em;
      padding-left: unset;
      padding-right: 15px;
      color: #000;
      font-size: 16px;
    }
    .bottom .weui-cells {
      margin-top: 0;
    }
    .weui-cells:before {
      left: 15px;
      right: 15px;
    }
    .weui-cell__ft {
      font-size: 14px;
    }
    .vux-label {
      font-size: 16px;
    }
    .icon{
      width: 100px;height: 65px;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: contain;
    }
}
</style>
