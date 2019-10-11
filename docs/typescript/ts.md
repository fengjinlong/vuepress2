# TypeScript介绍

>+ TypeScript是微软开发的JavaScript的超集，TypeScript兼容JavaScript，可以载入JavaScript代码然后运行

## TypeScript与JavaScript的比较

>+ TypeScript与JavaScript相比进步的地方包括：加入注释，让编辑器理解所支持的对象和函数，编译器会移除注释，不会增加开销；增加一个完整的类结构，使之更新是传统的对象语言。最大的好处就是加入了类型检查，可以让我们书写代码的时候更加规范。

## 安装TypeScript

>+ npm install -g typescript
>+ tsc --init
>+ 在后缀名为ts的文件中按下ctrl + shift + b会出现下面一个框，选择tsc:监视就可以了
>+ tsc -p c:\my\ts\tsconfig.json --watch

# 基本数据类型

### Boolean
>+ var isBool : boolean = true;
### Number
>+ var isNumber : number = 1;
### String
>+ var isString : string = 'hello world';
### Array
>+ var arr1 : number[] = [1,2,3]
>+ var arr2 : Array<string> = [1,2,3]
>+ var arr2 : Array<any> = [1,2,3]

### Enum
```
声明一个枚举类型 
enum Color {Red,Green,Blue}

上面代码编译成es5是
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {})); 

在声明的时候可以对索引进行赋值
enum Color {Red = 1,Green = 4,Blue};  

获取枚举类型某个值的索引
var c : Color = Color.Blue 
```
## Any
>+ var notArr : Array<any> = [1,'12',false]

## Void
>Void是对函数进行声明的,定义函数的时候，函数是要有返回值类型的，写了返回值类型如果不返回特定类型的值，就会报错。

```
function test1() : number{}
上面代码会报错，因为返回值类型为number，没有返回。

使用void声明函数的返回值类型，表示不需要有返回值。
function test2() : void {}
```

# TypeScript函数

## 参数类型和函数的返回值类型
```
TypeScript函数中可以为参数和返回值设定类型。设定了之后必须要返回相对应的类型，否则会报错。例如：

function add(x : number,y : number) : string {
    return 'hello'
}
如果在参数部分想要简写的话，可以在前面指定参数的具体意义。

const myadd1:(name:string,age:number) => number = (n:string,a:number):number =>123;
在声明函数的时候指定参数为name和age，在后面具体写参数的时候就可以直接使用n和a代替了。
```
## 可选参数
```
在写函数参数的时候，在参数后面加?，这个参数就变成了可选参数。需要注意的是：可选参数后面不能出现确定参数。

const buildName = (firstName? : string, lastName? : string) : string => firstName + lastName ? lastName : "";
buildName('1');
```
## 默认参数
```
const buildName = (firstName : string , lastName : string= 'hello' ) : string => firstName + lastName;
```

## 可变参数
>如果我们在写代码的过程中，不确定要传入函数的参数是多少个，可以使用可变参数。
>使用剩余参数的形式，声明一个数组。

```
const peopleName = (firstName : string,...names:Array<string>) =>firstName + names.join(' ');
let pn = peopleName('1','2','3'); 
```

## 函数的重载
```
function attr(name : string) : string;
function attr(age : number) : number;
function attr(nameAndAge : any) : any{
    if(nameAndAge && typeof nameAndAge === 'string'){
        console.log('姓名')
    } else{
        console.log('年龄');
    }
}
attr('wang');
attr(21);
```

# TypeScript中的类
```
声明一个ts的类

class Person {
    //声明变量为公有变量
    name: string = 'wang';
    age: number = 21;
    //构造函数参数遵循函数参数的书写形式
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    print(): string {
        return this.name + " : " + this.age;
    }
}
const person = new Person('zhou', 20);
console.log(person);
```

