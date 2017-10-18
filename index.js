
function OrderProgress(finishProgress, aniDuration) {
    /**
     * 圆点部分
     */
    // 获取所有的圆点元素
    this.finishProgress = finishProgress;
    this.aniDuration = aniDuration;
    this.circles = document.querySelectorAll('.circle');
    // 获得横线元素
    this.line = document.querySelector('.line');
    // 获取圆点数量
    var circlesLength = this.circles.length;
    // 算出线的段数
    var lineLength = circlesLength - 1;
    // 算出所有点线的时间份数（点1线3）
    var timeParts = circlesLength + lineLength * 2;
    // 算出每一份时长（四舍五入保留一位小数位）
    this.partDuration = Number((this.aniDuration / timeParts).toFixed(1));
    // 算出一个阶段的时长
    var stageDuration = Number((this.partDuration * 3).toFixed(1));
    // 算出一段线的长
    var lineDuration = this.partDuration * 2;
    // 算出实际总时长
    this.realDuration = this.partDuration * timeParts;
    // 算出每段线占总线的百分比
    var linePercent = Number((100 / lineLength).toFixed(2));
    // 创建一个数组，用来存放多个圆点的时间节点
    this.circleTimeNodes = [];
    // 创建圆点动画
    new JS2CSSKeyframes('circleLoad',{
        '0%':'background-color: #ccc;',
        '100%':'background-color: skyblue;'
    });
    // 创建圆点动画暂停样式
    createCssStyle('.nokeyframes {animation-play-state: paused !important;}');
    // 循环计算出各圆点的时间节点，设置各圆点的animation动画
    var circleStartTime = 0;
    var circleEndTime = 0;
    var lineKeyFrames = {};
    for(var i = 0; i < this.circles.length; i++) {
        circleEndTime = circleStartTime + this.partDuration;
        this.circleTimeNodes.push({
            start: circleStartTime,
            end: circleEndTime
        })
        if(i <= this.finishProgress - 1) {
            var startPercent = parseInt(circleStartTime / this.realDuration * 100) + '%';
            var endPercent = parseInt(circleEndTime / this.realDuration * 100) + '%';
            var key = startPercent;
            if(i > 0) {
                key +=  (',' + endPercent);
            }
            if(i == this.finishProgress - 1) {
                key += ',100%';
            }
            var value = 'width:' + linePercent*i + '%' + ';';
            lineKeyFrames[key] = value;
        }
        circleStartTime += stageDuration;
        
    }
    var ix = new JS2CSSKeyframes('lineLoad', lineKeyFrames);
    
}

OrderProgress.prototype.start = function() {
    for(var i = 0; i < this.circles.length; i++) {
        this.circles[i].style.animation = 'circleLoad '+ this.partDuration +'s '+ this.circleTimeNodes[i].start +'s forwards';
        if(i > this.finishProgress - 1) {
            addClass(this.circles[i], 'nokeyframes');
        }
    }
    this.line.children[0].style.animation = 'lineLoad ' + this.realDuration + 's linear forwards';    
}

function createCssStyle(cssStr) {
    if(document.all){ // document.createStyleSheet(url)
        window.style = cssStr; 
        document.createStyleSheet("javascript:style"); 
    }else{ //document.createElement(style)
        var style = document.createElement('style'); 
        style.type = 'text/css'; 
        style.innerHTML = cssStr; 
        document.getElementsByTagName('HEAD').item(0).appendChild(style); 
    } 
}

function hasClass(elements, cName) {
    return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
};

function addClass(elements, cName) {
    if (!hasClass(elements, cName)) {
        elements.className += " " + cName;
    };
};