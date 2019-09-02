import Vue from 'vue'
import Router from 'vue-router'
// chenpeng
import Home from '@/page/cpPage/home'
import IntegralCash from '@/page/cpPage/IntegralCash'        // 收分收银台
import IntegralIncome from '@/page/cpPage/integralIncome'   //积分收入
import IncreaseIncome from '@/page/chjPage/activity'   // 增收
import MyCenter from '@/page/chjPage/mine'   // 个人中心
import ydGoodsListDetail from '@/page/cpPage/goodsListDetail'   // 移动商品详情
import dxGoodsListDetail from '@/page/cpPage/dxGoodsListDetail'   // 电信商品详情
import huaBeiDetail from '@/page/cpPage/huaBei'   // 花呗商品详情
import huaBeiOrderDetail from '@/page/cpPage/huaBeiDetail'   // 花呗商品详情
import huaBeiOrderList from '@/page/cpPage/huaBeiOrderList'   // 花呗商品列表
import UserDetail from '@/page/cpPage/userDetail'   // 用户详情

import QuotaDetail from '@/page/chjPage/quotaDetail'   // 额度管理
import AddAccount from '@/page/chjPage/addAccount'   // 新增账号
import SubmitiNvoice from '@/page/chjPage/submitiNvoice'   // 上传发票


import dxHeiao from '@/page/cpPage/dxHexiao'   // 电信核销
import dxHeiaoShop from '@/page/cpPage/dxHexiaoShop'   // 电信天翼积分商城

import ydHeXiao from '@/page/cpPage/ydHexiao'   // 移动核销
// import laXin from '@/page/cpPage/laxin'   // 支付宝拉新
import WangyiSelect from '@/page/cpPage/wangyiSelect'   // 网易严选
import STQN from '@/page/cpPage/STQN'   // 网易严选
import YDXP from '@/page/cpPage/ydXiaBu'   // 移动呷哺


import GoodsList from '@/page/cpPage/goodsList'   // 商品列表
import IntegralIncomeDetail from '@/page/cpPage/integralIncomeDetail'   // 收入详细列表
import IntegralIncomeOrderDetail from '@/page/cpPage/integralIncomeOrderDetail'   // 商品订单详情
import ScreeningOrder from '@/page/cpPage/screeningOrder'   // 商品订单详情
import Login from '@/page/cpPage/Login'   // 登陆

import CouponPay from '@/page/chjPage/coupon-pay'//电子券支付
import CouponPayResult from '@/page/chjPage/coupon-pay-result'//电子券支付结果


import Notfound from '@/page/Notfound'


//chj
import WithdrawRecord from '@/page/chjPage/withdraw-record'
import AccountDetail from '@/page/chjPage/account-detail'
import ChangePwd from '@/page/chjPage/change-pwd'
import ManageItem from '@/page/chjPage/manage-item'
import AddItem from '@/page/chjPage/add-item'
import AccountIncome from '@/page/chjPage/account-income'



Vue.use(Router)

export default new Router({
  mode: '',
  routes: [
    {
      path: '/', name: '', component: Home, redirect: "/integralCash",
      children: [
        {path: '/integralCash', name: '积分收银台', component: IntegralCash,},
        {path: '/integralIncome', name: '积分收入', component: IntegralIncome,},
        {path: '/increaseIncome', name: '增收', component: IncreaseIncome,},
        {path: '/myCenter', name: '我的中心', component: MyCenter,},
      ]
    },
    {path: '/ydDetail', name: '移动商品详情', component: ydGoodsListDetail},
    {path: '/dxDetail', name: '电信商品详情', component: dxGoodsListDetail},
    {path: '/huaBeiDetail', name: '花呗商品详情', component: huaBeiDetail},
    {path: '/huaBeiOrderDetail', name: '花呗订单详情', component: huaBeiOrderDetail},
    {path: '/huaBeiOrderList', name: '花呗订单列表', component: huaBeiOrderList},

    {path: '/dxHexiao', name: '电信核销', component: dxHeiao},
    {path: '/dxHeiaoShop', name: '电信天翼积分商城', component: dxHeiaoShop},

    {path: '/ydHeXiao', name: '移动畅由核销', component: ydHeXiao},
    {path: '/netEase', name: '网易严选', component: WangyiSelect},
    {path: '/stqn', name: '申通+去哪', component: STQN},
    {path: '/ysxp', name: '移动呷哺', component: YDXP},

    {path: '/quotaDetail', name: '额度管理', component: QuotaDetail},
    {path: '/addAccount', name: '新增账号', component: AddAccount},
    {path: '/submitiNvoice', name: '上传发票', component: SubmitiNvoice},



    {path: '/lists/:type', name: '商品列表', component: GoodsList},
		{path:'/integralIncomeDetail/:id', name: '收入详细列表', component: IntegralIncomeDetail },
		{path:'/integralIncomeOrderDetail/:id', name: '收入订单详细', component: IntegralIncomeOrderDetail },
		{path:'/screeningOrder', name: '筛选订单', component: ScreeningOrder },
    {path:'/userDetail', name: '用户详情', component: UserDetail },




		{path:'/login', name: '登陆', component: Login },

    /*
    * chj routers
    * */
    {path: '/withdrawrecord', name: 'WithdrawRecord', component: WithdrawRecord},
    {path: '/accountdetail', name: 'AccountDetail', component: AccountDetail},
    {path: '/changepwd', name: 'ChangePwd', component: ChangePwd},
    {path: '/manageitem', name: 'ManageItem', component: ManageItem},
    {path: '/additem', name: 'AddItem', component: AddItem},
    {path: '/accountincome', name: 'AccountIncome', component: AccountIncome},
    {path:'/couponpay',name:'CouponPay',component:CouponPay},
    {path:'/couponpayresult',name:'CouponPayResult',component:CouponPayResult},


    {path: '*', name: '404', component: Notfound},

  ]
})