## 类的继承
```
ts中类的集成和ES6类似

class Person {
    name : string;
    age : number;
    constructor(name : string , age :number) {
        this.name = name;
        this.age = age;
    }
    tell(){
        return this.name + ":" + this.age;
    }
}
//Student 继承自Person
class Student extends Person {
    school : string;
    constructor(name : string , age : number , school : sting){
        super(name,age);
        this.school = school;
    }
    tell(){
        return this.name + " : " + this.age + " : " + this.school;
    }
}
父类中有构造函数有参数传递，所以子类在继承父类的时候也需要在子类的构造函数中传递相应的参数。

子类如果有构造函数必须在子类构造函数中使用super调用父类的构造函数。

const s = new Student('wang',21,'pdsu');
console.log(s.tell()); 
```

## 访问修饰符
```
和大多数面向对象语言相同，TypeScript也具有访问修饰符，TypeScript的访问修饰符有两种：

public 公有的
private 私有的
当什么都不写的话, 默认的是public。私有类型子类无法访问,公有方法可以访问。

class People {
    private name : string;
    public age : number;
    constructor(name : string , age : number) {
        this.name = name;
        this.age = age;
    }
    print(){
        return this.name + ":" + this.age;
    }
}
class Teacher extends People {
    private school : string = 'pdsu';
    constructor(name : string , age : number , school : string) {
        super(name,age);
        this.school = school;
    }
    print(){
        return this.name + ":" + this.age + ":" + this.school;
    }
}
```

## get、set
```
由上面访问修饰符知道，私有属性在外部是无法得到的，并且在子类中无法得到。所以就可以通过set、get来对私有属性进行修改和查看。

通过set和get来对private修饰的属性提供外部访问接口。

class Hello {
    private _name : string = 'hello';
    private _age : number;
    tell(){
        return this.name;
    }
    get name() : string {
        return this._name;
    }
    set name(newName : string){
        this._name = newName;
    }
    get age() : number{
        return this._gae;
    }
    set age(newAge : number) {
        if(newAge >=200 && newAge <0){
            alert('请正确填写年龄')
        }else{
            this._age = newAge;
        }
    }
}
var hello = new Hello();
hello.name = 'hello';
```
## static
```
使用static声明的属性和方法是静态的，编译成es5之后被挂载到构造函数上。

class Person {
    static name1 : string = 'Person';
    tell(){
        console.log('姓名:' + Person.name1);
    }
}
const p = new Person();
console.log(p.tell());
```

## TypeScript的接口

>TypeScript中的接口可以在许多地方使用。它规范了参数传递的类型。

>>例如：一个函数声明不使用接口
```
function printLabel (labelObj : {label : string}){
    console.log(labelObj.label);
}
let myObj = {
    label : "Hello",
}
printLabel(myObj);
```
>>上面代码中函数的参数如果很复杂，就会写的很臃肿。

>>使用接口就可以把参数规范抽离出来。

>>定义接口
```
interface LabelValue {
    label : string;
}
指定参数类型为接口类型，接口中的属性和参数的实参是一一对应关系。如果不对应就会报错

function printLabel(labelObj : LabelValue){
    console.log(labelObj.label);
}
let myObj = {
    label : 'Hello wang',
}
printLabel(myObj);
```

## 接口的可选属性
>上面得知，接口的属性和传入参数对象的属性是一一对应关系。当我们在声明接口的时候,并不是接口的每一个属性都可以用到,所以就需要使用可选属性.在interface中的属性上可以像函数的可选参数的方式定义接口的可选属性。
```
interface USB {
    name : string;
    age? : number;
}
function printUSB(pu : USB){
    console.log(pu.name);
    console.log(pu.age);
}
let myObj = {
    name : 'Hello wang',
    // age : 21,
}
printUSB(myObj);
```

## 函数类型
>接口还可以直接作用于函数，定义函数的类型是什么。
```
interface SearchFunc{
    (socurce : string , subString:string) : boolean;
}
```
>定义函数为接口类型，使用接口的规则进行声明函数。
```
let mySearch:SearchFunc;
//这里接口的检查是针对类型的检查，并不针对参数名，所以只要参数的类型相同，参数名不相同也无所谓。
mySearch = function (src : string , sub : string){
    let result = src.search(sub);
    if(result != -1){
        return true;
    }else{
        return false;
    }
}
```

