<template>
  <div class="add-item">
    <page-header :title="pageTitle"></page-header>
    <div class="route-container" v-if="page.type===1">
      <div class="route-step">
        <img src="@/../static/chjImg/step1-u.png" class="route-step-img" v-show="route.step!==1">
        <img src="@/../static/chjImg/step1-s.png" class="route-step-img" v-show="route.step===1">
        <p class="route-step-name">创建账户密码</p>
      </div>
      <div class="step-line-container">
        <div class="step-line"></div>
      </div>

      <div class="route-step">
        <img src="@/../static/chjImg/step2-u.png" class="route-step-img" v-show="route.step!==2">
        <img src="@/../static/chjImg/step2-s.png" class="route-step-img" v-show="route.step===2">
        <p class="route-step-name">填写商户信息</p>
      </div>
      <div class="step-line-container">
        <div class="step-line"></div>
      </div>

      <div class="route-step">
        <img src="@/../static/chjImg/step3-u.png" class="route-step-img" v-show="route.step!==3">
        <img src="@/../static/chjImg/step3-s.png" class="route-step-img" v-show="route.step===3">
        <p class="route-step-name">填写折扣信息</p>
      </div>
    </div>

    <div class="content-container">
      <div class="content-step1" v-show="route.step===1">
        <div class="input-container">
          <div class="input-wrapper">
            <div class="label-container">
              <p class="label">账号</p>
            </div>
            <div class="input-box">
              <input type="text" v-model="page1.account" placeholder="请输入账户名" :readonly="page.merchantId">
            </div>
          </div>
          <div class="input-wrapper">
            <div class="label-container">
              <p class="label">密码</p>
            </div>
            <div class="input-box">
              <input type="password" v-model="page1.password" placeholder="请输入6~15位的数字作为密码">
            </div>
          </div>
        </div>
        <div class="type-container" v-if="page.type===1&&!page.merchantId">
          <p class="type-name">商户类型</p>
          <div class="type-select-container">
            <div class="select-item" @click="page1.accountType=item.id" v-for="(item,index) in ableRoleType"
                 :key="index">
              <img src="@/../static/chjImg/checkbox-u.png" class="select-box" v-show="page1.accountType!==item.id">
              <img src="@/../static/chjImg/checkbox-s.png" class="select-box" v-show="page1.accountType===item.id">
              <p class="select-label">{{item.name}}</p>
            </div>
            <!--<div class="select-item" @click="page1.accountType=1">-->
            <!--<img src="@/../static/chjImg/checkbox-u.png" class="select-box" v-show="page1.accountType!==1">-->
            <!--<img src="@/../static/chjImg/checkbox-s.png" class="select-box" v-show="page1.accountType===1">-->
            <!--<p class="select-label">商户</p>-->
            <!--</div>-->
            <!--<div class="select-item" @click="page1.accountType=2">-->
            <!--<img src="@/../static/chjImg/checkbox-u.png" class="select-box" v-show="page1.accountType!==2">-->
            <!--<img src="@/../static/chjImg/checkbox-s.png" class="select-box" v-show="page1.accountType===2">-->
            <!--<p class="select-label">大商户</p>-->
            <!--</div>-->
          </div>
        </div>
      </div>
      <div class="content-step2" v-show="route.step===2" v-if="page.type===1">
        <div class="input-container">
          <div class="input-wrapper">
            <div class="label-container">
              <p class="label">商户名</p>
            </div>
            <div class="input-box">
              <input type="text" v-model="page2.storeName" placeholder="请输入商家名">
            </div>
          </div>

          <div class="input-wrapper">
            <div class="label-container">
              <p class="label">联系电话</p>
            </div>
            <div class="input-box">
              <input type="text" v-model="page2.mobile" placeholder="请输入联系电话">
            </div>
          </div>

          <div class="select-container">
            <div class="select-wrapper" @click="showPicker('p')">
              <p class="select-label">所在省</p>
              <input type="text" placeholder="请选择" v-model="picker.selectP[0]" readonly class="select-input">
              <img src="../../../static/chjImg/act-down.png" class="select-down">
            </div>
            <div class="select-wrapper" @click="showPicker('c')">
              <p class="select-label">所在城市</p>
              <input type="text" placeholder="请选择" v-model="picker.selectC[0]" readonly class="select-input">
              <img src="../../../static/chjImg/act-down.png" class="select-down">
            </div>
          </div>

          <div class="input-wrapper select-long" @click="showPicker('b')">
            <div class="label-container">
              <p class="label">银行名称</p>
            </div>
            <div class="input-box">
              <input type="text" v-model="picker.selectB[0]" placeholder="请选择银行名称" readonly>
              <img src="../../../static/chjImg/act-down.png" class="select-down">
            </div>
          </div>

          <div class="input-wrapper">
            <div class="label-container">
              <p class="label">开户银行</p>
            </div>
            <div class="input-box">
              <input type="text" v-model="page2.bankOpen" placeholder="请输入开户银行名称">
            </div>
          </div>

          <div class="input-wrapper">
            <div class="label-container">
              <p class="label">卡号</p>
            </div>
            <div class="input-box">
              <input type="text" v-model="page2.bankCard" placeholder="请输入银行卡号">
            </div>
          </div>

          <div class="input-wrapper">
            <div class="label-container">
              <p class="label">真实姓名</p>
            </div>
            <div class="input-box">
              <input type="text" v-model="page2.realName" placeholder="请输入真实姓名">
            </div>
          </div>

          <div class="input-wrapper">
            <div class="label-container">
              <p class="label">支付宝账号</p>
            </div>
            <div class="input-box">
              <input type="text" v-model="page2.Alipay" placeholder="请输入支付宝账号">
            </div>
          </div>


        </div>

        <div class="pic-container">
          <p class="pic-name">证件提交</p>
          <div class="pic-upload-container">
            <div class="upload-item">
              <div class="upload-container">
                <img :src="page2.uploadImg1" class="upload-img">
                <form name="headForm1" action="/admin/huabei/file/upload" enctype="multipart/form-data" method="post"
                      id="headForm1">
                  <input type="file" id="input_file_headimg1" name="file"
                         accept="image/png, image/jpeg, image/gif, image/jpg" @change="fileChange(1)">
                </form>
              </div>
              <p class="upload-name">营业执照</p>
            </div>
            <div class="upload-item">
              <div class="upload-container">
                <img :src="page2.uploadImg2" class="upload-img">
                <form name="headForm2" action="/admin/huabei/file/upload" enctype="multipart/form-data" method="post"
                      id="headForm2">
                  <input type="file" id="input_file_headimg2" name="file"
                         accept="image/png, image/jpeg, image/gif, image/jpg" @change="fileChange(2)">
                </form>
              </div>
              <p class="upload-name">身份证正面</p>
            </div>
            <div class="upload-item">
              <div class="upload-container">
                <img :src="page2.uploadImg3" class="upload-img">
                <form name="headForm3" action="/admin/huabei/file/upload" enctype="multipart/form-data" method="post"
                      id="headForm3">
                  <input type="file" id="input_file_headimg3" name="file"
                         accept="image/png, image/jpeg, image/gif, image/jpg" @change="fileChange(3)">
                </form>
              </div>
              <p class="upload-name">身份证反面</p>
            </div>
          </div>
        </div>

      </div>
      <div class="content-step3" v-show="route.step===3" v-if="page.type===1">
        <div class="content-header">
          <p>业务名称</p>
          <p>折扣比例</p>
        </div>
        <scroller lock-x
                  :bounce="false"
                  :use-pullup="canLoad"
                  @on-pullup-loading="load"
                  :pullup-config="pullupConfig"
                  style="height: 20rem;"
                  ref="scroll">
          <div class="item-container">
            <div class="item-line" v-for="(item,index) in page3.itemData">
              <p class="item-line-left">{{item.itemName}}</p>
              <div class="item-percent">
                <div class="input-container">
                  <!--<input type="number" v-model="page3.itemData[index].settlementType==='RATE'?page3.itemData[index].rate:page3.itemData[index].fixedNum">-->
                  <input type="number" v-model="item.rate" v-if="item.settlementType==='RATE'">
                  <input type="number" v-model="item.fixedNum" v-if="item.settlementType==='FIXED_NUM'">

                </div>

                <p>{{item.settlementType==='RATE'?'%':'￥'}}</p>
              </div>
            </div>
            <load-more :show-loading="loading" :tip="loadTip"></load-more>
          </div>
        </scroller>
      </div>
    </div>

    <button class="next-btn" @click="next">
      {{nextBtn}}
    </button>

    <div class="picker-modal" v-show="picker.showPicker">
      <div class="picker-container">
        <div class="picker-header">
          <p class="picker-confirm" @click="confirmPicker">确认</p>
        </div>
        <picker :data="address.province" v-model="picker.selectP" v-show="picker.pickerType==='p'"></picker>
        <picker :data="address.city" v-model="picker.selectC" v-show="picker.pickerType==='c'"></picker>
        <picker :data="banks" v-model="picker.selectB" v-show="picker.pickerType==='b'"></picker>
      </div>


    </div>
  </div>
