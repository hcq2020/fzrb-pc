<template>
  <div class="page">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="订阅管理中心" name="first"></el-tab-pane>
      <el-tab-pane label="批量生成订阅卡" name="second"></el-tab-pane>
    </el-tabs>
    <!--订阅管理中心-->
    <manege :change="key" v-show="activeName=='first'"></manege>
    <!--批量生成订阅卡-->
    <create v-show="activeName=='second'"></create>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      activeName: 'first',
      key: 1
    }
  },
  components: {
    Create: () => import('../components/create'),
    Manege: () => import('../components/manage')
  },
  created() {

  },
  mounted() {

  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      this.key++
    }
  }
}
</script>

<style lang="scss" scoped>

@media screen and (max-width: 1536px) {
  .page {
    margin: 2.5rem;
    min-width: 70rem;
    height: auto;
    box-sizing: border-box;
    overflow-y: hidden;
    padding: 1.18rem;
    background: white;
    box-shadow: 0rem 0rem 1rem rgba(0, 0, 0, 0.02);
  }

  /deep/.el-input__inner{
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    padding: 0 25px 0 5px;
  }

  /deep/.el-button{
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
  }

  /deep/ .el-cascader .el-input .el-icon-arrow-down{
    font-size: 12px;
  }

  /deep/.el-range-editor{
    padding: 0 10px!important;
    width: 210px !important;
  }

  /deep/.el-cascader{
    height: 32px;
    line-height: 28px;
    font-size: 12px;
  }
  /deep/ .el-input__icon{
    line-height: 30px;
  }

  /deep/ .el-date-editor .el-range-input, .el-date-editor .el-range-separator{
    font-size: 12px;
  }

  /deep/ .el-cascader-node__label {
    font-size: 12px;
  }
  /deep/.el-select-dropdown__item {
    font-size: 12px;
  }

  /deep/ .el-date-editor .el-range-separator {
    line-height: 27px;
    width: 10%;

  }
}

@media screen and (min-width: 1537px) {
  .page {
    margin: 2.5rem;
    min-width: 90rem;
    height: 48.5rem;
    box-sizing: border-box;
    overflow-y: hidden;
    padding: 1.18rem;
    background: white;
    box-shadow: 0rem 0rem 1rem rgba(0, 0, 0, 0.02);
  }
}


/deep/ .el-tabs__item.is-active {
  color: #255AFF;
  font-size: 18px;
  font-weight: bold;
}

/deep/ .el-tabs__item {
  font-size: 16px;
  color: #AEB3C1;
}

/deep/ .el-tabs__active-bar {
  height: 4px;
  background: #255AFF;
  border-radius: 1000px;
}
</style>

<style lang="scss">
.el-dialog__header {
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

.el-dialog__title {
  color: #FFFFFF;
}

.el-dialog__headerbtn {
  font-size: 16px;
  color: #FFFFFF;
  top: 15px
}

.el-dialog__headerbtn .el-dialog__close {
  color: #ffffff;
  font-size: 20px;
}

.el-dialog__body {
  margin: 30px auto;
  padding: 0 20px;
  width: 24rem;

  .el-input {
    width: 240px;
  }
}

.el-form-item__label {
  width: 30% !important;
}

.el-form-item__content {
  margin-left: 30% !important;
  width: fit-content !important;
}

.el-dialog__footer {
  text-align: center !important;
  padding: 10px 20px 50px !important;

  .el-button {
    padding: 8px 26px;
  }
}
</style>
