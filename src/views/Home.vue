<template>
  <div class="home">
    <div class="box txt">display: table-cell; vertical-align: middle; 的使用！</div>
    <div class="box box1" v-if="true">
      <div class="item left">left</div>
      <div class="item center">center</div>
      <div class="item right">right</div>
    </div>
    <div class="box box2" v-if="true">
      <div class="wrap-box">
        <span>让单行文字垂直居中显示，可使用 <br/> display:table-cell; vertical-align: middle; </span>
      </div>
    </div>
    <div class="box box3" v-if="true">
      <div class="img-box"><img src="@/assets/logo.png" alt=""></div>
      <div class="content">大美女一枚 来自上海签名：想找个保鲜盒把你给我的那些感动都装起来。当你让我伤心的时候就拿出来回味一下。</div>
    </div>
    <div class="box box4">
      <OrgTree :treeData="treeData" :collapsed="collapsed"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import OrgTree from '@/components/Custom-org-tree'
import { orgData } from './jsonData'

export default {
  name: 'Home',
  components: { OrgTree },
  data() {
    return {
      msg: 'home',
      treeData: JSON.parse(JSON.stringify(orgData)),
      collapsed: false,
    }
  },
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  overflow: auto;
  .box {
    margin-bottom: 10px;
  }
  .txt {
    padding: 5px;
    text-align: center;
    background: #98ee43;
    font-weight: bolder;
  }
}
.box1 {
  width: 300px;
  border: 1px dotted;
  border-radius: 4px;
  padding: 10px;
  box-sizing: border-box;
  .item {
    display: table-cell;
    padding-left: 20px;
    &.left {
      width: 50px;
      background: rgba(235, 141, 33, 0.3);
    }
    &.right {
      width: 100px;
      height: 50px;
      background: rgba(120, 167, 77, 0.8);
    }
    &.center {
      width: 40px;
      height: 20px;
      background: red;
    }
  }
}
.box2 {
  .wrap-box {
    width: 500px;
    height: 80px;
    border: 1px solid;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    border-radius: 4px;
    span {
      display: inline-block;
      border: 1px dotted;
      text-align: left;
      border-radius: 4px;
    }
  }
}
.box3 {
  width: 300px;
  border: 1px solid;
  border-radius: 4px;
  &::after {
    display: block;
    content: '';
    clear: right;
  }
  img {
    width: 20px;
  }
  .img-box, .content {
    display: table-cell;
    vertical-align: middle;
  }
}
.box4 {
  padding: 20px;
  // margin-top: 10px;
  box-sizing: border-box;
  border: 5px dashed #d0d1d1;
  border-radius: 4px;
  // height: 100%;
  overflow: auto;
}
</style>
