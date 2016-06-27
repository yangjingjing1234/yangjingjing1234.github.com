// JavaScript Document
/*导航*/
var Adivnavigation=document.getElementById('divnavigation');
var AdivnavigationLi=Adivnavigation.getElementsByTagName('li');
var AdivnavigationSpan=Adivnavigation.getElementsByTagName('span');
var Adivsubmenu=document.getElementById('divsubmenu');
var AdivsubmenuP=Adivsubmenu.getElementsByTagName('P');
var Adivnavigationnum=0;
var AdivnavigationTime=null;
	/* 延时的菜单 */
	for(var i=0;i<AdivnavigationLi.length;i++){
		AdivnavigationLi[i].index=i;
		AdivsubmenuP[i].index=i;
		AdivnavigationLi[i].onmouseover=Adivnavigationshow;
		AdivnavigationLi[i].onmouseout=Adivnavigationhide;
		AdivsubmenuP[i].onmouseover=Adivnavigationshow;
		AdivsubmenuP[i].onmouseout=Adivnavigationhide;
	
	}
	
	function Adivnavigationshow(){
		clearInterval( AdivnavigationTime );
			for(var j=0;j<AdivnavigationLi.length;j++){
				AdivsubmenuP[j].style.display="none";
				AdivnavigationSpan[j].style.display="block";
					
			}
		AdivsubmenuP[this.index].style.display="block"	;
		AdivnavigationSpan[this.index].style.display="none";
	}
	function Adivnavigationhide(){
		AdivnavigationTime = setTimeout(function(){
				for(var j=0;j<AdivnavigationLi.length;j++){
				AdivsubmenuP[j].style.display="none";
				AdivnavigationSpan[j].style.display="block";		
				}
			AdivsubmenuP[Adivnavigationnum].style.display="block";
			AdivnavigationSpan[Adivnavigationnum].style.display="none";
			}, 500);
	}
/*end 导航*/
/* search 焦点*/
var Ahead=document.getElementById('Ahead');
var AheadSearch=getByClass('AheadSearch',Ahead);
var AsearchText=getByClass('searchText',Ahead);

  AsearchText[0].onfocus=function (){
	 	addClass(AheadSearch[0],'AheadSearchFocuse');
		AsearchText[0].value='';
	 	/*取消事件冒泡*/
	}

	AsearchText[0].onclick = function (ev){
		var ev = ev || event;
		ev.cancelBubble = true;
	}

	 AsearchText[0].onblur = document.onclick = function (){
		AsearchText[0].value='找到好音乐';
		removeClass(AheadSearch[0],'AheadSearchFocuse');
	}
	

