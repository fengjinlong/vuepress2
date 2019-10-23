@Decorator

装饰器接收一个参数，也就是我们被装饰的目标方法，处理完扩展的内容后再返回一个方法，供以后调用，同时也失去了对原方法对象的访问。

@log
class MyClass { }

function log(target) { // 这个 target 在这里就是 MyClass 这个类
   target.prototype.logger = () => `${target.name} 被调用`
}

const test = new MyClass()
test.logger() // MyClass 被调用