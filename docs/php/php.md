
## 基础语法
1. PHP 脚本以 <?php 开始，以 ?> 结束
2. PHP 文件的默认文件扩展名是 ".php"
3. PHP 文件通常包含 HTML 标签和一些 PHP 脚本代码
4. PHP 中的每个代码行都必须以分号结束，否则输出错误

## 变量
1. 变量以 $ 符号开始，后面跟着变量的名称,$a
2. 变量名必须以字母或者下划线字符开始
3. 变量名只能包含字母数字字符以及下划线（A-z、0-9 和 _ ）
4. 变量名不能包含空格
5. 变量名是区分大小写的（$y 和 $Y 是两个不同的变量）
6. 由于PHP是弱类型语言所以变量不必声明类型和JS类似 

### 四种不同的变量作用域
```
local 局部
global 全局
static 局部-静态变量
parameter 参数

<?php 
  $age = 20; //全局作用域
  $name = 'zhangsan';
  function people () {
    $isJob  = 'yes'; //局部变量
    global $name;   //访问全局作用域
    var_dump($name);  // zhangsan 
  }
  people()
?>

1. $age 是在函数外部定义的变量，拥有全局作用域，但是这里和 JS 的区别是 $age 在people函数中是不可访问的
2. $isJob 是在函数内部声明的变量所以是局部变量，只能在函数内部访问
3. $name global 是在函数内部调用函数外部定义的全局变量,正常情况在函数内部访问函数外部的变量则为NULL
```

### Static 作用域
```
<?php
  function test() {
    static $a = 0;
    // static $a = 1 + 2; // 解析错误 参照解析2
    echo $a;
    $a++;
  }
  test (); //0
  test (); //1
  test (); //2
?>
解析：

1. 静态全局变量的作用域局限于一个源文件内，只能为该源文件内的函数公用
2. 不能对静态变量用表达式的结果赋值，否则会导致解析错误
3. static全局变量只初使化一次，下一次依据上一次结果值，上例子中调用三次执行的结果是累加的。
4. 在内存的静态存储区中（静态存储区在整个程序运行期间都存在，其他局部变量存储在栈中。
```

## 小结

>+ 定义在函数外部的就是全局变量，它的作用域从定义处一直到文件结尾。
>+ 函数内定义的变量就是局部变量，它的作用域为函数定义范围内。
>+ 函数内访问全局变量需要 global 关键字,如果不使用，则会覆盖全局变量

### 数组内置函数

>+ for、foreach循环输出数组元素
```
<?php 
  // for循环
  for ($i = 0; $i <= 100; $i++) {
    echo "$i <br/>";
  } 

  // foreach 只适用于数组
  $name = array('zhangsan', 'lisi', 'wangwu');  // 创建数组
  foreach ($name as $value) {
    echo "$value <br/>";
  }
?>
```
>+ count() 获取数组元素的个数 
```
<?php
  $nameLength = array('zhangsan', 'lisi', 'wangwu');
  echo count($nameLength); // 3
?>
```
>+ 输出数组当前的元素的值，如果当前元素为空或者无值则返回FALSE 
```
<?php
  $name = array('zhangsan', 'lisi', 'wangwu');

  echo current($name); // 返回第一个元素zhangsan 

  echo end($name); // 返回最后一个元素wangwu

  echo next($name); // 返回指定元素的下一个元素

  echo prev($name); // 返回指定元素的上一个元素

  echo reset($name); // 把内部指针移动到数组的首个元素zhangsan

?>
```
>+ 对当前数组进行排序
```
  $numbers = array(1, 2, 3, 3, 4, 5, 6, 2);

  // 返回bool
  sort($numbers);  //对数组进行升序成功则为true 失败则为false
  rsort($numbers); //对数组进行降序成功则为true 失败则为false
  array_reverse($array, $preserve); //对原数组按反序排序，返回排序后的数组(2, 6, 5, 4, 3, 3, 2, 1)
```
>+ 合并数组
```
$arr = array(1, 2, 3, 3, 4, 5, 6, 2);
$arr1 = array(10, 20, 30);

array_merge($arr, $arr1 );
```
>+ 压栈，出栈
```
$name = 'wang';
$name1  = array('zhang', 'li');

array_push($name1, $name); // 3 返回新数组的长度

array_pop($name1); //li 返回被pop的值。栈为空，返回null

array_shift($name1); //删除第一个元素并返回；

array_unshift(array，val1，val2,...); //将参数按照顺序加入队列中
```
>+ 统计数组中值为出现的次数
```
$val = array(1, 2, 3, 3, 4, 3, 3, 1, 1);
print_r(array_count_values($val));
```
>+ 过滤数组的元素
```
function func ($var) {
  return($var & 1);
}

$val = array('a', 'b', 2, 3, 4);
print_r(array_filter($val, 'func')); // 3
```
>+ 检查索引是否在数组中
```
$people = array('name'=>'renbo', 'age'=>'28');

if (array_key_exists('name', $people)) {
  echo 'name存在';
}```
>+ 检查数组中是否存在指定的值
```
$val = array('zhangsan', 'lisi', 'wangwu');
if (in_array('zhangsan', $val)) {
  echo '存在';
}```
>+ 返回当前元素的Key
```
$people = array('name'=>'renbo', 'age'=>'28');
key($people); //name
```
>+ 返回当前元素所有的key
```
$people = array('name'=>'renbo','age'=>'28');
print_r(array_keys($people)); // name age
```

