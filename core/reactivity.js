/*
 * @Description: 实现reactivity
 * @Author: Perry
 * @Date: 2021-10-28 14:23:54
 * @LastEditors: Perry
 * @LastEditTime: 2021-10-28 16:28:30
 */

const effectArray=[]

function ref(value) {
  return createRef(value)
}
function createRef(rawValue) {
  if (isRef(rawValue)) {
    return rawValue
  }
  return new RefImpl(rawValue)
}
function isRef(r) {
  return Boolean( r && r._isRef === true)
}

const handler = {
  get(value,key) {
    return value[key]
  },
  set(target, key, value, receiver) {
    //对象触发setting
    Reflect.set(target, key, value, receiver);
    triggerEffect()
    return true
  },
};

function toReactive(target) {
  if (typeof target !== 'object') return target
  return new Proxy(target,handler)
}

class RefImpl{
  
  constructor(target) {
    this._isRef = true
    this._value = toReactive(target)
  }

  get value () {
    return  this._value
  }
  set value(value) {
    this._value = value
    triggerEffect()
  }
}

function triggerEffect() {
  effectArray.forEach(e => {
    e.run()
  });
}

function effect(fn) {
  const effect = new ReactiveEffect(fn)
  effectArray.push(effect)
  effect.run()
}

class ReactiveEffect{
  constructor(fn) {
    this.fn = fn;
  }
  run() {
    return this.fn();
  }
}

export {
  ref,
  effect
}