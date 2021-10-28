/*
 * @Description: file information
 * @Author: Perry
 * @Date: 2021-10-27 11:53:40
 * @LastEditors: Perry
 * @LastEditTime: 2021-10-28 16:27:31
 */
import { ref, h } from './core/index.js'
export const App = {
  setup() {
    const student = ref({ name: '小明', age: 10 });
    // const showP2 = ref(false);
    window.student = student
    // window.showP2=showP2
    return {
      student,
      // showP2
    }
  },

  //渲染试图
  render(setupState) {
    // const rootContainer = document.createElement('div')
    // rootContainer.textContent= 'nihao:'+setupState.count.value
    // return rootContainer

    // if (setupState.showP2.value) {

    console.log(setupState.student)
    return h('div', {}, [
      h('div', {}, setupState.student.value.name + '的年龄是：' + setupState.student.value.age),
      h('input', {
        type: 'number', value: setupState.student.value.age,
        event: [
          oninput = function (event) {
            setupState.student.value.age = event.target.value
          }
        ]
      }),
    ])
    // } else {
    //   return h('div', {}, [
    //     h('p',{},"p1:"+setupState.count.value),
    //   ])
    // }
  }
}
