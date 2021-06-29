<template>
  <div class="simple-org-tree">
    <div class="node-tree">
      <OrgTree :treeData="treeData" :collapsed="collapsed"/>
    </div>
  </div>
</template>

<script>
import OrgTree from '@/components/Simple-org-tree'
export default {
  name: 'custom-org-tree',
  components: { OrgTree },
  props: {
    treeData: {
      type: Object,
      default: () => {}
    },
    collapsed: Boolean,
  },
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped></style>