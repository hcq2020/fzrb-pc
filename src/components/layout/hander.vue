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
          <el-dropdown-item @click.native="dialogFormVisible=true">修改密码</el-dropdown-item>
          <el-dropdown-item @click.native="back">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>
    <el-dialog  title="修改密码" width="500px" :visible.sync="dialogFormVisible">
      <div class="tips">
        密码必须有8-12位英文字母、数字或特殊字符组成（不允许
        有空格），且字母、数字和特殊符号至少包含两种。
      </div>
      <el-form :model="editFrom">
        <el-form-item label="旧密码" label-width="20%">
          <el-input v-model="editFrom.old_password"  autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="20%">
          <el-input v-model="editFrom.password" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" label-width="20%">
          <el-input v-model="editFrom.confirm_password" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="setPassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {changePassword, logout} from "@/api";

export default {
  name: "hander",
  data() {
    return {
      img: 'img/touxiang.png',
      user: '张晓宇',
      dialogFormVisible:false,
      editFrom:{
        confirm_password: "",
        old_password: "",
        password: ""
      }
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    back() {
      logout().then(res=>{
        if(res.data.code==200){
          this.$router.push("/login")
        }
      })
    },

    cancel(){
      this.dialogFormVisible=false
      Object.keys(this.editFrom).forEach(key=>{this.editFrom[key]=''})

    },

    setPassword(){
      changePassword(this.editFrom).then(res=>{
        if(res.data.message=='密码修改成功'){
          this.dialogFormVisible=false
          this.$message.success("修改成功！")
          localStorage.removeItem('token')
          this.$router.push("/login")
        }else{
          this.$message.error(res.data.message)
        }
      })
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

.tips{
  font-size: 12px;
  line-height: 16px;
  color: #255AFF;
}
</style>
