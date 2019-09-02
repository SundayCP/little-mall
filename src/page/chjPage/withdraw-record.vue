<template>
  <div class="withdraw-record">
    <page-header title="提现记录" bg-color="#ff8810" ft-color="#fff" bd-color="#fff"
                 :need-bottom-border="false" v-if="showHeader" ref="pageHeader"></page-header>
    <div class="list-page-head" ref="listHead">
      <div class="head-content-container">
        <div class="content-left">
          <p class="head-title">可提现金额:</p>
          <p class="head-money"><i>{{head.money}}</i>&nbsp;&nbsp;元 </p>
          <p class="head-money-left">账号余额：{{head.leftMoney}}元</p>
        </div>
        <button class="withdraw-btn" @click="showWithdraw">立即提现</button>
      </div>
    </div>

    <div class="list-table" style="display: flex; flex-direction: column;">
      <div class="input-line" ref="searchLine">
        <div class="input-line-cell input-line-select">
          <div class="select-content" @click="showPicker=!showPicker">
            <p class="select-value">{{searchTime}}</p>
            <img src="../../../static/chjImg/arrow-down.png" alt="" class="down-icon">
          </div>
        </div>
        <div class="input-line-cell input-line-search">
          <div class="search-content">
            <div class="input-container">
              <input type="text" v-model="searchDate" placeholder="请输入日期，例如2018-10-10">
            </div>
            <button class="search-btn" @click="search">筛选</button>
          </div>

        </div>
        <div class="clear"></div>
      </div>
      <div style="overflow-x: scroll;">
        <div class="table-head" ref="tableHead">

          <div class="table-cell">
            <p class="table-cell-content">申请时间</p>
          </div>
          <div class="table-cell">
            <p class="table-cell-content">商户名称</p>
          </div>
          <div class="table-cell">
            <p class="table-cell-content">提现账户</p>
          </div>
          <div class="table-cell">
            <p class="table-cell-content">提现账号</p>
          </div>
          <div class="table-cell">
            <p class="table-cell-content">提现金额</p>
          </div>
          <div class="table-cell">
            <p class="table-cell-content">提现状态</p>
          </div>
          <div class="clear"></div>
        </div>
        <scroller lock-x
                  :bounce="false"
                  :use-pullup="canLoad"
                  @on-pullup-loading="load"
                  :pullup-config="pullupConfig"
                  :height="scrollHeight"
                  ref="scroll" class="scroll-table">
          <div>

            <div class="table-body">
              <div class="table-body-line-group" v-for="item in dataList.format">
                <div class="table-body-line-title">{{item.groupName}}</div>
                <div class="table-body-line" v-for="itemIn in item.data">
                  <div class="table-cell">
                    <p class="table-cell-content">{{itemIn.time | timeFormat}}</p>
                  </div>
                  <div class="table-cell">
                    <p class="table-cell-content">{{itemIn.name}}</p>
                  </div>

                  <!--新增 两个-->
                  <div class="table-cell">
                    <p class="table-cell-content">{{itemIn.dakuanType}}</p>
                  </div>
                  <div class="table-cell">
                    <p class="table-cell-content">{{itemIn.alipayAccount}}</p>
                  </div>


                  <div class="table-cell">
                    <p class="table-cell-content">{{itemIn.money}}</p>
                  </div>
                  <div class="table-cell">
                    <p class="table-cell-content">{{itemIn.status | status}}</p>
                  </div>
                  <div class="clear"></div>
                </div>
              </div>


            </div>
            <load-more :show-loading="loading" :tip="loadTip"></load-more>

          </div>
        </scroller>
      </div>
    </div>

    <div class="dialog bank-dialog" v-show="bankModal.showModal">
      <div class="modal">
        <div class="modal-head">
          <p class="modal-head-content">提现方式</p>
        </div>
        <div class="modal-body">
          <div class="modal-input-container">
            <!--提现方式-->
            <div class="input-wrapper select-long" @click="choosePayType">
              <div class="label-container">
                <p class="label">提现方式</p>
              </div>
              <div class="input-box">
                <input type="text" v-model="bankModal.payType" placeholder="请选择支付方式" readonly @focus="inputFocus"
                       @blur="inputBlur">
                <img src="../../../static/chjImg/act-down.png" class="select-down">
              </div>
            </div>
            <div v-show="bankModal.payType==='银行卡'">
              <!--银行名称-->
              <div class="input-wrapper select-long" @click="bankPicker.showBankPicker=true">
                <div class="label-container">
                  <p class="label">银行名称</p>
                </div>
                <div class="input-box">
                  <input type="text" v-model="bankPicker.selectB[0]" placeholder="请选择银行名称" readonly @focus="inputFocus"
                         @blur="inputBlur">
                  <img src="../../../static/chjImg/act-down.png" class="select-down">
                </div>
              </div>

              <!--开户银行-->
              <div class="input-wrapper">
                <div class="label-container">
                  <p class="label">开户银行</p>
                </div>
                <div class="input-box">
                  <input type="text" v-model="bankModal.bankOpen" placeholder="请输入开户银行名称" @focus="inputFocus"
                         @blur="inputBlur">
                </div>
              </div>

              <!--卡号-->
              <div class="input-wrapper">
                <div class="label-container">
                  <p class="label">卡号</p>
                </div>
                <div class="input-box">
                  <input type="text" v-model="bankModal.bankCard" placeholder="请输入银行卡号" @focus="inputFocus"
                         @blur="inputBlur">
                </div>
              </div>

              <!--真实姓名-->
              <div class="input-wrapper">
                <div class="label-container">
                  <p class="label">真实姓名</p>
                </div>
                <div class="input-box">
                  <input type="text" v-model="bankModal.realName" placeholder="请输入真实姓名" @focus="inputFocus"
                         @blur="inputBlur">
                </div>
              </div>
            </div>
            <div v-show="bankModal.payType==='支付宝'">

              <!--支付宝账号-->
              <div class="input-wrapper">
                <div class="label-container">
                  <p class="label">支付宝账号</p>
                </div>
                <div class="input-box">
                  <input type="text" v-model="bankModal.alipay" placeholder="支付宝账号" @focus="inputFocus"
                         @blur="inputBlur">
                </div>
              </div>

              <!--真实姓名-->
              <div class="input-wrapper">
                <div class="label-container">
                  <p class="label">真实姓名</p>
                </div>
                <div class="input-box">
                  <input type="text" v-model="bankModal.realName" placeholder="请输入真实姓名" @focus="inputFocus"
                         @blur="inputBlur">
                </div>
              </div>
            </div>

          </div>

        </div>
        <div class="modal-foot">
          <p class="confirm" @click="confirmBankModal" style="width: 100%;">提交</p>
        </div>
        <img src="../../../static/chjImg/modal-close.png" @click="bankModal.showModal=false" class="modal-close">
      </div>
    </div>

    <!--引导绑定支付宝-->
    <div class="dialog bank-dialog" v-show="withdrawTipModal.showModal">
      <div class="modal">

        <div class="modal-body">
          <p class="tip">提现到支付宝账户更方便快捷<br>建议完善支付宝信息</p>

        </div>
        <div class="modal-foot">
          <!--<p class="cancel" @click="withdrawTipCancel">不用了</p>-->
          <p class="confirm" style="width: 100%;" @click="withdrawTipConfirm">去完善</p>
        </div>
        <img src="../../../static/chjImg/modal-close.png" @click="withdrawTipClose" class="modal-close">
      </div>
    </div>

    <!--输入提现金额-->
    <div class="dialog" v-show="showDialog">
      <div class="modal" style="position: absolute; padding: 0.938rem;">
        <div class="modal-head">
          <p class="modal-head-content" style="padding-top: 0.5rem;">申请提现</p>
        </div>
        <div class="modal-body">
          <div class="input-container"><input type="number" v-model="withdrawMoney" placeholder="请输入提现金额"
                                              style="outline: none;" @focus="inputFocus"
                                              @blur="inputBlur"></div>
        </div>
        <div class="modal-foot">
          <!--<p class="cancel" @click="showDialog=false">取消</p>-->
          <!--<p class="confirm" @click="withdraw">确定</p>-->
          <div class="nextBtn" @click="withdraw">下一步</div>
        </div>
        <img src="../../../static/chjImg/modal-close.png"
             style=" position: absolute; right: .7rem; top: .7rem; width: 1rem;" @click="showDialog=false">
      </div>
    </div>

    <!--新增的提现方式-->
    <div class="dialog" v-show="showPayMethod">
      <div class="modal" style="position: absolute;padding: 0.938rem 0.938rem 1.563rem;">
        <div class="modal-head">
          <p class="modal-head-content" style="padding-top: 0.5rem;font-weight: 700;">提现方式</p>
        </div>
        <div class="modal-body-new">

          <div style="margin-top: 1.25rem" class="select-box-contain01">
            <span class="select-box-con" v-show="noPrivate" :class="{active: isAct}"
                  @click="!isAct ? isAct=!isAct : isAct=isAct;"></span>
            <span class="select-box-con-no" v-show="!noPrivate"></span>
            <span class="select-box-header" @click="!isAct ? isAct=!isAct : isAct=isAct;" v-show="noPrivate">个体工商</span>
            <span class="select-box-header" v-show="!noPrivate">个体工商</span>
          </div>
          <div v-show="noPrivate" style="position: relative">
            <select name="" class="select-box" v-model="selectValBussiness" @change="selectValue" @focus="inputFocus"
                    @blur="inputBlur">
              <option v-for="(item,index) in selectA" :value="item.value" :disabled="item.frozen" :label="item.label"
                      :key="index">{{item.label}}</option>
            </select>
            <span class="iconfont icon-sanjiaoxing" style="position: absolute;top: 45%;right: 5%"></span>
          </div>
          <div v-show="!noPrivate" style="margin-top: 0.656rem;position: relative;">
            <p style="color: #fd2424;font-size: 0.875rem;line-height: 1.563rem;">您还未开通个体工商账号提款功能；</p>
            <p style="font-size: 0.875rem;color: #666666;line-height: 1.563rem;">
              个体工商账号拥有大额提款功能，省时省力快去开通吧！
            </p>
            <span class="open-click" @click="openClick">点我开通</span>
          </div>

          <div style="margin-top: 1.25rem" class="select-box-contain02">
            <span class="select-box-con" :class="{active: !isAct}"
                  @click="(noPrivate && isAct) ? isAct=!isAct : isAct=isAct"></span>
            <span class="select-box-header" @click="(noPrivate && isAct) ? isAct=!isAct : isAct=isAct">个体账号</span>
          </div>
          <div style="position: relative">
            <select name="" class="select-box" v-model="selectValPerson" @change="selectValue" @focus="inputFocus"
                    @blur="inputBlur">
              <option v-for="(item,index) in selectB" :value="item.value" :disabled="item.frozen" :label="item.label"
                      :key="index">{{item.label}}</option>
            </select>
            <span class="iconfont icon-sanjiaoxing" style="position: absolute;top: 45%;right: 5%"></span>
          </div>
          <div style="font-size: 0.813rem;color: #fd9124;margin-top: 0.594rem">
            *单次最多可提现额度500
          </div>
        </div>
        <div class="modal-foot">
          <div class="next-section" @click="submitBtn">
            下一步
          </div>
        </div>
        <img src="../../../static/chjImg/modal-close.png"
             style=" position: absolute; right: .7rem; top: 1rem; width: 1rem;" @click="closeSelect">
      </div>
    </div>
    <!--提现的结果成功弹窗-->
    <div class="dialog" v-show="successToast">
      <div class="modal" style="padding: 0.938rem;">
        <div class="modal-body-new">
          <img :src="successPic" alt="" style="width: 20%;display: block;margin: 0 auto;">
          <p style="text-align: center;margin: 0.938rem 0 1.281rem">恭喜你提现成功</p>
        </div>
        <div class="modal-foot" style="justify-content: space-around;">
          <div class="cancel-btn" @click="colseSuccess">取消</div>
          <div class="confirm-btn" @click="colseSuccess">确定</div>
        </div>
      </div>
    </div>
    <!--提现的结果失败弹窗-->
    <div class="dialog" v-show="failToast">
      <div class="modal" style="padding: 0.938rem;">
        <div class="modal-body-new">
          <img :src="failPic" alt="" style="width: 20%;display: block;margin: 0 auto;">
          <div style="text-align: center;margin: 0.938rem auto 1.281rem;color: #666666;font-size: 1rem;width: 180px;">
            <p style="margin-bottom: 8px;line-height: 22px;">{{textError}}</p>
            <!--<p>如继续提现请添加提现账号</p>-->
          </div>
        </div>
        <div class="modal-foot" style="justify-content: space-around;">
          <div class="cancel-btn" @click="colseFail">取消</div>
          <div class="confirm-btn" @click="colseFail">确定</div>
        </div>
      </div>
    </div>


    <!--选择时间段-->
    <select-picker :picker-data="pickerData" :show="showPicker" @choose="getPickerData"></select-picker>

    <!--选择提现方式-->
    <select-picker :picker-data="bankModal.payTypeData" :show="bankModal.showPayTypePicker"
                   @choose="getPayType" :default-item="bankModal.payType"></select-picker>

    <!--选择银行-->
    <div class="picker-modal" v-show="bankPicker.showBankPicker">
      <div class="picker-container">
        <div class="picker-header">
          <p class="picker-confirm" @click="bankPicker.showBankPicker=false">确认</p>
        </div>
        <picker :data="bankPicker.banks" v-model="bankPicker.selectB"></picker>
      </div>
    </div>

  </div>