/*  end search 焦点*/
/* 焦点图的 切换*/
/*getByClass得到的都为数组 要用数组的形式去用*/
var AfocusPicAltArr=["林宥嘉巡回演唱会上海站抢票中","MV音乐疯 清新可爱周","专辑首发：X战警 电影原声带","QQ音乐校园行河北站精彩回放","MV精选：要么瘦要么死","独家首发：《2014最美和声》第6场","绿钻LV8隆重登场","乐见大牌 金志文：我的作品不怕时间检验","MV精选：毕业季，最后一次狂欢夜","专辑首发：Fly To The Sky 震撼回归"];
var AfocusPicArr=["indeximg/focusPic1.jpg","indeximg/focusPic2.jpg","indeximg/focusPic3.jpg","indeximg/focusPic4.jpg","indeximg/focusPic5.jpg","indeximg/focusPic6.jpg","indeximg/focusPic7.jpg","indeximg/focusPic8.jpg","indeximg/focusPic9.jpg","indeximg/focusPic10.jpg"];
var AfocusDiv=document.getElementById('divimgplay');
var AfocusPic=getByClass('AfocusPic',AfocusDiv);
var AfocusH2=getByClass('AfocustitleH2',AfocusDiv);
var AfocusPrev=getByClass('Prev',AfocusDiv);
var AfocusNext=getByClass('Next',AfocusDiv);
var AfocusList=getByClass('AfocusList',AfocusDiv);
var AfocusListLi=AfocusList[0].getElementsByTagName('li');
var Afocusnum=0;

	function AutoPlay (){/* 焦点图的自动轮播 */
	AfocusPic.timer=setInterval(function (){
		Afocusnum++;
		Afocusnum%=AfocusListLi.length;
		AfocusTab ();
		},1000)
	}
	AutoPlay ();
	
	AfocusDiv.onmouseover = function () { clearInterval( AfocusPic.timer ); };
	AfocusDiv.onmouseout =function (){ AutoPlay ();}
	
	AfocusPrev[0].onclick=function (){
		Afocusnum--;
		if ( Afocusnum == -1 ) {
		Afocusnum = AfocusListLi.length-1;
		}
		AfocusTab ();
		return false;/* 取消A标签的默认跳转*/
	};
	AfocusNext[0].onclick=function (){
		Afocusnum++;
		if ( Afocusnum == AfocusListLi.length ) {
			Afocusnum = 0;
		}
		AfocusTab ();
		return false;/* 取消A标签的默认跳转*/
	};
	for(var i=0;i<AfocusListLi.length;i++){
		AfocusListLi[i].index=i;
		AfocusListLi[i].onmouseover=function (){
			Afocusnum=this.index;
			AfocusTab ();	
		};
	}
	function AfocusTab (){/* 焦点图的切换 */
		
		AfocusPic[0].src=AfocusPicArr[Afocusnum];
		
		AfocusH2[0].innerHTML=AfocusPicAltArr[Afocusnum];
			for(var i=0;i<AfocusListLi.length;i++){
				AfocusListLi[i].className="";
			}
		AfocusListLi[Afocusnum].className="current";	
		}
/* 焦点图的 切换*/
/*侧栏图片自动切换*/
var AsidefocusT=document.getElementById('divmodads');
var Asidefocus=document.getElementById('divimginfog_imgPlayer2');
var AsidefocusImgtu=Asidefocus.getElementsByTagName('img');
var AsidefocusDiv=document.getElementById('divpageinfog_imgPlayer2');
var AsidefocusAa=AsidefocusDiv.getElementsByTagName('a');
var AsidefocusImg=["indeximg/xiaoqiehuan.jpg","indeximg/xiaoqiehuan2.jpg","indeximg/xiaoqiehuan3.jpg","indeximg/xiaoqiehuan5.jpg"];

var AsidefocusTnum=0;
var AsidefocusStr='';

	for(var i=0;i<AsidefocusImg.length;i++){
		AsidefocusStr+='<a href="javascript:;" class='+(i?"":"current")+'>'+i+1+'</a>'
		//AsidefocusStr+='<a href="" >'+i+1+'</a>'
	}
	AsidefocusDiv.innerHTML=AsidefocusStr;
  function AutoPlay2 (){/* 焦点图的自动轮播 */
	AsidefocusT.timer=setInterval(function (){
		AsidefocusTnum++;
		AsidefocusTnum%=AsidefocusImg.length;
		AfocusTab2 ();
		},1000)
	}
	AutoPlay2 ();
	AsidefocusT.onmouseover = function () { clearInterval( AsidefocusT.timer ); };
	AsidefocusT.onmouseout =function (){ AutoPlay2 ();}
	function AfocusTab2 (){/* 焦点图的切换 */
	
		AsidefocusImgtu[0].src=AsidefocusImg[AsidefocusTnum];
			
			for(var i=0;i<AsidefocusImg.length;i++){
				AsidefocusAa[i].className="";
			}
		AsidefocusAa[AsidefocusTnum].className="current";	
		}
	for(var i=0;i<AsidefocusImg.length;i++){
		AsidefocusAa[i].index=i;
		AsidefocusAa[i].onmouseover=function (){
			AsidefocusTnum=this.index;
			AfocusTab2 ();	
		};
	}
