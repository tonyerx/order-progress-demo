# 自动生成订单进度条动画的js方法

## Usage
- HTML结构
```
<div class="progress">
    <div class="line">
        <span></span>
    </div>
    <span class="circle">1</span>
    <span class="circle">2</span>
    <span class="circle">3</span>
    <span class="circle">4</span>
    <span class="circle">5</span>
</div>
```
- CSS样式
> 可以根据自己需要写
```
.progress {
    position: relative;
    margin-top: 50px;
    margin-left: 50px;
    width: 700px;
    height: 10px;
}
.line {
    width: 100%;
    height: 100%;
    background-color: #ccc;
}
.line>span {
    display: inline-block;
    vertical-align: top;
    width: 0%;
    height: 100%;
    background-color: skyblue;
}
.circle {
    position: absolute;
    top: 0;
    margin-top: -5px;
    margin-left: -10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #ccc;
    line-height: 20px;
    text-align: center;
}
.circle:nth-of-type(1) {
    left: 0%;
}
.circle:nth-of-type(2) {
    left: 25%;
}
.circle:nth-of-type(3) {
    left: 50%;
}
.circle:nth-of-type(4) {
    left: 75%;
}
.circle:nth-of-type(5) {
    left: 100%;
}
```
- JS
> 引入j2ckf.js用户动态创建keyframes，再引入order-progress核心index.js
```
<script src="./lib/j2ckf.js"></script>
<script src="./index.js"></script>
```
> 实例化OrderProgress，第一个参数是进度，第二个参数是整个进度条的动画时长，通过start方法来开始动画
```javascript
var orderProgress = new OrderProgress(3, 6.5);
// 设置动画，动画开始播放
orderProgress.start();
```

## To do list
1. 将OrderProgress做成一个模块包，不再需要额外引入j2ckf.js
2. 自动获取开发者在css中使用的颜色
3. 增加额外的动画

## Gratitude
- @qiqiboy
[JS2CSSKeyframes](https://github.com/qiqiboy/JS2CSSKeyframes)

- @JR93
[order css](http://www.cnblogs.com/jr1993/p/4598630.html)
