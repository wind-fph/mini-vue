/*
 * @Description: file information
 * @Author: Perry
 * @Date: 2021-10-27 19:02:05
 * @LastEditors: Perry
 * @LastEditTime: 2021-10-28 16:24:58
 */
//将虚拟元素转换成正式element

function isValue(value) {
  return typeof value === 'string' || typeof value === 'number'
}

export function mountedElement(vnode, container) {

  const { type, props, children } = vnode
  const el = vnode.el = document.createElement(type)

  //属性值
  for (const key in props) {
    if (key === 'event') {
      props[key].forEach(event => {
        el.addEventListener(event,props[key][event])
      });
    }
    el.setAttribute(key, props[key])
  }
  if (isValue(children)) {
    //string
    el.textContent = children
  } else if (Array.isArray(children)) {
    //array
    children.forEach(v => {
      mountedElement(v, el)
    });
  }
  container.append(el)
}


//简易版 diff 算法
export function diff(oldVnode, newVnode) {
  console.log('进入diff')
  if (oldVnode.type !== newVnode.type) {
    console.log('类型不一致')
    oldVnode.el.replaceWith(document.createElement(newVnode.type))
  } else {
    //类型一样时
    //props
    //1.更新/新增prop值
    //3.删除prop
    const el = (newVnode.el = oldVnode.el)
    const { props: newProps } = newVnode
    const { props: oldProps } = oldVnode

    for (const key in newProps) {
      if (newProps[key] !== oldProps[key]) {
        el.setAttribute(key, newProps[key])
      }
    }

    for (const key in oldVnode) {
      if (!(key in newProps)) {
        el.removeAttribute(key)
      }
    }

    //children
    // string -> string || array 
    // array ->  string || array

    const { children: newChildren } = newVnode
    const { children: oldChildren } = oldVnode

    if (isValue(newChildren)) {
      //新数据为string时，只要不相等就替换更新
      // if (typeof oldChildren === 'string') {
      if (newChildren !== oldChildren) {
        console.log('替换children为string')
        el.textContent = newChildren
      }
      // } else if (Array.isArray(oldChildren)) {
      //   el.textContent = newChildren
      // }
    } else if (Array.isArray(newChildren)) {
      //新数据为array时，老数据为string时，渲染新数据
      if (isValue(oldChildren)) {
        console.log('新节点为array，老节点为string，mountedElement渲染新节点')
        el.textContent = ''
        newChildren.forEach(v => {
          mountedElement(v, el)
        });
      } else if(Array.isArray(oldChildren)){
        //新数据为array时，老数据为array时
        //1.替换
        //2.新增
        //3.删除
        console.log('新节点数：'+newChildren.length , '老节点数：' + oldChildren.length)

        const length = Math.min(oldChildren.length,newChildren.length)
        for (let index = 0; index < length; index++) {
          console.log('array->array diff新老节点')
          diff(oldChildren[index],newChildren[index])
        }

        if (newChildren.length > length) {
          for (let i = length; i < newChildren.length; i++) {
            //
            console.log('array->array mountedElement渲染新增节点')
            mountedElement(newChildren[i],el)
          }
        } else if (newChildren.length < oldChildren.length) {
          //老得比新的多
          for (let i = length; i < oldChildren.length; i++) {
            //新的比老得多
            console.log('array->array 移除老节点')
            el.removeChild(oldChildren[i].el)
          }
        }
      }
    }
  }
}