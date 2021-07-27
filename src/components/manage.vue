<template>
  <div class="content">
    <div class="df">
      <div>
        <el-select v-model="from.isSubscribe" slot="prepend" placeholder="请选择订阅状态">
          <el-option label="已订阅" value="已订阅"></el-option>
          <el-option label="未订阅" value="未订阅"></el-option>
        </el-select>
      </div>
      <div class="mar18">
        <el-date-picker
            v-model="from.createTime"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <div>
        <el-select v-model="from.company" slot="prepend" placeholder="请选择派发单位">
          <el-option v-for="item in companyOption" :label="item" :value="item" :key="item"></el-option>
        </el-select>
      </div>
      <div class="mar18">
        <el-select v-model="from.place" slot="prepend" placeholder="请选择地区">
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
            prop="card"
            label="卡号"
            width="120">
        </el-table-column>
        <el-table-column
            prop="password"
            label="密码"
            width="120">
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="建卡日期">
        </el-table-column>
        <el-table-column
            prop="company"
            label="派发单位">
        </el-table-column>
        <el-table-column
            prop="statue"
            label="订阅状态">
        </el-table-column>
        <el-table-column
            prop="subscribeTime"
            label="订阅日期">
        </el-table-column>
        <el-table-column
            prop="user"
            label="个人/单位">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="电话">
        </el-table-column>
        <el-table-column
            prop="localCompany"
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
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length">
      </el-pagination>
    </div>
    <el-dialog id="dialog" title="修改订阅信息" width="30%" :visible.sync="dialogFormVisible">
      <el-form :model="editFrom">
        <el-form-item label="个人/单位" label-width="20%">
          <el-input v-model="editFrom.user" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" label-width="20%">
          <el-input v-model="editFrom.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="派发单位" label-width="20%">
          <el-input v-model="editFrom.company" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在地区" label-width="20%">
          <el-input v-model="editFrom.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" label-width="20%">
          <el-input v-model="editFrom.detailedAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮编" label-width="20%">
          <el-input v-model="editFrom.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在单位" label-width="20%">
          <el-input v-model="editFrom.localCompany" autocomplete="off"></el-input>
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

export default {
  name: "manage",
  props: ['change'],
  data() {
    return {
      companyOption: [
        '武警',
        '华东政法大学',
        '司鉴院',
        '民防',
        '上海市审计局',
        '上海市民政局'],
      placeOption: [
        "政法委-浦东新区",
        "政法委-黄浦区",
        "政法委-徐汇区",
        '政法委-长宁区',
        '政法委-静安区',
        '政法委-普陀区',
        '政法委-虹口区',
        '政法委-杨浦区',
        '政法委-宝山区',
        '政法委-闵行区',
        '政法委-嘉定区',
        '政法委-青浦区',
        '政法委-松江区',
        '政法委-金山区',
        '政法委-奉贤区',
        '政法委-崇明县区',
        '政法委-市级机关',
        '政法委-市戒毒局',
        '政法委-市委宣传部',
        '政法委-浦东机场',
        '政法委-法学会',
        '政法委-上海市公安局'],
      from: {
        isSubscribe: '',
        createTime: '',
        company: '',
        place: '',
        input: ''
      },
      editFrom: {
        card: '',
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
        email: ''
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
  },
  mounted() {

  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    deleteRow(index, rows) {
      this.dialogFormVisible = true
      this.editFrom = rows[index]
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
      Object.keys(this.from).forEach(key=>{this.from[key]=''})
    },

    //查询
    select() {
      this.tableData=[{
        card: '1111',
        password: 'abc',
        createTime: '2020/7',
        company: '华东政法大学',
        statue: '未订阅',
        subscribeTime: '2020/7',
        user: 'huchaoqun',
        phone: '10086',
        localCompany: '上海市民政局',
        address: '政法委-宝山区',
        email: '246500'
      },
        {
          card: '1111',
          password: 'abc',
          createTime: '2020/7',
          company: '上海市审计局',
          statue: '未订阅',
          subscribeTime: '2020/7',
          user: 'huchaoqun',
          phone: '10086',
          localCompany: '上海市民政局',
          address: '政法委-浦东新区',
          email: '246500'
        },
        {
          card: '1111',
          password: 'abc',
          createTime: '2020/7',
          company: '华东政法大学',
          statue: '已订阅',
          subscribeTime: '2020/7',
          user: 'huchaoqun',
          phone: '10086',
          localCompany: '上海市民政局',
          address: '政法委-黄浦区',
          email: '246500'
        }]
      this.tableData=this.tableData.filter(item=>{
        if((!this.from.isSubscribe || item.statue===this.from.isSubscribe) &&
            (!this.from.createTime || item.createTime===this.from.createTime) &&
            (!this.from.company || item.company===this.from.company) &&
        (!this.from.place || item.address===this.from.place)){
          return true
        }else{
          return false
        }
      })
    },

    //修改
    edit(){
      this.tableData[this.editId]=this.editFrom
      this.dialogFormVisible=false
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
      this.initExportData()
      const ws = XLSX.utils.aoa_to_sheet(this.exel);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
      XLSX.writeFile(wb, "订阅卡信息.xlsx")
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
