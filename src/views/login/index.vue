<template>
  <div class="login-container">
    <!--
      el-form 表单组件
      每个表单项都必须使用 el-form-item 组件包裹
     -->

    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <!--
        配置form表单验证：
        1、必须给el-form组件绑定model为表单数据对象
        2、给需要验证的表单项el-form-item绑定prop属性
        prop属性需要指定表单对象中的数据名称
        3、通过 el-from 组件的 rules 属性配置验证规则
        4、ref 的作用主要用来获取表单组件手动触发验证

        手动触发表单验证
        1、给el-form设置ref
        2、通过ref获取el-form组件，调用validata方法进行验证
        -->
      <el-form
        class="login-form"
        ref="login-form"
        :model="user"
        :rules="formRules"
      >
        <el-form-item prop="mobile">
          <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="user.agree"
            >我已阅读并同意用户协议和隐私条款</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            @click="onLogin"
            :loading="loginLoading"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import {login} from "../../api/user"

export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: "", // 手机号
        code: "", // 验证码
        agree:false //是否同意协议
      },
      // checked: false, // 是否同意协议的选中状态
      loginLoading: false, //是否登录加载
      formRules: {
        //表单验证规则配置
        mobile: [
          { required: true, message: "请输入手机号", trigger: "change" },
          {
            //正则表达式以1开头，第二位为3、5、7、8、9几个之一，后变还需9个数字
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: "请输入正确的号码格式",
            trigger: "change",
          },
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "change" },
          { pattern: /^\d{6}$/, message: "请输入正确的验证码格式" },
        ],
        agree:[
          {
            //自定义校验规则
            validator:(rule, value,callback) => {
               if (value) {
              callback()
            } else {
              callback(new Error('请同意用户协议'))
            }
            },
            trigger:'change'
          }
        ]
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onLogin() {
      // 获取表单数据（根据接口要求绑定数据）
      const user = this.user;

      // 表单验证
      // console.log(this.$refs['login-form'])
      this.$refs["login-form"].validate((valid, err) => {
        // console.log(valid)
        // console.log(err)
        //如果表单验证失败，停止提交请求
        //validate方法是异步的
        if (!valid) {
          return;
        }
        //验证通过,请求登录
        this.login();
      });
    },

    login() {
      //开启登录中loading
      this.loginLoading = true;
      // request({
      //   method: "POST",
      //   url: "/mp/v1_0/authorizations",
      //   // data 用来设置 POST 请求体
      //   data: this.user,
      // })
        login(this.user).then((res) => {
          console.log(res);

          // 登录成功
          this.$message({
            message: "登录成功",
            type: "success",
          });
          //关闭loading
          this.loginLoading = false;
        })
        .catch((err) => {
          // 登录失败
          console.log("登录失败", err);
          this.$message.error("登录失败，手机号或验证码错误");
          //关闭loading
          this.loginLoading = false;
        });
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("./login_bg.jpg") no-repeat;
  background-size: cover;
  .login-form-wrap {
    min-width: 300px;
    padding: 30px 50px 10px;
    background-color: #fff;
    .login-head {
      display: flex;
      justify-content: center;
      .logo {
        width: 200px;
        height: 57px;
        background: url("./logo_index.png") no-repeat;
        background-size: contain;
      }
    }
    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>