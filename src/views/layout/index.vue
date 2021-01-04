<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="200px">
      <app-aside></app-aside>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <i class="el-icon-s-fold"></i>
          <span>xxx公司</span>
        </div>
        <el-dropdown>
          <!-- <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span> -->
          <div class="avatar-warp">
              <img src="https://i0.hdslb.com/bfs/face/2282ffa7843f1b03f0067444ccb9d0c2cdc3e9d4.jpg@72w_72h_1c.webp" alt="1">
              <span>用户昵称</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus">退出</el-dropdown-item>
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
import AppAside from "../layout/components/aside";
export default {
  name: "LayoutIndex",
  components: {
    AppAside,
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
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
  background-color: #d3dce6;
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
