<template>
  <div class="sidebar" :class="{active: isRotate}">
    <ul>
      <li v-for="(item, i) in navList" @click="clickNav(item.path, i)" :class="{active: navIndex === i}" :key="item.id">
        <!-- <router-link :to="item.path">{{item.name}}</router-link> -->
        <div class="text">{{item.name}}</div>
      </li>
    </ul>
    <div class="btn" @click="isRotate = !isRotate">
      <i class="el-icon-arrow-left" :class="{rotate: isRotate}"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  data() {
    return {
      flag: true,
      isRotate: false,
      navIndex: 0,
      navList: [
        { path: '/', name: 'Home' },
        { path: '/student', name: 'student' },
        { path: '/editor', name: 'editor' },
        { path: '/org-tree', name: 'org-tree' },
      ]
    }
  },
  mounted() {},
  methods: {
    clickNav(path, index) {
      if (this.navIndex === index) return
      this.navIndex = index
      this.$router.push(path)
    }
  }
}
</script>

<style lang="less" scoped>
.sidebar {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100px;
  height: 100%;
  transition: all .3s;
  background: #0f9;
  &.active {
    left: -100px;
  }
  .btn {
    position: absolute;
    top: 50%;
    right: -21px;
    transform: translateY(-50%);
    width: 20px;
    height: 40px;
    line-height: 40px;
    border-left: 1px solid #fff;
    border-radius: 0 8px 8px 0;
    background: #0f9;
    cursor: pointer;
    i {
      transition: all .3s;
      color: #fff;
      font-size: 20px;
      &.rotate {
        transform: rotate(180deg);
      }
    }
  }
  ul {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      background: #0f9;
      color: #fff;
      padding: 6px;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      transition: all .3s;
      &:hover {
        background: #828877;
      }
      &.active {
        background: #636460;
      }
      a, .text {
        color: #fff;
        text-decoration: none;
      }
    }
  }
}
</style>