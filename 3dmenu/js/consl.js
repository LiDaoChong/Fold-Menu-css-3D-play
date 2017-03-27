window.onload = function() {
    //获取缩放率
    var detectZoom = function() {
        var ratio = 0,
            screen = window.screen,
            ua = navigator.userAgent.toLowerCase();
        if (~ua.indexOf('firefox')) {
            if (window.devicePixelRatio !== undefined) {
                ratio = window.devicePixelRatio;
            }
        } else if (~ua.indexOf('msie')) {
            if (screen.deviceXDPI && screen.logicalXDPI) {
                ratio = screen.deviceXDPI / screen.logicalXDPI;
            }
        } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
            ratio = window.outerWidth / window.innerWidth;
        }

        if (ratio) {
            ratio = Math.round(ratio * 100);
        }
        // 360安全浏览器下浏览器最大化时诡异的outerWidth和innerWidth不相等
        if (ratio === 99 || ratio === 101) {
            ratio = 100;
        }
        return ratio;
    };

    /*遮罩过程↓*/
    var zhezhao = document.getElementById('zhezhao');
    zhezhao.style.display = 'none';
    // setTimeout("zhezhao.style.display='none'", 200);
    // 获取左侧栏目总宽度根据栏目宽度设置参考字体大小
    var leftEl = document.getElementById('left');
    var cd = document.getElementById('cd');
    var pu = document.getElementById('pu');
    var uwrap = document.getElementById('uwrap');
    var bodyw = window.innerWidth;
    var cduliH = document.getElementById('firstli').offsetHeight;
    var sunbox = document.getElementById('sunbox');
    var strsbox = sunbox.innerHTML;
    var middle = document.getElementById('middle');
    middle.style.fontSize = 20 + 'px';
    sunbox.style.width = uwrap.offsetWidth + 'px';
    setTimeout(function() {
        if (bodyw * 0.02 < 16) {
            document.body.style.fontSize = '16px';
            leftEl.style.width = 16 * 13 + 'px';
        }
        cduliH = document.getElementById('firstli').offsetHeight;
        uwrap.style.visibility = 'hidden';
        // uwrap.style.display='none';
        sunbox.style.width = uwrap.offsetWidth + 'px';
    }, 2000);
    document.body.style.fontSize = bodyw * 0.02 + 'px';
    leftEl.style.width = bodyw * 0.26 + 'px';
    /*//一些相关元素的禁锢缩放控制 
    var vx = 100 / detectZoom();  */

    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        var clentH = document.documentElement.clientHeight;
    }
    // var restpool='';
    window.onresize = function() {
        if(hide_tag){
            bodyer1.style.display = 'none';
        }
        //字体大小响应变换
        middle.style.fontSize = 20 + 'px';
        bodyw = window.innerWidth;
        document.body.style.fontSize = bodyw * 0.02 + 'px';

        leftEl.style.width = bodyw * 0.26 + 'px';
        if (bodyw * 0.02 < 16) {
            document.body.style.fontSize = '16px';
            leftEl.style.width = 16 * 13 + 'px';
        }
        cduliH = document.getElementById('firstli').offsetHeight;
        sunbox.innerHTML = '';
        sunbox.style.width = '100%';
        sunbox.style.width = uwrap.offsetWidth - 4 + 'px';
        if (prevFp != '' && clk) {
            boxShow(prevCp, prevCp.parentNode);
        }
        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
            var winHeight = document.documentElement.clientHeight;
            if (winHeight != clentH ) {
                clentH = winHeight;
                rowN(imgcont, 160, 250, 'scle');
                // alert('窗口高度发送了变化');
            }
        }

    };

    // 以下为菜单控件视觉变换控制
    //简单交互时序


    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() {
                        callback(currTime + timeToCall);
                    },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    })();

    var Minfor = {};
    Minfor.cK = false;
    Minfor.cK1 = true;
    Minfor.cK2 = true;
    Minfor.mover = false;
    Minfor.mclick = false;
    Minfor.cosl = true;
    Minfor.T = 80000;
    Minfor.direction = true;
    Minfor.tL = 0;
    Minfor.tm0 = 0;
    Minfor.tm1 = 0;
    Minfor.perc = 0;
    Minfor.ages = [];
    pu.onmouseover = function() {
        Minfor.mover = true;
        if (Minfor.cK1 && Minfor.cK2) {
            Minfor.cK = false;
            // console.log('彻底解锁');
        }
        if (!Minfor.cK) {
            Minfor.direction = true;
            flowIn();
        } else {
            if (!Minfor.mclick) {
                Minfor.cK2 = false;
                // console.log('悬停在按下状态，加锁2');
            }
        }
    };
    pu.onmouseout = function() {
        Minfor.mover = false;

        if (!Minfor.cK) {
            Minfor.direction = false;
            flowIn();
        }
        Minfor.cK2 = true;
        // console.log('悬停移除，解锁2');
    };
    pu.addEventListener('click', (function() {
        Minfor.mclick = !Minfor.mclick;
        if (Minfor.mclick) {
            Minfor.cK = true;
            Minfor.direction = true;
        } else {
            Minfor.direction = false;
        }
        flowIn();
    }), false);

    function tPercentStep(T) {
        if (Minfor.direction) {
            Minfor.tL += (Minfor.tm1 - Minfor.tm0);
            Minfor.perc = Minfor.tL / T;
            if (Minfor.perc >= 1) {
                Minfor.perc = 1;
                Minfor.cosl = false;
            }
        } else {
            Minfor.tL -= (Minfor.tm1 - Minfor.tm0);
            Minfor.perc = Minfor.tL / T;
            if (Minfor.perc <= 0) {
                Minfor.perc = 0;
                Minfor.cosl = false;
            }
        }
        Minfor.perc = (Minfor.perc).toFixed(2);
    }

    function flowIn() {
        sunbox.style.display = 'none';
        cduliH = document.getElementById('firstli').offsetHeight;
        uwrap.style.visibility = 'visible';
        if (!Minfor.cosl) {
            if (!Minfor.direction) {
                Minfor.tL = Minfor.T;
            }
            Minfor.cosl = true;
        }
        Minfor.tm0 = new Date().getTime();
        requestAnimationFrame(animate);
    }

    function animate() {
        Minfor.anid = requestAnimationFrame(animate);
        cutin();
        if (!Minfor.cosl) {
            cancelAnimationFrame(Minfor.anid);
            Minfor.start = false;
            return;
        }
        Minfor.tm1 = new Date().getTime();
        tPercentStep(Minfor.T);
        Minfor.ages = comAxiss([0, 0.5], [0.5, 1]);
        doFrame();

    }

    function cutin() {
        if (!Minfor.cosl && Minfor.perc == 0) {
            Minfor.cK1 = true;
        } else {
            if (Minfor.mclick) {
                Minfor.cK1 = false;
            }
        }
    }
    var oUL = '';

    function doFrame() {
        cd.style.height = '100%';
        if (Minfor.perc < 1) {
            cd.style.height = '130px';
            sunbox.style.display = 'none';
        } else if (oUL != '') {
            sunbox.style.display = 'block';
            sunbox.appendChild(oUL);
            oUL.style.width = lisWidth(oUL);
        }
        pu.style.background = clorun('#aa2116', '#1d953f');
        cap.production(Minfor.ages[1], cduliH);
        dishap();
    }
    //一个值对的时程接入
    function zfvalue(value1, value2, k1, k2) {
        if (Minfor.perc <= 0.5) {
            return ((value2 - value1) * k1);
        } else {
            return (value2 - (value2 - value1) * k2);
        }
    }

    /*
    局部时间轴整合并返回每个时间轴对应的值*/

    function comAxiss() {
        var a = [],
            ag = [];
        for (var i = 0; i < arguments.length; i++) {
            ag = arguments[i]
            if ((Minfor.perc >= ag[0]) && (Minfor.perc <= ag[1])) {
                a[i] = partAxis(ag[0], ag[1]);
            } else if (Minfor.perc < ag[0]) {
                a[i] = 0;
            } else if (Minfor.perc > ag[0]) {
                a[i] = 1;
            }
        }
        return a;
    }
    //局部时间轴模型
    function partAxis(t1, t2) {
        // if (Minfor.perc <= t1) {
        //     return 0;
        // } else if (Minfor.perc >= t2) {
        //     return 1;
        // }else if ((Minfor.perc > t1) &&( Minfor.perc < t2)) {
        return Math.round((Minfor.perc - t1) * 100 / (t2 - t1)) / 100;
    }

    // function lPercentStep() {}
    //变换的时间和周期的比（进度比）

    //颜色渐变输出
    function clorun(clor0, clor1) {
        var a = Math.round((parseInt(clor1.slice(1, 3), 16) - parseInt(clor0.slice(1, 3), 16)) * Minfor.perc) + parseInt(clor0.slice(1, 3), 16);
        var b = Math.round((parseInt(clor1.slice(3, 5), 16) - parseInt(clor0.slice(3, 5), 16)) * Minfor.perc) + parseInt(clor0.slice(3, 5), 16);
        var c = Math.round((parseInt(clor1.slice(5, 7), 16) - parseInt(clor0.slice(5, 7), 16)) * Minfor.perc) + parseInt(clor0.slice(5, 7), 16);
        return '#' + a.toString(16) + b.toString(16) + c.toString(16);
    }

    /*
    下面是旋转模组
    */
    //-----------------------------------------------------------
    //样式//率控变形模型
    //-----------------------------------------------------------
    var styleNode = document.createElement('style');
    document.head.appendChild(styleNode);
    var spanW = document.getElementById('fspan').offsetWidth;

    function dishap() {
        // uwrap.style.visibility = 'visible';
        if (Minfor.perc == 0) {
            uwrap.style.visibility = 'hidden';
        } else {
            uwrap.style.visibility = 'visible';
        }
        styleNode.innerHTML = '#uwrap{-webkit-transform:rotateY(' + (90 - 90 * Minfor.perc) + 'deg) rotateZ(' + (-20 + 20 * Minfor.perc) + 'deg);}' +
            '#uwrap span:nth-child(odd){margin-right:' + (-(1 - Math.cos((90 - 90 * Minfor.ages[0]) * Math.PI / 180)) * spanW) + 'px;border-left: solid red 1px ;}' +
            '#uwrap span:nth-child(even){margin-left:' + (-(1 - Math.cos((90 - 90 * Minfor.ages[0]) * Math.PI / 180)) * spanW) + 'px;border-right: solid red 1px ;}' +
            '#uwrap>:nth-child(odd) span:nth-child(odd),#uwrap>:nth-child(even) span:nth-child(even){-webkit-transform:rotateY(' + (90 - 90 * Minfor.ages[0]) + 'deg);}' +
            '#uwrap>:nth-child(odd) span:nth-child(even),#uwrap>:nth-child(even) span:nth-child(odd){-webkit-transform:rotateY(' + (90 * Minfor.ages[0] - 90) + 'deg);}' +
            '#uwrap>:nth-child(2){-webkit-transform:translateZ(' + cap.objs[0].transZ + 'px) translateY(' + cap.objs[0].transY + 'px) rotateX(' + cap.objs[0].angleX + 'deg);}' +
            '#uwrap>:nth-child(3){-webkit-transform:translateZ(' + cap.objs[1].transZ + 'px) translateY(' + cap.objs[1].transY + 'px) rotateX(' + cap.objs[1].angleX + 'deg);}' +
            '#uwrap>:nth-child(4){-webkit-transform:translateZ(' + cap.objs[2].transZ + 'px) translateY(' + cap.objs[2].transY + 'px) rotateX(' + cap.objs[2].angleX + 'deg);}' +
            '#uwrap>:nth-child(5){-webkit-transform:translateZ(' + cap.objs[3].transZ + 'px) translateY(' + cap.objs[3].transY + 'px) rotateX(' + cap.objs[3].angleX + 'deg);}';

    }

    // 联动对外对内值栈
    // 对象类函数
    function Liva(n) {
        this.nth = n;
        this.angleX = 0;
        this.angleL = 0;
        this.vx = 0;
        this.yL = 0;
        this.zL = 0;
        this.transY = 0;
        this.transZ = 0;
    }

    // 构造数据生产车间
    // n是产生对象的个数，v是率差，tk是时间行程率,maxL是峰量
    function CapZoom(n, v) {
        this.n = n;
        this.objs = [];
        this.pipz = 1;
        this.pipy = 0;
        for (var i = 0; i < n; i++) {
            this.objs[i] = new Liva(i);
            this.objs[i].vx = v * (n - i);
            if (i % 2 == 0) {
                this.objs[i].angleX = 180;
                this.objs[i].angleL = -180;
            } else {
                this.objs[i].angleX = 0;
                this.objs[i].angleL = 45;
            }
        }
    }
    CapZoom.prototype.production = function(tk, maxL) {
        for (var j = 0, os = this.objs; j < os.length; j++) {
            if (j % 2 == 0) {
                os[j].angleX = 180 + Math.round(os[j].angleL * (tk));
            } else {
                os[j].angleX = Math.round(os[j].angleL * Math.sin(((tk) * 180) * Math.PI / 180));
            }
            //控制角度阀值
            if (os[j].angleX < 0) {
                os[j].angleX = 0;
            } else if (os[j].angleX > 180) {
                os[j].angleX = 190;
            }

            if (j == 0) {
                this.pipy = 0;
                this.pipz = 0;
            }

            os[j].transY = -(this.pipy);
            os[j].transZ = this.pipz;

            if (os[j].angleX <= 90) {

                os[j].yL = maxL * (1 - Math.cos(os[j].angleX * Math.PI / 180));
                os[j].zL = maxL * Math.sin(os[j].angleX * Math.PI / 180);

            } else if (os[j].angleX > 90) {

                os[j].yL = maxL * (1 - Math.cos(os[j].angleX * Math.PI / 180));
                os[j].zL = maxL * Math.sin(os[j].angleX * Math.PI / 180);

            }
            this.pipz += os[j].zL;
            this.pipy += os[j].yL;
        }
    }


    var cap = new CapZoom(4, 0.4);

    /*-----------上下切页-------------------*/

    var bodyer1 = document.getElementById('bodyer1');
    var button1 = document.getElementById('button1');

    button1.onclick = takePage;
    var neup = true;

    function takePage(evt) {
        var e = evt || window.event;
        if (neup) {
            bodyer1.style.marginTop = -bodyer1.offsetHeight + 'px';
            button1.style.transform = 'rotate(90deg)';
            neup = false;
        } else {
            bodyer1.style.display = 'block';
            bodyer1.style.marginTop = -bodyer1.offsetHeight + 'px'
            bodyer1.style.marginTop = '0';
            button1.style.transform = 'rotate(-90deg)';
            neup = true;
                rowN(imgcont, 160, 250, 'scle');
                clentH = winHeight;
        }
        bodyer1.addEventListener("webkitTransitionEnd", bd1tend);
    }
    var hide_tag;
    function bd1tend() {
        if (!neup) {
            hide_tag=true;
            // hide_tag=setTimeout(function(){bodyer1.style.display = 'none';}, 1200); 
        }else{
            hide_tag=false;
            // clearTimeout(hide_tag);
        }
    }
    /*-----------上下切页结束+-------------------*/
    /*菜单内部子模型*/
    var menuc = document.getElementById('menucon');
    var dts = menuc.getElementsByTagName('dt');

    function lisWidth(oul) {
        if (oul.hasChildNodes()) {
            var iW = 0;
            var maxi = 0;
            for (var k = 0, aLi = oul.childNodes; k < aLi.length; k++) {
                if (aLi[k].offsetWidth) {
                    maxi < aLi[k].offsetWidth && (maxi = aLi[k].offsetWidth);
                    iW += aLi[k].offsetWidth;
                }
            }
            if (iW / 2 + maxi <= oul.parentNode.offsetWidth) {
                return oul.parentNode.offsetWidth + 'px';
            } else {
                return iW / 2 + 34 + 'px';
            }
        } else {
            return '0px';
        }
    }


    var clk = false,
        prevCp = '',
        prevFp = '',
        showTF;
    uwrap.onclick = function(evt) {
        var e = evt || window.event;
        if (e.target.nodeName == 'SPAN') {
            var spans;
            var thisCp = e.target.parentNode;
            if (thisCp != prevCp) {
                if (prevCp !== '') {
                    clk = true;
                    spans = prevCp.getElementsByTagName('span');
                    for (var s = 0; s < spans.length; s++) {
                        spans[s].style.background = '#f47920';
                    }
                }

                clk = true;
                spans = thisCp.getElementsByTagName('span');
                for (var s = 0; s < spans.length; s++) {
                    spans[s].style.background = '#7fb80e';
                }

            } else {
                if (clk) {
                    clk = false;
                    spans = thisCp.getElementsByTagName('span');
                    for (var s = 0; s < spans.length; s++) {
                        spans[s].style.background = '#f2eada';
                    }

                } else {
                    clk = true;
                    spans = thisCp.getElementsByTagName('span');
                    for (var s = 0; s < spans.length; s++) {
                        spans[s].style.background = '#7fb80e';
                    }
                }
            }
            if (clk) {
                prevCp = thisCp;
            }
        }
    }

    uwrap.onmouseover = function(evt) {
        var e = evt || window.event;
        if (e.target.nodeName == 'SPAN') {
            boxShow(e.target.parentNode, e.target.parentNode.parentNode);
            var spanses;
            var thisFp = e.target.parentNode;
            if (clk) {
                if (thisFp != prevFp) {
                    spanses = prevFp.getElementsByTagName('span');
                    if (prevFp == prevCp) {
                        for (var s = 0; s < spanses.length; s++) {
                            spanses[s].style.background = '#7fb80e';
                        }
                    } else {
                        for (var s = 0; s < spanses.length; s++) {
                            spanses[s].style.background = '#f47920';
                        }
                    }
                }
            } else {
                if (prevFp != '') {
                    spanses = prevFp.getElementsByTagName('span');
                    for (var s = 0; s < spanses.length; s++) {
                        spanses[s].style.background = '#f47920';
                    }
                }
            }
            prevFp = thisFp;
            spanses = prevFp.getElementsByTagName('span');
            for (var s = 0; s < spanses.length; s++) {
                spanses[s].style.background = '#f2eada';
            }


        }

    }

    var statO = '';

    function boxShow(tarm, tars) {
        var chars = '';
        var owersps;
        sunbox.innerHTML = '';
        tars.appendChild(sunbox);
        sunbox.style.display = 'block';
        sunbox.style.width = uwrap.offsetWidth + 'px';
        sunbox.style.height = '100%';
        owersps = tarm.getElementsByTagName('span');
        for (var j = 0; j < owersps.length; j++) {
            chars += owersps[j].textContent;
        }

        for (var i = 0; i < dts.length; i++) {
            if (dts[i].textContent == chars) {
                statO = dts[i].nextSibling.nextSibling.getElementsByTagName('ul')[0];
                oUL = statO.cloneNode(true);
                if (Minfor.perc < 1) {
                    sunbox.style.display = 'none';
                } else {
                    sunbox.style.display = 'block';
                    sunbox.appendChild(oUL);
                    oUL.style.width = lisWidth(oUL);
                }
                break;
            }
        }
    }

    uwrap.onmouseout = function(evt) {
        var e = evt || window.event;
        var parbox;
        var spans;
        if (checkHover(e, this)) {
            parbox = sunbox.parentNode;
            parbox.removeChild(sunbox);
            spans = prevFp.getElementsByTagName('span');
            if (clk && prevFp == prevCp) {
                for (var s = 0; s < spans.length; s++) {
                    spans[s].style.background = '#7fb80e';
                }
            } else {
                for (var s = 0; s < spans.length; s++) {
                    spans[s].style.background = '#f47920';
                }
            }
            if (clk) {
                boxShow(prevCp, prevCp.parentNode);
            }
        }

    }

    function resetMenue(tarz) {
        var lis = statO.childNodes;
        for (var i = 0; i < lis.length; i++) {
            if (lis[i].textContent == tarz.textContent) {
                statO.replaceChild(tarz.cloneNode(true), lis[i]);
                // alert(lis[i].style.backgroundColor);只有DOM内部支持的属性才随着克隆进行了传递，自定义属性不能通过这种方式传递。
                break;
            }

        }

    }
    //---这个函数用于检查一个对象是否被包含在我们的触发对象里面------------
    function contains(parentNode, childNode) {
        if (parentNode.contains) {
            return parentNode != childNode && parentNode.contains(childNode);
        } else {
            return !!(parentNode.compareDocumentPosition(childNode) & 16);
        }
    }

    function checkHover(e, target) {
        if (getEvent(e).type == "mouseover") {
            return !contains(target, getEvent(e).relatedTarget || getEvent(e).fromElement) && !((getEvent(e).relatedTarget || getEvent(e).fromElement) === target);
        } else {
            return !contains(target, getEvent(e).relatedTarget || getEvent(e).toElement) && !((getEvent(e).relatedTarget || getEvent(e).toElement) === target);
        }
    }

    function getEvent(e) {
        return e || window.event;
    }
    //----------------------alert(arguments[0]=='getAttr');--------------------------------------------------------------------------------------------------------------------------------------------------标签控制------------------------------------------------------------------------
    // 
    function dobjCase() { //参数0为执行的操作类型，参数1为操作的对象，参数2为操作的属性，参数3为对属性值的操作（可变）

        if (!(arguments[0] == 'setAttr' || arguments[0] == 'getAttr' || arguments[0] == 'deleteAttr')) {
            alert('docase(...)参数不匹配');
            return;
        }
        if (!(arguments[1] instanceof Object)) {
            alert('需要操作对象')
        }
        if (!(typeof(arguments[2]) == "string")) {
            alert('需要操作属性')
        }
        if (arguments[0] == 'setAttr' && (arguments[3] == undefined || arguments[3] == null)) {
            alert('缺少属性值');
            return;
        }

        if (arguments[0] == 'setAttr') {
            arguments[1][arguments[2]] = arguments[3];
            return
        }
        if (arguments[0] == 'getAttr') {
            return arguments[1][arguments[2]];
        }
        if (arguments[0] == 'deleteAttr') {
            delete arguments[1][arguments[2]];
            return;
        }

    }

    var datacase = {};
    var three = document.getElementById('three');
    var icounter = 0;
    sunbox.onclick = function(evt) {
        var e = evt || window.event;
        if (e.target.nodeName == 'LI') { //点击的是sunbox内部的li才进行动作
            e.target.className = e.target.nodeName + '_' + e.target.textContent + '_' + prevFp.textContent;
            if (!dobjCase('getAttr', datacase, e.target.className)) { //触发状态:待击状态 undefined或者false
                e.target.style.backgroundColor = 'red';
                if (dobjCase('getAttr', datacase, e.target.className) == undefined) { //标签蓝是否存在此次目标的副本:没有
                    //向篮子添加此次目标的克隆
                    var theLi = e.target.cloneNode(true);
                    theLi.style.backgroundColor = '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
                    // theLi.style.opacity = "0.5";
                    mods[icounter].appendChild(theLi);
                    refreshMod(mods);
                    var di = e.target.cloneNode(true);
                    throwing(e.target, mods[icounter], di);
                    icounter++;
                } else { //标签蓝是否存在此次目标的副本:有
                    //改变篮子里对应的此标签的颜色
                    three.getElementsByClassName(e.target.className)[0].style.backgroundColor = 'red';
                }
                dobjCase('setAttr', datacase, e.target.className, true);
            } else { //触发状态:占击状态
                //恢复背景色,恢复篮子里对应的此标签的颜色
                e.target.style.backgroundColor = 'yellow';
                three.getElementsByClassName(e.target.className)[0].style.backgroundColor = 'yellow';
                dobjCase('setAttr', datacase, e.target.className, false);
            }
            //克隆置换到静态数据模块
            resetMenue(e.target);
        }
    }

    three.onclick = function(evt) {
            var e = evt || window.event;
            if (e.target.nodeName == 'LI') { //点击的是three内部的li才进行动作
                var str = '';
                if (dobjCase('getAttr', datacase, e.target.className)) {
                    dobjCase('setAttr', datacase, e.target.className, false);
                    str = e.target.className.split('_').slice(-1);
                    e.target.style.backgroundColor = 'yellow';
                    if (clk) {
                        if (statO.parentNode.previousSibling.previousSibling.textContent == str) {
                            sunbox.getElementsByClassName(e.target.className)[0].style.backgroundColor = 'yellow';
                        }
                    } else {
                        if (statO.parentNode.previousSibling.previousSibling.textContent == str) {
                            sunbox.getElementsByClassName(e.target.className)[0].style.backgroundColor = 'yellow';
                        }
                    }

                } else {
                    dobjCase('setAttr', datacase, e.target.className, true);
                    str = e.target.className.split('_').slice(-1);
                    e.target.style.backgroundColor = 'red';
                    if (clk) {
                        if (statO.parentNode.previousSibling.previousSibling.textContent == str) {
                            sunbox.getElementsByClassName(e.target.className)[0].style.backgroundColor = 'red';
                        }
                    }

                }

                for (var i = 0; i < dts.length; i++) {
                    if (dts[i].textContent == str) {
                        var data_o = dts[i].nextSibling.nextSibling.getElementsByTagName('ul')[0].childNodes;
                        for (var j = 0; j < data_o.length; j++) {
                            if (data_o[j].textContent == e.target.textContent) {
                                dts[i].nextSibling.nextSibling.getElementsByTagName('ul')[0].replaceChild(e.target.cloneNode(true), data_o[j]);
                                break;
                            }
                        }
                        break;
                    }
                }
            }
        }
        //--------------------------------------------------------------------------------------------------------------------------

    /*-----------------------------------------------电表轮组模型-------------------------------------------------------*/
    // 模拟预置模子队列
    var mods = [];

    function initMods(rowNum, celes) {
        var sums = (rowNum + 2) * celes;
        if (sums <= 0) {
            return;
        }
        var itmsh = 0;
        for (var i = 0; i < sums; i++) {
            var item = document.createElement('div');
            // var zv=Math.random()*10;
            // item.style.webkitTransform='translateZ('+zv+'px)';
            var j = i % (rowNum + 2);
            var cel = Math.floor(i / (rowNum + 2)) + 1;
            if (j == 0) {
                itmsh = 0;
                // item.textContent='头行-'+cel+'列';
            }
            // else if(j+1==rowNum+2){
            //     // item.textContent=i+'末行-'+cel+'列';
            // }else{
            //     // item.textContent=j+'行-'+cel+'列';
            // }
            three.appendChild(item);
            item.style.top = (itmsh) * item.offsetHeight + itmsh * 2 + 'px';
            itmsh += 1;
            if (mods[i - rowNum - 2]) {
                item.style.left = mods[i - rowNum - 2].offsetWidth + mods[i - rowNum - 2].offsetLeft + 4 + 'px';
            }
            mods[i] = item;
        }
    }
    initMods(2, 18);

    function refreshMod(mod) {
        for (var i = 0; i < mods.length; i++) {
            if (mods[i - 4]) {
                mods[i].style.left = mods[i - 4].offsetWidth + mods[i - 4].offsetLeft + 4 + 'px';
            }
        }

    }

    /*-奇偶异向齿轮轮盘模组结构模型↓----------------------------------------------------------------------------------------------------------------------*/
    var vvh = 0;
    var stepL = 0;
    three.onmousewheel = function(evt) {
        var e = evt || event;
        if (e.deltaY > 0) {
            vvh = mods[0].offsetHeight + 1;
        } else {
            vvh = -mods[0].offsetHeight - 1;
        }
        wheeler(e, 2, 18);
    }

    var temps = [];

    function wheeler(e, rowNum, celeNum) {
        var sums = (rowNum + 2) * celeNum;
        if (sums <= 0) {
            return;
        }
        var rega = '',
            regb = '';
        var brefs = [];
        var tempEle1 = '',
            tempEle2 = '';
        for (var i = 0; i < mods.length; i++) {
            var j = i % (rowNum + 2);
            var cel = Math.floor(i / (rowNum + 2)) + 1;
            // mods[i].style.backgroundColor='#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
            // mods[i].style.webkitTransform='translateZ('+Math.random()*4+'px)';
            // 纵向关系
            if (cel % 2 == 1) {
                if (e.deltaY > 0) { //奇列上面的模子挪到下面
                    mods[i].style.top = mods[i].offsetTop - vvh - 1 + 'px';
                    if (j == 0) {
                        mods[i].style.top = mods[i + rowNum + 1].offsetTop + 'px'; //加一像素平衡掉误差 
                    }
                } else { //奇列下面的模子挪到上面
                    mods[i].style.top = mods[i].offsetTop - vvh + 1 + 'px';
                    if (j == rowNum + 1) {
                        mods[i].style.top = mods[i - rowNum - 1].offsetTop - mods[i].offsetHeight - 2 + 'px';
                    }
                }
            } else {
                if (e.deltaY > 0) { //偶列下面的模子挪到上面
                    mods[i].style.top = mods[i].offsetTop + vvh + 1 + 'px';
                    if (j == rowNum + 1) {
                        mods[i].style.top = mods[i - rowNum - 1].offsetTop - mods[i].offsetHeight - 2 + 'px';
                    }
                } else { //偶列上面的模子挪到下面
                    mods[i].style.top = mods[i].offsetTop + vvh - 1 + 'px';
                    if (j == 0) {
                        mods[i].style.top = mods[i + rowNum + 1].offsetTop + 'px'; //减一像素平衡掉误差          
                    }

                }
            }
        }
        // //数组重排 以映射当前这一轮的结构调整，为下一轮做好准备
        for (var i = 0; i < mods.length; i++) {
            var j = i % (rowNum + 2);
            var cel = Math.floor(i / (rowNum + 2)) + 1;
            if ((cel % 2 == 1 && e.deltaY > 0) || (cel % 2 == 0 && e.deltaY < 0)) { //上面的模子挪到下面
                if (j != rowNum + 1) {
                    brefs[i] = mods[i + 1];
                } else {
                    brefs[i] = mods[i - rowNum - 1];
                }
            } else { //下面的模子挪到上面
                if (j != rowNum + 1) {
                    brefs[i + 1] = mods[i];
                } else {
                    brefs[i - rowNum - 1] = mods[i];
                }
            }
        }
        mods = brefs;
        //单独循环一次做一次横向上的排布 算法待优化侵入一次循环执行
        for (var i = 0; i < mods.length; i++) {
            var cel = Math.floor(i / (rowNum + 2)) + 1;
            if (cel != 1) {
                mods[i].style.left = mods[i - rowNum - 2].offsetLeft + mods[i - rowNum - 2].offsetWidth + 2 + 'px';
            }
        }
    }

    // -------------------------------------↑------------------------------------------------------------------------------------------------------------------------------抛物线运动↓-----------------------------------------------------------------------------------------
    function throwing(obj1, obj2, csObj) {
        var vx = 100;
        var pos1 = obj1.getBoundingClientRect();
        var pos2 = obj2.getBoundingClientRect();
        var m = pos2.left;
        var n = pos2.bottom;
        var x1 = pos1.left;
        var y1 = pos1.bottom;
        var x2 = x1 + 2 * ((m - vx) - x1);
        var a = (y1 - n) / ((m - x1) * (m - x2));
        var x = x1;
        var t = 40;
        var vv = (m - x1) / t;
        obj2.style.visibility = 'hidden';
        csObj.style.position = 'absolute';
        csObj.style.zIndex = '10';
        csObj.style.backgroundColor = 'yellow';
        csObj.style.fontSize = '0.5em';
        document.body.appendChild(csObj);
        dothrow(x, vv, y1, a, x1, x2, csObj, m, obj2);
        //顶点到目标点的偏移量X轴上的偏移量vx
        // alert('m='+m+'---n='+n+'----x1='+x1+'---y1='+y1);
    }

    function dothrow(x, v, b, a, x1, x2, consolObj, targeto, tarObj) {
        throwID = requestAnimationFrame(function() {
            dothrow(x, v, b, a, x1, x2, consolObj, targeto, tarObj);
        });
        x += v;
        var y = -a * (x - x1) * (x - x2) + b - 20;
        if (x <= targeto) {
            consolObj.style.left = x + 'px';
            consolObj.style.top = y + 'px';
        } else {
            document.body.removeChild(consolObj);
            tarObj.style.visibility = 'visible';
            cancelAnimationFrame(throwID);
        }
    }
    /*--------------数据模拟-------------------*/
    /*数据池*/
    var attrcom = (function() { //属性库
        var els = menuc.getElementsByTagName('LI');
        var str = [];
        for (var i = 0; i < els.length; i++) {
            str.push(els[i].childNodes[0].nodeValue);
        }
        /*混合节点采集文本内容的操作
         for (var j = 0; j < els[i].childNodes.length; j++) {
            if(els[i].childNodes[j].nodeName=="#text"){
                console.log(els[i].childNodes[j].nodeValue);
            }
        }*/
        return str;
    })();

    var pictures = {}; //图库
    pictures.ponter = 0;
    pictures.lib = (function(loadurl) {
        var baseurl = loadurl;
        var dirs = [];
        for (var i = 0; i < 7; i++) {
            dirs.push(baseurl + '00' + (i + 1) + '.png');
        }
        return dirs;
    })('images/ready/');
    pictures.geter = function() {

            var picture = pictures.lib[pictures.ponter];
            pictures.ponter++;
            if (pictures.ponter == pictures.lib.length) {
                pictures.ponter = 0;
            }
            return picture;
        }
        // console.log(pictures.geter());
        // console.log(pictures);

    function partattrs(n, otrcom) { //采集属性
        if (n > otrcom.length) {
            alert('索取个数大于属性栈长度');
            n = otrcom.length;
        }
        var a = []; //存放采集的值
        var b = []; //存放采集的索引
        var k = Math.floor(Math.random() * n + 1); //需要采集的个数范围
        for (var i = 0; i < k; i++) { //采集
            var r = Math.floor(Math.random() * attrcom.length); //每次采集更新一个随机索引
            var flag = 0;
            do {
                for (var i = 0; i < b.length; i++) { //检查是否是是采集过的索引
                    if (b[i] == r) {
                        flag = 1; //有雷同
                        break;
                    }
                }
                if (!flag) { //无雷同
                    a[a.length] = otrcom[r];
                    b[b.length] = r;
                } else {
                    r = Math.floor(Math.random() * attrcom.length);
                }
            } while (!flag);
        }
        return a;
    }

    function dateValue() { //数据对象装配
        var obj = {};
        obj.feature = partattrs(10, attrcom);
        obj.uring = pictures.geter();
        return obj;
    }
    //数据池初始化
    var dataPool = (function(n) {
        var obj = [];
        for (var i = 0; i < n; i++) {
            obj.push(dateValue());
            // eval('obj.' + 'id' + i + '=' + 'dateValue()');
        }
        return obj;
    })(100);
    // console.log(dataPool);
    //声明查询数据池
    var serchPool = [];
    var sercher=serchPool;
    function intoSCP(tills, sc) { //根据属性查找对象
        if (sc != sercher) {
            return false;
        }
        sercher=[];
        if (tills.length == 0) {
            sercher = dataPool;
            // alert('yuan');
        } else {
            for (var i = 0; i < dataPool.length; i++) {//源数据池遍历
                var tag=false;
                // console.log(dataPool[i]);
                for (var j = 0; j < dataPool[i].feature.length; j++) {//遍历源数据池中每个数据项每个属性
                    // console.log(dataPool[i].feature.length);
                    for (var k = 0; k < tills.length; k++) {
                        if (tills[k] && tills[k] == dataPool[i].feature[j]) {
                            sercher.push(dataPool[i]);
                            tag=true;
                            break;
                        }
                    }
                    if(tag){break};
                }
            }
        }
        serchPool=sercher;
    }

    var serchtill=[];
    // serchtill=['苏菜','闽菜','下酒菜','沙拉','欧洲','重叠特色','煲仔饭','烩饭','寿司','炒饼','凉面','饺子','窝头','发糕','汉堡','馕','蛋糕','吐司','马卡龙','果酒','饮料'];
    // serchtill = [];
    intoSCP(serchtill, serchPool);

    // alert(serchPool);
    /*-----------------------------------------------------------------------------*/
    /*瀑布流初始化 及瀑布流响应式绘制排版*/
    var imgcont = document.getElementById('imgs'); //imgs预置好高度和出血的容器。
    //初始化函数
    function rowN(cont, L, cutL, consolmod) { //计算布局格式和样式并设置样式
        var n = Math.floor((cont.offsetHeight - cutL) / L); //容器高度减去出血高度再除于预定控高得可划分为多少行
        if (n == 0) {
            n = 1;
        }
        var n_h = Math.floor((cont.offsetHeight - cutL) / n); //满充时实际行高
        if (!document.getElementById('hty')) {
            var htyle = document.createElement('style');
            htyle.id = 'hty';
            document.head.appendChild(htyle);
        } else {
            var htyle = document.getElementById('hty');
        }
        htyle.innerHTML = '#imgs .imgc,#imgs img{height:' + n_h + 'px}';

        //自适应后重置重绘给相关参数
        mod=consolmod;
        imggrop = cont;
        rto_n = n;
        rto_n_h = n_h;
        miner = 0;
        jrg = [];
        setTimeout(eval('peanter(imggrop, inum, rto_n, rto_n_h, miner, jrg, mod)'), 500);
        // peanter(imggrop, inum, rto_n, rto_n_h, miner, jrg, mod);
    }

    //容器高度减去出血除于预定图行高度（160px）向下取整数，为图行数。在可用高度除行数，得实际图行高。  
    //下面一组声明用于保存渲染状态，多次调用可以连续绘制。
    var ocsouse = serchPool; //渲染的直接数据来源.
    var imggrop = imgcont; //渲染的目标。
    var inum = 0; //容器渲染了的子元素的记数（位置）。
    var rto_n = 0; //当前行总数。
    var rto_n_h = 0; //当前行高
    var miner = 0; //开始渲染的起始参照X方向的位置。
    var jrg = []; //随时状态最后一列的每行的最右界。
    var ptag = 0;
    var mod = 'init';
    var showedele = [];
    picshow(serchPool, imgcont);
    setTimeout(function() {
        rowN(imggrop, 160, 250, mod)
    }, 100); 
    function picshow(sPool, target_vessel) {
        for (var n = 0; n < sPool.length; n++) {
            var obj = sPool[n];
            var d_iv = document.createElement('div');
            d_iv.className = 'imgc';
            target_vessel.appendChild(d_iv);
            d_iv.style = '';
            var i_mg = document.createElement('img');
            i_mg.src = obj.uring;
            i_mg.alt = ' ';
            d_iv.appendChild(i_mg);
            var u_d = document.createElement('ul');
            d_iv.appendChild(u_d);
            u_d.className = 'disc';
            for (var i = 0; i < obj.feature.length; i++) {
                var templi = document.createElement('li');
                u_d.appendChild(templi);
                templi.innerHTML = obj.feature[i];
            }
            var u_l = document.createElement('ul');
            d_iv.appendChild(u_l);
            u_l.className = 'btill';
            u_l.innerHTML = '<li>' + n + '</li><li><a href="javascript:;"></a></li>';
            d_iv.style.visibility='hidden';
        }
    }

    function peanter(con, nth, rows, row_h, rx, jarry, smod) {
        if (con != imggrop) {
            alert('需设置统一的显示容器');
            return;
        }
        var items = con.getElementsByTagName('div');
        var rth = 0;
        if (smod == 'init') {
            while (rx - con.scrollLeft < con.offsetWidth ) {
                if (items[nth] != undefined) {
                   var spont = items[nth]; 
                    for (var k = 0; k < rows; k++) {
                        if (jarry[k] <= rx) {
                            rx = jarry[k];
                            rth = k;
                        } else if (jarry[k] == undefined) {
                            rx = 0;
                            rth = k;
                            break;
                        }
                    }
                    spont.style.top = 150 + (row_h + 10) * rth + 'px';
                    spont.style.left = rx + 'px';
                    rx = jarry[rth] = rx + spont.offsetWidth + 2;
                    spont.style.visibility='visible';  
                    showedele.push(spont);
                    nth++;
                     inum=nth;
                    jrg=jarry;
                    miner=rx;
                } else {
                    return;
                }
            }
        } else {
            for (var u = 0; u < showedele.length; u++) { 
                for (var k = 0; k < rows; k++) {
                    if (jarry[k] <= rx) {
                        rx = jarry[k];
                        rth = k;
                    } else if (jarry[k] == undefined) {
                        rx = 0;
                        rth = k;
                        break;
                    }
                }
                showedele[u].style.top = 150 + (row_h + 10) * rth + 'px';
                showedele[u].style.left = rx + 'px';
                rx = jarry[rth] = rx + showedele[u].offsetWidth + 2;
                miner=rx;
                jrg=jarry;
            }
        }
          
    }

    /*-----------------------------------------------------------------------------*/
    var stepNumber = 0;
    imgcont.onmousewheel = function(evt) {
        var e = evt || window.event;
        if (e.deltaY > 0) {
            this.scrollLeft += 50;
            (function() {
                stepNumber += e.deltaY;
                if (stepNumber == 200) {
                    for (var i = 0; i < 10; i++) {
                        peanter(imggrop, inum, rto_n, rto_n_h, miner, jrg, 'init');
                    }
                    stepNumber = 0;
                }
            })();
        } else {
            this.scrollLeft -= 50;
        }
    }

    imgcont.onclick = function(evt) {
        var e = evt || window.event;
        //心形控制
        if (e.target.tagName == 'A') {
            window.etemp = e.target;
            if (e.target.className == 'a c') {
                e.target.className = 'b d';
            } else if (e.target.className == 'a d') {
                e.target.className = 'b c';
            } else if (e.target.className == 'b c') {
                e.target.className = 'a d';
                setTimeout("etemp.className='b d'", 300);
            } else if (e.target.className == 'b d') {
                e.target.className = 'a c';
                setTimeout("etemp.className='b c'", 300);
            }
        }
       
    }

    imgcont.addEventListener('mouseover', function(evt) {
        var e = evt || window.event;
        //心形控制
        if (e.target.tagName == 'A') {

            if (!e.target.className) {
                e.target.className = 'b c';
            }
            if (e.target.className == 'b c') {
                e.target.className = 'a c';
            } else if (e.target.className == 'b d') {
                e.target.className = 'a d';
            }
        }
        
    }, true);

    imgcont.addEventListener('mouseout', function(evt) {
        var e = evt || window.event;
        //心形控制
        if (e.target.tagName == 'A') {
            if (e.target.className == 'a c') {
                e.target.className = 'b c';
            } else if (e.target.className == 'a d') {
                e.target.className = 'b d';
            }
        }
        //心形控制结束
    }, true);

    //4，游尺，同步图区位移，互操作，响应滚轮，水平拖动游标，尺子现实长度为图区宽度，尺程为当前筛选条件的二阶缓存库单位总数，尺格数量为总数向上取整10分格，格长度按比例动态呈现，游标位置为当前图区第一个单元的位置。"url(../images/button/xin.svg)";

    //5，二阶缓存为临时缓存， 是本地数据增量加载之后的实时筛选数据。用于显示映射。

    //技术层面涉及瀑布流，预加载，懒加载，本地数据模拟模型，数据缓存模型，查询模拟（前端对查询的优化模拟）。
    //默认非查询触发的预置条件配置模型； 


    /*---------------------------------------------------------------------------*/
    /*-----------------------留言及评论交互----------------------------------------------*/
    //图片提供一个条形评论入口，可以针对当前图片主题发表评论，并通过玻璃窗滚动查看此主题评论板块（只提供有限数量的评论数据，但是提供一个评论追踪按钮，直接进入第二页相关评论主题入口）。
    //第二页→ 选项卡分页：①留言板，②商品主题评论板：主题组块入口及进入相关主题展开，及内分页 
    //分页模型。
    //仿用户--匿名模型。
    //时间戳模型。
    //热度数据模型支持。（热度属性，热度抽取算法，热度延展应用）
    /*--------------------------------------------------------------------*/
        var conbtn=document.getElementById("context");
        var ckbox=document.getElementById("gcbx");
            conbtn.innerHTML = "沉默死角";
        ckbox.onclick = function(){
            if(ckbox.checked == true){
                conbtn.innerHTML = "昨天";   
            }else{
                conbtn.innerHTML = "明天";   
            }
        }

};
