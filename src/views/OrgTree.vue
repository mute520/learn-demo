<template>
  <div class="org-tree-wrapper">
    <div class="operation">
      <el-checkbox v-model="horizontal">横排/竖排</el-checkbox>
      <el-checkbox v-model="collapsable">折叠</el-checkbox>
      <el-select v-model="labelClassName" size="mini">
        <el-option v-for="item in options" :value="item.value" :label="item.label" :key="item.id"></el-option>
      </el-select>
    </div>
    <div class="main">
      <OrgTree
        name="test"
        :data="orgData"
        :horizontal="horizontal"
        :collapsable="collapsable"
        :label-class-name="labelClassName"
        :render-content="renderContent"
        @on-expand="onExpand"
        @on-node-click="onNodeClick"
      />
    </div>
  </div>
</template>

<script>
import OrgTree from 'vue2-org-tree'
import 'vue2-org-tree/dist/style.css'
import { orgData } from './jsonData'

export default {
  name: 'org-tree',
  components: { OrgTree },
  data() {
    return {
      msg: 'tree',
      orgData,
      horizontal: true,
      collapsable: true,
      expandAll: false,
      labelClassName: "bg-white",
      options: [
        { value: 'bg-transparent', label: 'bg-transparent' },
        { value: 'bg-white', label: 'bg-white' },
        { value: 'bg-orange', label: 'bg-orange' },
        { value: 'bg-gold', label: 'bg-gold' },
        { value: 'bg-gray', label: 'bg-gray' },
        { value: 'bg-lightpink', label: 'bg-lightpink' },
        { value: 'bg-chocolate', label: 'bg-chocolate' },
        { value: 'bg-tomato', label: 'bg-tomato' },
      ],
    }
  },
  mounted() {},
  methods: {
    renderContent(h, data) {
      return data.label;
    },
    onExpand(e, data) {
      if ("expand" in data) {
        data.expand = !data.expand;
        if (!data.expand && data.children) {
          this.collapse(data.children);
        }
      } else {
        this.$set(data, "expand", true);
      }
    },
    //点击选项执行的方法，可以用于跳转到其他链接，注意一定要写协议头
    onNodeClick(e, data) {
       //console.log(data.label);
       if(data.url==null){
        return false
      }else{
        window.open(data.url)
      }
    },
    collapse(list) {
      var _this = this;
      list.forEach(function(child) {
        if (child.expand) {
          child.expand = false;
        }
        child.children && _this.collapse(child.children);
      });
    },
    expandChange() {
      this.toggleExpand(this.data, this.expandAll);
    },
    toggleExpand(data, val) {
      var _this = this;
      if (Array.isArray(data)) {
        data.forEach(function(item) {
          _this.$set(item, "expand", val);
          if (item.children) {
            _this.toggleExpand(item.children, val);
          }
        });
      } else {
        this.$set(data, "expand", val);
        if (data.children) {
          _this.toggleExpand(data.children, val);
        }
      }
    }
  },
}
</script>

<style lang="less" scoped>
.org-tree-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  .main {
    height: calc(100% - 48px);
    overflow: auto;
  }
}
.operation {
  width: 600px;
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  padding: 10px;
}
.org-tree-container {
  margin: 10px;
}
</style>
<style lang="less">
.org-tree-node {
  &:only-child:before {
    top: 0 !important; // 解决只有一个字节点时，连接线凹凸问题
  }
}
.org-tree-node-label {
  white-space: nowrap;
}
.bg-transparent {
  background-color: transparent;
}
.bg-white {
  background-color: white;
}
.bg-orange {
  background-color: orange;
}
.bg-gold {
  background-color: gold;
}
.bg-gray {
  background-color: gray;
}
.bg-lightpink {
  background-color: lightpink;
}
.bg-chocolate {
  background-color: chocolate;
}
.bg-tomato {
  background-color: tomato;
}
</style>