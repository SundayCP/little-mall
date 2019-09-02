<template>
  <div class="quotaDetail">
    <div class="header">
      <x-header :left-options="{showBack: true}">额度详情</x-header>
    </div>
    <div style="margin: 0.625rem 0;display: flex;flex-direction: row;">
      <div class="header-bar-left" :class="{active: isAct == 'L'}" @click="isAct = 'L';fetchDataList(input_alipay)">个人账号</div>
      <div class="header-bar-right" :class="{active: isAct == 'R'}" @click="isAct = 'R';fetchDataList(input_alipay)">个体工商账号</div>
    </div>
    <div style="padding:1.125rem 0.938rem 0.75rem;background-color: #FFF">
      <span class="logo"></span><span style="vertical-align: middle;margin-left: 0.344rem;font-weight: 700">支付宝账号</span>
      <div style="margin: 0.938rem 0 0.781rem;overflow: hidden;">
        <input type="text" placeholder="请输入支付宝账号" class="input-alipay" v-model.trim="input_alipay">
        <span class="search-alipay" @click="searchData">查询</span>
      </div>
      <!--<div style="color: #50ce4d;font-size: 0.813rem;opacity: 1">账号剩余额度{{surplusMoney | toThousands}}元</div>-->
    </div>
    <div>
      <div class="banner-con" v-show="isAct == 'L'">
        <div style="width: 20%" class="card-pic"></div>
        <div style="width: 47%;line-height: 1.313rem;">每添加一张身份证号提升免税额度<span style="color: #fd9124;">800元</span></div>
        <div style="width: 25%" class="add-account" @click="showDialog = true">新增账号</div>
      </div>
      <div class="banner-con" v-show="isAct == 'R'">
        <div style="width: 20%" class="card-pic-shop"></div>
        <div style="width: 47%;line-height: 1.313rem;">每添加一个个体工商号提升免税额度<span style="color: #fd9124;">30000元</span></div>
        <div style="width: 25%" class="add-account" @click="addAccount">新增账号</div>
      </div>
    </div>
    <div>
      <x-table :cell-bordered="false" style="background-color:#fff;">
        <thead>
        <tr style="background-color: #fff6eb;height: 2.75rem;line-height: 2.75rem;font-size: 0.875rem;">
          <th style="width: 25%">姓名</th>
          <th style="width: 25%">支付宝账号</th>
          <th style="width: 25%" @click="changeOrder">
            <span style="vertical-align: middle">剩余额度 </span>
            <span class="shaixuan-icon"></span>
          </th>
          <th style="width: 25%">删除</th>
        </tr>
        </thead>
        <tbody style="color: #666666;font-size: 0.813rem;" v-if="dataList.length">
        <tr v-for="(item,index) in dataList">
          <td>{{item.name}}</td>
          <td>{{item.zfb}}</td>
          <td>{{item.ableWithdrawMoney}}</td>
          <td>
            <div class="icon" @click="deleteAccount(item.id)"></div>
          </td>
        </tr>
        </tbody>
        <tbody v-else>
        <tr>
          <td colspan="4" style="padding: 10px 0;text-align: center;font-size: 0.875rem;">暂无数据</td>
        </tr>
        </tbody>
      </x-table>
    </div>

    <!--新增账号-->
    <div class="dialog" v-show="showDialog">
      <div class="modal" style="position: absolute; padding: 0.938rem;">
        <div class="modal-head">
          <p class="modal-head-content" style="padding-top: 0.5rem;font-weight: 700">新增账号</p>
        </div>
        <div class="modal-body-new">
          <div>
            <div class="input-con" style="margin-top: 1.25rem"><span class="input-header">所属人姓名：</span><input @focus="inputFocus"
                                                                                                              @blur="inputBlur"
              type="text" class="input-box" v-model="person.name" placeholder="请输入所属人姓名"></div>
            <div class="input-con" style="margin: 0.625rem 0"><span class="input-header">身份证号：</span><input type="text" @focus="inputFocus"
                                                                                                            @blur="inputBlur"
                                                                                                            class="input-box"
                                                                                                            v-model="person.idCard"
                                                                                                            placeholder="请输入身份证号">
            </div>
            <div class="input-con" style="margin: 0 0 1.875rem"><span class="input-header">支付宝账号：</span><input @focus="inputFocus"
                                                                                                               @blur="inputBlur"
              type="text" class="input-box" v-model="person.alipayAccount" placeholder="请输入支付宝账号"></div>
          </div>
        </div>
        <div class="modal-foot" style="justify-content: space-between;">
          <div class="cancel-btn" @click="showDialog = false;">取消</div>
          <div class="confirm-btn" @click="submitAccountInfo">确定</div>
        </div>
        <img src="../../../static/chjImg/modal-close.png"
             style=" position: absolute; right: .7rem; top: .7rem; width: 1rem;" @click="showDialog=false">
      </div>
    </div>

    <!--删除账号弹窗-->
    <div class="dialog" v-show="deleteToast">
      <div class="modal" style="padding: 0.938rem;">
        <div class="modal-body-new">
          <img :src="failPic" alt="" style="width: 20%;display: block;margin: 0 auto;">
          <div style="text-align: center;margin: 0.938rem 0 1.281rem;color: #666666;font-size: 1rem;">
            <p style="margin-bottom: 8px">确定要删除该账号</p>
            <p>删除后将无法使用该账号提现</p>
          </div>
        </div>
        <div class="modal-foot" style="justify-content: space-around;">
          <div class="cancel-btn" @click="deleteToast = false;">取消</div>
          <div class="confirm-btn" @click="confirm_delete">确定</div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import {XHeader, XInput, Group, XTable} from 'vux'
  import * as core from '../../core/chjApi'
  import {checkInfo} from './js/util'

  export default {
    name: "quotaDetail",
    components: {
      XHeader, XInput, Group, XTable
    },
    data() {
      return {
        isAct: 'L',
        surplusMoney: 512,
        dataList: [],
        dataListV: [],
        withDrawId: '',
        person: {
          name: '',
          idCard: '',
          alipayAccount: '',
        },
        flag: true,
        showDialog: false,
        deleteToast: false,
        failPic: require("../../../static/chjImg/fail.png"),
        input_alipay: '',
      }
    },
    filters: {
      toThousands(num) {
        var num = Number(num)
        var num1 = num.toFixed(2).split('.')[0]
        var num2 = num.toFixed(2).split('.')[1]
        var num3 = (num1 || 0).toString(), result = '';
        while (num3.length > 3) {
          result = ',' + num3.slice(-3) + result;
          num3 = num3.slice(0, num3.length - 3);
        }
        if (num3) {
          result = num3 + result;
        }
        if (typeof num2 !== 'undefined') {
          result = result + '.' + num2
        }
        return result;
      }
    },
    computed: {},
    created() {

      this.fetchDataList(this.input_alipay)
    },
    methods: {
      // 搜索
      searchData() {
        if (!this.input_alipay) {
          this.$vux.toast.text('请输入支付宝账号！', 'middle')
          return;
        } else {
          this.fetchDataList(this.input_alipay)
        }
      },
      //获取列表数据
      fetchDataList(val) {
        this.$vux.loading.show({text: '正在加载'})
        core.fetchDataList({
          type: this.isAct == 'L' ? '个体' : '个体工商',
          zfb: val,
        }).then(data => {
          this.$vux.loading.hide()
          if (data.code && '00' == data.code) {
            this.dataList = data.result;
            this.dataListV = data.result;
          } else {
            this.$vux.toast.text(data.message, 'middle')
          }
        })
      },
      inputBlur() {
        this.inputTimer = setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100)
      },
      inputFocus() {
        clearTimeout(this.inputTimer)
      },

      // 排序
      changeOrder() {
        if (this.flag) {
          this.dataList.sort(this.compareKey("ableWithdrawMoney", 'L'));
          this.flag = !this.flag
        } else {
          this.dataList.sort(this.compareKey("ableWithdrawMoney", "R"));
          this.flag = !this.flag
        }

      },
      // 删除账号
      deleteAccount(id){
        this.withDrawId = id
        this.deleteToast = true;
      },
      confirm_delete(){
        this.$vux.loading.show({text: '正在加载'})
        core.deleteAccount({
          withDrawId: this.withDrawId,
        }).then(data => {
          this.$vux.loading.hide()
          if (data.code && '00' == data.code) {
            this.$vux.toast.text('删除成功！', 'middle')
            this.fetchDataList(this.input_alipay)
            this.deleteToast = false;
          } else {
            this.$vux.toast.text(data.message, 'middle')
          }
        })
      },
      addAccount() {
        this.$router.push({path: '/addAccount'})
      },
      submitAccountInfo() {
        if (!this.person.name) {
          this.$vux.toast.text('姓名不能为空！', 'middle')
          return
        }

        if (!this.person.idCard) {
          this.$vux.toast.text('身份证号不能为空！', 'middle')
          return
        } else if (!checkInfo(this.person.idCard)) {
          this.$vux.toast.text('请输入正确的身份证号码！', 'middle')
          return
        }
        if (!this.person.alipayAccount) {
          this.$vux.toast.text('支付宝账号不能为空！', 'middle')
          return
        }
        core.submitPresonInfo({
          zfb: this.person.alipayAccount,
          name: this.person.name,
          idCardNumber: this.person.idCard,
          type: '个体',
          businessLicense: '',
        }).then(data => {
          if (data.code && '00' == data.code) {
            this.$vux.toast.text('新增账号成功！', 'middle')
            this.fetchDataList(this.input_alipay)
            this.showDialog = false;
          } else {
            this.$vux.toast.text(data.message, 'middle')
          }
        })
      },
      // 数组对象的排序
      compareKey(propName, s) {
        return function (obj1, obj2) {
          if (s == 'L') {
            if (obj1[propName] < obj2[propName]) {
              return -1;
            } else if (obj1[propName] === obj2[propName]) {
              return 0;
            } else {
              return 1;
            }
          }else if(s == 'R'){
            if (obj1[propName] > obj2[propName]) {
              return -1;
            } else if (obj1[propName] === obj2[propName]) {
              return 0;
            } else {
              return 1;
            }
          }
        };
      }

    }


  }
