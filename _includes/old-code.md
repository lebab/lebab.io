{% highlight javascript %}
var Employee = function Employee() {
  this.alive = true;
};

Employee.prototype.setSkills = function(skills) {
  skills = skills || [];
  var defaultSkills = ['JavaScript'];
  this.skills = skills.concat(defaultSkills);
};

Employee.prototype.sayHello = function() {
  window.setTimeout(function() {
    console.log('Hello World!');
  }, 2000);
};

Object.defineProperty(Employee.prototype, 'name', {
  get: function() {
    return this.firstName + ' ' + this.lastName;
  }
});
{% endhighlight %}