## 数组类型
```
接口还可以规范数组的类型
interface StringArray{
    [index : number] : string;
}
定义数组的类型为接口类型，接口定义数组类型为索引为number类型，数组中的值为string类型

let myArray : StringArray;
myArray = ['wang','chong','1'];
console.log(myArray);
```

## 使用类实现接口
>在与类的配合中，接口定义一系列规则，使用类去实现。

>在接口里面只定义属性和方法，而不实现。
```
interface ClockInterface{
    currentTime : Date;
    //只是定义函数
    setTime(d : Date);
}
```
>类使用接口通过implement关键字实现。
```
class Clock implements ClockInterface{
    //ClockInterface中定义了currentTime属性，所以在类中必须要实现
    currentTime : Date;
    constructor(h : number , m :number){

    }
    //ClockInterface中定义了setTime属性，所以在类中必须要实现
    setTime(d : Date){
        this.currentTime = d;
    }
} 
```
## 接口继承与混合类型
>接口是存在继承的，一个接口可以继承自另外一个接口。
```
interface Shape {
    color : string;
}
interface  PenStroke{
    penWidth : number;
}
```

>使用接口继承另外一个接口，同时也可以继承多个接口

>单继承
```
interface Square extends PenStroke{
    sideLength : number;
}
```
>多继承
```
interface Square extends Shape,PenStroke{
    sideLength : number;
}
```
>创建一个对象为接口类型，这种方式与之前的数组和函数略有不同。
```
let s = <Square>{};
s.color = 'blue';
s.sideLength = 10;
s.penWidth = 10;
```
>混合类型就是在接口中存在多种规则。
```
interface Counter{
    interVal :number;
    reset():void;
    (start : number) :string;
}
var w : Counter;
```

## TypeScript泛型
>下面这样一个方法，传入一个number返回一个number。
```
let Hello = (num : number) : number => num;
```
>突然需求变了，这个方法不确定传入什么类型，也不确定要输出什么类型。

>可以使用any解决。定义参数类型为any类型，返回值也是any类型。
```
let HelloAny = (str : any) : any =>str;
```
>但是上面这种方式不怎么好的，没有一个明显的规范，容易出现类型转换错误。

>因此在这个场景下用可以用到泛型。泛型的写法 :
```
let Hello1 = <T>(str : T) : T => str;
```
>泛型在当我们需要调用函数的时候就确定函数的类型和参数类型。
```
let output = Hello1<string>('hello');
```

## 定义数组泛型
```
当我们写一个泛型的时候，如果在代码中调用泛型的length，就会报错。

let Hello = <T>(num : T):T => {
    console.log(num.length);        //编译报错，泛型没有length属性
    return num;
};
解决方法是：泛型是根据所传递的类型决定具有哪些属性，上面没有指定类型，这里指定了泛型的类型为数组。

let Hello = <T> (num : T[]):T[] =>{
    return num;
}
let list : Array<string> = Hello<string>(['1','2']);
for(let item of list){
    console.log(item);
}
```
## 泛型类型
```
定义一个函数为泛型

let hello = <T> (arg : T) : T => arg;
定义一个变量为泛型并且把上面的泛型函数复制给变量

let myHello : <K>(arg : K) => K = hello;
//和上面功能相同
let myHello : {<K>(arg : K):K} = hello;
此时这个myHello就是hello这个函数。

定义一个接口，其中有一个函数为泛型

interface Hello {
    <T>(arg : T) : T;
}
定义一个泛型函数

function myHello <T>(args : T):T{
    return args;
}
定义变量为接口类型并把泛型函数复制与变量

var MH:Hello = myHello;
let mh : Hello<number> = myHello;   //可以在赋值的时候指定
console.log(MH<string>('hello'));   //也可在调用的时候指定类型。
这时，MH函数和myHello函数相同。
```
## 泛型类
```
定义一个泛型类

class HelloNumber<T>{
    ten : T;
    add : (x : T , y : T) => T;
}
let myHelloNumber = new HelloNumber<number>();
myHelloNumber.ten = 10;
myHelloNumber.add = function (x,y){
    return x + y;
}
```

