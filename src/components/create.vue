<template>
  <div class="content">
    <div class="df">
      <div>
        <el-input v-model.number="from.num" min="0" max="20000" placeholder="请输入生成条数"></el-input>
      </div>
      <div class="mar18" >
        <el-select v-model="from.unitId"  slot="prepend" placeholder="请选择派发单位">
          <el-option v-for="item in companyOption" :label="item.unitName" :value="item.id" :key="item.id"></el-option>
          <el-option label="+添加派发单位" value="0" @click.native.capture.stop="dialogFormVisible=true" style="color: red"></el-option>
        </el-select>
      </div>
      <div>
        <el-button type="primary" @click="generate()">生成</el-button>
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
            prop="cardNo"
            label="卡号">
        </el-table-column>
        <el-table-column
            prop="cardPassword"
            label="密码">
        </el-table-column>
        <el-table-column
            prop="unitName"
            label="派发单位"
            show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog  title="添加" width="500px" :visible.sync="dialogFormVisible">
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
import {batchGeneration, batchSaveDistributionUnit, exportCard, getunitDistributionUnitList, saveCard} from "@/api";
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
        unitId:'',
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
this.getPlace()
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

    getPlace(){
      getunitDistributionUnitList().then(res=>{
        if(res.data.code==200){
          this.companyOption=res.data.data
        }else{
          this.$message.error(res.data.message)
        }
      })
    },

    //生成
    generate(){
      if(this.from.num>0 && this.from.unitId!==''){
        batchGeneration(this.from).then(res=>{
          if(res.data.code==200){
            res.data.data.forEach(item=>{
             item.unitName=this.getCompanyById(item.unitId)
              saveCard({
                cardNo:item.cardNo,
                cardPassword: item.cardPassword,
                unitId: item.unitId
              }).then(res=>{
console.log(res)
              })
            })
            this.tableData=res.data.data

          }else{
            this.$message.error(res.data.message)
          }
        })
      }
    },


    getCompanyById(id){
      for (const argumentsKey in this.companyOption) {
        if(this.companyOption[argumentsKey].id==id){
          return this.companyOption[argumentsKey].unitName
        }
      }
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
  batchSaveDistributionUnit([
    {
      unitName: this.addFrom.name
    }
  ]).then(res=>{
    if (res.data.code==200){
      this.dialogFormVisible=false
      console.log(res)
      this.getPlace()
    }else {
      this.$message.warning(res.data.message)
    }
  })

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
        exel.push([index+1,item.cardNo,item.cardPassword,item.unitName])
      })
      this.exel = exel
    },

    // 点击导出Exel
    exported() {
      let ids=[]
      this.tableData.forEach(item => {
        ids.push(item.id)
      })
      var day2 = new Date();
      day2.setTime(day2.getTime());
      var s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
      exportCard(ids).then( response  => {
            console.log(response)
            this.downLoadXls(response.data,s2+this.exel[1][3]+".xlsx")
          }
      )


      this.initExportData()
      const ws = XLSX.utils.aoa_to_sheet(this.exel);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "SheetJS");

   //   XLSX.writeFile(wb, s2+this.exel[1][3]+".xlsx")
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
.content{
  width: 100%;
  height: 100%;

  .el-table{
    border: 1px solid #E8E8E8;
  }
}

/deep/ .el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar {
  width: 0!important;
  display: none !important;
}
/deep/ .el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar-track {
  width: 0!important;
  display: none!important;
}
/deep/ .el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar-thumb {
  width: 0!important;
  display: none!important;
}

/deep/ .el-table__body{
  width: 100% !important;
}
/deep/ .el-table th, .el-table tr {
  background: #F5F6F8;
  font-size: 14px;
  font-weight: bold;
  color: #1F242E;
}

/deep/ .el-table td.gutter, .el-table th.gutter{
  display: none;
}
/deep/ .el-table__fixed-right-patch{
  display: none;
}
</style>

