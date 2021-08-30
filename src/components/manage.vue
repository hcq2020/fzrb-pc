<template>
  <div class="content">
    <div class="df">
      <div>
        <el-select v-model="from.bind" slot="prepend" placeholder="请选择订阅状态">
          <el-option label="已订阅" value="1"></el-option>
          <el-option label="未订阅" value="0"></el-option>
        </el-select>
      </div>
      <div class="mar18">
        <el-date-picker
            v-model="time"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
        @change="selectTime">
        </el-date-picker>
      </div>
      <div>
        <el-select v-model="from.unitId" slot="prepend" placeholder="请选择派发单位">
          <el-option v-for="item in companyOption" :label="item.unitName" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </div>
      <div class="mar18">
        <el-select v-model="from.area" placeholder="请选择地区">
          <el-option
              v-for="item in areaOption"
              :key="item"
              :label="item"
              :value="item">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-input v-model="from.input" placeholder="请输入关键词"></el-input>
      </div>
      <div class="ml40" style="min-width: 12rem">
        <el-button type="primary" @click="select">查询</el-button>
        <el-button @click="clearInfo">清除</el-button>
      </div>
      <div class="f1" style="min-width: 17rem">
        <el-button class="f_right" type="primary" :disabled="multipleSelection.length>0?false:true" @click="exported">
          导出
        </el-button>
      </div>
    </div>
    <div class="table mt18">
      <el-table
          ref="manageTable"
          :data="tableData"
          :key="change"
          tooltip-effect="dark"
          height="550"
          style="width: 100%;"
          @selection-change="handleSelectionChange">
        <el-table-column
            width="18">
          <template slot-scope="scope">
            <div class="circr" v-show="scope.row.modify==1">
            </div>
          </template>
        </el-table-column>
        <el-table-column
            type="selection">
        </el-table-column>

        <el-table-column
            label="ID"
            type="index">
        </el-table-column>
        <el-table-column
            prop="cardNo"
            label="卡号">
        </el-table-column>
        <el-table-column
            prop="cardPassword"
            label="密码">
        </el-table-column>
        <el-table-column
            prop="createDate"
            label="建卡日期">
        </el-table-column>
        <el-table-column
            prop="unitName"
            label="派发单位">
        </el-table-column>
        <el-table-column
            prop="bind"
            label="订阅状态">
          <template slot-scope="scope">
            <span>
              {{ scope.row.bind == 0 ? '未订阅' : '已订阅' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="订阅日期">
        </el-table-column>
        <el-table-column
            prop="receiver"
            label="个人/单位">
        </el-table-column>
        <el-table-column
            prop="contact"
            label="电话">
        </el-table-column>
        <el-table-column
            prop="unit"
            label="所在单位">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>
        <el-table-column
            prop="postCode"
            label="邮编"
           >
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作">
          <template slot-scope="scope">
            <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small">
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="mt18 f_right" style="width: 100%">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="from.pageNo"
          :pager-count="5"
          :page-sizes="[ 10, 20, 50, 100]"
          :page-size="from.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          prev-text="上一页"
          next-text="下一页"
          :total="total">
      </el-pagination>
    </div>
    <el-dialog id="dialog" title="修改订阅信息" width="600px" :visible.sync="dialogFormVisible" :close-on-click-modal=false>
      <el-form :model="editFrom" ref="editForm" :rules="rules">
        <el-form-item v-show="cardStatus" label="个人/单位" label-width="20%" prop="receiver" >
          <el-input v-model="editFrom.receiver" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-show="cardStatus" label="联系方式" label-width="20%" prop="contact">
          <el-input v-model="editFrom.contact" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="派发单位" label-width="20%" prop="companyOption">
          <div>
            <el-select v-model="editFrom.unitId" :disabled="cardStatus?true:false" slot="prepend" placeholder="请选择派发单位">
              <el-option v-for="item in companyOption" :label="item.unitName" :value="item.id"
                         :key="item.id"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item v-show="cardStatus" label="所在地区" label-width="20%" prop="address">
          <el-cascader
              placeholder="试试搜索：黄浦区"
              v-model="place"
              :options="placeOption"
              :props="{ expandTrigger: 'hover' }"
              @change="(val)=>onchangeplace(val,'edit')"
              filterable>
          </el-cascader>
        </el-form-item>
        <el-form-item v-show="cardStatus" label="详细地址" label-width="20%" prop="address">
          <el-input v-model="editFrom.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-show="cardStatus" label="邮编" label-width="20%">
          <el-input v-model="editFrom.postCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-show="cardStatus" label="所在单位" label-width="20%">
          <el-input v-model="editFrom.unit" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="edit">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import XLSX from "xlsx";
import {
  exportSubscriberCardList,
  getDistributionUnitList,
  getunitDistributionUnitList, setCard,
  setSubscriber,
  subscriberCardList
} from "@/api";

import citys from '../utils/area'

export default {
  name: "manage",
  props: ['change'],
  data() {
    var validateContact = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('联系方式不能为空'));
      } else {
        const reg = /(^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$)|(\d{3}-\d{8}|\d{4}-\d{7})/;
        if (!reg.test(value)) {
          callback(new Error('手机号码格式不正确'));
        }
        callback();
      }
    };
    return {
      companyOption: [],
      areaOption:[],
      placeOption: citys,
      total: 0,
      from: {
        area: '',
        bind: '',
        fromDate: '',
        toDate:'',
        keyWord: '',
        pageNo: 1,
        pageSize: 10,
        unitId: '',
        street: '',
      },
      editFrom: {
        address: '',
        area: '',
        contact: '',
        id: '',
        modify: '',
        openId: '',
        postCode: '',
        receiver: '',
        street: '',
        unit: '',
        unitId: '',
      },
      editId: '',
      cardStatus:'',
      place: [],
      time: [],
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      dialogFormVisible: false,
      pickerOptions: {

      },
      rules: {
        receiver: [
          {required: true, message: '收货人姓名需要在2-25个汉字或字符之间，不能包含特殊字符。', trigger: 'blur'},
          {min: 2, max: 25, message: '收货人姓名需要在2-25个汉字或字符之间，不能包含特殊字符。', trigger: 'blur'}
        ],
        contact: [
          {validator:validateContact,trigger: 'blur'},
          {required: true, message: '联系方式不能为空', trigger: 'blur'}
        ],
        unitName: [
          {required: true, message: '请选择派发单位', trigger: 'blur'}
        ],
        address: [
          {required: true, message: '详细地址不能为空', trigger: 'blur'}
        ],
      }
    }
  },
  created() {
    this.select()
    this.getPlace()
    //   this.getArea()
  },
  mounted() {

    citys.forEach(item=>{
      this.areaOption.push(item.label)
    })
    console.log( this.areaOption)
  },
  methods: {
    handleSizeChange(val) {
      this.from.pageSize = val
      this.select()
    },
    handleCurrentChange(val) {
      this.from.pageNo = val
      this.select()
    },
    deleteRow(index, rows) {
      this.dialogFormVisible = true
      this.cardStatus=rows[index].pid
      for (let key in rows[index]) {
        if (Object.prototype.hasOwnProperty.call(this.editFrom, key) === true) {
          //此处hasOwnProperty是判断自有属性，使用 for in 循环遍历对象的属性时，原型链上的所有属性都将被访问会避免原型对象扩展带来的干扰
          this.editFrom[key] = rows[index][key];
        }
      }
      this.place = [this.editFrom.area, this.editFrom.street]
      this.editId = index
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    //清除
    clearInfo() {
      //  Object.keys(this.from).forEach(key=>{this.from[key]=''})
      this.from = {
        area: '',
        bind: '',
        fromDate: '',
        toDate:'',
        keyWord: '',
        pageNo: 1,
        pageSize: 10,
        unitId: '',
        street: '',
      }
      this.place = []
      this.time=[]
      this.select()
    },

    //查询
    select() {
      this.getData()
    },

    getPlace() {
      getunitDistributionUnitList().then(res => {
        if (res.data.code == 200) {
          this.companyOption = res.data.data
        } else {
          this.$message.error(res.data.message)
        }
      })
    },

    getArea() {
      getDistributionUnitList().then(res => {
        if (res.data.code == 200) {
          this.placeOption = res.data.data
        }
      })
    },
    onchangeplace(val, type) {
      if (type == 'view') {
        this.from.area = val[0]
        this.from.street = val[1]
      } else {
        this.editFrom.area = val[0]
        this.editFrom.street = val[1]
      }

    },

    selectTime(val){
      this.from.fromDate = val[0]
      this.from.toDate = val[1]
    },

    getData() {
      subscriberCardList(this.from).then(res => {
        console.log(res)
        this.tableData = res.data.data.rows
        this.total = res.data.data.total
      })
    },


    //修改
    edit() {
      let that = this
      if(this.cardStatus){
        this.$refs['editForm'].validate((valid) => {
          if (valid) {
            //      that.tableData[that.editId]=that.editFrom
            for (let key in that.editFrom) {
              if (Object.prototype.hasOwnProperty.call(that.tableData[that.editId], key) === true) {
                //此处hasOwnProperty是判断自有属性，使用 for in 循环遍历对象的属性时，原型链上的所有属性都将被访问会避免原型对象扩展带来的干扰
                that.tableData[that.editId] = that.editFrom[key];
              }
            }

            setSubscriber(that.editFrom).then(res => {
              if (res.data.code == 200) {
                that.dialogFormVisible = false
                that.select()
              } else {
                that.$message.error(res.data.message)
              }
            })
          } else {
            return false;
          }
        });
      }else{
        that.dialogFormVisible = false
        setCard({
          cardNo: this.tableData[this.editId].cardNo,
          cardPassword: this.tableData[this.editId].cardPassword,
          unitId: this.editFrom.unitId
        }).then(res => {
          if (res.data.code == 200) {
            that.dialogFormVisible = false
            that.select()
          } else {
            that.$message.error(res.data.message)
          }
        })
      }


    },

    getCompanyById(unitName) {
      for (const argumentsKey in this.companyOption) {
        if (this.companyOption[argumentsKey].unitName == unitName) {
          return this.companyOption[argumentsKey].unitId
        }
      }
    },

    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val;
    },
    // 处理好要导出的数据放到(this.exel里)
    initExportData() {
      let exel = []
      const keys = ['ID', '卡号', '密码', '建卡日期', '派发单位', '订阅状态', '订阅日期', '个人/单位', '电话', '所在单位', '地址', '邮编'];
      exel.push(keys)
      this.tableData.forEach((item, index) => {
        exel.push([index + 1, ...Object.values(item)])
      })
      this.exel = exel
    },

    // 点击导出Exel
    exported() {
      let ids = []
      this.multipleSelection.forEach(item => {
        ids.push(item.id)
      })
      var day2 = new Date();
      day2.setTime(day2.getTime());
      var s2 = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      exportSubscriberCardList(ids).then(response => {
            console.log(response)
            loading.close();
            this.downLoadXls(response.data, s2 + '.xlsx')
          }
      )

      this.initExportData()
      const ws = XLSX.utils.aoa_to_sheet(this.exel);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
      // XLSX.writeFile(wb, "订阅卡信息.xlsx")
    },

    downLoadXls(data, filename) {
      //接收的是blob，若接收的是文件流，需要转化一下
      var blob = new Blob([data], {type: 'application/vnd.ms-excel'})
      if (typeof window.chrome !== 'undefined') {
        // Chrome version
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // IE version
        let blob1 = new Blob([data], {type: 'application/force-download'});
        window.navigator.msSaveBlob(blob1, filename);
      } else {
        // Firefox version
        var file = new File([data], filename, {type: 'application/force-download'});
        window.open(URL.createObjectURL(file));
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  .el-table {
    border: 1px solid #E8E8E8;
  }

  #dialog {
    .el-select {
      width: 100%;
    }
  }
}

.circr {
  width: 8px;
  height: 8px;
  border-radius: 90px;
  background-color: #255AFF;
}

/deep/ .el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar {
  width: 0 !important;
  display: none !important;
}

/deep/ .el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar-track {
  width: 0 !important;
  display: none !important;
}

/deep/ .el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar-thumb {
  width: 0 !important;
  display: none !important;
}

/deep/ .el-table__body {
  width: 100% !important;
}

/deep/ .el-table th, .el-table tr {
  background: #F5F6F8;
  font-size: 14px;
  font-weight: bold;
  color: #1F242E;
}

/deep/ .el-table td.gutter, .el-table th.gutter {
  display: none;
}

/deep/ .el-table__fixed-right-patch {
  display: none;
}

/deep/ .el-pagination__total {
  float: left;
}

/deep/ .el-pagination {
  text-align: right;
}

/deep/ .el-pagination__sizes {
  float: left;
}

</style>
