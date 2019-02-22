class Person{//定义了一个名字为Person的类
  constructor(name,age){//constructor是一个构造方法，用来接收参数
    this.name = name;//this代表的是实例对象
    this.age=age;
  }
  say(){//这是一个类的方法，注意千万不要加上function
    return "我的名字叫" + this.name+"今年"+this.age+"岁了";
  }
}
var obj=new Person("laotie",88);

var obj2 =new Person('xxx',99)
obj.name = 9;
console.log(obj2.say());//我的名字叫laotie今年88岁了