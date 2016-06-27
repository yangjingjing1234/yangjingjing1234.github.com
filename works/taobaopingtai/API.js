// JavaScript Document

var aTxt = [
  [
    '最钩心的美食曝终极预告片 美食五大看点全揭秘',
    'MG面膜 再次席卷而来',
    '一见钟情的邂逅',
    '辣爸银幕成绩单',
    '可以免费看啦！'
  ],
  [
    ' 熬夜看球,不能没有美食&美酒的陪伴。但熬夜不来就对身体不好,美食和美酒更不可贪杯多吃',
    'MG让美丽停留杂我们渴望的时候，我们都应该喻。',
    '美食杰 - 中国最优质的美食，食谱，菜谱网。做你最喜爱的美食网，菜谱网。提供最人性化的菜谱大全,食谱家常菜，家常菜谱大全的美食网,让人们在宣泄的都市中体验在家常.',
    '又是一年父亲节，让我们看看美天的美食家们都为自己的父亲',
    '优秀的作品文品，你还没看呢？'
  ]
];

var aSrc = [
  'img/11.jpg',
  'img/22.jpg',
  'img/33.jpg',
  'img/4.jpg',
  'img/44.jpg'
];

var oBox = document.getElementById('Pictabbox');
console.log(oBox )
var oUl = oBox.getElementsByTagName('ul')[0];
var oDiv = oBox.getElementsByTagName('div')[1];
var oDt = oBox.getElementsByTagName('dt')[0];
var oDd = oBox.getElementsByTagName('dd')[0];
var aImg = oUl.getElementsByTagName('img');
var i = 0;

fn1();

function fn1(){
	
	setTimeout(function(){
		
		i++;
		i %= aSrc.length;
		
		aImg[1].src = aSrc[i];
		
		doMove(oDiv,10,'bottom',-80,function(){
		
			oDt.innerHTML = aTxt[0][i];
			oDd.innerHTML = aTxt[1][i];	
			
			doMove(oUl,20,'left',-500,function(){
			
				aImg[0].src = aSrc[i];
				oUl.style.left = '0px';
				doMove(oDiv,10,'bottom',0,fn1);
				
			});
			
		});
		
	},1000);
	
}

function getStyle( obj, attr ) { 
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj, false)[attr];
}

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
			
			endFn && endFn();
			
		}
		
	}, 30);
}