/*侧栏图片自动切换*/
/* 在线首发 切换*/
var AFirstPicAltArr=[
["林宥嘉巡回演唱会上海站抢票中","MV音乐疯 清新可爱周","专辑首发：X战警 电影原声带","QQ音乐校园行河北站精彩回放","MV精选：要么瘦要么死","独家首发：《2014最美和声》第6场","绿钻LV8隆重登场","乐见大牌 金志文：我的作品不怕时间检验","MV精选：毕业季，最后一次狂欢夜","专辑首发：Fly To The Sky 震撼回归"],
["唱会上海站抢票中","MV音乐疯 清新可爱周","专辑首发：X战警 电影原声带","QQ音乐校园行河北站精彩回放","MV精选：要么瘦要么死","独家首发：《2014最美和声》第6场","绿钻","乐见大牌 金志文：我的作品不怕时间检验","毕业季，最后一次狂欢夜","专辑首发：Fly To The Sky 震撼回归"],
["抢票中","M 清新可爱周","发：X战警 电影原声带","QQ音乐校园行河北站精彩回放","MV精选：要么瘦要么死","独家首发：《2014最美和声》第6场","绿钻LV8隆重登场","乐见大牌 金志文：我的作品不怕时间检验","MV精选：毕业季，最后一次狂欢夜","Fly To The Sky 震撼回归"],
];
var AFirstPicName=[
["林宥嘉","X战警","QQ","MV","第6场","绿钻","金志文","毕业季","震撼回归","小文"],
["票中","MV爱周","原声带","精彩回放","要么死","独家首","绿钻","检验","狂欢夜","To The Sky"],
["抢中","M","声带","校回放","瘦死","美和声场","隆重登场","品不怕验","狂欢夜","震撼"],
];
var AFirstPicArr=[
["indeximg/first1.jpg","indeximg/AmodMv2.jpg","indeximg/first1.jpg","indeximg/first1.jpg","indeximg/AmodMv2.jpg","indeximg/first1.jpg","indeximg/first1.jpg","indeximg/first1.jpg","indeximg/AmodMv2.jpg","indeximg/first1.jpg"],
["indeximg/AmodMv2.jpg","indeximg/AmodMv2.jpg","indeximg/AmodMv2.jpg","indeximg/first1.jpg","indeximg/first1.jpg","indeximg/AmodMv2.jpg","indeximg/first1.jpg","indeximg/first1.jpg","indeximg/AmodMv2.jpg","indeximg/first1.jpg"],
["indeximg/first1.jpg","indeximg/AmodMv2.jpg","indeximg/AmodMv2.jpg","indeximg/first1.jpg","indeximg/first1.jpg","indeximg/first1.jpg","indeximg/AmodMv2.jpg","indeximg/AmodMv2.jpg","indeximg/AmodMv2.jpg","indeximg/first1.jpg"]
];
var AFirstDiv=document.getElementById('AFimgplay');
var AFirstP=getByClass('AFirstPrev',AFirstDiv);
var AFirstN=getByClass('AFirstNext',AFirstDiv);
var AFirstUl=document.getElementById('divalbumlist');
var AFirstImg=AFirstUl.getElementsByTagName('img');
var AFirststr=getByClass('albumName',AFirstDiv);
var AFirststr2=getByClass('albumSinger',AFirstDiv);
var AFirstnum=0;

AFirstP[0].onclick=function (){
	AFirstnum--;
	if(AFirstnum==-1)AFirstnum=0;
	for(var i=0;i<AFirstPicArr[AFirstnum].length;i++){
		AFirstImg[i].src=AFirstPicArr[AFirstnum][i];
		AFirststr[i].innerHTML=AFirstPicAltArr[AFirstnum][i];
		AFirststr2[i].innerHTML=AFirstPicName[AFirstnum][i];
	}
	return false;/* 取消A标签的默认跳转*/
};
AFirstN[0].onclick=function (){
	
	AFirstnum++;
	
	if(AFirstnum==AFirstPicArr.length)AFirstnum=AFirstPicArr.length-1;
	
	for(var i=0;i<AFirstPicArr[AFirstnum].length;i++){
		
		AFirstImg[i].src=AFirstPicArr[AFirstnum][i];
		AFirststr[i].innerHTML=AFirstPicAltArr[AFirstnum][i];
		AFirststr2[i].innerHTML=AFirstPicName[AFirstnum][i];
	}
	return false;/* 取消A标签的默认跳转*/
};

