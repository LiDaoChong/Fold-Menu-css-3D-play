// JavaScript Document
window.onload = function(){
	mv.app.toTip();
	mv.app.banner();
	mv.app.toSel();
	mv.app.tomov();
};

var mv = {};

mv.tools = {};

mv.ui = {};

mv.ui.textChange = function (obj,str){
	obj.onfocus = function(){
		if(this.value == str){
			this.value = '';
		}
	};
	obj.onblur = function(){
		if(this.value == ''){
			this.value = str;
		}
	};
};

mv.ui.toShow = function(obj,timesp,vspeed){
	var value = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(
		function(){
			if(value < 100){
				value = value + vspeed;
				obj.style.opacity=value/100;
				obj.style.filter = 'alpha(opacity='+value+')';
			}else{
				clearInterval(obj.timer);
			}
			
		},timesp);	
};

mv.ui.toHide = function(obj,timesp,vspeed){
		var value = 100;
		clearInterval(obj.timer);
		obj.timer = setInterval(
			function(){
				if(value >0){
					value = value - vspeed;
					obj.style.opacity=value/100;
					obj.style.filter = 'alpha(opacity='+value+')';
				}else{
					clearInterval(obj.timer);
				}	
			},timesp);	                          
};

mv.app = {};

mv.app.toTip = function(){
	var oText1 = document.getElementById('text1');
	var oText2 = document.getElementById('text2');
	mv.ui.textChange(oText1,'Seach WebSite');
	mv.ui.textChange(oText2,'Seach WebSite');
};

mv.app.banner = function(){
	var oAd = document.getElementById('ad');
	var oLi = oAd.getElementsByTagName('li');
	oLi[0].style.opacity=1;
	oLi[0].style.filter = 'alpha(opacity='+100+')';
	for(var i=1;i<oLi.length;i++){
		oLi[i].style.opacity=0;
		oLi[i].style.filter = 'alpha(opacity='+0+')';
	}
	var inow = 0;
	var timer = setInterval(auto,3000);
	function auto(){
		
		mv.ui.toHide(oLi[inow],50,5);
		if(inow < oLi.length-1){
			inow++;
		}else{
			inow = 0;
		}
		mv.ui.toShow(oLi[inow],50,5);
	}
	function autoprev(){
		
		mv.ui.toHide(oLi[inow],50,5);
		if(inow > 0){
			inow--;
		}else{
			inow = oLi.length-1;
		}
		mv.ui.toShow(oLi[inow],50,5);
	}
	
	var prevbtn = document.getElementById('previm');
	var nextbtn = document.getElementById('nextim');
	var prev_bg = document.getElementById('prev_bg');
	var next_bg = document.getElementById('next_bg');
	
	
	prev_bg.onmouseover = prevbtn.onmouseover = function(){
			prevbtn.style.display = 'block';
			clearInterval(timer);
		};
	next_bg.onmouseover = nextbtn.onmouseover = function(){
			nextbtn.style.display = 'block';
			clearInterval(timer);
		};
	prev_bg.onmouseout = prevbtn.onmouseout =  function(){
			prevbtn.style.display = 'none';
			timer = setInterval(auto,3000);
		};
	next_bg.onmouseout = nextbtn.onmouseout = function(){
			nextbtn.style.display = 'none';
			timer = setInterval(auto,3000);
		};
	prevbtn.onclick = function(){
			autoprev();
		};
	nextbtn.onclick = function(){
			auto();
		};
};

mv.app.toSel = function(){
	var oSel = document.getElementById('sort');
	var oDd = oSel.getElementsByTagName('dd');
	var oUl = oSel.getElementsByTagName('ul');
	for(var i=0;i<oDd.length;i++){
		oDd[i].index = i;
		oDd[i].onclick = function(ev){
			var ev = ev||window.event;
			ev.cancelBubble = true;
			var This = this;
			for(var j=0;j<oUl.length;j++){
				oUl[j].style.display= 'none';
			}
			oUl[this.index].style.display= 'block';
			document.onclick = function(){
				oUl[This.index].style.display= 'none';
			};	
			var oLi = oUl[this.index].getElementsByTagName('li');
			for(var k=0;k<oLi.length;k++){
				oLi[k].onclick = function(ev){
					ev = ev||window.event;
					ev.cancelBubble = true;
					(oDd[This.index].getElementsByTagName('h2'))[0].innerHTML=this.innerHTML;
					oUl[This.index].style.display= 'none';
				};
			}
		};
	}
};

mv.app.tomov = function(){
	var leftBtn = document.getElementById('la');
	var rightBtn = document.getElementById('ra');
	var handler = document.getElementById('handler');
	var hUl = handler.getElementsByTagName('ul')[0];
	var vLength = 0;
	
	leftBtn.onclick = function(){
		clearInterval(timer);
		var timer = setInterval(
			function(){
				if(vLength<208){
					hUl.style.marginLeft = (hUl.offsetLeft - 2)+'px';
					vLength += 2;
				}else{
					clearInterval(timer);
					vLength = 0;
				}
			},10);
	};
	rightBtn.onclick = function(){
		clearInterval(timer);
		var timer = setInterval(
			function(){
				if(vLength<208){
					hUl.style.marginLeft = (hUl.offsetLeft + 2)+'px';
					vLength += 2;
				}else{
					clearInterval(timer);
					vLength = 0;
				}
			},10);
	};
};