## redux中间件
> dispatch(action)  发送一个action

> reducer
>>接受一个action，判断类型并返回新的state

>中间件

>>接收 store，用来获取getState。返回一个fun(dispatch)的函数。fun 返回一个函数fun2(action), fun2执行dispatch(action)即next(action)并添加logger逻辑。实际调用store.dispatch(action)就是fun2(action)。即 fun2 就是next就是store.dispatch

> createStore
>>createStore (reducer, initialState, middlewareFun)
1. 当不存在中间件时候返回store对象以及相关操作。 不存在applyMiddleware
2. 当存在中间件时候，走applyMiddleware逻辑
   middlewareFun(createStore)(reducer, initialState)

>applyMiddleware  
>>接收中间件，返回一个创建store的函数 

1. 由于调用方式为 const store = createStore(reducer, applyMiddleware(logger))
2. 所以middlewareFun相当于 applyMiddleware 已经执行一次后的返回值（返回一个创建store的函数） 此时实参就是 没有中间件的createStore方法
3. 引用createStore原始方法的同时，添加新逻辑（createStore添加新的返回值，返回一个方法）
4. 此时的createStore 返回一个接收 reducer和initialState 参数的函数
5. 遍历中间件，并把中间件返回的dispatch赋值给当前store的dispath
6. 添加中间件的store.dispatch方法自然就带上了中间件的逻辑

### t.js
```
import  {createStore, reducer,applyMiddleware, compose}  from './tt.js'
import {logger} from './middlewares'

const store = createStore(reducer, applyMiddleware(logger))

store.subscribe(() => {
  console.log('change')
  console.log(store.getState())
})
store.dispatch({type: 'info',pal: {v:1111}})
```
### tt.js
```
export function createStore (reducer, initialState, middleFunc) {
  if (initialState && typeof initialState === 'function') {
    middleFunc = initialState
    initialState = undefined
  }
  let currentState = initialState
  let listeners = []

  if (middleFunc && typeof middleFunc === 'function') {
    return middleFunc(createStore)(reducer, initialState)
  }
  const getState = () => {
    return currentState
  }
  const dispatch = (action) => {
    currentState = reducer(currentState, action)
    listeners.forEach(listener => {
      listener()
    })
  }
  const subscribe = (listener) => {
    listeners.push(listener)
  }

  return {
    getState,
    dispatch,
    subscribe
  }
}

const initState = {
  info: 'info'
}
export function reducer (state=initState, action) {
  switch (action.type) {
    case 'info':
      return {
        ...state,
        info: action.pal.v
      }
    default:
      return {
        ...state
      }
  }
}


export function applyMiddleware (...middlewares) {
  return createStore => (reducer, ...args) => {
    const store = createStore(reducer, ...args)
    const chains = middlewares.map(middle => middle(store))
    let dispatch = store.dispatch
    chains.forEach(fun => {
      dispatch = fun(dispatch)
    })


    return {
      ...store,
      dispatch
    }
  }

}
```

### middlewares.js
```
export const logger = store => next => action => {
  console.log('dispatching', action)
  next(action)
  console.log('next state', store.getState())
}
```