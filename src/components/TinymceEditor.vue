<template>
  <div>
    <textarea id="mytextarea" v-model="content"></textarea>
  </div>
</template>

<script>
import tinymce from 'tinymce'
import { uploadImage } from '@/api'

export default {
  name: 'tinymce-editor',
  model: {
    prop: 'content',
    event: 'change' 
  },
  props: {
    content: {
      type: String,
      default: ''
    },
    height: {
      type: [Number, String],
      default: 200
    },
  },
  data () {
    return {
      // msg: '',
    }
  },
  mounted () {
    this.init()
    console.log('tinymce', tinymce)
  },
  beforeDestroy() {
    tinymce && tinymce.remove()
  },
  methods: {
    init() {
      tinymce.baseURL = './tinymce' // 这一句代码是重点 不写会报错theme.js:1 Uncaught SyntaxError: Unexpected token <
      tinymce.init({
        selector: '#mytextarea',
        plugins: 'lists,advlist,code,image,table', // 插件
        toolbar: 'bold underline italic | bullist numlist | forecolor backcolor fontselect fontsizeselect | image table | removeformat undo redo | code customInsertButton',
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'lower-alpha',
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px',
        font_formats: '微软雅黑=Microsoft YaHei;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Comic Sans MS=comic sans ms,sans-serif;Times New Roman=times new roman,times;',
        // toolbar: false, // 隐藏工具栏
        menubar: false, // 隐藏菜单栏
        statusbar: true, // 状态栏指的是编辑器最底下、左侧显示dom信息、右侧显示Tiny版权链接和调整大小的那一条
        // skin: 'oxide-dark', // 主题
        // height: '100%',
        height: this.height,
        resize: true, // 可选值为：true（仅允许改变高度）, false（完全不让你动）, 'both'（宽高都能改变，注意引号）
        // content_css : '/mycontent.css', // content_css该参数可允许你自定义TinyMCE编辑区域内的样式
        forced_root_block: 'div',
        language:'zh_CN',
        // language_url : './langs/zh_CN.js',
        placeholder: '在这里输入内容',
        auto_focus: true,
        autoresize_on_init: true, // 初始化时自适应编辑器大小
        init_instance_callback: (editor) => {
          editor.on('ExecCommand', () => {
            // 获取富文本编辑器里面的内容
            const value = editor.getContent()
            this.$emit('change', value)
          })
          editor.on('input', () => {
            // 获取富文本编辑器里面的内容
            const value = editor.getContent()
            this.$emit('change', value)
          })
          editor.on('keydown', e => this.keypressTab(e, editor))
        },
        images_upload_handler: (blobInfo, success, failure) => {
          /* case 1 */
          const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          success(img)
          /* case 2 */
          // let file = blobInfo.blob()
          // let formData = new FormData()
          // formData.append('file', file)
          // uploadImage(formData).then(res => {
          //   if (res.code === 10200) {
          //     success(res.data)
          //   } else {
          //     failure(res.msg)
          //   }
          // }).catch(error => failure(error))
        },
        setup: (editor) => {
          // editor.ui.registry.addIcon('triangleUp', '<svg height="24" width="24"><path d="M12 0 L24 24 L0 24 Z" /></svg>' ) // 自定义图标
          editor.ui.registry.addButton('customInsertButton', { // 自定义按钮
            // text: '缩进',
            icon: 'align-right',
            tooltip: '缩进',
            onAction: function (_) {
              editor.insertContent('&nbsp;&nbsp;&nbsp;&nbsp;');
            }
          })

        },
      })
    },
    keypressTab(e, editor) {
      console.log('e', e)
      if (e.keyCode === 9 || e.key === 'Tab') {
        e.preventDefault()
        if (editor) {
          editor.insertContent('&nbsp;&nbsp;&nbsp;&nbsp;')
        }
      }
      if(e.keyCode === 13 || e.key === 'Enter') {
        // 获取富文本编辑器里面的内容
        const value = editor.getContent()
        this.$emit('change', value)
      }
    },
  },
}
</script>