/* 在线首发 切换*/
/* 官方推荐*/
var AmodRecommendtag=document.getElementById('divsongtag');
var AmodRecommendtagA=AmodRecommendtag.getElementsByTagName('li');
var AmodRecommendlist1=document.getElementById('divsonglist1');
var AmodRecommendlist2=document.getElementById('divsonglist2');

var AmodRecommendlist1Li=AmodRecommendlist1.getElementsByTagName('li');
var AmodRecommendlist2Li=AmodRecommendlist2.getElementsByTagName('li');
var AmodRecommendlist1A1=getByClass('recommendsinger0',AmodRecommendlist1);
var AmodRecommendlist1A2=getByClass('recommendsinger',AmodRecommendlist1);
var AmodRecommendlist1Span=getByClass('count',AmodRecommendlist1);
var AmodRecommendlist1listCp=getByClass('listCp',AmodRecommendlist1);
var AmodRecommendlist2Span=getByClass('count',AmodRecommendlist2);
var AmodRecommendlist2listCp=getByClass('listCp',AmodRecommendlist2);
var AmodRecommendDate=[[
	{"1":"爸爸去哪儿(《爸爸去哪儿》主题曲)","2":"华语群星","3":"54321"},
	{"1":"虹之间(电视剧《爱情公寓4》插","2":"金贵晟","3":"54321"},
	{"1":"终于等到你(电视剧《咱们结婚吧》主题曲)","2":"张靓颖","3":"54321"},
	{"1":"爸爸去哪儿(《爸爸去哪儿》主题曲)","2":"华语群星","3":"54321"},
	{"1":"虹之间(电视剧《爱情公寓4》插","2":"金贵晟","3":"54321"},
	{"1":"终于等到你(电视剧《咱们结婚吧》主题曲)","2":"张靓颖","3":"54321"},
	{"1":"爸爸去哪儿(《爸爸去哪儿》主题曲)","2":"华语群星","3":"54321"},
	{"1":"虹之间(电视剧《爱情公寓4》插","2":"金贵晟","3":"54321"},
	{"1":"终于等到你(电视剧《咱们结婚吧》主题曲)","2":"张靓颖","3":"54321"},
	{"1":"爸爸去哪儿(《爸爸去哪儿》主题曲)","2":"华语群星","3":"54321"},
	{"1":"虹之间(电视剧《爱情公寓4》插","2":"金贵晟","3":"54321"},
	{"1":"终于等到你(电视剧《咱们结婚吧》主题曲)","2":"张靓颖","3":"54321"}
	],
	[
	{"1":"눈,코,입(Eyes, Nose, Lips眼,鼻,嘴)","2":"太阳","3":"7754321"},
	{"1":"여전히 뜨겁게(依然炙热)","2":"여전히 뜨겁","3":"7754321"},
	{"1":"이젠 너 없이도","2":"유나킴","3":"54321"},
	{"1":"Give It To Me(기변투미)","2":"N.S允智","3":"7754321"},
	{"1":"여전히 뜨겁게(依然炙热)","2":"여전히 뜨겁","3":"7754321"},
	{"1":"이젠 너 없이도","2":"유나킴","3":"54321"},
	{"1":"눈,코,입(Eyes, Nose, Lips眼,鼻,嘴)","2":"太阳","3":"7754321"},
	{"1":"여전히 뜨겁게(依然炙热)","2":"여전히 뜨겁","3":"7754321"},
	{"1":"이젠 너 없이도","2":"유나킴","3":"54321"},
	{"1":"눈,코,입(Eyes, Nose, Lips眼,鼻,嘴)","2":"太阳","3":"7754321"},
	{"1":"여전히 뜨겁게(依然炙热)","2":"여전히 뜨겁","3":"7754321"},
	{"1":"이젠 너 없이도","2":"유나킴","3":"7754321"}
	],
	[
	{"1":"Thirsty","2":"Mariah Carey","3":"5432122"},
	{"1":"Money Can't Buy","2":"Ne-Yo","3":"5432122"},
	{"1":"Ryu Can Do It","2":"CNBLUE","3":"5432122"},
	{"1":"Thirsty","2":"Mariah Carey","3":"5432122"},
	{"1":"Money Can't Buy","2":"Ne-Yo","3":"5432122"},
	{"1":"Ryu Can Do It","2":"CNBLUE","3":"5432122"},
	{"1":"Thirsty","2":"Mariah Carey","3":"5432122"},
	{"1":"Money Can't Buy","2":"Ne-Yo","3":"5432122"},
	{"1":"Ryu Can Do It","2":"CNBLUE","3":"5432122"},
	{"1":"Thirsty","2":"Mariah Carey","3":"5432122"},
	{"1":"Money Can't Buy","2":"Ne-Yo","3":"5432122"},
	{"1":"Ryu Can Do It","2":"CNBLUE","3":"5432122"}
	]
]

	for(var i=0;i<AmodRecommendtagA.length;i++){
		AmodRecommendtagA[i].index=i;
		AmodRecommendtagA[i].onclick=function (){
			for(var m=0; m<AmodRecommendDate[this.index].length;m++){
				AmodRecommendlist1A1[m].innerHTML=AmodRecommendDate[this.index][m]['1'];
				AmodRecommendlist1A2[m].innerHTML=AmodRecommendDate[this.index][m]['2'];
				AmodRecommendlist1Span[m].innerHTML=AmodRecommendDate[this.index][m]['3'];
			}
	
			
			for(var j=0;j<AmodRecommendtagA.length;j++){
				removeClass(AmodRecommendtagA[j],'current');
			}
			addClass(this,'current');
			return false;/* 取消A标签的默认跳转*/
		};
		
	}
	show2(AmodRecommendlist1Li,AmodRecommendlist1listCp,AmodRecommendlist1Span);
	show2(AmodRecommendlist2Li,AmodRecommendlist2listCp,AmodRecommendlist2Span);
	function show2(obj,obj1,obj2){
		for(var i=0;i<obj.length;i++){
			obj[i].index=i;
			obj[i].onmouseover=function (){
		
				obj1[this.index].style.display="block";
				obj2[this.index].style.display="none";
			};
			obj[i].onmouseout=function (){
				obj1[this.index].style.display="none";
				obj2[this.index].style.display="block";
			};
			
		}
	}

	var ASidetopsongTag=document.getElementById('topsongTag');
	var ASidetopsongTagLi=ASidetopsongTag.getElementsByTagName('li');
	var ASidetopsongList=document.getElementById('topSongList');
	var ASidetopsongTagimg=ASidetopsongList.getElementsByTagName('img')[0];
	var ASidetopsongListA1=getByClass('recomsidesinger',ASidetopsongList);
	var ASidetopsongListA2=getByClass('recomsidesinger1',ASidetopsongList);
	var ASidetopsongTagimgarr=["indeximg/liuxing.jpg","indeximg/liuxing0.jpg","indeximg/liuxing1.jpg","indeximg/liuxing2.jpg","indeximg/liuxing3.jpg"]
	var ASidetopsongTagarr=[[{"1":"永远","2":"张靓颖"},{"1":"With You (feat. EPIK HIGH)","2":"周笔畅"},{"1":"爱情呼救999","2":"弦子"},{"1":"大象舞台(Elephant Slide)","2":"林宥嘉"},{"1":"阴天快乐","2":"陈奕迅"},{"1":"最后的泪滴","2":"孙子涵"},{"1":"无朋友","2":"李克勤"},{"1":"这不是我(电视剧《爱上两个我》片尾曲)","2":"炎亚纶"},{"1":"1분 1초(1分1秒)","2":"朴智妍"},{"1":"A Sky Full of Stars","2":"Coldplay"}
],
[{"1":"一点一滴","2":"羽泉"},{"1":"一点一滴","2":"羽泉"},{"1":"一点一滴","2":"羽泉"},{"1":"一点一滴","2":"羽泉"},{"1":"一点一滴","2":"羽泉"},{"1":"一点一滴","2":"羽泉"},{"1":"一点一滴","2":"羽泉"},{"1":"一点一滴","2":"羽泉"},{"1":"一点一滴","2":"羽泉"},{"1":"一点一滴","2":"羽泉"}
],
[
{"1":"阴天快乐","2":"陈奕迅"},{"1":"阴天快乐","2":"陈奕迅"},{"1":"阴天快乐","2":"陈奕迅"},{"1":"阴天快乐","2":"陈奕迅"},{"1":"阴天快乐","2":"陈奕迅"},{"1":"阴天快乐","2":"陈奕迅"},{"1":"阴天快乐","2":"陈奕迅"},{"1":"阴天快乐","2":"陈奕迅"},{"1":"阴天快乐","2":"陈奕迅"},{"1":"阴天快乐","2":"陈奕迅"}
],
[
	{"1":"With You (feat. EPIK HIGH)","2":"hello"},{"1":"With You (feat. EPIK HIGH)","2":"hello"},{"1":"With You (feat. EPIK HIGH)","2":"hello"},{"1":"With You (feat. EPIK HIGH)","2":"hello"},{"1":"With You (feat. EPIK HIGH)","2":"hello"},{"1":"With You (feat. EPIK HIGH)","2":"hello"},{"1":"With You (feat. EPIK HIGH)","2":"hello"},{"1":"With You (feat. EPIK HIGH)","2":"hello"},{"1":"With You (feat. EPIK HIGH)","2":"hello"},{"1":"With You (feat. EPIK HIGH)","2":"hello"}
],
[{"1":"永远","2":"张靓颖"},{"1":"永远","2":"张靓颖"},{"1":"永远","2":"张靓颖"},{"1":"永远","2":"张靓颖"},{"1":"永远","2":"张靓颖"},{"1":"永远","2":"张靓颖"},{"1":"永远","2":"张靓颖"},{"1":"永远","2":"张靓颖"},{"1":"永远","2":"张靓颖"},{"1":"永远","2":"张靓颖"}
],
[
{"1":"1분 1초(1分1秒)","2":"朴智妍"},{"1":"1분 1초(1分1秒)","2":"朴智妍"},{"1":"1분 1초(1分1秒)","2":"朴智妍"},{"1":"1분 1초(1分1秒)","2":"朴智妍"},{"1":"1분 1초(1分1秒)","2":"朴智妍"},{"1":"1분 1초(1分1秒)","2":"朴智妍"},{"1":"1분 1초(1分1秒)","2":"朴智妍"},{"1":"1분 1초(1分1秒)","2":"朴智妍"},{"1":"1분 1초(1分1秒)","2":"朴智妍"},{"1":"1분 1초(1分1秒)","2":"朴智妍"},{"1":"1분 1초(1分1秒)","2":"朴智妍"}
]]
	for(var i=0;i<ASidetopsongTagLi.length;i++){
		ASidetopsongTagLi[i].index=i;
		ASidetopsongTagLi[i].onclick=function (){
			for(var m=0; m<ASidetopsongTagarr[this.index].length;m++){
				ASidetopsongListA1[m].innerHTML=ASidetopsongTagarr[this.index][m]['1'];
				ASidetopsongListA2[m].innerHTML=ASidetopsongTagarr[this.index][m]['2'];
			}
	
			ASidetopsongTagimg.src=ASidetopsongTagimgarr[this.index];
			for(var j=0;j<ASidetopsongTagLi.length;j++){
				removeClass(ASidetopsongTagLi[j],'current');
			}
			addClass(this,'current');
			return false;/* 取消A标签的默认跳转*/
		};
		
	}				
