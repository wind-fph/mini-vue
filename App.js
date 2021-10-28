/*
 * @Description: file information
 * @Author: Perry
 * @Date: 2021-10-27 11:53:40
 * @LastEditors: Perry
 * @LastEditTime: 2021-10-28 15:30:36
 */
import {ref,h} from  './core/index.js'
export const App = {

  setup(){

    const count = ref(10);
    // const showP2 = ref(false);
    window.count=count
    // window.showP2=showP2
    return {
      count,
      // showP2
    }
  },

  //渲染试图
  render(setupState){
    // const rootContainer = document.createElement('div')
    // rootContainer.textContent= 'nihao:'+setupState.count.value
    // return rootContainer

    // if (setupState.showP2.value) {
      return h('div', {}, [
        h('p',{},"p1:"+setupState.count.value),
        h('p',{},"p2:"+setupState.count.value),
      ])
    // } else {
    //   return h('div', {}, [
    //     h('p',{},"p1:"+setupState.count.value),
    //   ])
    // }
  }
}
