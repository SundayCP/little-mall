const isdevelop = process.env.NODE_ENV !== 'production'
const domain = isdevelop ? "" : ""
const isDebug = isdevelop ? '' : ""

const CONFIG = {
  API: {
    'FETCH_DATA_LIST': domain + '/front/income/getLastesTongji' + isDebug,   //积分收入的近三天数据
    'GET_DATA_LIST': domain + '/front/income/getOrderList' + isDebug,   //积分收入详细列表  的分页加载列表
    'LOGIN_ACCOUNT': domain + '/front/login/post' + isDebug,  //用户账号密码登陆
    'FETCH_ORDER_DATA_LIST': domain + '/front/income/getOrderList' + isDebug,   // 订单详情 + 筛选 分页加载
    'GET_COMMON_USE_DATA': domain + '/front/business/getCollectionList' + isDebug,   // 获取首页的常用数据
    'GET_LIST_DATA': domain + '/front/business/getColumn' + isDebug,   // 获取首页的列表数据
    'GET_ITEM_LIST': domain + '/front/business/getBusinessList' + isDebug,   // 获取各经销商的列表数据
    'CANCEL_LIST': domain + '/front/business/deleteCollection' + isDebug,   // 取消常用
    'SET_LIST': domain + '/front/business/addCollection' + isDebug,   // 加入常用
    'RESET_KEFU': domain + '/front/mobile/forgetPassword/getTemplate' + isDebug,   // 重置客服
    'EXCHANGE': domain + '/front/order/route/addRoute' + isDebug,   // 短信兑换下一步

    'FETCH_LIST': domain + '/front/shopItem/getList' + isDebug,   // 获取虾米列表
    'HEXIAO_SEARCH': domain + '/front/order/getCardList' + isDebug,   // 核销移动 查询
    'HEXIAO': domain + '/front/order/hexiao' + isDebug,   // 核销移动  卡密核销
    'HEXIAO_GET_CODE': domain + '/front/card/hexiao/sendMsg' + isDebug,   // 核销移动沃尔玛 + 麦德龙查询获取验证码
    'HEXIAO_SEARCH_MO': domain + '/front/card/hexiao/getLklCard' + isDebug,   // 核销移动沃尔玛 + 麦德龙查询
    'HEXIAO_MO': domain + '/front/card/hexiao/yd/submit' + isDebug,   // 核销移动沃尔玛 + 麦德龙 卡密核销
    'HEXIAO_DX': domain + '/front/card/hexiao/dx/submit' + isDebug,   // 核销电信沃尔玛 + 麦德龙 卡密核销
    'PHONE_HEXIAO': domain + '/front/order/tyyd/tyydHexiao' + isDebug,   // 核销电信手机号核销
////////////////////////////////////////////////////
    'GET_MY_DATA': domain + '/front/income/summary' + isDebug,   // 获取我的积分收入 今日 + 昨日 + 本月收款
    'GET_DETAIL_DATA': domain + '/front/income/getOrderDetail' + isDebug,   // 获取订单详情数据
    'GET_TAB_TYPE': domain + '/front/orderType' + isDebug,   // // 获取订单详情的类型
    'GET_MY_DATA_MONEY': domain + '/front/income/star' + isDebug,   // 获取我的积分收入昨日之星 + 今日之星
		'IS_SHOU_QUAN': domain + '/front/huabei/findBusinessAuth' + isDebug,   // 获取权限
		'CALCULATE': domain + '/front/huabei/findOrderStagingCompute' + isDebug,   // 计算花呗
		'SHOU_QUAN_CODE': domain + '/front/huabei/qrcodeToAuth' + isDebug,   // 二维码授权二维码
		'GET_PAY_CODE': domain + '/front/huabei/createOrderStaging' + isDebug,   // 花呗支付二维码
		'IS_PAY': domain + '/front/huabei/findOrderPayStatus' + isDebug,   // 花呗支付二维码的状态
		'FETCH_ORDER_PAY_LIST': domain + '/front/huabei/order' + isDebug,   // 花呗支付订单的列表
    'IS_HAS_SMS': domain + '/front/card/hexiao/lkl/cookiesCheck' + isDebug,   // 是否发动短信
    'GET_CODE_HEXIAO': domain + '/cy/smsAuthcode' + isDebug,   // 畅由 核销 验证码
    'YD_HEXIAO': domain + '/cy/pointscut' + isDebug,   // 畅由 核销 接口
    'GET_TOKEN': domain + '/cy/getToken' + isDebug,   // 畅由 获取token
    'FETCH_USER_INFO': domain + '/admin/user/detailInfo' + isDebug,   // 获取用户信息
    'HEXIAO_WANGYI': domain + '/front/card/hexiao/wyyx/submit' + isDebug,   // 网易严选

    'GET_MOBILE_ADDR': domain + '/exchange/mobile/area' + isDebug,   // 获取手机号归属地
    'HEXIAO_XP': domain + '/front/card/hexiao/huishang/hx' + isDebug,   // 呷哺 核销
    'GET_PAY_METHOD': domain + '/front/withdraw/getWithdrawTypeAccount' + isDebug,   // 支付方式
    'SUBMIT_PERSON_INFO': domain + '/front/withdraw/addWithDrawAccount' + isDebug,   // 提交个人账号的信息
    'FETCH_DATA_LIST_ACCOUNT': domain + '/front/withdraw/getWithdrawAccountByType' + isDebug,   // 获取账号列表
    'DELETE_ACCOUNT': domain + '/front/withdraw/deleteWithdrawAccount' + isDebug,   // 删除账号
    'SUBMIT_TICKET': domain + '/front/withdraw/uploadJlInvoice' + isDebug,   // 提交发票



    /*
    * chj apis
    * */
    'GET_INCREMENT_DATA': domain + '/front/businessAct/getList' + isDebug,//增收页面数据
    'GET_MINE_DATA': domain + '/front/user/getInfo' + isDebug,//我的页面数据
    'CHANGE_PASSWORD': domain + '/front/user/updatePassword' + isDebug,//修改密码
    'GET_ACCOUNT_MONEY': domain + '/front/account/getAccount' + isDebug,//获取账户余额
    'WITHDRAW_MONEY': domain + '/front/withdraw/withdrawPost' + isDebug,//提现
    'ACCOUNT_DETAIL_LIST': domain + '/front/account/transPage' + isDebug,//账务明细
    'ACCOUNT_INCOME': domain + '/front/account/incomeTransPage' + isDebug,//账户收入
    'ACCOUNT_INCOME_DETAIL': domain + '/front/account/incomeTransDayDetail' + isDebug,//账户收入---详情
    'WITHDRAW_RECORD_LIST': domain + '/front/withdraw/getPage' + isDebug,//提现记录


    'STORE_DETAIL_INFO': domain + '/admin/user/detailInfo' + isDebug,//商户信息详情
    'STORE_INFO_UPDATE': domain + '/admin/user/update' + isDebug,//商户新建或修改
    'OPERATOR_INFO_UPDATE': domain + '/front/user/operate/update' + isDebug,//操作员新建或修改

    'UPLOAD_PIC': domain + '/admin/huabei/file/upload' + isDebug,//上传图片

    'DISCOUNT_DATA_DETAIL': domain + '/admin/discount/dataDetail' + isDebug,//折扣数据详情
    'DISCOUNT_DATA_UPDATE': domain + '/admin/discount/data/update' + isDebug,//折扣数据修改

    'ABLE_CREATE_ROLE': domain + '/admin/role/able/create' + isDebug,//可创建的商户角色
    'MANAGE_STORE_OPERATOR_LIST': domain + '/front/user/data' + isDebug,//管理商户/操作员列表
    'LOCK_UNLOCK_STORE': domain + '/admin/user/lock' + isDebug,//锁住商户
    'LOG_OUT': domain + '/admin/cookies/delete' + isDebug,//退出登录

    'COUPON_PAY_STEP1': domain + '/front/ecPay' + isDebug,//电子券密码支付
    'COUPON_PAY_STEP2': domain + '/front/ecPayPwd' + isDebug,//电子券动态密码支付
    'WITHDRAW_NEED_POPUP':domain+'/front/withdraw/popup'+isDebug,//提现页面提现按钮弹框
    'WITHDRAW_BIND_ACCOUNT':domain+'/front/withdraw/submitWithDrawType'+isDebug,//提现页面绑定支付宝/银行账户
  },
}

export default CONFIG