</template>

<script>
  import PageHeader from './base/page-header'
  import {Loading, LoadMore, Picker, Scroller, Toast} from 'vux'

  import {
    ableCreateRole,
    discountDataDetail,
    discountDataUpdate,
    operatorInfoUpdate,
    storeDetailInfo,
    storeInfoUpdate
  } from '../../core/chjApi'

  import address from '../../../static/js/address'
  import bank from '../../../static/js/bank'
  import {debug} from "./js/util";
  import axios from 'axios'

  const PAGE_SIZE = 5;
  const pwdReg = /^[0-9A-z]{6,15}$/
  let provinceName = address.map(item => (item.regionName));
  let cityName = address[0].childRegions.map(item => (item.regionName));
  let bankName = bank.map(item => item.text)
  debug(provinceName)


  export default {
    name: "add-item",
    data() {
      return {
        page: {
          type: '',
          merchantId: '',
          id: ''
        },
        ableRoleType: [],
        address: {
          province: [provinceName],
          provinceObj: {},
          provinceId: '',
          city: [cityName],
          cityObj: {},
          cityId: ''
        },
        banks: [bankName],
        picker: {
          pickerType: 'p',//p为省，c为市，b为银行
          showPicker: false,
          selectP: [],
          selectC: [],
          selectB: []
        },
        route: {
          step: 1
        },
        page1: {
          accountType: '',
          account: '',
          password: '',
          aliveNumber: '10',
          isLock: 'N'
        },
        page2: {
          storeName: '',
          mobile: '',
          bank: '',
          bankOpen: '',
          bankCard: '',
          realName: '',
          Alipay: '',
          uploadImg1: require('../../../static/chjImg/pic-container.png'),
          has1: false,
          uploadImg2: require('../../../static/chjImg/pic-container.png'),
          has2: false,
          uploadImg3: require('../../../static/chjImg/pic-container.png'),
          has3: false,
        },
        page3: {
          itemData: []
        },

        // fixedNum: 0
        // itemId: 1
        // itemName: "移动虾米音乐"
        // merchantId: 10077
        // rate: 0
        // settlementType: "RATE"

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
        }
      }
    },
    computed: {
      pageTitle() {
        if (this.page.type === 1) {
          if (this.page.merchantId) {
            return '编辑商户'
          } else {
            return '添加商户'
          }
        } else if (this.page.type === 2) {
          if (this.page.merchantId) {
            return '编辑操作员'
          } else {
            return '添加操作员'
          }
        }
      },
      nextBtn() {
        if (this.page.type === 1 && (this.route.step === 1 || this.route.step === 2)) {
          return '下一步'
        } else if ((this.page.type === 1 && this.route.step === 3) || this.page.type === 2) {
          return '完成'
        }
      },
    },
    mounted() {
      this.page.type = this.$route.query.type == 'sh' ? 1 : 2;//1为商户，2为操作员
      this.page.merchantId = this.$route.query.merchantId
      this.page.id = this.$route.query.id

      this.address.provinceObj=address[0]
      this.address.provinceId=address[0].id
      this.address.cityObj=address[0].childRegions[0]
      this.address.cityId=address[0].childRegions[0].id

      if (this.page.type === 1) {
        if (this.page.merchantId) {
          //编辑商户
          this._getEditInfo();
        } else {
          //新建商户
          this._getAbleCreateRole()
        }
      } else if (this.page.type === 2) {
        if (this.page.merchantId) {
          //'编辑操作员'
          this._getEditInfo();
        } else {
          //'添加操作员'
        }
      }
      // this._getAbleCreateRole()
      // this._getEditInfo();
      // this._getDiscountInfo();
    },
    methods: {
      load() {
        if (this.canLoad && this.canPull) {
          this._getDiscountInfo()
          setTimeout(() => {
            this.$refs.scroll.donePullup();
          }, 100)
        } else {
          setTimeout(() => {
            this.$refs.scroll.donePullup();
          }, 100)
        }
      },
      chooseStep(step) {
        this.route.step = step;
      },
      next() {
        let testMsg = [
          '请输入账户',
          '请输入密码',
          '请选择账户类型',
          '请输入账户名称',
          '请输入联系电话',
          '请选择地区',
          '请选择地区',
          '请选择银行',
          '请输入开户行',
          '请输入银行卡号',
          '请输入真实姓名',
          '请输入支付宝账号',
          '请上传营业执照',
          '请上传身份证正面',
          '请上传身份证反面'];
        if (this.page.type === 1) {
          if (this.route.step === 1 || this.route.step === 2) {
            if (this.route.step === 2) {
              if (!this.page1.account) {
                this.$vux.toast.text(testMsg[0], 'middle')
                return;
              }
              if (!this.page1.password && !this.page.merchantId) {
                this.$vux.toast.text(testMsg[1], 'middle')
                return;
              }
              // if (!this.page1.accountType) {
              //   this.$vux.toast.text(testMsg[2], 'middle')
              //   return;
              // }
              // if (!this.page2.storeName) {
              //   this.$vux.toast.text(testMsg[3], 'middle')
              //   return;
              // }
              // if (!this.page2.mobile) {
              //   this.$vux.toast.text(testMsg[4], 'middle')
              //   return;
              // }
              // if (!this.address.provinceId) {
              //   this.$vux.toast.text(testMsg[5], 'middle')
              //   return;
              // }
              // if (!this.address.cityId) {
              //   this.$vux.toast.text(testMsg[6], 'middle')
              //   return;
              // }
              // if (!this.picker.selectB[0]) {
              //   this.$vux.toast.text(testMsg[7], 'middle')
              //   return;
              // }
              // if (!this.page2.bankOpen) {
              //   this.$vux.toast.text(testMsg[8], 'middle')
              //   return;
              // }
              // if (!this.page2.bankCard) {
              //   this.$vux.toast.text(testMsg[9], 'middle')
              //   return;
              // }
              // if (!this.page2.realName) {
              //   this.$vux.toast.text(testMsg[10], 'middle')
              //   return;
              // }
              // if (!this.page2.Alipay) {
              //   this.$vux.toast.text(testMsg[11], 'middle')
              //   return;
              // }
              // if (!this.page2.has1) {
              //   this.$vux.toast.text(testMsg[12], 'middle')
              //   return;
              // }
              // if (!this.page2.has2) {
              //   this.$vux.toast.text(testMsg[13], 'middle')
              //   return;
              // }
              // if (!this.page2.has3) {
              //   this.$vux.toast.text(testMsg[14], 'middle')
              //   return;
              // }
              let _this = this
              this._updateStoreInfo(function () {
                _this.chooseStep(3)
                debug('1232123153156')
                _this._getDiscountInfo()
              })
            } else {
              this.chooseStep(++this.route.step)
            }


          } else if (this.route.step === 3) {
            //验证表单信息
            this._updateDiscountInfo()
          }
        } else if (this.page.type === 2) {
          //验证表单信息
          if (!this.page1.account) {
            this.$vux.toast.text(testMsg[0], 'middle')
            return;
          }
          if (!this.page1.password) {
            this.$vux.toast.text(testMsg[1], 'middle')
            return;
          }
          this._updateOperatorInfo()
        }

      },
      showPicker(type) {
        this.picker.pickerType = type;
        this.picker.showPicker = true
      },
      confirmPicker() {
        this.picker.showPicker = false
        if (this.picker.pickerType === 'p') {
          this.address.provinceObj = address.filter(item => item.regionName === this.picker.selectP[0])[0]
          this.address.provinceId = this.address.provinceObj.id
          debug(this.address.provinceId)
          let cityName = this.address.provinceObj.childRegions.map(item => item.regionName)
          debug(cityName)
          this.address.city = [cityName]
          this.picker.selectC[0] = cityName[0]
          this.address.cityId = this.address.provinceObj.childRegions[0].id
          // debug(city)
        } else if (this.picker.pickerType === 'c') {
          this.address.cityObj = this.address.provinceObj.childRegions.filter(item => item.regionName === this.picker.selectC[0])[0]
          this.address.cityId = this.address.cityObj.id
          debug(this.address.cityId)
        }
      },
      _getAbleCreateRole() {
        ableCreateRole().then(data => {
          if (data.code && data.code === '00') {
            this.ableRoleType = data.result
            this.page1.accountType = this.ableRoleType[0].id;

          } else {
            this.$vux.toast.text(data.message, 'middle')
          }
        })
      },

      //商户信息详情
      _getEditInfo() {
        storeDetailInfo({
          merchantId: this.page.merchantId
        }).then(data => {
          if (data.code && data.code === '00') {
            let item = data.result;
            this.page1.account = item.username;
            this.page1.password = '';
            this.page1.aliveNumber = item.aliveNumber;
            this.page1.isLock = item.isLock;
            this.page1.accountType = item.roleId;
            this.page2.storeName = item.merchantName;
            this.page2.mobile = item.mobile;
            this.address.provinceId = item.provinceId;
            this.picker.selectP = item.province ? [item.province] : [null];
            this.address.cityId = item.cityId;
            this.picker.selectC = [item.city];
            this.address.provinceObj = address.filter(item => item.regionName === this.picker.selectP[0])[0];
            this.address.city = (this.address.provinceObj) ? [this.address.provinceObj.childRegions.map(item => item.regionName)] : [];
            this.picker.selectB[0] = item.bankName;
            this.page2.bankOpen = item.bankBranch;
            this.page2.bankCard = item.bankNum;
            this.page2.realName = item.realname;
            this.page2.Alipay = item.alipay;
            this.page2.uploadImg1 = item.businessLicense ? item.businessLicense : 'http://c1.51jujibao.com/static/mod/julePayV2/static/chjImg/pic-container.png';
            this.page2.uploadImg2 = item.idCardFront ? item.idCardFront : 'http://c1.51jujibao.com/static/mod/julePayV2/static/chjImg/pic-container.png';
            this.page2.uploadImg3 = item.idCardReverse ? item.idCardReverse : 'http://c1.51jujibao.com/static/mod/julePayV2/static/chjImg/pic-container.png';
            this.page2.has1 = true;
            this.page2.has2 = true;
            this.page2.has3 = true;
          } else {
            this.$vux.toast.text(data.message, 'middle')
          }
        })
      },

      //折扣数据详情
      _getDiscountInfo() {
        this.canPull = false
        this.loadTip = '加载中';
        this.loading = true;
        discountDataDetail({
          merchantId: this.page.merchantId,
          pageIndex: this.pageIndex,
          pageSize: PAGE_SIZE
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
              this.page3.itemData = this.page3.itemData.concat(data.result.data);
              debug(this.page3.itemData)
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

      //商户新建或修改
      _updateStoreInfo(success) {
        storeInfoUpdate({
          merchantId: this.page.merchantId,
          id: this.page.id,
          username: this.page1.account,
          password: this.page1.password,
          aliveNumber: this.page1.aliveNumber,
          isLock: this.page1.isLock,
          roleId: this.page1.accountType,
          merchantName: this.page2.storeName,
          mobile: this.page2.mobile,
          provinceId: this.address.provinceId,
          cityId: this.address.cityId,
          bankName: this.picker.selectB[0],
          bankBranch: this.page2.bankOpen,
          bankNum: this.page2.bankCard,
          realname: this.page2.realName,
          alipay: this.page2.Alipay,
          remark: '',
          businessLicense: this.page2.has1 ? this.page2.uploadImg1 : '',
          idCardFront: this.page2.has2 ? this.page2.uploadImg2 : '',
          idCardReverse: this.page2.has3 ? this.page2.uploadImg3 : '',
        }).then(data => {
          if (data.code && data.code === '00') {
            if (this.page.merchantId) {
              this.$vux.toast.text('修改成功！', 'middle')
            } else {
              this.$vux.toast.text('创建成功！', 'middle')
            }
            this.page.merchantId = data.result
            success()

          } else {
            this.$vux.toast.text(data.message, 'middle')
          }
        })
      },

      //操作员新建或修改
      _updateOperatorInfo() {
        operatorInfoUpdate({
          merchantId: this.page.merchantId,
          id: this.page.id,
          username: this.page1.account,
          password: this.page1.password,
        }).then(data => {
          if (data.code && data.code === '00') {
            this.$vux.toast.text('创建成功！', 'middle')
            this.$router.back()
          } else {
            this.$vux.toast.text(data.message, 'middle')
          }
        })
      },

      //折扣数据修改
      _updateDiscountInfo() {
        let itemDiscounts = this.page3.itemData.map(item => ({
          fixedNum: item.fixedNum,
          itemId: item.itemId,
          itemName:item.itemName,
          merchantId: item.merchantId,
          rate: item.rate,
          settlementType: item.settlementType
        }))
        discountDataUpdate({
          merchantId: this.page.merchantId,
          itemDiscounts,
        }).then(data => {
          if (data.code && data.code === '00') {
            if (this.pageTitle === '编辑商户') {
              this.$vux.toast.text('修改成功！', 'middle')
            } else if (this.pageTitle === '添加商户') {
              this.$vux.toast.text('设置成功！', 'middle')
            }
            this.$router.back()

          } else {
            this.$vux.toast.text(data.message, 'middle')
          }
        })
      },

      //上传图片
      fileChange(num) {
        // console.log("++++++++3333333333")
        let _formData = new FormData(document.getElementById('headForm' + num))
        debug(_formData)
        // console.log(_formData)
        axios.post('/admin/huabei/file/upload', _formData).then(response => {
          if (response.data.code && response.data.code == '00') {
            if (num === 1) {
              this.page2.has1 = true;
              this.page2.uploadImg1 = response.data.result;
            } else if (num === 2) {
              this.page2.has2 = true;
              this.page2.uploadImg2 = response.data.result;
            } else if (num === 3) {
              this.page2.has3 = true;
              this.page2.uploadImg3 = response.data.result;
            }
          } else {
            this.$vux.toast.text(response.data.message, 'middle') //错误提示
          }

        })
      },


    },
    components: {
      PageHeader,
      Toast, Picker, Loading, Scroller, LoadMore
    }
  }
</script>

<style scoped lang="less">
  .route-container {
    height: 5rem;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .route-step {
      width: 5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      .route-step-img {
        width: 1.563rem;
      }
      .route-step-name {
        font-size: .75rem;
        color: #ff8a00;
        padding-top: .625rem;
      }
    }
    .step-line-container {
      width: 3rem;
      padding-bottom: 1.5rem;
      .step-line {
        width: 100%;
        height: .064rem;
        background-color: #ff8a00;
      }
    }
  }

  .content-container {
    background-color: #fff;
    margin-top: .594rem;

    .content-step1 {
      padding-top: 1.063rem;
      .input-container {
        width: 94.667%;
        margin: 0 auto;
        .input-wrapper {
          margin-bottom: 1.219rem;
          display: flex;
          height: 2.188rem;
          border-radius: 0.156rem;
          border: solid 0.032rem #cdcdcd;

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
      }

      .type-container {
        width: 89.069%;
        margin: 0 auto;
        .type-name {
          color: #333;
          font-size: .875rem;
        }
        .type-select-container {
          height: 3.313rem;
          display: flex;
          align-items: center;
          justify-content: left;
          .select-item {
            width: 33.33%;
            display: flex;
            justify-content: left;
            align-items: center;
            .select-box {
              width: 1.375rem;
            }
            .select-label {
              color: #333;
              font-size: .75rem;
              margin-left: .313rem;
            }
          }
        }
      }
    }

    .content-step2 {
      padding-top: 1.063rem;
      padding-bottom: 4rem;
      .input-container {
        width: 94.667%;
        margin: 0 auto;
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

        .select-container {
          margin-bottom: 1.219rem;
          display: flex;
          height: 2.188rem;
          display: flex;
          justify-content: space-between;
          .select-wrapper {
            width: 49%;
            height: 100%;
            border-radius: 0.156rem;
            border: solid 0.032rem #cdcdcd;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            position: relative;
            .select-label {
              width: 40%;
              padding-left: .5rem;
              color: #333;
              font-size: .75rem;
            }
            .select-input {
              width: 60%;
              outline: none;
              border: none;
              background: none;
              padding: 0;
              padding-right: 1.2rem;
              margin: 0;
              color: #333;
              font-size: .75rem;
            }
            .select-input::placeholder {
              color: #999;
              font-size: .75rem;
            }
            .select-down {
              width: .688rem;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              right: .5rem;
            }

          }
        }
      }

      .pic-container {
        width: 89.069%;
        margin: 0 auto;
        .pic-name {
          color: #333;
          font-size: .875rem;
        }
        .pic-upload-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.281rem;
          .upload-item {
            width: 25%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: left;
            .upload-container {
              height: 4.5rem;
              overflow: hidden;
              position: relative;
              .upload-img {
                width: 100%;
              }
              form {
                input {
                  width: 100%;
                  height: 100%;
                  opacity: 0;
                  position: absolute;
                  top: 0;
                  left: 0;
                }
              }
            }
            .upload-name {
              color: #999;
              font-size: .75rem;
              padding-top: .625rem;
            }
          }
        }
      }

    }

    .content-step3 {
      .content-header {
        height: 2.5rem;
        background-color: #fef9f3;
        display: flex;
        align-items: center;
        p {
          width: 50%;
          text-align: center;
          color: #333;
          font-size: .938rem;
        }
      }
      .item-container {
        .item-line {
          height: 2.219rem;
          display: flex;
          align-items: center;
          .item-line-left {
            flex: 1;
            text-align: center;
            color: #666;
            font-size: .75rem;
          }
          .item-percent {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            .input-container {
              width: 4.063rem;
              height: 1.5rem;
              border-radius: 0.125rem;
              border: solid 0.064rem #cdcdcd;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              justify-content: center;
              input {
                width: 90%;
                outline: none;
                border: none;
                background: none;
                padding: 0;
                margin: 0;
                text-align: right;
                color: #333;
                font-size: .75rem;
              }
            }
            p {
              color: #999;
              font-size: .75rem;
              padding-top: .75rem;
              padding-left: .1rem;
            }
          }
        }
      }
    }
  }

  .next-btn {
    width: 100%;
    height: 2.75rem;
    background-color: #ff8a00;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    color: #fff;
    font-size: 1.125rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
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

</style>
