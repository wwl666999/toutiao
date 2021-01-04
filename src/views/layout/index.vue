<template>
  <el-container class="layout-container">
    <el-aside 
    class="aside" 
    width="auto"
    >
      <app-aside 
      class="aside-menu"
      :isCollapse="isCollapse"
      >
      </app-aside>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <i :class="{
            'el-icon-s-fold':isCollapse,
            'el-icon-s-unfold':!isCollapse
          }"
          @click="isCollapse = !isCollapse"
          ></i>
          <span>xxx公司</span>
        </div>
        <el-dropdown>
          <!-- <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span> -->
         <div class="avatar-wrap">
            <img class="avatar" :src="user.photo" alt="">
            <span>{{ user.name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus"
            @click.native="onLogout"
            >退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getUserProfile } from '../../api/user';
import AppAside from "../layout/components/aside";

export default {
  name: "LayoutIndex",
  components: {
    AppAside,
  },
  props: {},
  data() {
    return {
        user:{},//当前登录用户信息
        isCollapse:true //侧边菜单栏的展示状态
    };
  },
  computed: {},
  watch: {},
  created() {
      //组件初始化之后，请求获取用户资料
      this.loadUserProfile()
  },
  mounted() {},
  methods: {
      //除了登录接口，其他所有接口都需要授权才能请求使用，都需要提供身份令牌才可以获取数据
      loadUserProfile(){
          getUserProfile().then(res => {
              console.log(res);
          })
      },

      onLogout () {
  this.$confirm('确认退出吗？', '退出提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 把用户的登录状态清除
    window.localStorage.removeItem('user')

    // 跳转到登录页面
    this.$router.push('/login')
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '已取消退出'
    })
  })
},
}
}
</script>

<style scoped lang="less">
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.aside {
  background-color: #002033;
  .aside-menu {
    height: 100%;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}

.main {
  background-color: #e9eef3;
}
</style>
