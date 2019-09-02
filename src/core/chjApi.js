import CONFIG from './config'
import axios from 'axios'
import qs from 'qs'

/*
* 增收获取数据
* */
export function getIncrementData(opts) {
  return axios.post(CONFIG.API.GET_INCREMENT_DATA, qs.stringify({
    pageIndex: opts.pageIndex,
    pageSize: opts.pageSize
  })).then(res => res.data)
}

/*
* 我的页面获取数据
* */
export function getMineData() {
  return axios.post(CONFIG.API.GET_MINE_DATA).then(res => res.data)
}

/*
* 修改密码
* */
export function changePwd(opts) {
  return axios.post(CONFIG.API.CHANGE_PASSWORD, qs.stringify({
    oldPassword: opts.oldPassword,
    newPassword: opts.newPassword
  })).then(res => res.data)
}

/*
* 获取账户余额
* */
export function getAccountMoney() {
  return axios.post(CONFIG.API.GET_ACCOUNT_MONEY).then(res => res.data)
}

/*
* 提现
* */
export function withdrawMoney(opts) {
  return axios.post(CONFIG.API.WITHDRAW_MONEY, qs.stringify({
    amount: opts.amount,
    withdrawAmountId: opts.withdrawAmountId,
  })).then(res => res.data)
}

/*
* 账务明细
* */
export function accountDetailList(opts) {
  return axios.post(CONFIG.API.ACCOUNT_DETAIL_LIST, qs.stringify({
    pageSize: opts.pageSize,
    pageIndex: opts.pageIndex,
    beginTime: opts.startTime,
    endTime: opts.endTime,
  })).then(res => res.data)
}

/*
* 账户收入
* */
export function accountIncomeList(opts) {
  return axios.post(CONFIG.API.ACCOUNT_INCOME, qs.stringify({
    pageIndex: opts.pageIndex,
    pageSize: opts.pageSize,
  })).then(res => res.data)
}

/*
* 账户收入--详情
* */
export function accountIncomeListDetail(opts) {
  return axios.post(CONFIG.API.ACCOUNT_INCOME_DETAIL, qs.stringify({
    day: opts.day
  })).then(res => res.data)
}

/*
* 提现记录
* */
export function getWithdrawRecordList(opts) {
  return axios.post(CONFIG.API.WITHDRAW_RECORD_LIST, qs.stringify({
    pageSize: opts.pageSize,
    pageIndex: opts.pageIndex,
    beginTime: opts.startTime,
    endTime: opts.endTime,
  })).then(res => res.data)
}


/*
* 商户信息详情
* */
export function storeDetailInfo(opts) {
  return axios.post(CONFIG.API.STORE_DETAIL_INFO, qs.stringify({
    merchantId: opts.merchantId
  })).then(res => res.data)
}

/*
* 商户新建或修改
* */
export function storeInfoUpdate(opts) {
  return axios.post(CONFIG.API.STORE_INFO_UPDATE, qs.stringify({
    merchantId: opts.merchantId,
    id: opts.id,
    username: opts.username,
    password: opts.password,
    aliveNumber: opts.aliveNumber,
    isLock: opts.isLock,
    roleId: opts.roleId,
    merchantName: opts.merchantName,
    mobile: opts.mobile,
    provinceId: opts.provinceId,
    cityId: opts.cityId,
    bankName: opts.bankName,
    bankBranch: opts.bankBranch,
    bankNum: opts.bankNum,
    realname: opts.realname,
    alipay: opts.alipay,
    remark: opts.remark,
    businessLicense: opts.businessLicense,
    idCardFront: opts.idCardFront,
    idCardReverse: opts.idCardReverse,
  })).then(res => res.data)
}

/*
* 操作员新建或修改
* */
export function operatorInfoUpdate(opts) {
  return axios.post(CONFIG.API.OPERATOR_INFO_UPDATE, qs.stringify({
    merchantId: opts.merchantId,
    id: opts.id,
    username: opts.username,
    password: opts.password,
    roleId: 2
  })).then(res => res.data)
}

/*
* 上传图片
* */
export function uploadPic(opts) {
  return axios.post(CONFIG.API.UPLOAD_PIC, qs.stringify({
    file: opts.file
  })).then(res => res.data)
}


