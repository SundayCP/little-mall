import CONFIG from './config'
import utils from './utils'
import axios from 'axios'
import qs from 'qs'

/**
 * 上传图片
 * @param {func} callback 回调函数
 * @param {any}  otps 参数对象
 */



// 积分收入列表
export function fetchDataList(opts) {
  return axios.post(CONFIG.API.FETCH_DATA_LIST, qs.stringify({

  })).then(res => res.data)
}


// 积分收入列表详细列表   分页加载
export function getDataList(opts) {
  	return axios.get(CONFIG.API.GET_DATA_LIST, {
    	params: {
			pageIndex: opts.pageIndex,
    		pageSize: opts.pageSize,
    		searchPidPath: opts.searchPidPath,
    		date: opts.date,
	        beginTime: opts.beginTime,
	        status: opts.status,
		}
  }).then(res => res.data)
}

///*
//* 用户名密码登录
//* */

export function loginAccount(opts) {
   return axios.get(CONFIG.API.LOGIN_ACCOUNT,{
		params: {
			username: opts.username,
			password: opts.password,
		}
	}).then(res =>{
		return res.data;
	})
}




// 订单详情 + 筛选 分页加载
export function fetchOrderDataList(opts) {
  return axios.get(CONFIG.API.FETCH_ORDER_DATA_LIST, {
  	params: {
		'date':  opts.date, // 近一周
		'orderType': opts.orderType,  // 类型
		'status': opts.status, // 状态
		'mobile': opts.mobile, // 筛选的手机号
		'isSearch': opts.isSearch,
	    'pageIndex': opts.pageIndex,
	    'pageSize': opts.pageSize
		}
  }).then(res => res.data)
}



// 首页 获取常用数据
export function getCommonUseData(opts) {
  return axios.post(CONFIG.API.GET_COMMON_USE_DATA, qs.stringify({

  })).then(res => res.data)
}


// 首页 列表数据
export function getListData(opts) {
  return axios.post(CONFIG.API.GET_LIST_DATA, qs.stringify({

  })).then(res => res.data)
}



// 获取经销商列表数据
export function getItemList(opts) {
  return axios.get(CONFIG.API.GET_ITEM_LIST, {
    	params: {
			pid: opts.id,
		}
  }).then(res => res.data)
}



// 取消常用接口
export function cancelList(opts) {
  return axios.get(CONFIG.API.CANCEL_LIST, {
    	params: {
			businessId: opts.id,
		}
  }).then(res => res.data)
}

// 取消常用接口
export function setList(opts) {
  return axios.get(CONFIG.API.SET_LIST, {
    	params: {
			businessId: opts.id,
		}
  }).then(res => res.data)
}



// 重置服务密码
export function resetkefu(opts) {
  return axios.get(CONFIG.API.RESET_KEFU, {
    	params: {
			mobile: opts.mobile,
		}
  }).then(res => res.data)
}

// 短信兑换下一步
export function exChange(opts) {
	return axios.get(CONFIG.API.EXCHANGE, {
	    	params: {
				mobile: opts.mobile,
			}
	}).then(res => res.data)
}



// 短信兑换下一步
export function fetchList(opts) {
	return axios.get(CONFIG.API.FETCH_LIST, {
	    	params: {
				category: opts.category,
			}
	}).then(res => res.data)
}



// 核销移动查询
export function hexiaoSearch(opts) {
	return axios.get(CONFIG.API.HEXIAO_SEARCH, {
	    	params: {
				mobile: opts.mobile,
			}
	}).then(res => res.data)
}

// 核销移动沃尔玛 + 麦德龙 查询
export function hexiaoSearchMOM(opts) {
	return axios.get(CONFIG.API.HEXIAO_SEARCH_MO, {
	    	params: {
				mobile: opts.mobile,
				// smsCode : opts.smsCode,
				channel : opts.channel,
			}
	}).then(res => res.data)
}


// 核销移动沃尔玛 + 麦德龙 查询
export function hexiaoSearchMON(opts) {
	return axios.get(CONFIG.API.HEXIAO_SEARCH_MO, {
	    	params: {
				mobile: opts.mobile,
				smsCode : opts.smsCode,
				channel : opts.channel,
			}
	}).then(res => res.data)
}



// 核销移动沃尔玛 + 麦德龙 查询 获取验证码
export function getCode(opts) {
	return axios.get(CONFIG.API.HEXIAO_GET_CODE, {
	    	params: {
				mobile: opts.mobile,
			}
	}).then(res => res.data)
}



// 核销 畅由 的验证码
export function getCodeHexiao(opts) {
	return axios.get(CONFIG.API.GET_CODE_HEXIAO, {
	    	params: {
  				'mobileId': opts.mobile,
          'token': opts.token
			}
	}).then(res => res.data)
}

//核销移动卡密核销
export function hexiao(opts) {
	return axios.get(CONFIG.API.HEXIAO, {
	    	params: {
				tbCards: opts.tbCards,
			}
	}).then(res => res.data)
}


//核销 移动卡密沃尔玛 + 麦德龙 核销
export function hexiaoMo(opts) {
	return axios.post(CONFIG.API.HEXIAO_MO, {
   			mobile:  opts.mobile,
	 		channel: opts.channel,
	 		hxReqs:  opts.hxReqs,
 	}).then(res => res.data)
}

