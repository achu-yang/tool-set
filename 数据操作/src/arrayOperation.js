(function (root) {
  let _ = function (data, ...options) {
    if (!(this instanceof _)) {
      return new _(data, ...options)
    }
    this.wrapper = data
  }
  /**
   * 去重数组可以通过第二参数对数据进行额外处理
   * @param {*} source 数据源
   * @param {*} callback 数据额外处理
   * @returns 处理好的数据源
   */
  _.unique = (source, callback) =>{
    let result = []
    for(let i = 0; i < source.length; i++) {
      let target = callback ? callback (source[i]) : source[i]
      if (result.indexOf(target) === -1) {
        result.push(target)
      }
    }
    return result
  }
  _.confirm = (source, callback1, callback2) => {
    console.log(source)
    console.log(callback1)
    console.log(callback2)
  }
  /**
   * 钩子将属性值作为参数给到回调函数
   * @param {Array} arr 属性列表
   * @param {Function} callback 回调函数
   */
  var beforeHook = (arr, callback) => {
    for (let i = 0; i < arr.length; i++) {
      callback(arr[i])
    }
  }
  /**
   * 返回对象属性名称
   * @param {Object} target 对象
   * @returns {Array} 对象的属性名
   */
  _.possess = target => {
    let result = []
    for (let name in target) {
      result.push(name)
    }
    return result
  }

  /**
   * 使得可以用_(Array).method(...callback)
   * 或者_.method(Array,...callback)
   * @method 混入
   * @param {Object} object 
   */
  _.minxin = object => {
    beforeHook(_.possess(object), key => {
      // 获取_的方法
      let func = object[key]
      // 将_方法挂在在_的原型链上
      object.prototype[key] = function (...options) {
        // 采用解构赋值将数据和回调函数分开给_的方法作为参数
        let decon = [this.wrapper].concat(options)
        return func.apply(this, decon)
      }
    })
  }
  // 扩展方法
  _.minxin(_);
  // 将库挂在在window对象中
  // 缺少这个会导致 _ is no defined
  root.loash = root._ = _
})(this);