## module和namespace
```
ts的模块用于封装变量和函数，有利于代码的模块化和可重用性。

在早期没有模块的时候，书写代码是这样。

interface StringValidator{
 isAcceptable(s : string) : boolean;
}
let lettersRegexp = (str) => /^[A-Za-z]+$/.test(str);
let numberRegexp = (str) => /^[0-9]+$/.test(str);
class LetterOnlyValidator implements StringValidator{
 
isAcceptable(s : string) : boolean{
    return lettersRegexp(s);
}
}
class ZipCodeValidor implements StringValidator{
 isAcceptable(s:string):boolean{
     return s.length == 5 && numberRegexp(s);
 }
}
每一次使用在这里都需要调用。

TypeScript中早期使用module来作为模块化。

//module.ts
export module Validation{
     export interface StringValidator{
         isAcceptable(s : string) : boolean;
     }
     let lettersRegexp = (str) => /^[A-Za-z]+$/.test(str);
     let numberRegexp = (str) => /^[0-9]+$/.test(str);
     export class LetterOnlyValidator implements StringValidator{
         isAcceptable(s : string):boolean {
             return lettersRegexp(s);
         }
     }
     export class ZipCodeValidor implements StringValidator{
         isAcceptable(s : string) : boolean{
             return numberRegexp(s);
         }
     }
 }
我们在想使用的时候可以按照下面这种方式来使用

const letterOnlyValidator = new Validation.LetterOnlyValidator();
由于1.5版本的更新和ES6的出现，把module改成了namespace

namespace Validation{
    export interface StringValidator{
        isAcceptable(s : string) : boolean;
    }
    const lettersRegexp = (str) => /^[A-Za-z]+$/.test(str);
    const numberRegexp = (str) => /^[0-9]+$/.test(str);
    export class LettersOnlyValidator implements StringValidator{
        isAcceptable(s : string) : boolean {
            return lettersRegexp(s);
        }
    }
    export class ZipCodeValidator implements StringValidator{
        isAcceptable(s : string) :boolean {
            return numberRegexp(s);
        }
    }
}
```
## TypeScript装饰器
```
装饰器是一种特殊的函数声明，用于在编译时对类、类的方法、类的属性、类的方法的参数进行处理。

使用装饰器需要在tsconfig.json中加上一个字段

{
    "compilerOptions" : {
        "target" : "es5",
        "module" : "commonjs",
        "outDir" : "out",
        "sourceMap" : true,
+        "experimentalDecorators": true
    }
}
装饰器的简单应用
定义一个装饰器

function hello(target){
    console.log('wang');
}
在类中使用装饰器

@hello
class Hello {

} 
```
## 定义一个装饰器工厂
```
从上面可以看出在类中调用装饰器是不能传入参数的，如果要传入参数可以封装一个装饰器工厂。

function color(value : string) {    //这是一个装饰器工厂
    console.log(value);
    return function(target){        //这是一个装饰器
        console.log(target);
    }
}
//使用
@color('123')
class Test{

} 
```