## mysql

```
注意分号
登录
mysql -uroot -p
查看
show databases;
设定默认数据库
use db_test;

MySQL函数SQL语句
count 
    COUNT(column_name) 函数返回指定列的值的数目（NULL 不计入）：
    SELECT count (*) FROM t_student
    WHERE gender ='M'
min()
    MIN() 函数返回指定列的最小值。
    SELECT min(指定列) FROM 表 //仅返回指定列数据
    SELECT min(指定列), t_student.* FROM db_test.t_student
max()
    MAX() 函数返回指定列的最大值。
sum()
    求和
sqrt()
    求平方根
now()
    当前时间
rand()
    得到一个随机数//0-1之间带小数的
concat()拼接字符串
    concat(字段，字段)
    SELECT concat(字段."任何字符串".字段) FROM 表；
```
## SQL筛选
```
SELECT * FROM t_student
WHERE birthdate <='1993'
WHERE birthdate >='1991'

SELECT * FROM t_student
WHERE birthdate BETWEEN '1991' AND '1993'

找姓王同学
SELECT * FROM t_student
WHERE name LIKE '王%' 
% 通配符

名字带王的
SELECT * FROM t_student
WHERE name LIKE '%王%' 
```
'-- 'sql注释
LIKE会降低性能

```
按生日排序
顺序
SELECT * FROM t_student
ORDER BY birthdate
逆序
SELECT * FROM t_student
ORDER BY birthdate DESC
```
```
SELECT * FROM db_test.t_class

将学生表与班级表关联查询
SELECT * FROM t_student,t_class
WHERE t_student.class_id=t_class.class_id
筛选某些字段
SELECT t_student.id,t_student.name,t_class.className FROM t_student,t_class
WHERE t_student.class_id=t_class.class_id
```

## OOP
### 面向对象基础概念
Object Oriented Programming，简称OOP，是一种程序设计思想。OOP把对象作为程序的基本单元，一个对象包含了数据和操作数据的函数

### 对象的主要三个特性
1. 对象的行为：可以对 对象施加那些操作，开灯，关灯就是行为
2. 对象的形态：当施加那些方法是对象如何响应，颜色，尺寸，外型
3. 对象的表示：对象的表示就相当于身份证，具体区分在相同的行为与状态下有什么不同

