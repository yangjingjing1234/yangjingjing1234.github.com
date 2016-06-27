// JavaScript Document
 //1.获取元素
function $( v ){ 
	if( typeof v === 'function' ){
		window.onload = v;
	} else if ( typeof v === 'string' ) {
		return document.getElementById(v);
	} else if ( typeof v === 'object' ) {
		return v;
	}
}
//2.获取元素身上的style属性
function getStyle( obj, attr ) { 
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj, false)[attr];
}


//3.让obj的attr属性以每次dir的步伐朝 target目标数移动，函数可有可无
function doMove ( obj, dir, attr, target, endFn ) {

	dir = parseInt(getStyle( obj, attr )) < target ? dir : -dir;
	
	clearInterval( obj.timer );
	
	obj.timer = setInterval(function () {
		
		var speed = parseInt(getStyle( obj, attr )) + dir;			// 步长
		
		if ( speed > target && dir > 0 ||  speed < target && dir < 0  ) {
			speed = target;
		}
		
		obj.style[attr] = speed + 'px';
		
		if ( speed == target ) {
			clearInterval( obj.timer );
			
			/*
			if ( endFn ) {
				endFn();
			}
			*/
			endFn && endFn();
			
		}
		
	}, 30);
}

//4.让obj的透明度以每次num步伐朝target目标变换（0-100的透明度）
function opacity(obj , num , target , endFn) {
	
	num = (getStyle(obj, 'opacity')||1)*100 < target ? num : -num;
	
	clearInterval( obj.alpha );
	
	obj.alpha = setInterval(function() {
		
		var speed = (getStyle(obj, 'opacity')||1)*100 + num;
		
		if ( speed < target && num < 0 || speed > target && num > 0 ) {
			
			speed = target;
		
		}

		obj.style.opacity = speed / 100;
		obj.style.filter = "alpha(opacity: "+speed+")";
		
		if ( speed == target ) {
			clearInterval( obj.alpha );
			if(typeof endFn === 'function')endFn();
		}
		
	}, 20);
}

//5.让obj以attr属性方向抖动
function shake(obj, attr, endFn) {
	var arr = [];
	var num = 0;
	var pos = parseInt(getStyle(obj, attr));	
	// 这个值每次进来都会改变，必须限制只能存一次，否则会脱离原来的轨迹
	
	if(!obj.pos){ //限制只能存一次。
		obj.pos = pos;
	}
	
	for ( var i=20; i>0; i-=2 ) {
		arr.push(i, -i);
	}
	arr.push(0);
	clearInterval( obj.shake );
	obj.shake = setInterval(function() {
		obj.style[attr] = obj.pos + arr[num] + 'px';
		num ++;
		if ( num == arr.length ) {
			clearInterval( obj.shake );
			endFn && endFn();
		}
	}, 50);
}

/* 求 100 个 从 0 ~ 1000 之间的随机不重复 数字。*/

function getNum(){ //100

	var arr = [];
	var json = {};
	
	while( arr.length < 100 ){
		
		var iNum = Math.round( Math.random()*1000 );

		if( !json[iNum] ){
			
			json[iNum] = 1;
			arr.push( iNum );
		
		}
		
	}
	return arr;
	
}
// 数组的Indexof方法 arr数组的  什么内容   从第几位开始查找  默认为0；
function fnIndexOf(arr,num,index){
	
	index = index || 0;
	
	for(var i=index; i<arr.length; i++){
	
		if( arr[i] === num )return i;
		
	}
	
	return -1;
	
}
/*  obj的DOM节点的封装函数 parentNode 父级节点只有一个 没有兼容性 而且是元素节点 不用封装 直接用   */
function getPrev( obj ){  /* 上一元素类的个兄弟节点  */
	
	if(!obj||!obj.previousSibling)return null;
	
	return obj.previousSibling.nodeType === 1 ? obj.previousSibling : getPrev( obj.previousSibling ); 
	
}

function getNext( obj ){   /* 下一个元素类的兄弟节点  */
	
	if(!obj||!obj.nextSibling)return null;
	
	return obj.nextSibling.nodeType === 1 ? obj.nextSibling : getNext( obj.nextSibling ); 
	
}

