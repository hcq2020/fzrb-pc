<template>
  <div class="page">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="订阅管理中心" name="first"></el-tab-pane>
      <el-tab-pane label="批量生成订阅卡" name="second"></el-tab-pane>
    </el-tabs>

    <manege :change="key" v-show="activeName=='first'"></manege>
    <create v-show="activeName=='second'"></create>
  </div>
</template>

<script>
export default {
name: "home",
  data(){
  return{
    activeName: 'first',
    key:1
  }
  },
  components:{
  Create:()=>import('../components/create'),
    Manege:()=>import('../components/manage')
  },
  created() {

  },
  mounted() {

  },
  methods:{
    handleClick(tab, event) {
      console.log(tab, event);
      this.key++
    }
  }
}
</script>

<style lang="scss" scoped>
.page{
  margin: 2.5rem;
  height: 48.5rem;
  box-sizing: border-box;
  overflow-y: hidden;
  padding: 1.18rem;
  background: white;
  box-shadow: 0rem 0rem 1rem rgba(0, 0, 0, 0.02);
}

/deep/ .el-tabs__item.is-active {
  color: #255AFF;
  font-size: 18px;
  font-weight: bold;
}

/deep/ .el-tabs__item{
  font-size: 16px;
  color: #AEB3C1;
}

/deep/ .el-tabs__active-bar{
  height: 4px;
  background: #255AFF;
  border-radius: 1000px;
}
</style>

<style lang="scss">
.el-dialog__header{
  height: 48px;
  line-height: 48px;
  color: #FFFFFF;
  padding: 0 20px;
  border: 1px solid rgba(0, 0, 0, 0);
  background: linear-gradient(180deg, #7DB9FF 0%, #1345FF 100%);
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  opacity: 1;
}

.el-dialog__title{
  color: #FFFFFF;
}
.el-dialog__headerbtn {
  font-size: 16px;
  color: #FFFFFF;
  top:15px
}
.el-dialog__headerbtn .el-dialog__close {
  color: #ffffff;
  font-size: 20px;
}

.el-dialog__body{
  margin: 30px auto;
  width: 22rem;
.el-input{
  width: 240px;
}
}

</style>
