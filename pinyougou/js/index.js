window.addEventListener('load', function () {
    //1.获取元素
    var arr_l = document.querySelector('.arr_l');
    var arr_r = document.querySelector('.arr_r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    //鼠标经过focus 就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function () {
        arr_l.style.display = 'block';
        arr_r.style.display = 'block';
        clearInterval(timer);
        timer = null; //清除定时器变量

    })
    focus.addEventListener('mouseleave', function () {
        arr_l.style.display = 'none';
        arr_r.style.display = 'none';
        timer = setInterval(function () {
            //手动调用点击事件 (类似于右侧按钮做法)
            arr_r.click();
        }, 2000);

    })
    //动态生成小圆圈 有几张图片，就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        //创建一个li
        var li = document.createElement('li');
        //记录当前小圆圈的索引号 通过自定义属性
        li.setAttribute('index', i);
        //把小li插入ol里边 
        ol.appendChild(li);
        //小圆圈的排他思想 把所有的li 清除current类名 当前的li 设置current类名
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            //点击小圆圈，移动图片(ul)
            //ul的移动距离 小圆圈的索引号 乘以图片的宽度(负值)
            var index = this.getAttribute('index');
            //把li的索引号给num和circle
            num = index;
            circle = index;
            console.log(focusWidth);
            console.log(index);
            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'current';
    //克隆第一张图片(li) 放到ul最后边
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //点击右侧按钮，图片滚动一张
    var num = 0;
    // circle控制小圆圈的播放
    var circle = 0;
    //flag 节流阀
    var flag = true;
    arr_r.addEventListener('click', function () {
        if (flag) {
            //关闭节流阀
            flag = false;
            //图片无缝滚动原理：如果走到了复制的最后一张图片，此时ul快速复原left为0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true; //打开节流阀
            });
            circle++;
            //如果circle等于4 说明走到最后克隆的这张图片 就复原为0
            if (circle == ol.children.length) {
                circle = 0;
            }
            //调用函数
            circleChange();
        }
    })
    //左侧按钮做法
    arr_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            //图片无缝滚动原理：如果走到了复制的最后一张图片，此时ul快速复原left为0
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;

            });
            circle--;
            //如果circle小于0 说明走到第一张图片 则改为第四个小圆圈
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // }
            circle < 0 ? circle = ol.children.length - 1 : circle;
            // 调用函数
            circleChange();
        }
    })

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }

    //开启定时器
    var timer = setInterval(function () {
        //手动调用点击事件 (类似于右侧按钮做法)
        arr_r.click();
    }, 2000);
})