</script>

<style lang="less">
  .quotaDetail {
    .vux-header {
      background-color: #FFF;
      color: #333;
    }
    .vux-header-title, .vux-header-back {
      color: #FFF;
    }
    .vux-header .vux-header-title {
      color: #000;
    }
    .vux-header-back {
      display: none;
    }
    .vux-header .vux-header-left .left-arrow:before {
      content: "";
      position: absolute;
      width: 12px;
      height: 12px;
      border: 1px solid #999;
      border-width: 1px 0 0 1px;
      -webkit-transform: rotate(315deg);
      transform: rotate(315deg);
      top: 8px;
      left: 7px;
    }
    .header-bar-left {
      width: 50%;
      text-align: center;
      padding: 0.875rem 0;
      color: #fd9124;
      font-size: 1.063rem;
      background-color: #fff;
      font-weight: 700;
      border-radius: 0.313rem 0rem 0rem 0.313rem;
    }
    .header-bar-left.active {
      background-color: #fd9124;
      color: #fff;
    }
    .header-bar-right {
      width: 50%;
      text-align: center;
      padding: 0.875rem 0;
      color: #fd9124;
      font-size: 1.063rem;
      background-color: #fff;
      font-weight: 700;
      border-radius: 0rem 0.313rem 0.313rem 0rem;
    }
    .header-bar-right.active {
      background-color: #fd9124;
      color: #fff;
    }
    .logo {
      display: inline-block;
      width: 1.75rem;
      height: 1.75rem;
      background: url("../../../static/chjImg/alipay-logo.png") no-repeat center center/contain;
      vertical-align: middle;
    }
    .input-alipay {
      border-radius: 0.313rem;
      border: solid 0.063rem #bebebe;
      padding: 0 0.563rem;
      width: 65%;
      float: left;
      outline: none;
      font-size: 0.875rem;
      height: 42px;
      line-height: 42px;
    }
    .search-alipay {
      display: inline-block;
      font-size: 1rem;
      color: #fd9124;
      border-radius: 0.313rem;
      border: solid 0.063rem #fd9124;
      width: 25%;
      text-align: center;
      float: right;
      height: 42px;
      line-height: 42px;
    }
    .banner-con {
      margin: 0.625rem 0;
      padding: 1.719rem 0.938rem;
      background-color: #FFF;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
    }
    .card-pic {
      width: 4.125rem;
      height: 2.813rem;
      background: url("../../../static/chjImg/id-card.png") no-repeat center center/contain;
    }
    .card-pic-shop {
      width: 4.125rem;
      height: 2.813rem;
      background: url("../../../static/chjImg/shop-card.png") no-repeat center center/contain;
    }
    .add-account {
      background-color: #fd9124;
      border-radius: 0.313rem;
      font-size: 1rem;
      color: #ffffff;
      padding: 0.625rem 0rem;
      text-align: center;
    }
    .icon {
      width: 1.125rem;
      height: 1.094rem;
      background: url("../../../static/chjImg/delete-icon.png") no-repeat center center/contain;
      margin: 0 auto;
    }
    .vux-table:after {
      content: none;
    }
    .vux-table th:before {
      content: none;
    }
    .shaixuan-icon {
      display: inline-block;
      width: 0.563rem;
      height: 0.844rem;
      background: url("../../../static/chjImg/shaixuan-icon.png") no-repeat center center/contain;
      vertical-align: middle;
    }
    .dialog {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, .5);
      max-width: 750px;
      margin: 0 auto;
      .modal {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        width: 74.665%;
        border-radius: .25rem;
        .modal-head {
          .modal-head-content {
            text-align: center;
            color: #000;
            font-size: 1.125rem;
            padding-top: 1.563rem;
          }
        }
        .modal-body {
          display: flex;
          justify-content: center;
          align-items: center;
          .input-container {
            width: 91.074%;
            height: 2.75rem;
            border: .064rem solid #ddd;
            border-radius: .125rem;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            input {
              width: 90%;
              height: 1rem;
              color: #333;
              font-size: .938rem;
              line-height: 1rem;
              padding: 0;
              margin: 0;
            }
            input::placeholder {
              color: #999;
            }
          }
        }
        .modal-foot {
          display: flex;
          justify-content: space-between;
          p {
            border-top: .032rem solid #d2d3d5;
            height: 3.125rem;
            box-sizing: border-box;
            font-size: 1.125rem;
            line-height: 3.125rem;
            text-align: center;
            width: 50%;

          }
          .cancel {
            color: #000;
            border-right: .032rem solid #d2d3d5;
          }
          .confirm {
            color: #ff8810;
          }
        }
      }
    }
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
      color: #999999;
      font-size: 0.875rem;
    }
    input:-moz-placeholder, textarea:-moz-placeholder {
      color: #999999;
      font-size: 0.875rem;
    }
    input::-moz-placeholder, textarea::-moz-placeholder {
      color: #999999;
      font-size: 0.875rem;
    }
    input:-ms-input-placeholder, textarea:-ms-input-placeholder {
      color: #999999;
      font-size: 0.875rem;
    }
    .input-con {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .input-box {
      display: inline-block;
      border-radius: 0.313rem;
      border: solid 0.063rem #bebebe;
      color: #000;
      font-size: 0.875rem;
      padding: 0.844rem 0;
      width: 68%;
      text-indent: 10px;
      font-size: 0.875rem;
      outline: none;
    }
    .input-header {
      display: inline-block;
      color: #333333;
      font-size: 0.938rem;
      font-weight: 700;
      width: 33%;
    }
    .cancel-btn {
      font-size: 1rem;
      color: #fd9124;
      padding: 0.75rem 2.656rem;
      border-radius: 0.313rem;
      border: solid 0.063rem #fd9124;
    }
    .confirm-btn {
      background-color: #ff8810;
      font-size: 1rem;
      color: #fd9124;
      padding: 0.75rem 2.656rem;
      border-radius: 0.313rem;
      border: solid 0.063rem #fd9124;
      color: #FFF;
    }
  }

</style>
