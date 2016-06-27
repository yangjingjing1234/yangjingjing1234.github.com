// JavaScript Document
window.onload=function (){
	
	var osearch=document.getElementById('search');
	var oBann1=document.getElementById('banner');
	var aAsign=getByClass('sign1',oBann1)
	var oBannc=document.getElementById('bannerC1');
	var aBannLi=oBannc.getElementsByTagName('li');
	var aABann=oBann1.getElementsByTagName('a');
	var oBann1Sign=getByClass('signAlert',oBann1)
	var oBann1Sign2=getByClass('sign2Alert',oBann1)
	var num=0;
	osearch.onfocus=function (){
		osearch.value="";
	};
	osearch.onblur=function (){
		osearch.value="请输入您要搜索的内容";
	};
	Tab ();
	oBann1.onmouseover=function (){
	
		clearTimeout(oBann1.timer);
		for(var i=0;i<aABann.length;i++){
			aABann[i].index=i;
			aABann[i].onmouseover=function (){
				removeClass(aABann[num],"tipsactive")	
				num=this.index;
				addClass(aABann[num],"tipsactive")
			doMove ( oBannc, 100, 'left', -990*num );		
			}
		}
	
	oBann1Sign[0].onclick=function (){
		
		num--;
		if(num==-1)num=aBannLi.length-1;
		doMove ( oBannc, 100, 'left', -990*num);
		for(var i=0;i<aABann.length;i++){
			removeClass(aABann[i],"tipsactive")	
		}
		addClass(aABann[num],"tipsactive")
	};
	oBann1Sign2[0].onclick=function (){
		
		num++;
		if(num==aBannLi.length)num=0;
		doMove ( oBannc, 100, 'left', -990*num );
		for(var i=0;i<aABann.length;i++){
			removeClass(aABann[i],"tipsactive")	
		}
		addClass(aABann[num],"tipsactive")
	};

	}
	
	oBann1.onmouseout=Tab;

	function Tab (){
		clearTimeout(oBann1.timer);
		oBann1.timer=setTimeout(function (){
		num++;
		if(num==aBannLi.length)num=0;
		doMove ( oBannc, 100, 'left', -990*num, Tab );
		for(var i=0;i<aABann.length;i++){
			removeClass(aABann[i],"tipsactive")	
		}
		addClass(aABann[num],"tipsactive")
		},1000)
	
	}
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
}


