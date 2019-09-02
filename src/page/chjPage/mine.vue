<template>
  <div class="mine">
    <page-header title="我的" :has-back="false"></page-header>
    <div class="mine-head-container">
      <div class="head-img-container" @click="userDetail">
        <img :src="user.headImg" alt="" class="head-img">
      </div>
      <p class="head-name" @click="userDetail">{{user.name}}</p>
    </div>
    <div class="mine-item-container">
      <div class="mine-item-group" v-if="user.roleId!=2">
        <mine-item item-title="账户收入"
                   :item-icon="require('../../../static/chjImg/mine-icon-account-income.png')"
                   to-link="/accountincome"
                   ></mine-item>
        <mine-item item-title="账务明细" :item-icon="require('../../../static/chjImg/mine-icon-account-detail.png')"
                   to-link="/accountdetail" style="border-top: .032rem solid #e7e7e7"></mine-item>
        <mine-item item-title="提现列表" :item-icon="require('../../../static/chjImg/mine-icon-list-new.png')"
                   to-link="/withdrawrecord" style="margin-top: 10px;"></mine-item>

        <mine-item item-title="额度管理" :item-icon="require('../../../static/chjImg/mine-edu-manage.png')"
                   to-link="/quotaDetail"></mine-item>

        <mine-item item-title="上传发票（个体工商）" :item-icon="require('../../../static/chjImg/mine-submit-change.png')"
                   to-link="/submitiNvoice"></mine-item>

      </div>
      <div class="mine-item-group" v-if="user.roleId!=2">
        <mine-item item-title="管理商户"
                   :item-icon="require('../../../static/chjImg/mine-icon-manage-store.png')"
                   :to-link="{path:'/manageitem',query:{type:'sh'}}"
                   v-if="user.roleId!=3"></mine-item>
        <mine-item item-title="管理操作员"
                   :item-icon="require('../../../static/chjImg/mine-icon-manage-operater.png')"
                   :to-link="{path:'/manageitem',query:{type:'czy'}}" style="border-top: .032rem solid #e7e7e7"
                   v-if="user.roleId!=4&&user.roleId!=6"></mine-item>
      </div>
      <div class="mine-item-group">
        <mine-item item-title="修改密码" :item-icon="require('../../../static/chjImg/mine-icon-change-pwd.png')"
                   to-link="/changepwd"></mine-item>
      </div>
    </div>

    <button class="submit-order" @click="logOut">注销</button>
  </div>
</template>

<script>
  import PageHeader from './base/page-header'
  import MineItem from './base/mine-item'
  import {Toast} from 'vux'

  import {getMineData, logOut} from '../../core/chjApi'

  export default {
    name: "mine",
    data() {
      return {
        user: {
          headImg: require('../../../static/chjImg/icon-mine-head.png'),
          name: '',
          id: '',
          roleId: ''
        },

      }
    },
    mounted() {
      this._getPersonalData()
    },
    methods: {
      logOut() {
        logOut().then(data => {
          if (data.code && data.code === '00') {
            this.$router.push({
              path: '/login'
            })
          } else {
            this.$vux.toast.text(data.message, 'middle')
          }
        })
      },
      _getPersonalData() {
        getMineData().then(data => {
          if (data.code && data.code === '00') {
            Object.assign(this.user, {
              name: data.result.username,
              roleId: data.result.roleId,
              id: data.result.id
            })
          } else {
            this.$vux.toast.text(data.message, 'middle')
          }
        })
      },
      userDetail(){
          this.$router.push({path: '/userDetail',query: {
            id:this.user.id,
          }})
          // console.log("8788");
      },
    },
    components: {
      PageHeader, MineItem,
      Toast
    }
  }
</script>

<style scoped lang="less">
  .mine{
    padding: 0 0 150px;
  }
  .mine-head-container {
    height: 6.25rem;
    background-color: #fd9124;
    display: flex;
    justify-content: left;
    align-items: center;
    .head-img-container {
      margin-left: .938rem;
      width: 3.125rem;
      height: 3.125rem;
      border-radius: 50%;
      overflow: hidden;
      .head-img {
        width: 100%;
        height: 100%;
      }
    }
    .head-name {
      margin-left: 1.438rem;
      color: #fff;
      font-size: 1.125rem;
    }
  }

  .mine-item-group {
    margin-bottom: .625rem;
  }

  .submit-order {
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
    background: none;
    width: 92%;
    height: 2.75rem;
    margin: 0 auto;
    margin-top: 1.188rem;
    display: block;
    border-radius: .25rem;
    background-color: #ef9134;
    color: #fff;
    font-size: 1rem;
  }
</style>