function getFirst( obj ){  /* 第一个元素类的子节点  */
	
	if(!obj||!obj.firstChild)return null;
	
	return obj.firstChild.nodeType === 1 ? obj.firstChild : getNext( obj.firstChild ); 
	
}

function getLast( obj ){  /* 最后一个元素类的子节点  */
	
	if(!obj||!obj.lastChild)return null;
	
	return obj.lastChild.nodeType === 1 ? obj.lastChild : getPrev( obj.lastChild ); 
	
}

/*当有定位父级时计算改元素到定位父级的距离left，top,当无定位父级时。计算元素到body或者HTML的距离（有差异），因此body默认样式重置很重要,*/
/* obj脱离文档流时本身要有定位属性，否则兼容性很麻烦。获取元素的绝对位置，始终是到body或HTML的距离（当body默认样式重置时两者一样），这种方法扩展性好 调用方法：var iTop =getPos(obj).t */
function getPos( obj ){
	
	var aPos = {l: 0, t: 0};
	
	while( obj ){
		
		aPos.l += obj.offsetLeft;
		aPos.t += obj.offsetTop;
		
		obj = obj.offsetParent;
		
		if(obj){
			aPos.l += getStyle(obj,'borderLeftWidth');
			aPos.t += getStyle(obj,'borderTopWidth');
		}
		
	}
	
	return aPos;
}

/* 用ClassName来选择元素 某个元素下面的className 而且可能这个元素的ClassName可能有多个 因此要用数组.调用方法：var arr = getByClass('active',oUl);*/
function getByClass(sClass,parent){
	
	var aEles = (parent||document).getElementsByTagName('*');
	var arr = [];
	
	for(var i=0; i<aEles.length; i++){
		
		var aClass = aEles[i].className.split(' ');
	
		for(var j=0; j<aClass.length; j++){
			
			if( aClass[j] == sClass ){
			
				arr.push( aEles[i] );	
				break;
				
			}
			
		}
		
	}
	
	return arr;
	
}
/* 删除某个ClassName*/
function removeClass(obj,sClass){
	
	if(!obj.className)return;
	
	var aClass = obj.className.split(' ');
	
	for(var i=0; i<aClass.length; i++){
		if( aClass[i] === sClass ){
			aClass.splice(i,1);
			obj.className = aClass.join(' ');
			return;
		}			
	}
	
}
/* 添加某个ClassName 已经有的就不会重复添加*/
function addClass(obj,sClass){
	
	if(!obj.className){		
		obj.className = sClass;
		return;	
	}
	
	var aClass = obj.className.split(' ');
	
	for(var i=0; i<aClass.length; i++){
		if( aClass[i] === sClass )return;			
	}

	obj.className += ' ' + sClass;	
	
}

/* 封装一个函数，判断元素有没有指定的className。	有 ：返回 true  没有 ： 返回 false. */
function hasClass(obj,sClass){

	if(!obj.className)return false;
	
	var aClass = obj.className.split(' ');
	
	for(var i=0; i<aClass.length; i++){
	
		if(aClass[i] === sClass)return true;	
		
	}
	
	return false;
}




/* 判断是否是IE6 */
function isIe6(){
	// 'msie 6'
	var str = window.navigator.userAgent.toLowerCase();
	
	if( str.indexOf('msie 6') != -1)return true;
	
	return false;
	
}
//可视区的宽度 高度 alert( view().h );
function view(){
	return {
		w : document.documentElement.clientWidth,
		h : document.documentElement.clientHeight
	};	
}
//滚动距离 ：页面滚动到可视区之外的距离。
function scrollY(){ //滚动高度
	return document.body.scrollTop || document.documentElement.scrollTop;
}

function scrollX(){ //滚动宽度
	return document.body.scrollLeft|| document.documentElement.scrollLeft;
}
/*给指定事件添加多个函数。 引用时事件无ON但是 要加单引号'click'*/
function bind(obj,ev,fn){
	
	if(obj.addEventListener){
		obj.addEventListener(ev,fn,false);
	}else{
		//obj.attachEvent('on'+ev,fn);	
		obj.attachEvent('on'+ev,function(){
			
			fn.call(obj);/* 把函数里的this修改为指定对象 */
				
		});	
	}
	
}