/* 官方推荐*/
/*返回顶部*/
var oAdivvisitorcp = document.getElementById('divvisitorcp');

/* 左侧固定定位的移动 */
var btntop=document.getElementById('btntop');
var divplayer=document.getElementById('divplayer');
var btnbottom=document.getElementById('btnbottom');
var iH = Math.max(document.body.offsetHeight, view().h, document.body.scrollHeight);
var Atimer=null;
	
window.onscroll=window.onresize= function(){

	if( isIe6() ){
	
		oAdivvisitorcp.style.top = view().h*0.7 + scrollY() + 'px';	
		divplayer.style.top= view().h-divplayer.offsetHeight + scrollY() + 'px';
	}
                                                                    	
};

	btntop.onmouseover=function (){
		 bodyMove (1,0)	
	};
	btnbottom.onmouseover=function (){
	
		bodyMove (1,iH-view().h )	
	
	};
	btntop.onmouseout=btnbottom.onmouseout=function (){
		clearInterval( Atimer );
		};
function bodyMove ( dir,target ) {
	

	dir = scrollY() < target ? dir : -dir;
	
	clearInterval( Atimer );
	
	Atimer = setInterval(function () {
		var speed =scrollY() + dir;			// 步长
		if ( speed > target && dir > 0 ||  speed < target && dir < 0  ) {
			speed = target;
		}
		document.body.scrollTop = document.documentElement.scrollTop = speed;  /*加单位坑死人*/
		
		if ( speed == target ) {
			clearInterval(Atimer );	
		}
		
	}, 30);
}
btntop.onclick = function(){
	document.body.scrollTop = document.documentElement.scrollTop = 0;	
};
btnbottom.onclick=function (){

	document.body.scrollTop = document.documentElement.scrollTop = iH-view().h;
		
}

