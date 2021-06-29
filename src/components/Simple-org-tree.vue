<template>
  <div class="node is-padding">
    <div class="node-label">
      <div class="node-label-inner" :class="{'has-btn': isHasChildren}">
        {{treeData.label}}
        <span v-if="isHasChildren" class="node-label-btn" :class="{collapsed: collapseStatus}" @click.stop="clickCollapse"></span>
      </div>
    </div>
    <div class="node-children" v-if="isHasChildren">
      <simple-org-tree v-for="item in treeData.children" :treeData="item" v-show="!collapseStatus" :key="item.id"></simple-org-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: 'simple-org-tree',
  props: {
    treeData: {
      type: Object,
      default: () => {}
    },
    collapsed: Boolean,
  },
  data() {
    return {
      collapseStatus: this.collapsed, // 折叠状态 默认展开false
    }
  },
  computed: {
    isHasChildren() { return this.treeData.children && this.treeData.children.length }, // 是否有子集 children
  },
  methods: {
    clickCollapse() {
      this.collapseStatus = !this.collapseStatus
    }
  },
}
</script>

<style lang="less" scoped>
.bf {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 20px;
  height: 0;
  border-top: 1px solid #888;
}
.simple-org-tree {
  .node-tree {
    & > .node:only-child:after {
      border-top: none;
    }
    .node {
      position: relative;
      padding-left: 20px;
      transition: all .3s;
      .is-padding {
        padding: 10px 10px 10px 20px;
      }
      &::before {
        .bf();
        top: 0;
        height: 50%;
        border-top: none;
      }
      &::after {
        .bf();
        top: 50%;
        height: 50%;
      }
      &:not(:first-child)::before, &:not(:last-child)::after {
        border-left: 1px solid #888;
      }
      .node-label {
        display: table-cell;
        vertical-align: middle;
        .node-label-inner {
          width: 100px;
          background: #d8f0e6;
          border-radius: 5px;
          padding: 5px;
          position: relative;
          &.has-btn::after {
            .bf();
            left: 100%;
            top: 50%;
            
          }
          .node-label-btn {
            position: absolute;
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1;
            margin-left: 9px;
            width: 20px;
            height: 20px;
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 50%;
            cursor: pointer;
            transition: all .3s;
            &:hover {
              box-shadow: 0 0 2px #999;
              background: #f8f4f4;
            }
            &::before {
              .bf();
              top: 50%;
              left: 3px;
              width: 14px;
              border-top: 1px solid #ddd;
            }
            &::after {
              .bf();
              top: 3px;
              left: 50%;
              width: 0;
              height: 14px;
              border-top: none;
              // border-left: 1px solid #ddd;
            }
            &.collapsed::after {
              border-left: 1px solid #ddd;
            }
          }
        }
      }
      .node-children {
        position: relative;
        padding-left: 20px;
        display: table-cell;
        &::before {
          .bf();
          top: 50%;
        }
      }
    }
  }
}
</style>