### 面向对象内容
```
类 − 定义了一件事物的抽象特点。类的定义包含了数据的形式以及对数据的操作

对象 − 是类的实例

成员变量 − 定义在类内部的变量。该变量的值对外是不可见的，但是可以通过成员函数访问，在类被实例化为对象后，该变量即可称为对象的属性

成员函数 − 定义在类的内部，可用于访问对象的数据

继承 − 继承性是子类自动共享父类数据结构和方法的机制，这是类之间的一种关系。在定义和实现一个类的时候，可以在一个已经存在的类的基础之上来进行，把这个已经存在的类所定义的内容作为自己的内容，并加入若干新的内容

父类 − 一个类被其他类继承，可将该类称为父类，或基类，或超类

子类 − 一个类继承其他类称为子类，也可称为派生类

多态 − 多态性是指相同的函数或方法可作用于多种类型的对象上并获得不同的结果。不同的对象，收到同一消息可以产生不同的结果，这种现象称为多态性

重载 − 简单说，就是函数或者方法有同样的名称，但是参数列表不相同的情形，这样的同名不同参数的函数或者方法之间，互相称之为重载函数或者方法

抽象性 − 抽象性是指将具有一致的数据结构（属性）和行为（操作）的对象抽象成类。一个类就是这样一种抽象，它反映了与应用有关的重要性质，而忽略其他一些无关内容。任何类的划分都是主观的，但必须与具体的应用有关

封装 − 封装是指将现实世界中存在的某个客体的属性与行为绑定在一起，并放置在一个逻辑单元内

构造函数 − 主要用来在创建对象时初始化对象， 即为对象成员变量赋初始值，总与new运算符一起使用在创建对象的语句中

析构函数 − 析构函数(destructor) 与构造函数相反，当对象结束其生命周期时（例如对象所在的函数已调用完毕），系统自动执行析构函数。析构函数往往用来做"清理善后" 的工作（例如在建立对象时用new开辟了一片内存空间，应在退出前在析构函数中用delete释放）
```

