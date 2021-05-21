<template>
  <div class="login-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="login-form">
      <h2 class="login-title">管理员登录</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name:'AdmainLogin',
    data() {
      return {
        msg: "",
        form: {
          username: "",
          password: ""
        },
        rules: {
          username: [
            {required: true, message: "用户名不能为空", trigger: 'blur'},
            // {min: 3, max: 10, message: "用户名3-5位", trigger: 'blur'}
          ],
          password: [
            {required: true, message: "密码不能为空", trigger: 'blur'},
            // {min: 3, max: 10, message: "密码3-5位", trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$axios({
              method:'post',
              url:'login/login',
              data:{username : this.form.username,password : this.form.password,admainType : '02'},
              headers:{
                'Content-Type':'application/json;charset=utf-8'
              }
            }).then(res => {
              this.msg = res.data.data;
              alert(this.msg.msg)
              if(this.msg.status == 1){
                this.$router.push({
                  name: 'PointData'
                })
              }
            })
              .catch(function (error) {
                console.log(error)
                alert('请求失败')
              })
          } else {
            console.log('验证失败');
            return false;
          }
        });
      }
    }
  };
</script>

<style acoped>
  .login-form {
    width: 350px;
    margin: 160px auto;
    background-color: rgb(255, 255, 255,0.8);
    padding: 30px;
    border-radius: 20px;
  }

  /* 背景 */
  .login-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url("../assets/login.png") no-repeat;
    background-size:100% 100%;
  }

  .login-title {
    color: #303133;
    text-align: center;
  }
</style>