/*
* 折扣数据详情
* */
export function discountDataDetail(opts) {
  return axios.post(CONFIG.API.DISCOUNT_DATA_DETAIL, qs.stringify({
    merchantId: opts.merchantId,
    pageIndex: opts.pageIndex,
    pageSize: opts.pageSize
  })).then(res => res.data)
}

/*
* 折扣数据修改
* */
export function discountDataUpdate(opts) {
  return axios.post(CONFIG.API.DISCOUNT_DATA_UPDATE, {
    merchantId: opts.merchantId,
    itemDiscounts: opts.itemDiscounts,
  }).then(res => res.data)
}

/*
* 可创建的商户角色
* */
export function ableCreateRole() {
  return axios.post(CONFIG.API.ABLE_CREATE_ROLE).then(res => res.data)
}

/*
* 管理商户/操作员列表
* */
export function manageStoreOperatorList(opts) {
  return axios.post(CONFIG.API.MANAGE_STORE_OPERATOR_LIST, qs.stringify({
    type: opts.type,
    username: opts.username,
    pageIndex: opts.pageIndex,
    pageSize: opts.pageSize
  })).then(res => res.data)
}


/*
* 锁住商户
* */
export function lockUnlockStore(opts) {
  return axios.post(CONFIG.API.LOCK_UNLOCK_STORE, qs.stringify({
    merchantId: opts.merchantId
  })).then(res => res.data)
}


/*
* 电子券密码支付
* */
export function couponPayStep1(opts) {
  return axios.post(CONFIG.API.COUPON_PAY_STEP1, qs.stringify({
    mobile: opts.mobile,
    amount: opts.amount
  })).then(res => res.data)
}

/*
* 电子券动态密码支付
* */
export function couponPayStep2(opts) {
  return axios.post(CONFIG.API.COUPON_PAY_STEP2, qs.stringify({
    orderId: opts.orderId,
    password: opts.password
  })).then(res => res.data)
}

/*
* 退出登录
* */
export function logOut() {
  return axios.post(CONFIG.API.LOG_OUT).then(res => res.data)
}

/*
* 提现页面提现按钮弹框
* */
export function withdrawNeedPopup() {
  return axios.post(CONFIG.API.WITHDRAW_NEED_POPUP).then(res => res.data)
}

/*
* 提现页面绑定支付宝/银行账户
* */
export function withdrawBindAccount(opts) {
  return axios.post(CONFIG.API.WITHDRAW_BIND_ACCOUNT, qs.stringify({
    withDrawType: opts.withDrawType,
    aliPayAccount: opts.aliPayAccount,
    realname: opts.realname,
    bankName: opts.bankName,
    bankBranch: opts.bankBranch,
    bankNo: opts.bankNo
  })).then(res => res.data)
}


/*
* 获取提现方式的内容
* */

export function getPayMethod(opts) {
  return axios.get(CONFIG.API.GET_PAY_METHOD, {
    params: {}
  }).then(res => res.data)
}

/*
* 提交个人账号的信息
* */
export function submitPresonInfo(opts) {
  return axios.post(CONFIG.API.SUBMIT_PERSON_INFO,{
    zfb: opts.zfb,
    name: opts.name,
    idCardNumber: opts.idCardNumber,
    type: opts.type,
    businessLicense: opts.businessLicense,
  },{
    headers: {
      "Content-Type": 'application/json'
    }
  }).then(res => res.data)
}


/*
* 获取账号列表
* */
export function fetchDataList(opts) {
  return axios.post(CONFIG.API.FETCH_DATA_LIST_ACCOUNT,qs.stringify({
    type: opts.type,
    zfb: opts.zfb,
  })).then(res => res.data)
}


/*
* 删除账号
* */
export function deleteAccount(opts) {
  return axios.post(CONFIG.API.DELETE_ACCOUNT,qs.stringify({
    withDrawId: opts.withDrawId,
  })).then(res => res.data)
}





/*
* 获取个体工商账号
* */
export function getVal(opts) {
  return axios.post(CONFIG.API.FETCH_DATA_LIST_ACCOUNT,qs.stringify({
    type: opts.type,
  })).then(res => res.data)
}




/*
* 提交 发票
* */
export function submitTicket(opts) {
  return axios.post(CONFIG.API.SUBMIT_TICKET,{
    withdrawId:opts.withdrawId,
    imageUrl: opts.imageUrl,
    type: opts.type,
  }).then(res => res.data)
}
