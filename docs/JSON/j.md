# JSON 是一种轻量级数据格式
## 语法 三种类型的值
>+ 简单值 使用与js相同的语法，但是不支持undefined. 
```
5 "hello world"

JSON 必须用双引号
```
>+ 对象
```
JSON对象与js对象区别
1. JSON没有申明变量
2. 没有末尾分号
3. JSON属性必须加双引号
```
>+ 数组
```
JSON 数组也没有变量和分号

```
>+ JSON 不支持变量，函数，对象实例
## 解析与序列化
### JSON对象
>+ stringify() 把js对象序列化为JSON字符串
```
var book ={
  name: 'js'
}
var jsonText = JSON.stringify(book);

```
>+ parse() 把JSON字符串转换成js值
```
var bookCopy = JSON.parse(jsonText)
book 与 bookCopy 没有任何关系
```
### 序列化选项
1. JSON.stringify(jsObj, parm1, parm2) 接受两个参数
>+ parm1 过滤器，可以为数组或函数
```
var book = {
  title: 'js',
  year: 2011
}
var jsonText = JSON.stringify(book, ["title"]) 
// {"title": "js"}

当parm1，函数返回undefined，那么这个属性会被忽略
```
>+ parm2 JSON字符串保留的缩进
```
控制结果的缩进和空白，最大为10，超过自动转换为10，也可以使用字符串，同样长度最大为10
```
2. 把一个对象传入JSON.stringify(),序列对象顺序

>+ 如果存在toJson且能取到值，则调用该方法。否则，按默认顺序执行序列化
>+ 如果有第二个参数，应用这个函数过滤器
>+ 对上一步返回的每个值进行相应的序列化
>+ 如果存在第三个参数，进行格式化

## 解析选项
1. JSON.parse() 接受另外一个函数参数（还原函数），在每个键值对上执行。如果返回undefined,删除相应的键


