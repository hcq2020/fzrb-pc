<template>
  <div class="head">
    <span class="title">法治日报定向订阅管理系统</span>
    <span class="user">
      <img :src=img alt="头像" draggable="false" height="35"/>
      <el-dropdown style="margin-left: 10px">
          <span class="el-dropdown-link">
            <span>{{ user }}</span>
          </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="back">切换账号</el-dropdown-item>
          <el-dropdown-item @click.native="back">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>
  </div>
</template>

<script>
export default {
  name: "hander",
  data() {
    return {
      img: 'img/touxiang.png',
      user: '张晓宇'
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    back() {

    }
  }
}
</script>

<style lang="scss" scoped>
.head {
  width: 100%;
  height: 5.03rem;
  background: url('~@/assets/image/header_bg.png');
  background-size: cover;
  border: 0px solid #707070;
  opacity: 1;
  box-sizing: border-box;
  padding: 0 2.5rem;

  .title {
    font-size: 2.13rem;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #FFFFFF;
    line-height: 5.03rem;
  }

  .user {
    float: right;
    line-height: 5.03rem;
    img{
      width: 2.25rem;
      vertical-align: middle;
    }
    .el-dropdown{
      font-size: 1.13rem;
      color: #FFFFFF;
      cursor: pointer;
    }
  }
}
</style>
