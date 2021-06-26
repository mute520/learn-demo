<template>
  <div class="editor-box">
    <TinymceEditor v-model="content"/>
  </div>
</template>

<script>
import TinymceEditor from '@/components/TinymceEditor'
export default {
  name: 'editor',
  components: { TinymceEditor },
  data() {
    return {
      content: 'hahaha',
    }
  },
}
</script>