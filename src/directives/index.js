import Vue from 'vue'
import { Message } from 'element-ui'

// 复制粘贴指令 v-copy
Vue.directive('copy', {
  bind(el, binding) {
    const { value } = binding
    el.handler = () => {
      const textarea = document.createElement('textarea')
      textarea.value = value
      textarea.readOnly = 'readonly' // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘
      const style = { position: 'absolute', width: 0, height: 0, opacity: 0 }
      for (let key in style) { textarea.style[key] = style[key] }
      document.body.appendChild(textarea)
      textarea.select()
      const result = document.execCommand('copy') // 将要 copy 的值赋给 textarea 标签的 value 属性
      if (result) {
        Message.success('copyed success!')
      }
      document.body.removeChild(textarea)
    }
    el.addEventListener('click', el.handler)
  },
  unbind(el) { // 指令与元素解绑的时候，移除事件绑定
    el.removeEventListener('click', el.handler)
  }
})

// 长按指令 v-longpress
Vue.directive('longpress', {
  inserted(el, binding) {
    const { value, arg } = binding
    el.callback = value.callback
    if (typeof el.callback !== 'function') {
      throw 'callback must be a function'
    }
    let timer = null
    const start = (event) => {
      console.log('mousedown')
      if (timer === null) {
        timer = setTimeout(() => {
          el.callback(event)
        }, +value.time || 3000)
      }
    }
    const cancel = (event) => {
      console.log('cancel')
      if (timer !== null) {
        clearTimeout(timer)
        timer = null
      }
    }
    el.$start = start
    el.$cancel = cancel
    el.addEventListener('mousedown', el.$start)
    el.addEventListener('touchstart', el.$start)
    el.addEventListener('click', el.$cancel)
    el.addEventListener('mouseout', el.$cancel)
    el.addEventListener('touchend', el.$cancel)
    el.addEventListener('touchcancel', el.$cancel)    
  },
  unbind(el) {
    el.removeEventListener('mousedown', el.$start)
    el.removeEventListener('touchstart', el.$start)
    el.removeEventListener('click', el.$cancel)
    el.removeEventListener('mouseout', el.$cancel)
    el.removeEventListener('touchend', el.$cancel)
    el.removeEventListener('touchcancel', el.$cancel)    
  },
})
// 输入框防抖指令 v-debounce
Vue.directive('debounce', {
  inserted(el, binding) {
    console.log('binding: ', binding)
    if (binding.value) {
      const { callback, time } = binding.value
      if (typeof callback === 'function') {
        let timer = null
        el.addEventListener('click', (e) => {
          console.log('timer', timer, time)
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            callback(e)
          }, time || 1000)
        })
      }
    }
  }
})
// 禁止表情及特殊字符 v-emoji
Vue.directive('emoji', {
  bind(el, binding) {
    const findEle = (parent, type) => {
      return parent.tagName.toLowerCase() === type ? parent : parent.querySelector(type)
    }
    // 正则规则可根据需求自定义
    const regRule = /[^\u4E00-\u9FA5|\d|\a-zA-Z|\r\n\s,.?!，。？！…—&$=()-+/*{}[\]]|\s/g
    let $input = findEle(el, 'input')
    el.$input = $input
    el.$input.handler = () => {
      let val = $input.value
      $input.value = val.replace(regRule, '')
    }
    $input.addEventListener('keyup', el.$input.handler)
  },
  unbind(el) {
    el.$input.removeEventListener('keyup', el.$input.handler)
  },
})
// 图片懒加载 v-LazyLoad
Vue.directive('lazyLoad', {
  inserted(el, binding) {
    console.log('binding:', binding, el.src)
    console.log('el:', el.dataset, el.offsetHeight)
    const src = el.dataset.src
  }
})
// 权限校验指令 v-premission
// 实现页面水印 v-waterMarker
Vue.directive('waterMarker', {
  inserted(el, binding) {
  const { font, textColor, str } = binding.value
  const parentNode = el
  // 水印文字，父元素，字体，文字颜色
  var cav = document.createElement('canvas')
  parentNode.appendChild(cav)
  cav.width = 200
  cav.height = 150
  cav.style.display = 'none'
  var ctx = cav.getContext('2d')
  ctx.rotate((-20 * Math.PI) / 180)
  ctx.font = font || '16px Microsoft JhengHei'
  ctx.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'Middle'
  ctx.fillText(str, cav.width / 10, cav.height / 2)
  parentNode.style.backgroundImage = 'url(' + cav.toDataURL('image/png') + ')'
  }
})
// 输入框获取焦点
Vue.directive('focus', {
  inserted(el, binding, vNode) {
    // console.log('inserted -> el, binding, vNode: ', el, binding, vNode)
    el.focus()
  },
})

// 拖拽指令 v-draggable
Vue.directive('drag', {
  inserted: function (el) {
    el.style.position = 'fixed'
    el.style.cursor = 'move'
    el.style.userSelect = 'none'
    el.onmousedown = function (e) {
      let disx = e.pageX - el.offsetLeft
      let disy = e.pageY - el.offsetTop
      document.onmousemove = function (e) {
        let x = e.pageX - disx
        let y = e.pageY - disy
        let maxX = document.body.clientWidth - parseInt(window.getComputedStyle(el).width)
        let maxY = document.body.clientHeight - parseInt(window.getComputedStyle(el).height)
        if (x < 0) {
          x = 0
        } else if (x > maxX) {
          x = maxX
        }

        if (y < 0) {
          y = 0
        } else if (y > maxY) {
          y = maxY
        }

        el.style.left = x + 'px'
        el.style.top = y + 'px'
      }
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null
      }
    }
  },
})

Vue.directive('dragcc', {
  inserted(el, binding) {
    const style = {width: '50px', height: '50px', background: '#09f', position: 'fixed', cursor: 'move'}
    for (let key in style) { el.style[key] = style[key] }
    el.onmousedown = (e) => {
      const disX = e.x - el.offsetLeft
      const disY = e.y - el.offsetTop
      document.onmousemove = (e) => {
        const WIDTH = window.innerWidth
        const HEIGHT = window.innerHeight
        let left = e.x - disX
        let top = e.y - disY
        left = Math.max(0, left)
        left = Math.min(left, WIDTH - el.offsetWidth)
        top = Math.max(0, top)
        top = Math.min(top, HEIGHT - el.offsetHeight)
        el.style.left = `${left}px`
        el.style.top = `${top}px`
      }
      document.onmouseup = (e) => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})