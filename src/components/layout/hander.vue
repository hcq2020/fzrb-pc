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

<!--修改密码-->
    <el-dialog  title="修改密码" width="500px" :visible.sync="dialogFormVisible" :close-on-click-modal=false>
      <div class="tips">
        密码必须由8~12位英文字母、数字或特殊字符组成（不允许有空格），且至少包含字母、数字、特殊字符中的两种。
      </div>
      <el-form :model="editFrom" ref="form" :rules="rules">
        <el-form-item label="旧密码：" label-width="20%" prop="old_password">
          <el-input v-model="editFrom.old_password" clearable autocomplete="off" auto-complete="new-password" @keyup.native="(e)=>keyup(e,'old_password')"  placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" label-width="20%" prop="password">
          <el-input v-model="editFrom.password"  clearable autocomplete="off" auto-complete="new-password" @keyup.native="(e)=>keyup(e,'password')" placeholder="请输入" show-password>
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码：" label-width="20%" prop="confirm_password">
          <el-input v-model="editFrom.confirm_password"  clearable autocomplete="off" auto-complete="new-password" @keyup.native="(e)=>keyup(e,'confirm_password')" placeholder="请输入" show-password>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="bt_t" type="primary" @click="setPassword">确 定</el-button>
        <el-button class="bt_f" @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {changePassword, logout} from "@/api";

export default {
  name: "hander",
  data() {
    var validatPassword = (rule, value, callback) => {
      let rex=/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9_]{8,16}$/
      if (value === '') {
        callback(new Error('原密码不能为空'));
      }if(!rex.test(value)){
        callback(new Error('密码必须由8~12位英文字母、数字或特殊字符组成（不允许有空格），且至少包含字母、数字、特殊字符中的两种。'));
      } else {
        callback();
      }
      setTimeout(()=>{
        this.$refs['form'].clearValidate()
      },3000)
    };
    var validatnewPassword = (rule, value, callback) => {
      let rex=/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9_]{8,16}$/
      if (value === '') {
        callback(new Error('新密码不能为空'));
      }if(!rex.test(value)){
        callback(new Error('密码必须由8~12位英文字母、数字或特殊字符组成（不允许有空格），且至少包含字母、数字、特殊字符中的两种。'));
      } else {
        callback();
      }
      setTimeout(()=>{
        this.$refs['form'].clearValidate()
      },3000)
    };
    var validatnextPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('确认密码不能为空'));
      }else if(value !==this.editFrom.password ){
        callback(new Error('确认密码与新密码不一致'));
      } else {
          callback();
        }
      setTimeout(()=>{
        this.$refs['form'].clearValidate()
      },3000)
    };
    return {
      img: 'img/touxiang.png',
      user: '',
      dialogFormVisible:false,
      editFrom:{
        confirm_password: "",
        old_password: "",
        password: ""
      },
      rules: {
        confirm_password: [
            { validator:validatnextPassword,required: true, trigger: "blur" }
            ],
        old_password: [
          { validator:validatPassword,required: true, trigger: "blur" }
        ],
        password: [
          { validator:validatnewPassword,required: true, trigger: "blur" }
        ]
      }
    }
  },
  created() {

  },
  mounted() {
    this.user=localStorage.getItem('userName')?localStorage.getItem('userName'):''
  },
  watch:{
    $route: {
      handler(to,from) {
        if(from!=undefined && from.name === 'Login'){
          this.user=localStorage.getItem('userName')
        }
      },
      deep:true,
      immediate: true
    }
  },
  methods: {
    back() {
      logout().then(res=>{
        if(res.data.code==200){
          localStorage.removeItem('token')
          this.$router.push("/login")
        }
      })
    },

    cancel(){
      this.dialogFormVisible=false
      Object.keys(this.editFrom).forEach(key=>{this.editFrom[key]=''})

    },

    keyup(e,name){
      this.editFrom[name]=this.editFrom[name].replace(/\s+/g,'')
    },

    setPassword(){
      let that=this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          changePassword(that.editFrom).then(res=>{
            if(res.data.message=='密码修改成功'){
              that.dialogFormVisible=false
              that.$message.success("修改成功！")
              localStorage.removeItem('token')
              this.$router.push("/login")
            }else{
              this.$message.error(res.data.message)
            }
          })
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1536px) {
  .head {
    width: 100%;
    min-width: 75rem;
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
    margin: 30px 0 30px 0;
  }

  .el-form-item {
    margin-bottom: 42px;
  }


}
@media screen and (min-width: 1537px) {
  .head {
    width: 100%;
    min-width: 95rem;
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
    margin: 30px 0 30px 0;
  }

  .el-form-item {
    margin-bottom: 42px;
  }


}


</style>
