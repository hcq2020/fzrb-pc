<template>
  <div class="page">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="订阅管理中心" name="first"></el-tab-pane>
      <el-tab-pane label="批量生成订阅卡" name="second"></el-tab-pane>
    </el-tabs>
    <create v-show="selectId"></create>
    <manege v-show="!selectId"></manege>
  </div>
</template>

<script>
export default {
name: "home",
  data(){
  return{
    activeName: 'second',
    selectId:true
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
      this.selectId=!this.selectId
    }
  }
}
</script>

<style lang="scss" scoped>
.page{
  margin: 2.5rem;
  box-sizing: border-box;
  padding: 1.18rem;
  background: white;
  box-shadow: 0rem 0rem 1rem rgba(0, 0, 0, 0.02);
}
</style>
