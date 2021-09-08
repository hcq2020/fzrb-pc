<template>
  <div class="page">
    <div class="content">
      <div class="title">
        法治日报定向订阅管理系统
      </div>
      <div class="login">
        <div class="font_bule">欢迎登录</div>
        <div class="mtb5">
          <el-input v-model="userName" clearable placeholder="请输入账号">
            <i slot="prefix" class="el-input__icon my-icon-user-solid"></i>
          </el-input>
          <el-input class="mt2" v-model="passWord" clearable type="password" placeholder="请输入密码"  show-password>
            <i slot="prefix" class="el-input__icon my-icon-pasw-solid"></i>
          </el-input>
        </div>
        <div class="bt" @click="login">立即登录>>></div>
      </div>
    </div>
  </div>
</template>

<script>

import {login} from '../api/index'

export default {
  name: "Login",
  data() {
    //定义变量
    return {
      userName: '',
      passWord: '',
    }
  },
  created() {
    //组件创建时执行函数

  },
  mounted() {
    //实例被挂载

  },
  methods: {
    login() {
      if(this.userName==''){
        this.$message.warning("请输入账号！")
      }else if(this.passWord==''){
        this.$message.warning("请输入密码！")
      }else{
        let data={
          password: this.passWord,
          rememberMe: true,
          userName: this.userName
        }
        login(data).then(res=>{
          if(res.data.code===200){
            localStorage.setItem('token',res.data.data.token)
            localStorage.setItem('userName',res.data.data.userName)
            this.$router.push('/home')
          }else{
            this.$message.error("账号不存在，或密码错误！")
          }
        })
      }

    }

  },
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1680px) {
  .page {
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: linear-gradient(180deg, #7DB9FF 0%, #1345FF 100%);

    .content {
      height: 100%;
      width: 100%;
      background-image: url("../assets/image/login_bg.png");
      background-repeat: no-repeat;
      background-size: 100%;
      box-sizing: border-box;
      padding: 5.19rem 6.75rem;
      text-align: center;

      .title {
        font-size: 2.2rem;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 3rem;
        color: #FFFFFF;
        text-shadow: 0px 4px 6px rgba(38, 59, 201, 0.45);
        opacity: 1;
      }

      .login {
        margin-top: 2.5rem;
        float: right;
        width: 16.18rem;
        height: 19rem;
        text-align: center;
        box-sizing: border-box;
        padding: 2.75rem 1.5rem 3.19rem;
        border-radius: 15px;
        background: #FFFFFF;
        opacity: 1;

        .bt {
          height: 2rem;
          line-height: 2rem;
          border-radius: 5px;
          color: white;
          font-size: 0.875rem;
          border: 0px solid rgba(0, 0, 0, 0);
          background: linear-gradient(180deg, #7DB9FF 0%, #1345FF 100%);
          cursor: pointer;
        }

        .font_bule {
          width: max-content;
          margin: auto;
          font-weight: bold;
          font-size: 1.25rem;
          padding: 3px;
          color: #255AFF;
          border-bottom: 2px solid #255AFF;
        }
      }
    }
  }
  /deep/.el-input__inner {
    height: 30px;
    line-height: 30px;
  }
  /deep/.el-input__icon {
    line-height: 30px;
  }
  .mtb5 {
    margin: 2rem 0;
  }

  .mt2 {
    margin-top: 1.5rem;
  }
}
@media screen and (min-width: 1681px) {
  .page {
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: linear-gradient(180deg, #7DB9FF 0%, #1345FF 100%);

    .content {
      height: 100%;
      width: 100%;
      background-image: url("../assets/image/login_bg.png");
      background-repeat: no-repeat;
      background-size: 100%;
      box-sizing: border-box;
      padding: 5.19rem 18.75rem;
      text-align: center;

      .title {
        font-size: 3.5rem;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 4.63rem;
        color: #FFFFFF;
        text-shadow: 0px 4px 6px rgba(38, 59, 201, 0.45);
        opacity: 1;
      }

      .login {
        margin-top: 7.69rem;
        float: right;
        width: 460px;
        height: 540px;
        text-align: center;
        box-sizing: border-box;
        padding: 3.75rem 2.5rem 4.19rem;
        border-radius: 15px;
        background: #FFFFFF;
        opacity: 1;

        .bt {
          height: 3rem;
          line-height: 3rem;
          border-radius: 5px;
          color: white;
          font-size: 1.125rem;
          border: 0px solid rgba(0, 0, 0, 0);
          background: linear-gradient(180deg, #7DB9FF 0%, #1345FF 100%);
          cursor: pointer;
        }

        .font_bule {
          width: max-content;
          margin: auto;
          font-weight: bold;
          font-size: 1.75rem;
          padding: 3px;
          color: #255AFF;
          border-bottom: 2px solid #255AFF;
        }
      }
    }
  }
  .mtb5 {
     margin: 5rem 0;
   }

  .mt2 {
    margin-top: 2.5rem;
  }
}





</style>
<style>
.my-icon-user-solid {
  background-size: contain;
  background-image: url("../assets/image/user.png");
  background-repeat: no-repeat;
}

.my-icon-user-solid:before {
  content: "替";
  font-size: 22px;
  visibility: hidden;
}

.my-icon-pasw-solid {
  background-size: contain;
  background-image: url("../assets/image/pasw.png");
  background-repeat: no-repeat;
}

.my-icon-pasw-solid:before {
  content: "替";
  font-size: 22px;
  visibility: hidden;
}

</style>
