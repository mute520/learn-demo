<template>
  <div class="simple-org-tree">
    <div class="node-tree">
      <div class="node">
        <div class="node-label"><div class="node-label-inner">指引</div></div>
        <div class="node-children">
          <div class="node is-leaf">
            <div class="node-label"><div class="node-label-inner">abc</div></div>
          </div>
          <div class="node is-leaf">
            <div class="node-label"><div class="node-label-inner">abc</div></div>
            <div class="node-children">
              <div class="node is-leaf">
                <div class="node-label"><div class="node-label-inner">abc</div></div>
              </div>
              <div class="node is-leaf">
                <div class="node-label"><div class="node-label-inner">abc</div></div>
              </div>
              <div class="node is-leaf">
                <div class="node-label"><div class="node-label-inner">abc</div></div>
              </div>
              <div class="node is-leaf">
                <div class="node-label"><div class="node-label-inner">555</div></div>
                <div class="node-children">
                  <div class="node is-leaf">
                    <div class="node-label"><div class="node-label-inner">abc</div></div>
                  </div>
                  <div class="node is-leaf">
                    <div class="node-label"><div class="node-label-inner">abc</div></div>
                  </div>
                  <div class="node is-leaf">
                    <div class="node-label"><div class="node-label-inner">abc</div></div>
                  </div>
                  <div class="node is-leaf">
                    <div class="node-label"><div class="node-label-inner">555</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="node is-leaf">
            <div class="node-label"><div class="node-label-inner">abc</div></div>
            <div class="node-children">
              <div class="node is-leaf">
                <div class="node-label"><div class="node-label-inner">abc</div></div>
              </div>
              <div class="node is-leaf">
                <div class="node-label"><div class="node-label-inner">abc</div></div>
              </div>
              <div class="node is-leaf">
                <div class="node-label"><div class="node-label-inner">abc</div></div>
              </div>
              <div class="node is-leaf">
                <div class="node-label"><div class="node-label-inner">555</div></div>
              </div>
            </div>
          </div>
          <div class="node is-leaf">
            <div class="node-label"><div class="node-label-inner">555</div></div>
          </div>
        </div>
      </div>
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
    }
  },
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
.bf {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 19px;
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
      .is-leaf {
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
        }
      }
      .node-children {
        position: relative;
        padding-left: 19px;
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