</template>

<script>
  import PageHeader from './base/page-header'
  import SelectPicker from './base/select-picker'

  import {LoadMore, Picker, Scroller, Toast} from 'vux'

  import {
    getAccountMoney,
    getWithdrawRecordList,
    withdrawMoney,
    withdrawNeedPopup,
    withdrawBindAccount,
    getPayMethod
  } from '../../core/chjApi'

  import bank from '../../../static/js/bank'
  import {debug, time} from "./js/util";

  const PAGE_SIZE = 5;
  const moneyReg = /^[0-9]{1,}$/
  let bankName = bank.map(item => item.text)

  export default {
    name: "withdraw-record",
    data() {
      return {
        showHeader: true,
        scrollHeight: '',

        head: {
          money: '0.00',
          leftMoney: '0.00'
        },


        searchTime: '全部',
        searchDate: '',

        dataList: {
          origin: [],
          filterList: [],
          format: []
        },

        showDialog: false,
        withdrawMoney: '',

        withdrawTipModal: {
          showModal: false
        },

        bankModal: {
          payType: '支付宝',
          // payTypeData: ['支付宝', '银行卡'],
          payTypeData: ['支付宝'],
          canChooseType: true,
          showPayTypePicker: false,

          bankOpen: '',
          bankCard: '',
          realName: '',
          alipay: '',
          showModal: false
        },
        bankPicker: {
          banks: [bankName],
          showBankPicker: false,
          selectB: []
        },

        pickerData: ['全部', '近7天', '近30天'],
        showPicker: false,

        selectTime: ['', ''],

        pageIndex: 1,

        loading: true,
        loadTip: '加载中...',

        canLoad: true,
        canPull: true,
        scrollHeight: '',
        pullupConfig: {
          content: '',
          downContent: '',
          upContent: '',
          loadingContent: ''
        },


        // 个体工商
        selectA: [],
        // 个体账号
        selectB: [],
        // 提现方式
        showPayMethod: false,
        selectValBussiness: "",   //起始的值要通过数据里获得值
        selectValPerson: '',
        withdrawAmountId: '',

        noPrivate: false,
        isAct: false,

        failToast: false,
        successToast: false,
        textError: '',

        successPic: require("../../../static/chjImg/success.png"),
        failPic: require("../../../static/chjImg/fail.png"),
      }
    },
    computed: {
      withdrawType() {
        if (this.bankModal.payType === '支付宝') {
          return 'alipay'
        } else if (this.bankModal.payType === '银行卡') {
          return 'bank'
        }
      }
    },
    created() {
      debug('11111')
      this._getAccountMoney()
    },
    methods: {
      withdrawTipClose() {
        this.withdrawTipModal.showModal = false;
        this.showDialog = true
      },
      withdrawTipCancel() {
        this.withdrawTipModal.showModal = false;
        this.showDialog = true;
        //设置cookie
        document.cookie = 'needPopup=N;domain=51bizhong.com'
      },
      withdrawTipConfirm() {
        this.withdrawTipModal.showModal = false;
        Object.assign(this.bankModal, {
          canChooseType: false,
          payType: '支付宝',
          showModal: true
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

      // 选择的值
      selectValue() {
        console.log(  '12-------')
      },
      closeSelect(){
        this.showPayMethod=false;
      },
      colseSuccess() {
        this.successToast = false;
        window.location.reload()
      },
      colseFail() {
        this.failToast = false;
        // window.location.reload()
      },
      //点击开通
      openClick() {
        this.$router.push({path: '/addAccount'})
      },
      // 下一步提现
      submitBtn() {
        if (this.isAct) {
          this.withdrawAmountId = this.selectValBussiness
        } else {
          this.withdrawAmountId = this.selectValPerson
        }
        if (!this.withdrawAmountId) {
          this.$vux.toast.text('请选择提现账号！', 'middle');
          return;
        }
        withdrawMoney({
          amount: this.withdrawMoney,
          withdrawAmountId: this.withdrawAmountId,
        }).then(data => {
          if (data.code && data.code === '00') {
            this.showPayMethod = false
            this.successToast = true;
          } else {
            this.showPayMethod = false
            this.textError = data.message;
            this.failToast = true
          }
        })
      },
      // 获取选择提现方式的信息
      getPayMethods() {
        getPayMethod().then(data => {
          if (data.code && '00' == data.code) {
            if (!data.result.individualBusinessAccountList.length) {
              this.noPrivate = false;
              this.isAct = false;

              if (!data.result.individualAccountList.length) {

              } else {
                this.selectB = data.result.individualAccountList.map(item => {
                  return {
                    value: item.id,
                    label: item.name + "可提现额度" + item.ableWithdrawMoney,
                    frozen: item.frozen,
                  }
                })
                var arrB = data.result.individualAccountList;
                arrB.sort(this.compareKey("ableWithdrawMoney"))
                this.selectValPerson = arrB[0].id

              }
            } else {
              this.noPrivate = true;
              this.isAct = true;
              this.selectA = data.result.individualBusinessAccountList.map(item => {
                return {
                  value: item.id,
                  label: item.type + '' + item.name + "可提现额度" + item.ableWithdrawMoney,
                  frozen: item.frozen,
                }
              })
              var arrB = data.result.individualBusinessAccountList;
              arrB.sort(this.compareKey("ableWithdrawMoney"))
              this.selectValBussiness = arrB[0].id
              if (!data.result.individualAccountList.length) {

              } else {
                this.selectB = data.result.individualAccountList.map(item => {
                  return {
                    value: item.id,
                    label: item.name + "可提现额度" + item.ableWithdrawMoney,
                    frozen: item.frozen,
                  }
                })
                var arrB = data.result.individualAccountList;
                arrB.sort(this.compareKey("ableWithdrawMoney"))
                this.selectValPerson = arrB[0].id
              }
            }
          }
        })

      },
      // 数组对象的排序
      compareKey(propName) {
        return function (obj1, obj2) {
          if (obj1[propName] > obj2[propName]) {
            return -1;
          } else if (obj1[propName] === obj2[propName]) {
            return 0;
          } else {
            return 1;
          }
        }
      },
      confirmBankModal() {
        if (this.bankModal.payType === '支付宝') {
          if (!this.bankModal.alipay) {
            this.$vux.toast.text('请输入支付宝账号！', 'middle');
            return
          }
          if (!this.bankModal.realName) {
            this.$vux.toast.text('请输入真实姓名！', 'middle');
            return
          }
        } else if (this.bankModal.payType === '银行卡') {
          if (!this.bankPicker.selectB[0]) {
            this.$vux.toast.text('请选择银行名称！', 'middle');
            return
          }
          if (!this.bankModal.bankOpen) {
            this.$vux.toast.text('请输入开户银行！', 'middle');
            return
          }
          if (!this.bankModal.bankCard) {
            this.$vux.toast.text('请输入银行卡号！', 'middle');
            return
          }
          if (!this.bankModal.realName) {
            this.$vux.toast.text('请输入真实姓名！', 'middle');
            return
          }
        }
        withdrawBindAccount({
          withDrawType: this.withdrawType,
          aliPayAccount: this.bankModal.alipay,
          realname: this.bankModal.realName,
          bankName: this.bankPicker.selectB[0],
          bankBranch: this.bankModal.bankOpen,
          bankNo: this.bankModal.bankCard
        }).then(data => {
          if (data.code && data.code === '00') {
            this.bankModal.showModal = false;
            this.showDialog = true
          } else {
            this.$vux.toast.text(data.message, 'middle')
          }
        })
      },
      getPayType(val) {
        this.bankModal.payType = val
      },
      choosePayType() {
        if (this.bankModal.canChooseType) {
          this.bankModal.showPayTypePicker = !this.bankModal.showPayTypePicker
        }
      },
      load() {
        if (this.canLoad && this.canPull) {
          this._getData()
          setTimeout(() => {
            this.$refs.scroll.donePullup();
          }, 100)
        } else {
          setTimeout(() => {
            this.$refs.scroll.donePullup();
          }, 100)
        }
      },
      withdraw() {
        debug(this.withdrawMoney, this.head.money)
        if (!this.withdrawMoney) {
          this.$vux.toast.text('请输入提现数额！', 'middle')
          return;
        }
        if (+this.withdrawMoney < .1) {
          this.$vux.toast.text('请输入正确的提现数额！', 'middle')
          return;
        }
        if (this.withdrawMoney > +this.head.money) {
          this.$vux.toast.text('提现金额需不大于可提现金额！', 'middle')
          return;
        }
        this.showDialog = false;
        this.showPayMethod = true;
      },
      showWithdraw() {
        if (this.head.money < .1) {
          this.$vux.toast.text('可提现余额不足！', 'middle')
          return;
        } else {
          withdrawNeedPopup().then(data => {
            if (data.code && data.code === '00') {
              let item = data.result
              //item.alipay,item.bank,item.needPopup
              if (item.alipay === 'Y' || (item.bank === 'Y' && item.needPopup === 'N')) {//直接
                this.showDialog = true;
              } else if (item.alipay === 'N') {
                if (item.bank === 'Y' && item.needPopup === 'Y') {//提示
                  this.withdrawTipModal.showModal = true
                } else if (item.bank === 'N') {//绑定
                  this.bankModal.showModal = true
                }
              }
            } else {
              this.$vux.toast.text(data.message, 'middle')
            }
          })
        }
      },
      search() {
        if (!/^20[12][0-9](-|\.)(0|1)?[0-9](-|\.)(0|1|2|3)?[0-9]$/.test(this.searchDate)) {
          this.$vux.toast.text('请输入正确格式的日期！', 'middle');
          return;
        }
        this.selectTime = time(this.searchDate)
        debug(this.selectTime)
        this.dataList.origin = [];
        this.dataList.filterList = [];
        this.dataList.format = [];
        this.pageIndex = 1;
        this._getData()
      },
      getPickerData(val) {
        debug(val)
        this.searchTime = val;
        if (this.searchTime === '全部') {
          this.selectTime = ['', '']
        } else {
          this.selectTime = time(this.searchTime)
          debug(this.selectTime)
        }
        this.pageIndex = 1;
        this.dataList = {
          origin: [],
          filterList: [],
          format: []
        };
        this.canLoad=true;
        this.canPull=true;
        this._getData();
      },
      _getAccountMoney() {
        getAccountMoney().then(data => {
          debug('getData', data)
          if (data.code && data.code === '00') {
            this.head.money = data.result.withdrawBalance
            this.head.leftMoney = data.result.balance
          } else {
            this.$vux.toast.text(data.message, 'middle')
          }
        })
      },

      _withdraw() {
        withdrawMoney({
          amount: this.withdrawMoney
        }).then(data => {
          if (data.code && data.code === '00') {
            this.$vux.toast.text('提现申请成功！', 'middle')
            window.location.reload()
          } else {
            this.$vux.toast.text(data.message, 'middle')
          }
        })
      },

      _getData() {
        this.canPull = false
        this.loadTip = '加载中';
        this.loading = true;
        getWithdrawRecordList({
          pageSize: PAGE_SIZE,
          pageIndex: this.pageIndex,
          startTime: this.selectTime[0],
          endTime: this.selectTime[1],
        }).then(data => {
          if (data.code && data.code === '00') {
            if (data.result.amount == 0) {
              this.loadTip = '暂无数据';
              this.loading = false;
              this.canLoad = false
            } else {
              if ((this.pageIndex * PAGE_SIZE) >= data.result.amount) {
                this.canLoad = false
                this.loadTip = '暂无更多数据';
                this.loading = false;
              } else {
                this.loadTip = '上拉加载';
                this.loading = false;
              }
              this.dataList.origin = this.dataList.origin.concat(data.result.data);
              debug(this.dataList.origin)
              this.dataList.filterList = this.dataList.origin.map(item => ({
                time: item.createTime,
                status: item.status,
                month: item.monthText,
                money: item.amount,
                name: item.merchantName,
                alipayAccount: item.alipayAccount,
                dakuanType: item.dakuanType,
              }))
              debug(this.dataList.filterList)
              // console.log(this.dataList.filterList)
              this.dataList.format = []
              this._formatData(this.dataList.filterList, this.dataList.format)
              debug(this.dataList.format)
              // console.log(this.dataList.format)
            }


            this.pageIndex += 1;
          } else {
            this.$vux.toast.text(data.message, 'middle')
            this.loadTip = '上拉加载';
            this.loading = false;
          }
          this.canPull = true

        })
      },
      _formatData(oList, fList) {
        let groupIndex = 0;
        oList.forEach((item, index, arr) => {
          if (index === 0) {
            let itemGroup = {
              groupName: arr[index].month,
              data: [arr[index]]
            };
            fList.push(itemGroup)
          } else {
            if (arr[index].month === arr[index - 1].month) {
              fList[groupIndex].data.push(arr[index])
            } else if (arr[index].month !== arr[index - 1].month) {
              groupIndex += 1
              let itemGroup = {
                groupName: arr[index].month,
                data: [arr[index]]
              };
              fList.push(itemGroup)
            }
          }
        })
      }
    },
    mounted() {
      debug(window.innerHeight)
      debug(this.$refs.pageHeader.$el.clientHeight)
      debug(this.$refs.listHead.clientHeight)
      debug(this.$refs.searchLine.clientHeight)
      debug(this.$refs.tableHead.clientHeight)
      if (this.showHeader) {
        this.scrollHeight = (window.innerHeight - this.$refs.pageHeader.$el.clientHeight - this.$refs.listHead.clientHeight - this.$refs.searchLine.clientHeight - this.$refs.tableHead.clientHeight - 10) + 'px'
      } else {
        this.scrollHeight = (window.innerHeight - this.$refs.listHead.clientHeight - this.$refs.searchLine.clientHeight - this.$refs.tableHead.clientHeight - 10) + 'px'
      }

      this._getData();
      this.getPayMethods();
    },


    filters: {
      status(val) {
        if (val === 'WAIT') {
          return '申请中'
        } else if (val === 'SUCCESS') {
          return '已通过'
        } else if (val === 'FAIL') {
          return '已拒绝'
        }
      },
      timeFormat(val) {
        let t = new Date(val);
        let y = t.getFullYear();
        let M = t.getMonth() > 8 ? t.getMonth() + 1 : '0' + (t.getMonth() + 1);
        let d = t.getDate() > 9 ? t.getDate() : '0' + t.getDate();
        let h = t.getHours() > 9 ? t.getHours() : '0' + t.getHours();
        let m = t.getMinutes() > 9 ? t.getMinutes() : '0' + t.getMinutes();
        let s = t.getSeconds() > 9 ? t.getSeconds() : '0' + t.getSeconds();
        return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s
      }
    },
    components: {
      PageHeader, Scroller, Toast, SelectPicker, LoadMore, Picker
    },


  }
</script>

<style scoped lang="less">
  .list-page-head {
    height: 3.875rem;
    background-color: #ff8810;
    position: relative;
    margin-bottom: 2.2rem;
    .head-content-container {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
      width: 91.47%;
      height: 5.625rem;
      border-radius: .25rem;
      background-color: #fff;
      box-shadow: 0 0.125rem 0.359rem 0.016rem #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .content-left {
        margin-left: .938rem;

        .head-title {
          color: #666;
          font-size: .75rem;
        }
        .head-money {
          color: #333;
          font-size: .75rem;
          padding-top: .594rem;
          i {
            font-size: 1.5rem;
          }
        }
        .head-money-left {
          padding-top: .75rem;
          color: #999;
          font-size: .75rem;
        }
      }
      .withdraw-btn {
        margin-right: .938rem;
        width: 5.2rem;
        height: 1.875rem;
        box-sizing: border-box;
        border-radius: 0.25rem;
        border: .064rem solid #50ce4d;
        outline: none;
        background: none;
        color: #50ce4d;
        font-size: .875rem;
      }

    }
  }

  .list-table {
    .input-line {
      height: 3.125rem;
      background-color: #ffffff;
      box-shadow: 0rem 0.125rem 0.359rem 0.016rem #eee;
      margin-bottom: .313rem;
      .input-line-cell {
        float: left;
        box-sizing: border-box;
        height: 100%;
      }
      .input-line-select {
        width: 20%;

        display: flex;
        justify-content: center;
        align-items: center;
        .select-content {
          width: 80%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .select-value {
            color: #666;
            font-size: .875rem;
          }
          .down-icon {
            width: .813rem;
            height: .281rem;
          }
        }
      }
      .input-line-search {
        width: 80%;
        display: flex;
        justify-content: center;
        .search-content {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .input-container {
            margin-left: .5rem;
            width: 80%;
            height: 1.75rem;
            background-color: #f2f3f5;
            border-radius: 0.125rem;
            display: flex;
            justify-content: center;
            align-items: center;
            input {
              background: none;
              border: none;
              outline: none;
              width: 90%;
              height: 1rem;
              color: #333;
              font-size: .875rem;
              line-height: 1rem;
            }
            input::placeholder {
              color: #d1d1d1;
              font-size: .875rem;
              line-height: 1rem;
            }
          }
          .search-btn {
            margin-right: .5rem;
            width: 20%;
            height: 1.75rem;
            background: none;
            border: none;
            outline: none;
            color: #50ce4d;
            font-size: .875rem;

          }
        }
      }
    }
    .table-head {
      height: 2.55rem;
      background-color: #ffffff;
      box-shadow: 0rem 0.063rem 0.188rem 0rem #eee;
      width: 500px;
      display: flex;
      justify-content: space-around;
      .table-cell {
        width: 25%;
        float: left;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        box-sizing: border-box;
        .table-cell-content {
          text-align: center;
          color: #333;
          font-size: 1rem;
        }
      }
    }
    .table-body {
      .table-body-line-group {
        .table-body-line-title {
          height: 1.344rem;
          background: none;
          padding-left: 1rem;
          color: #999;
          font-size: .75rem;
          line-height: 1.344rem;
        }
        .table-body-line {
          background-color: #fff;
          margin-bottom: .313rem;
          box-shadow: 0rem 0.063rem 0.188rem 0rem #eee;
          height: 3.125rem;
          display: flex;
          justify-content: space-around;
          .table-cell {
            width: 25%;
            float: left;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            box-sizing: border-box;
            .table-cell-content {
              text-align: center;
              color: #999;
              font-size: .875rem;
              line-height: 1rem;
            }
          }
        }

      }
    }
    .clear {
      clear: both;
    }

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
        height: 5.625rem;
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

  .dialog.bank-dialog {
    .modal {
      .modal-body {
        height: auto;
        .modal-input-container {
          width: 94.667%;
          margin: 2rem auto 0;

          .input-wrapper {
            margin-bottom: 1.219rem;
            display: flex;
            height: 2.188rem;
            border-radius: 0.156rem;
            border: solid 0.032rem #cdcdcd;
            /*box-sizing: border-box;*/

            .label-container {
              width: 5rem;
              display: flex;
              justify-content: center;
              align-items: center;
              .label {
                width: 80%;
                text-align: left;
                color: #333;
                font-size: .75rem;
              }
            }
            .input-box {
              flex-grow: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              input {
                width: 90%;
                outline: none;
                border: none;
                background: none;
                padding: 0;
                margin: 0;
                color: #333;
                font-size: .75rem;
              }
              input::placeholder {
                color: #999;
                font-size: .75rem;
              }
            }
          }
          .input-wrapper.select-long > .input-box {
            position: relative;
            .select-down {
              width: .688rem;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              right: .5rem;
            }
          }
        }
        .tip {
          width: 90%;
          margin: 0 auto;
          text-align: center;
          font-size: .985rem;
          line-height: 1.3rem;
          color: #333;
          padding-top: 2.5rem;
          padding-bottom: 2rem;
        }
      }
      .modal-close {
        position: absolute;
        right: .7rem;
        top: .7rem;
        width: 1rem;
      }
    }
  }

  .picker-modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .5);
    .picker-container {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #fff;
      .picker-header {
        height: 2.5rem;
        border-bottom: .032rem solid #cdcdcd;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .picker-confirm {
          color: #ff8a00;
          font-size: 1rem;
          margin-right: 1rem;
        }
      }
    }
  }

  .dialog .nextBtn {
    width: 121px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #ff8810;
    margin: 0 auto 25px;
    border-radius: 5px;
    color: #FFF;
  }

  .select-box {
    width: 100%;
    height: 2.5rem;
    border-radius: 0.25rem;
    border: solid 0.063rem #bebebe;
    background-color: #FFF;
    margin-top: 0.625rem;
    text-indent: 0.563rem;
    outline: none;
    -webkit-appearance: none;/*兼容苹果手机*/
    font-size: 0.875rem;
    padding: 0px 40px 0 0;
  }

  .select-box-con {
    display: inline-block;
    vertical-align: middle;
    width: 0.938rem;
    height: 0.938rem;
    border-radius: 0.125rem;
    border: solid 0.063rem #fd9124;
  }

  .select-box-con-no {
    display: inline-block;
    vertical-align: middle;
    width: 0.938rem;
    height: 0.938rem;
    border-radius: 0.125rem;
    background-color: #dddddd;
  }

  .select-box-header {
    font-size: 0.938rem;
    font-weight: 550;
    vertical-align: middle;
    margin-left: 0.5rem;
  }

  .select-box-contain01 .select-box-con.active, .select-box-contain02 .select-box-con.active {
    background: url('../../../static/chjImg/select01.png') no-repeat center center/contain;
  }

  .next-section {
    width: 100%;
    height: 2.5rem;
    line-height: 2.5rem;
    background-color: #fd9124;
    border-radius: 0.313rem;
    text-align: center;
    color: #FFF;
    margin-top: 1.969rem;
  }

  .open-click {
    border-radius: 0.313rem;
    border: solid 0.063rem #50ce4d;
    font-size: 0.875rem;
    color: #50ce4d;
    padding: 0.344rem 0.594rem;
    position: absolute;
    right: 0;
    bottom: -0.344rem;
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

  .scroll-table {
    width: 500px;
  }


</style>
