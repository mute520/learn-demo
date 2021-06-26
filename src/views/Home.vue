<template>
  <div class="home">
    {{msg}}
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data() {
    return {
      msg: 'home',
    }
  },
}
</script>
