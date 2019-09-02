<template>
  <div class="withdraw-record">
    <page-header title="账务明细" bg-color="#ff8810" ft-color="#fff" bd-color="#fff"
                 :need-bottom-border="false"></page-header>

    <div class="list-table">
      <div class="input-line">
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

      <Scroller lock-x
                :bounce="false"
                :use-pullup="canLoad"
                @on-pullup-loading="load"
                :pullup-config="pullupConfig"
                ref="scroll"
                :height="scrollHeight">
        <div>
          <div class="table-body">
            <div class="table-body-line-group" v-for="item in dataList.format">
              <div class="table-body-line-title">{{item.groupName}}</div>
              <div class="table-body-line" v-for="itemIn in item.data">
                <div class="line-left">
                  <p class="line-name">{{itemIn.name}}</p>
                  <p class="line-time">{{itemIn.time | timeFormat}}</p>
                </div>
                <p class="line-money">{{itemIn.money | status(itemIn)}}</p>
              </div>
            </div>
          </div>
          <load-more :show-loading="loading" :tip="loadTip"></load-more>
        </div>
      </Scroller>
    </div>


    <select-picker :picker-data="pickerData" :show="showPicker" @choose="getPickerData"></select-picker>

  </div>
</template>

<script>
  import PageHeader from './base/page-header'
  import SelectPicker from './base/select-picker'

  import {LoadMore, Scroller, Toast} from 'vux'

  import {debug, time} from "./js/util";
  import {accountDetailList} from '../../core/chjApi'

  const PAGE_SIZE = 20;
  export default {
    name: "account-detail",
    data() {
      return {
        head: {
          money: '1200.00',
          leftMoney: '25.00'
        },
        searchTime: '全部',
        searchDate: '',

        dataList: {
          origin: [],
          format: [
            // {
            //   groupName: '本月',
            //   data: [{
            //     time: '2018.10.18',
            //     name: '安居区精益通讯',
            //     money: '200.25',
            //     status: 'WAIT'
            //   }, {
            //     time: '2018.10.18',
            //     name: '安居区精益通讯',
            //     money: '200.25',
            //     status: 'SUCCESS'
            //   }, {
            //     time: '2018.10.18',
            //     name: '安居区精益通讯',
            //     money: '200.25',
            //     status: 'FAIL'
            //   }]
            // }, {
            //   groupName: '9月',
            //   data: [{
            //     time: '2018.10.18',
            //     name: '安居区精益通讯',
            //     money: '200.25',
            //     status: 'WAIT'
            //   }, {
            //     time: '2018.10.18',
            //     name: '安居区精益通讯',
            //     money: '200.25',
            //     status: 'SUCCESS'
            //   }, {
            //     time: '2018.10.18',
            //     name: '安居区精益通讯',
            //     money: '200.25',
            //     status: 'FAIL'
            //   }]
            // }, {
            //   groupName: '8月',
            //   data: [{
            //     time: '2018.10.18',
            //     name: '安居区精益通讯',
            //     money: '200.25',
            //     status: 'WAIT'
            //   }, {
            //     time: '2018.10.18',
            //     name: '安居区精益通讯',
            //     money: '200.25',
            //     status: 'SUCCESS'
            //   }, {
            //     time: '2018.10.18',
            //     name: '安居区精益通讯',
            //     money: '200.25',
            //     status: 'FAIL'
            //   }]
            // }
            ]
        },
        pickerData: ['全部', '近7天', '近30天'],
        showPicker: false,

        selectTime: ['', ''],

        pageIndex: 1,

        loading: true,
        loadTip: '加载中...',

        canLoad:true,
        canPull:true,
        scrollHeight: '',
        pullupConfig: {
          content: '',
          downContent: '',
          upContent: '',
          loadingContent: ''
        }

      }
    },
    mounted(){
      this._getData()
    },
    methods: {
      search() {
        // if(!this.searchDate){
        //   this.$vux.toast.text('请输入筛选日期！', 'middle');
        //   return;
        // }
        if (!/^20[12][0-9](-|\.)(0|1)?[0-9](-|\.)(0|1|2|3)?[0-9]$/.test(this.searchDate)) {
          this.$vux.toast.text('请输入正确格式的日期！', 'middle');
          return;
        }
        this.selectTime = time(this.searchDate)
        debug(this.selectTime)
        this.pageIndex = 1;
        this.dataList={
          origin:[],
          format:[]
        }
        this._getData()
      },

      getPickerData(val) {
        debug(val)
        this.searchTime = val
        if (this.searchTime === '全部') {
          this.selectTime = ['', '']
        } else {
          this.selectTime = time(this.searchTime)
          debug(this.selectTime)
        }
        this.pageIndex = 1;
        this.dataList={
          origin:[],
          format:[]
        }
        this._getData()
      },
      load(){
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

      _getData() {
        this.canPull = false
        this.loadTip = '加载中';
        this.loading = true;
        accountDetailList({
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
              let filterList = this.dataList.origin.map(item => ({
                time: item.createTime,
                name: item.type,
                money:item.amount,
                groupName:item.month,
                status:item.transType
              }))
              this.dataList.format=[]
              this._formatData(filterList,this.dataList.format)
              debug(this.dataList.format)
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
      _formatData(oList,fList){
        let groupIndex = 0;
        oList.forEach((item,index,arr)=>{
          if (index === 0) {
            let itemGroup = {
              groupName: arr[index].groupName,
              data: [arr[index]]
            };
            fList.push(itemGroup)
          } else {
            if (arr[index].groupName === arr[index - 1].groupName) {
              fList[groupIndex].data.push(arr[index])
            } else if (arr[index].groupName !== arr[index].groupName) {
              groupIndex += 1
              let itemGroup = {
                groupName: arr[index].groupName,
                data: [arr[index]]
              };
              fList.push(itemGroup)
            }
          }
        })
      }
    },


    filters: {
      status(val,item) {
        if (item.status==='IN') {
          return '+'+val
        } else if (item.status==='OUT'){
          return '-'+val
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
      PageHeader, Scroller, Toast, SelectPicker, LoadMore
    }
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
        width: 4.875rem;
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
        align-items: center;
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
          justify-content: space-between;
          align-items: center;
          .line-left {
            margin-left: 1rem;
            .line-name {
              color: #666;
              font-size: .875rem;
            }
            .line-time {
              padding-top: .406rem;
              color: #999;
              font-size: .75rem;
            }
          }
          .line-money {
            margin-right: 1rem;
            color: #666;
            font-size: 1.125rem;
          }
        }

      }
    }
    .clear {
      clear: both;
    }

  }

</style>
