## 1 React 一直都提倡使用函数组件
## 2 凡是 use 开头的 React API 都是 Hooks
## 3 Hooks 解决的问题
1. 类组件的不足
>+ 状态逻辑难复用
>- 趋向复杂难以维护
>+ this 指向问题
2. Hooks 优势
>+ 能优化类组件的三大问题
>- 能在无需修改组件结构的情况下复用状态逻辑（自定义 Hooks ）
>+ 能将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）
>- 副作用的关注点分离：副作用指那些没有发生在数据向视图转换过程中的逻辑，如 ajax 请求、访问原生dom 元素、本地持久化缓存、绑定/解绑事件、添加订阅、设置定时器、记录日志等。以往这些副作用都是写在类组件生命周期函数中的。而 useEffect 在全部渲染完毕后才会执行，useLayoutEffect 会在浏览器 layout 之后，painting 之前执行。

## 4 注意事项
>- 只能在函数内部的最外层调用 Hook，不要在循环、条件判断或者子函数中调用
>+ 只能在 React 的函数组件中调用 Hook，不要在其他 JavaScript 函数中调用

## 5 useState & useMemo & useCallback
> React 假设当你多次调用 useState 的时候，你能保证每次渲染时它们的调用顺序是不变的。
 
> 通过在函数组件里调用它来给组件添加一些内部 state，React会 在重复渲染时保留这个 state
 
> useState 唯一的参数就是初始 state

> useState 会返回一个数组：一个 state，一个更新 state 的函数
```
import React, { useState } from "react";
import ReactDOM from "react-dom";

function Child1(porps) {
  console.log(porps);
  const { num, handleClick } = porps;
  return (
    <div
      onClick={() => {
        handleClick(num + 1);
      }}
    >
      child
    </div>
  );
}

function Child2(porps) {
  // console.log(porps);
  const { text, handleClick } = porps;
  return (
    <div>
      child2
      <Grandson text={text} handleClick={handleClick} />
    </div>
  );
}

function Grandson(porps) {
  console.log(porps);
  const { text, handleClick } = porps;
  return (
    <div
      onClick={() => {
        handleClick(text + 1);
      }}
    >
      grandson
    </div>
  );
}

function Parent() {
  let [num, setNum] = useState(0);
  let [text, setText] = useState(1);

  return (
    <div>
      <Child1 num={num} handleClick={setNum} />
      <Child2 text={text} handleClick={setText} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Parent />, rootElement);
```

> 每次渲染都是独立的闭包
>+ 每一次渲染都有它自己的 Props 和 State
>- 每一次渲染都有它自己的事件处理函数
>+ 当点击更新状态的时候，函数组件都会重新被调用，那么每次渲染都是独立的，>- 取到的值不会受后面操作的影响
```
function Counter2(){
  let [number,setNumber] = useState(0);
  function alertNumber(){
    setTimeout(()=>{
      // alert 只能获取到点击按钮时的那个状态
      alert(number);
    },3000);
  }
  return (
      <>
          <p>{number}</p>
          <button onClick={()=>setNumber(number+1)}>+</button>
          <button onClick={alertNumber}>alertNumber</button>
      </>
  )
}
```
> 函数式更新
>+ 如果新的 state 需要通过使用先前的 state 计算得出，那么可以将回调函数当做参数传递给 setState。该回调函数将接收先前的 state，并返回一个更新后的值。
```
function Counter(){
  let [number,setNumber] = useState(0);
  function lazy(){
      setTimeout(() => {
          // setNumber(number+1);
          // 这样每次执行时都会去获取一遍 state，而不是使用点击触发时的那个 state
          setNumber(number=>number+1);
      }, 3000);
  }
  return (
      <>
         <p>{number}</p>
         <button onClick={()=>setNumber(number+1)}>+</button>
         <button onClick={lazy}>lazy</button>
      </>
  )
}
```

> 性能优化

1. 默认情况，只要父组件状态变了（不管子组件依不依赖该状态），子组件也会重新渲染
2. 一般的优化：
>+ 类组件：可以使用 pureComponent ；
>- 函数组件：使用 React.memo ，将函数组件传递给 memo 之后，就会返回一个新的组件，新组件的功能：如果接受到的属性不变，则不重新渲染函数；
>+ 但是怎么保证属性不会变尼？这里使用 useState ，每次更新都是独立的，const [number,setNumber] = useState(0) 也就是说每次都会生成一个新的值（哪怕这个值没有变化），即使使用了 React.memo ，也还是会重新渲染
3. 更深入的优化：
>+ useCallback：接收一个内联回调函数参数和一个依赖项数组（子组件依赖父组件的状态，即子组件会使用到父组件的值） ，useCallback 会返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新
>- useMemo：把创建函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算
