<template>
  <div class="content">
    <div class="df">
      <div>
        <el-input v-model="from.num" type="number" min="0" max="20000" placeholder="请输入生成条数"></el-input>
      </div>
      <div class="mar18" >
        <el-select v-model="from.company"  slot="prepend" placeholder="请选择派发单位">
          <el-option v-for="item in companyOption" :label="item" :value="item" :key="item"></el-option>
          <el-option label="+添加派发单位" value="0" @click.native.capture.stop="dialogFormVisible=true" style="color: red"></el-option>
        </el-select>
      </div>
      <div>
        <el-button type="primary" @click="generate(from.num)">生成</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
      <div class="f1">
        <el-button class="f_right" type="primary" @click="exported">导出</el-button>
      </div>
    </div>
    <div class="table mt18">
      <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          height="600"
          style="width: 100%;"
          @selection-change="handleSelectionChange">
        <el-table-column
            type="index"
            label="序号"
            width="150">
        </el-table-column>
        <el-table-column
            prop="cardId"
            label="卡号">
        </el-table-column>
        <el-table-column
            prop="password"
            label="密码">
        </el-table-column>
        <el-table-column
            prop="company"
            label="派发单位"
            show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog  title="添加" width="30%" :visible.sync="dialogFormVisible">
      <el-form :model="addFrom">
        <el-form-item label="派发单位" label-width="20%">
          <el-input v-model="addFrom.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCompany">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import XLSX from 'xlsx';
export default {
  name: "create",
  data(){
    return{
      companyOption:[
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
        '政法委-上海市公安局',
        '武警',
        '华东政法大学',
        '司鉴院',
        '民防',
        '上海市审计局',
        '上海市民政局'],
      from:{
        company:'',
        num:''
      },
      addFrom:{
        name:'',
      },
      tableData: [],
      multipleSelection: [],
      currentPage:4,
      dialogFormVisible:false,
      exel:[],
      key:1
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
    },

    //生成
    generate(num){
      if(this.from.num>0 && this.from.company!==''){
        this.generateCard(num)
      }
    },
    generateCard(num){
      let obj={
        cardId:'',
        password:'',
        company:''
      }
      for(let i=0;i<8;i++){
        obj.cardId+=(Math.floor(Math.random()*10))
      }
      for(let i=0;i<6;i++){
        obj.password+=(Math.floor(Math.random()*10))
      }
    //  obj.company=this.companyOption[Math.floor(Math.random()*this.companyOption.length)]
      obj.company=this.from.company
      this.tableData.push(obj)
      if(--num>0)
        return this.generateCard(num)
    },
    //重置
    reset(){
      this.tableData=[]
      this.from.company=''
      this.from.num=0
    },
    //添加派发单位
    addCompany(){
if(this.addFrom.name!==''){
  this.companyOption.push(this.addFrom.name)
  this.dialogFormVisible=false
}else{
  this.$message.warning('请输入新增派发单位！')
}
    },

    // 处理好要导出的数据放到(this.exel里)
    initExportData() {
      let exel=[]
      const keys = ['序号', '卡号', '密码', '派发单位'];
      exel.push(keys)
      this.tableData.forEach((item,index)=>{
        exel.push([index+1,...Object.values(item)])
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
.content{
  width: 100%;
  height: 100%;
}
</style>

