/*
 * @Description: file information
 * @Author: Perry
 * @Date: 2021-10-27 16:11:56
 * @LastEditors: Perry
 * @LastEditTime: 2021-10-28 11:07:44
 */
// mini-vue 核心代码
import { effect,mountedElement ,diff} from './index.js'

export function createApp(rootComponent) {
  return {
    mount(selector) {
      //app.render(App.setup)
      const setupState = rootComponent.setup()
      //是否初始化渲染
      let isMounted = false
      
      //老模拟节点数据
      let preSubTree;
      effect(() => {
        if (!isMounted) {
          //初始化
          isMounted = true
          const rootContainer = document.querySelector(selector)
          rootContainer.innerHTML = ''
  
          //虚拟节点
          const subTree = rootComponent.render(setupState)
          mountedElement(subTree, rootContainer)
          preSubTree=subTree;
        } else {
          //新虚拟节点
          const subTree = rootComponent.render(setupState)
          diff(preSubTree,subTree)
          preSubTree=subTree; //老数据替换为新数据
        }
      })
    }
  }
}