### PHP中类的定义
```
 <?php
    class People {
      // 公有成员属性
      public $name = 'zhangsan';
      public $age = 28;
      // 公有成员函数方法
      public function sayName () {
        //业务逻辑 
      }
    }
  ?>
```
### PHP中对象的创建
```
class People {
    // 公有成员属性
    public $name = 'zhangsan';
    public $age = 28;
    // 公有成员函数方法（$this代表自身的对象);
    public function sayName () {
      echo $this->name;
    }
  }
  // 通过new操作符创建对象
  $body = new People();
  // 成员对象的调用
  $body->study();
  ```
  ### php 构造函数
  ```
  class People {
    // 通过构造方法为成员变量赋初始值
    function __construct( $name, $age ) {
      $this->name = $name;
      $this->age = $age;
    }
    // 公有成员函数方法（$this代表自身的对象);
    public function sayName () {
      echo("my name is &nbsp;" .$this->name.",&nbspI`m&nbsp;" .$this->age ."&nbsp;years old");
      echo '</br>';
    }
  }
  // 通过new操作符创建zhangsan对象
  $zhangsan = new People('zhangsan', 28);
  $zhangsan->sayName();

  // 通过new操作符创建lisi对象
  $lisi = new People('lisi', 26);
  $lisi->sayName();
  ```
### PHP中析构函数
析构函数 (destructor) 与构造函数相反，当对象结束其生命周期时，系统自动执行析构函数，常用场景例如连接数据库在__construct中,处理完数据断开连接在__destruct方法中
```
 class People {
    // 通过构造方法为成员变量赋初始值
    function __construct ($name, $age) {
      $this->name = $name;
      $this->age = $age;
    }
    // 公有成员函数方法（$this代表自身的对象);
    public function sayName () {
      echo("my name is &nbsp;" .$this->name.",&nbspI`m&nbsp;" .$this->age ."&nbsp;years old");
      echo '</br>';
    }
    // 析构函数用于销毁某些变量、对象，操作等
    function __destruct () {
      $this->name = '';
      return true;
    }
  }
  // 通过new操作符创建lisi对象
  $lisi = new People('lisi', 26);

  var_dump($lisi);
  echo '<br/>';

  if ($lisi->__destruct()) {
    echo '销毁成功 <br/>';
    var_dump($lisi);
  }
  ```
  ### PHP中继承实现
  ```
  // 父类
  class People {
    var $name;
    var $age;
    function __construct ($name, $age) {
      $this->name = $name;
      $this->age = $age;
    }
    public function sayName () {
      echo("my name is &nbsp;" .$this->name.",&nbspI`m&nbsp;" .$this->age ."&nbsp;years old");
      echo '</br>';
    }
  }
  // 子类
  class Boy extends People {

    function getParentProperty () {
      var_dump($this);
    }

  }
  $lisi = new People('lisi', 26);
  $boy = new Boy('wangwu',28);
  $boy->getParentProperty();
  // 子类调用父类方法
  $boy->sayName();
  ```
  ### PHP中方法重写
  ```
   class People {
    var $name;
    var $age;
    function __construct ($name, $age) {
      $this->name = $name;
      $this->age = $age;
    }
    public function sayName () {
      echo("my name is &nbsp;" .$this->name.",&nbspI`m&nbsp;" .$this->age ."&nbsp;years old");
      echo '</br>';
    }
  }
  // 子类
  class Boy extends People {
    // 重写父类方法
    public function sayName () {
      echo ("my name is &nbsp;" .$this->name);
      return $this->name;
    }
  }
  $lisi = new People('lisi', 26);
  $boy = new Boy('wangwu',28);
  // 重写方法
  $boy->sayName();
  ```
### PHP中访问的控制

>+ PHP 对属性或方法的访问控制，是通过在前面添加关键字 public（公有），protected（受保护）或 private（私有）来实现的

>+ public & var（公有）：公有的类成员可以在任何地方被访问

>+ protected（受保护）：受保护的类成员则可以被其自身以及其子类和父类访问

>+ private（私有）：私有的类成员则只能被其定义所在的类访问

```
/**
   * 基类
   * Define People
   */
  class People 
  {
    // 声明一个公有的构造函数
    public function __construct () {}

    // 声明一个共有的方法
    public function sayName () 
    {
      echo 'sayname</br>';
    }

    // 声明一个受保护的方法
    protected function swim () 
    {
      echo 'swim</br>';
    }

    // 声明一个私有方法
    private function study () 
    {
      echo 'study';
    }
    
    // 不加关键字默认公有方法
    function getFun () {
      $this->sayName();
      $this->swim();
      $this->study();
    }
  }
  $people = new People();
  // 正常运行输出sayname
  $people->sayName();
  // 产生错误
  $people->swim();
  // 产生错误
  $people->study();
  // 公有，受保护，私有都可以执行
  $people->getFun(); 

  /**
   * 子类
   * Define Boy
   */

  class Boy extends People
  {
    function getFun2 ()
    {
      $this->sayName();
      $this->swim();
      // 这行会产生一个错误
      $this->study(); 
    }
  }
  $body = new Boy();
  // 这行能被正常执行
  $body ->sayName();
  // 公有的和受保护的都可执行，但私有的不行
  $body->getFun2(); 
  ```
### PHP中抽象类
>+ 利用关键字abstract声明抽象

>+ 如果类中有一个方法被是声明为抽象，那么这个类也必须声明为抽象

>+ 抽象方法只声明了调用方式（参数），不能定义其具体的功能实现（相当于没有函数体），子类通过继承实现抽象方法，且不能被实例化

>+ 继承一个抽象类，子类必须定义父类中的所有抽象方法并且必须要和父类的声明访问级别保持一致或者更宽松

```
/**
   * 定义抽象类People
   */
  abstract class People 
  {

    abstract protected function eat();
    abstract protected function sleep();
    abstract protected function study();
    public function runing() 
    {
      echo '跑啊跑！</br>';
    }
  }

  /**
   * 实现抽象类
   */
  class Zhangsan extends People
  {
    protected function eat()
    {
      echo 'eat </br>';
      return 'eat';
    }

    protected function sleep()
    {
      echo 'sleep </br>';
      return 'sleep';
    }

    protected function study()
    {
      echo 'study </br>';
      return 'study';
    }

    public function getFunc () 
    {
      $this->eat();
      $this->sleep();
      $this->study();
    }
  }
  // 调用子类
  $zhangsan = new Zhangsan;
  $zhangsan->runing(); //跑啊跑！
  $zhangsan->getFunc(); // eat sleep study

  场景：在很多类里面很多的方法都是在重复。这里就可以去用抽象类，当然也可以重写一个类，每个公共类实例化实例化一次，调用相同的方法。但是abstract可以省去实例化的步骤，而且可以重载这个方法,这样不是更方便简单嘛
  ```
### PHP中接口的使用
interface主要对类名，类所拥有的方法，以及所传参数起约束和规范作用，和abstract类似。在多人协同开发项目时起重要作用
```
// 定义接口类
interface People  
{
  public eat () {};
}
// 实现接口类
class Apple implements People{
 public function eat ()
 {
   echo '我吃的苹果';
 }
}

