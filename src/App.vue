<template>
  <div id="app">
    <Sidebar :status="isPull" @clickPullBtn="clickPullBtn"/>
    <div class="main" :class="{active: !isPull}">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
export default {
  name: 'app',
  components: { Sidebar },
  data() {
    return {
      isPull: true
    }
  },
  mounted() {
    this.keydownDrawer()
  },
  methods: {
    clickPullBtn(payload) {
      // console.log('payload', payload)
      this.isPull = payload
    },
    keydownDrawer() {
      document.addEventListener('keydown', e => {
        if (e.shiftKey && e.key === 'D') {
          this.isPull = !this.isPull
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  transition: all .3s;
  &.active {
    margin-left: 100px;
  }
}
</style>