## 多个装饰器调用
```
当在一个类上有多个装饰器调用的时候相当于复合函数。例如：

定义多个装饰器

function f(){
    console.log("f : start");
    return function(target) {
        console.log("f : end");
    }
}
function g(){
    console.log("g : start");
    return function(target) {
        console.log("g end");
    }
}
使用装饰器

@f()
@g()
class Test{
    method(){

    }
} 
上面输出结果为：f : start -> g : start -> g end ->f : end,即方法调用方式可以看做f(g())。
```
## 方法装饰器
```
上面都是使用的类的装饰器，来看一下方法装饰器。

方法装饰器可以传入三个参数：

第一个参数：对静态成员来说是类的构造函数，对于实例成员来说就实例的原型对象。
第二个参数：方法成员的名字
第三个参数：方法成员的属性描述对象
onst enumerable = (value : boolean) => (target : any,propertyKey : string , descriptor :PropertyDescriptor) => {
                console.log(123);
                return descriptor.enumerable = value;}
class Greeters {
    greeting : string;
    constructor(message : string) {
        this.greeting = message;
    }
    @enumerable(false)
    Greeter(){
        return "Hello," + this.greeting;
    }
访问器装饰器
也可以成为get方法装饰器。访问器装饰器声明在一个访问器的声明之前，并且访问器装饰器用于访问器的属性描述符，并且可以监视、修改、或者替换一个访问器的定义。

访问器装饰器可以传入三个参数。

第一个参数：对静态成员来说是类的构造函数，对于实例成员来说就实例的原型对象。
第二个参数：方法成员的名字
第三个参数：方法成员的属性描述对象
const configurable = (value : boolean) => (target : any , propertyKey : string , descriptor : PropertyDescriptor)=>{
                    descriptor.configurable = value;
                }
class Point {
    private _x : number;
    private _y : number;
    constructor(x : number , y : number ){
        this._x = x;
        this._y = y;
    }
    @configurable(false)
    get x(){
        return this._x;
    }
    @configurable(false)
    get y(){
        return this._y;
    }

} 
```
## 属性装饰器
```
属性装饰器饰器有两个参数：

第一个参数：对于静态属性来说是类的构造函数，对于实例成员来说是实例成员的原型对象。
第二个参数是成员的名字。
const configurable = (value : boolean) => (target : any , propertyKey : string) => console.log(value);
class Hello {
    @configurable(true)
    name : string;
} 
```
## 方法参数装饰器
```
方法参数装饰器可以传入三个参数：

第一个参数：对静态成员来说是类的构造函数，对于实例成员来说就实例的原型对象。
第二个参数：参数成员的名字
第三个参数：参数在函数参数列表中的索引
参数装饰器只能用于监视一个方法的参数是否被传入。

const require = (value : boolean) => (target : any , propertyKey : string ,index : number) => console.log(value);
class Hello{
    test(@require(false) name : string){

    }
}
```
## Mixin
```
Mixin用于使用一个类去继承多个类的方式。

const copyProperties = (target : any,source : any) => {
    for(let key of Reflect.ownKeys(source)){
        if(key !=='constructor' && key !== 'prototype' && key !== 'name'){
            let desc = Object.getOwnPropertyDescriptor(source,key);
            Object.defineProperty(target,key,desc);
        }
    }
}

function Mixins(...mixins){
    class Mix{
        constructor(){
            for(let mixin of mixins){
                copyProperties(this,new mixin()) //拷贝实例属性
            }
        }
    }
    for(let mixin of mixins){
        copyProperties(Mix,mixin);  //拷贝静态属性
        copyProperties(Mix.prototype,mixin.prototype);  //拷贝原型属性
    }
    return Mix;
}
定义多个类

class Apple {
    isDisposed : boolean;
    dispose(){
        this.isDisposed = true;
    }
}
class Peach {
    isActive : boolean;
    activate(){
        this.isActive = true;
    }
    deactivate(){
        this.isActive = false;
    }
}
使用一个类去继承多个类

class SmartObject extends Mixins(Apple,Peach){
    constructor(){
        super();
    }
}
```
## 三斜线指令和错误信息列表
```
三斜线指令
三斜线指令是包含单个XML标签的单行注释。注释的内容或作为编译器的指令来使用。

三斜线指令仅仅只能放在代码的最前面，三斜线指令上前面只能有注释不能有代码，如果三斜线指令前面有代码，那么三斜线指令就会被认为普通的注释来解析。

/// <reference path ="...." />
```