/*end  返回顶部*/
/* 右侧固定定位的隐藏与显示*/
var divplayer=document.getElementById('divplayer');
var btnfold=document.getElementById('btnfold');
function autoshou(){
	if(!divplayer.onoff){/*隐藏为真  展开为假  展开的时候（鼠标不再上面）才会一秒钟后自动收缩*/
	  divplayer.timer1=setTimeout(function (){
		doMove(divplayer,50,'left',-540,function (){
			divplayer.onoff=true;
				
		})
		},2000)
	}
}
autoshou();

divplayer.onmouseover=function (){
	clearTimeout( divplayer.timer1 );
}
divplayer.onmouseout=function (){
	autoshou();
}
btnfold.onclick=function (){

	if(divplayer.onoff){
	doMove(divplayer,50, 'left', 0,function (){
		divplayer.onoff=false;
		removeClass(divplayer,'m_player_folded')
		 btnfold.title="点击收起"
		} )	
	}else if(!divplayer.onoff){
	doMove(divplayer,50, 'left',-540,function (){
		divplayer.onoff=true;
		 addClass(divplayer,'m_player_folded');
		 btnfold.title="点击展开"
		} )	
	}	
};

function play (){}
/* end 右侧固定定位的隐藏与显示*/
/*弹窗*/