// 核销电信阅读
export function phoneHexiao(opts) {
	return axios.get(CONFIG.API.PHONE_HEXIAO, {
	    	params: {
				mobile: opts.mobile,
			}
	}).then(res => res.data)
}


// 核销电信麦德龙 + 沃尔玛
export function hexiaoDX(opts) {
	return axios.get(CONFIG.API.HEXIAO_DX, {
	    	params: {
				price: opts.price,
				channel: opts.channel,
				cardStr: opts.cardStr,
			}
	}).then(res => res.data)
}





// 获取我的积分收入 今日 + 昨日 + 本月收款
export function getMyData(opts) {
	return axios.get(CONFIG.API.GET_MY_DATA, {
	    	params: {

			}
	}).then(res => res.data)
}
// 获取我的积分收入昨日之星 + 今日之星
export function getMyDataMoney(opts) {
	return axios.get(CONFIG.API.GET_MY_DATA_MONEY, {
	    	params: {

			}
	}).then(res => res.data)
}


// 获取订单详情数据
export function getDetailData(opts) {
	return axios.get(CONFIG.API.GET_DETAIL_DATA, {
	    	params: {
				'orderId': opts.orderId,
			}
	}).then(res => res.data)
}

// 获取订单详情的类型
export function getTabType(opts) {
	return axios.get(CONFIG.API.GET_TAB_TYPE, {
	    	params: {

			}
	}).then(res => res.data)
}


//

// 获取订单详情的类型
export function isShouQuan(opts) {
	return axios.get(CONFIG.API.IS_SHOU_QUAN, {
	    	params: {

			}
	}).then(res => res.data)
}



// 获取订单详情的类型
export function calculate(opts) {
	return axios.get(CONFIG.API.CALCULATE, {
	    	params: {
				periods: opts.periods,
				capitalAmount: opts.capitalAmount,
				hbMoney: opts.hbMoney,
				marketingFlag: opts.marketingFlag,
			}
	}).then(res => res.data)
}



// 未授权的二维码
export function shouQuanCode(opts) {
	return axios.get(CONFIG.API.SHOU_QUAN_CODE, {
	    	params: {

			}
	}).then(res => res.data)
}




// 未授权的二维码
export function getPayCode(opts) {
	return axios.get(CONFIG.API.GET_PAY_CODE, {
	    	params: {
    			modelName: opts.modelName,
				hbMoney: opts.hbMoney,
    			brandName:opts.brandName,
    			goodsID: opts.goodsID,
    			periods: opts.periods,
    			marketingFlag: opts.marketingFlag,
    			capitalAmount: opts.capitalAmount,
    			telNo: opts.telNo,
    			customerName: opts.customerName,
			}
	}).then(res => res.data)
}



// 花呗支付的订单的支付状态
export function isPay(opts) {
	return axios.get(CONFIG.API.IS_PAY, {
	    	params: {
    			orderID: opts.orderID,
			}
	}).then(res => res.data)
}




// 订单详情 分页加载（花呗支付）
export function fetchOrderPayList(opts) {
  return axios.get(CONFIG.API.FETCH_ORDER_PAY_LIST, {
  	params: {
		  'mobile': opts.mobile,
	    'status': opts.status,
	    'pageIndex': opts.pageIndex,
	    'pageSize': opts.pageSize
		}
  }).then(res => res.data)
}


// 判断是否要发 短信验证码
export function isHasSms(opts) {
  return axios.get(CONFIG.API.IS_HAS_SMS, {
  	params: {
		'mobile': opts.mobile,
		}
  }).then(res => res.data)
}

//  移动畅由核销
export function ydHexiao(opts) {
  return axios.get(CONFIG.API.YD_HEXIAO, {
  	params: {
      'mobileId': opts.mobile,
      'validCode': opts.mobileCode,
      'points': opts.payMoney,
      'token': opts.token,
		}
  }).then(res => res.data)
}




//  获取token
export function getToken(opts) {
  return axios.get(CONFIG.API.GET_TOKEN, {
  	params: {
      "mobile": opts.mobile,
		}
  }).then(res => res.data)
}


//  获取用户信息
export function fetchUserInfo(opts) {
  return axios.get(CONFIG.API.FETCH_USER_INFO, {
  	params: {
      "merchantId": opts.merchantId
		}
  }).then(res => res.data)
}


//  网易严选
export function hexiaoWangyi(opts) {
  return axios.get(CONFIG.API.HEXIAO_WANGYI, {
    params: {
      "smsOrderId": opts.orderNum,
      "mobile": opts.mobile,
      "price": opts.price,
      "channel": opts.channel,
    }
  }).then(res => res.data)
}




//  获取手机号归属度
export function getMobileAddr(opts) {
  return axios.get(CONFIG.API.GET_MOBILE_ADDR, {
    params: {
      "mobile": opts.mobile,
    }
  }).then(res => res.data)
}




//  核销呷哺
export function hexiaoXP(opts) {
  return axios.get(CONFIG.API.HEXIAO_XP, {
    params: {
      "username": opts.username,
      "issueno": opts.issueno,
    }
  }).then(res => res.data)
}
