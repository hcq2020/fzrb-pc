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
            v-model="from.createDate"
            align="right"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <div>
        <el-select v-model="from.unitId"  slot="prepend" placeholder="请选择派发单位">
          <el-option v-for="item in companyOption" :label="item.unitName" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </div>
      <div class="mar18">
        <el-select v-model="from.area" slot="prepend" placeholder="请选择地区">
          <el-option v-for="item in placeOption" :label="item" :value="item" :key="item"></el-option>
        </el-select>
      </div>
      <div>
        <el-input v-model="from.input" placeholder="请输入关键词"></el-input>
      </div>
      <div class="ml40">
        <el-button type="primary" @click="select">查询</el-button>
        <el-button @click="clearInfo">清除</el-button>
      </div>
      <div class="f1">
        <el-button class="f_right" type="primary" @click="exported">导出</el-button>
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
            type="selection">
        </el-table-column>
        <el-table-column
            label="ID"
            type="index">
        </el-table-column>
        <el-table-column
            prop="cardNo"
            label="卡号"
            width="120">
        </el-table-column>
        <el-table-column
            prop="cardPassword"
            label="密码"
            width="120">
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
              {{scope.row.bind==0?'未订阅':'已订阅'}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="订阅日期">
        </el-table-column>
        <el-table-column
            prop="contact"
            label="个人/单位">
        </el-table-column>
        <el-table-column
            prop="postCode"
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
            prop="email"
            label="邮编"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="120">
          <template slot-scope="scope">
            <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                :disabled="!scope.row.pid?true:false"
                size="small">
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="mt18">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="from.pageNo"
          pager-count="5"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="from.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
    <el-dialog id="dialog" title="修改订阅信息" width="30%" :visible.sync="dialogFormVisible">
      <el-form :model="editFrom">
        <el-form-item label="个人/单位" label-width="20%">
          <el-input v-model="editFrom.contact" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" label-width="20%">
          <el-input v-model="editFrom.postCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="派发单位" label-width="20%">
          <el-input v-model="editFrom.unitName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在地区" label-width="20%">
          <el-input v-model="editFrom.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" label-width="20%">
          <el-input v-model="editFrom.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮编" label-width="20%">
          <el-input v-model="editFrom.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在单位" label-width="20%">
          <el-input v-model="editFrom.unit" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import XLSX from "xlsx";
import {
  exportSubscriberCardList,
  getDistributionUnitList,
  getunitDistributionUnitList,
  setSubscriber,
  subscriberCardList
} from "@/api";

export default {
  name: "manage",
  props: ['change'],
  data() {
    return {
      companyOption: [],
      placeOption: [],
      total:'',
      from: {
        area:'',
        bind:'',
        createDate:'',
        keyWord:'',
        pageNo:1,
        pageSize:10,
        unitId:'',
        street:''
      },
      editFrom: {
       /* card: '',
        password: '',
        createTime: '',
        company: '',
        statue: '',
        subscribeTime: '',
        user: '',
        phone: '',
        localCompany: '',
        detailedAddress:'',
        address: '',
        email: ''*/
      },
      editId:'',
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      dialogFormVisible: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
    }
  },
  created() {
this.select()
    this.getPlace()
    this.getArea()
  },
  mounted() {

  },
  methods: {
    handleSizeChange(val) {
      this.from.pageSize=val
      this.select()
    },
    handleCurrentChange(val) {
      this.from.pageNo=val
      this.select()
    },
    deleteRow(index, rows) {
      this.dialogFormVisible = true
      this.editFrom ={...rows[index]}
      this.editId=index
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
      this.from={
        area:'',
            bind:'',
            createDate:'',
            keyWord:'',
            pageNo:1,
            pageSize:10,
            unitId:''
      }
      this.select()
    },

    //查询
    select() {
      this.getData()
    },

    getPlace(){
      getunitDistributionUnitList().then(res=>{
        if(res.data.code==200){
          this.companyOption=res.data.data
        }else{
          this.$message.error(res.data.message)
        }
      })
    },

    getArea(){
      getDistributionUnitList().then(res=>{
        if(res.data.code==200){
          this.placeOption=res.data.data
        }
      })
    },

    getData(){
      subscriberCardList(this.from).then(res=>{
        console.log(res)
        this.tableData=res.data.data.rows
        this.total=res.data.data.total
      })
    },


    //修改
    edit(){
      this.tableData[this.editId]=this.editFrom
      setSubscriber(this.editFrom).then(res=>{
        if(res.data.code==200){
          this.dialogFormVisible=false
          this.select()
        }else{
          this.$message.error(res.data.message)
        }
      })

    },

    handleSelectionChange(val) {
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
      let ids=[]
      this.tableData.forEach(item => {
        ids.push(item.id)
      })

      exportSubscriberCardList(this.from).then( response  => {
        console.log(response)
        this.downLoadXls(response.data,'订阅卡信息.xlsx')
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
    let blob1 = new Blob([data], { type: 'application/force-download' });
    window.navigator.msSaveBlob(blob1, filename);
  } else {
    // Firefox version
    var file = new File([data], filename, { type: 'application/force-download' });
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

  #dialog {
    .el-select {
      width: 100%;
    }
  }
}
</style>