var oTanchuang = document.getElementById('tanchuang');
var oAmask = document.getElementById('AmodLoginmask');
var oAbox = document.getElementById('AmodLoginbox');
var oAmodLoginboxclose = document.getElementById('AmodLoginboxclose');
var ologintab = document.getElementById('logintab');
var AbtnLogin=getByClass('btn_login',ologintab);

	AbtnLogin[0].onclick=function (){
		oTanchuang .style.display='block';
		tanchaung ();
		return false;
	}
	oAmodLoginboxclose.onclick=function (){
		oTanchuang .style.display='none';
	}
var iH2 = Math.max(offsetH(), view().h, scrollH());

oAmask.style.height = iH + 'px';

bind(window,'load',tanchaung);
bind(window,'resize',tanchaung);
bind(window,'scroll',tanchaung); 
function tanchaung (){
	
	var iLeft = ( view().w - oAbox.offsetWidth ) / 2;
	var iTop = ( view().h - oAbox.offsetHeight ) / 2;
	
	if( isIe6() )iTop += scrollY();
	
	oAbox.style.left = iLeft + 'px';
	oAbox.style.top = iTop + 'px';
	
};
function offsetH(){
	return document.body.offsetHeight;	
}
function scrollH(){
	return document.body.scrollHeight;	
}
/*弹窗*/