$apple = new Apple();
$apple->eat(); 

参数约束，如果参数名字不一样会报错

// 定义接口类
interface People  
{
  public function eat($color);
}

// 实现接口类Apple
class Apple implements People
{
 public function eat($color)
 {
    echo("我吃的$color 🍎<br/>");
 }
}

// 实现接口类Grape
class Grape implements People
{
  public function eat($color)
  {
    echo("我吃的$color 🍇");
  }
}

$apple = new Apple();
$apple->eat('红'); 

$grape = new Grape();
$grape->eat('紫'); 
接口继承

  // 定义People接口类
  interface People  
  {  
    public function eat();  
  }

  // 继承People接口类
  interface Boy extends People  
  {  
    public function drink();  
  }

  // 接口方法实现
  class Behavior implements Boy  
  {  
    public function eat()  
    {  
        echo "吃东西<br>";  
    }  
    
    public function drink()  
    {  
      echo "喝饮料<br>";  
    }  
  }         
  Behavior::eat();      
  Behavior::drink();
```

### 总结抽象类和接口
抽象类就是一个类的服务提供商，拥有众多服务

接口类就是一个类的规范，子类必须完成它指定方法

它们的区别：

抽象类继承用extends,接口继承用implements

抽象类能多重继承,接口多重继承用","隔开

抽象类中的方法不必全部重载,接口方法必须声明或者重载

抽象类不必只包含抽象方法,可以定义完整的方法,接口不能包含任何完整定义方法

__set,__get,__isset,__unset,__call,__sleep(),__wakeup()等魔术方法

1. __sleep() 方法常用于提交未提交的数据，或类似的清理操作。同时，如果有一些很大的对象，但不需要全部保存，这个功能就很好用
__wakeup() 经常用在反序列化操作中，例如重新建立数据库连接，或执行其它初始化操作

引入php手册中的例子

  class Connection 
  {
      protected $link;
      private $server, $username, $password, $db;
      
      public function __construct($server, $username, $password, $db)
      {
          $this->server = $server;
          $this->username = $username;
          $this->password = $password;
          $this->db = $db;
          $this->connect();
      }
      
      private function connect()
      {
          $this->link = mysql_connect($this->server, $this->username, $this->password);
          mysql_select_db($this->db, $this->link);
      }
      
      public function __sleep()
      {
          return array('server', 'username', 'password', 'db');
      }
      
      public function __wakeup()
      {
          $this->connect();
      }
  }
  
2. 属性重载__set,__get,__isset,__unset
public __set ( string $name , mixed $value ) : void // 设置私有属性值的时候调用
public __get ( string $name ) : mixed  // 获取私有属性值的时候调用
public __isset ( string $name ) : bool // 当判断一个私有成员属性是否被设置过时调用
public __unset ( string $name ) : void // 当销毁一个私有成员属性的时候调用
当实例化一个对象后，调用类中不存在或者没有权限访问的属性的时候，默认调用__get()方法。可以访问内部属性

3. 方法重载__call和__callStatic

call 和 callStatic 是类似的方法，前者是调用类不存在的方法时执行，而后者是调用类不存在的静态方式方法时执行。正常情况下如果调用一个类不存在的方法 PHP 会抛出致命错误，而使用这两个魔术方法我们可以替换一些更友好的提示或者记录错误调用日志信息、将用户重定向、抛出异常等等，亦或者是如同set 和 get 那样做方法的重命名。