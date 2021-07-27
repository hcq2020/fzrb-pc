<template>
<div class="content">
  <div class="df">
    <div>
      <el-select v-model="from.isSubscribe" slot="prepend" placeholder="请选择订阅状态">
        <el-option label="已订阅" value="1"></el-option>
        <el-option label="未订阅" value="2"></el-option>
      </el-select>
    </div>
    <div class="mar18">
      <el-select v-model="from.createTime" slot="prepend" placeholder="请选择建卡日期">
        <el-option label="已订阅" value="1"></el-option>
        <el-option label="未订阅" value="2"></el-option>
      </el-select>
    </div>
    <div>
      <el-select v-model="from.company" slot="prepend" placeholder="请选择派发单位">
        <el-option label="已订阅" value="1"></el-option>
        <el-option label="未订阅" value="2"></el-option>
      </el-select>
    </div>
    <div class="mar18">
      <el-select v-model="from.place" slot="prepend" placeholder="请选择地区">
        <el-option label="已订阅" value="1"></el-option>
        <el-option label="未订阅" value="2"></el-option>
      </el-select>
    </div>
    <div>
      <el-input v-model="from.input" placeholder="请输入关键词"></el-input>
    </div>
    <div class="ml40">
      <el-button type="primary">查询</el-button>
      <el-button >清除</el-button>
    </div>
    <div class="f1">
      <el-button class="f_right" type="primary">导出</el-button>
    </div>
  </div>
 <div class="table mt18">
   <el-table
       ref="multipleTable"
       :data="tableData"
       tooltip-effect="dark"
       style="width: 100%"
       @selection-change="handleSelectionChange">
     <el-table-column
         type="selection"
         width="55">
     </el-table-column>
     <el-table-column
         label="日期"
         width="120">
       <template slot-scope="scope">{{ scope.row.date }}</template>
     </el-table-column>
     <el-table-column
         prop="name"
         label="姓名"
         width="120">
     </el-table-column>
     <el-table-column
         prop="address"
         label="地址"
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
        <el-form-item label="活动名称" label-width="20%">
          <el-input v-model="editFrom.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" label-width="20%">
          <el-select v-model="editFrom.address" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
</div>
</template>

<script>
export default {
name: "create",
  data(){
  return{
    from:{
      isSubscribe:'',
      createTime:'',
      company:'',
      place:'',
      input:''
    },
    editFrom:{
      name:'',
      address:'',
    },
    tableData: [{
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      date: '2016-05-08',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      date: '2016-05-06',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      date: '2016-05-07',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }],
    multipleSelection: [],
    currentPage:4,
    dialogFormVisible:false,
  }
  },
  created() {

  },
  mounted() {

  },
  methods:{
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    deleteRow(index, rows) {
      this.dialogFormVisible=true
      this.editFrom=rows[index]
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}
</script>

<style lang="scss" scoped>
.content{
  width: 100%;
  height: 100%;

  #dialog{
    .el-select{
      width: 100%;
    }
  }
}
</style>
