
var	gulp = require("gulp"),
	browsersync = require("browser-sync").create(),
	less = require("gulp-less"),
	rename = require("gulp-rename"),
	babel = require("gulp-babel"),
	clean = require("gulp-clean"),
	es2015 = require("babel-preset-es2015"),
	presetreact = require("babel-preset-react"),
	postcss= require("gulp-postcss"),
	px2rem = require("postcss-px2rem"),
	plumber = require("gulp-plumber"),
	webpack = require("webpack-stream"),
	changed = require("gulp-changed"),
	notify = require("gulp-notify"),
	// revCollector = require("gulp-rev-collector"),
	uglify = require("gulp-uglify"),
	tinypng = require("gulp-tinypng"),
	minifycss = require("gulp-clean-css"),
	// rev=require("gulp-rev"),
	runSequence = require("run-sequence"),
	wp = require("webpack"),
	imagemin = require("gulp-imagemin"),
	gulpif = require("gulp-if"),
	merge=require("gulp-concat");

var _env = gulp.env;

var envName='"development"';
var isDev=true;
if(_env._[0]=="release"){
	isDev = false;
	envName='"production"';
}
var _isPxToRem = _env.isflexible&&_env.isflexible=="true" || false;//移动开发下需要处理rem to px
var _isMobile = _env.ismobile&&_env.ismobile=="true" || false;//区分给website打包还是mobile

//mobile的配置文件和website的配置文件分开处理
var config;
if(_isMobile){
	config = require("./gulpconfig_mobile.json");
}else{
	config = require("./gulpconfig.json");
}

var PATH = config.path;
//console.log(PATH)
var selfNotify = notify.withReporter(function(options,callback){
	options.templateOptions={
		date:new Date()
	}
	callback();
});

gulp.task("clean",function(){
	return gulp.src([PATH.distJsPath+"**/*",PATH.distCssPath+"**/*.css",PATH.compileJsPath+"**/*.js",PATH.distImagePath+"**/*",PATH.compileRevPath+"**/*.json","!"+PATH.distJsPath+"fullavatar/*.js"],{read:false})
	//return gulp.src([PATH.distJsPath+"**/*.js",PATH.compileJsPath+"**/*.js"],{read:false})
	.pipe(plumber({errorHandler:notify.onError("Clean Error:<%=error.message %>")}))
	.pipe(clean({force:true}))
	.pipe(selfNotify({
		title:"Clean Css,Js,Image",
		message:"Clean task complete."
	}));
});
gulp.task("merge:js",function(){
	return gulp.src([PATH.sourceJsPath+"i18n/lang.js",PATH.sourceJsPath+"config/config.js"])
		.pipe(plumber({errorHandler:notify.onError("Merge Common Error:<%=error.message %>")}))
		.pipe(gulpif(isDev,changed(PATH.distJsPath,{extension:".js"})))
		.pipe(merge("common.js"))
		.pipe(gulpif(!isDev,uglify()))
		.pipe(gulp.dest(PATH.distJsPath))
		.pipe(selfNotify({title:"Merge Common to dist/js",message:"Merge common task complete."}));
})
gulp.task("js",function(){
	return gulp.src([PATH.sourceJsPath+"**/*.js","!"+PATH.sourceJsPath+"config/config.js","!"+PATH.sourceJsPath+"i18n/lang.js"])
		.pipe(plumber({errorHandler:notify.onError("JS Error:<%=error.message %>")}))
		.pipe(gulpif(isDev,changed(PATH.distJsPath,{extension:".js"})))
		//.pipe(gulpif(!isDev,uglify()))
		.pipe(gulp.dest(PATH.distJsPath))
		.pipe(selfNotify({title:"JS copy to dist/js",message:"JS copy task complete."}));
})
gulp.task("es6",function(){
    return gulp.src(PATH.sourceJsPath+"**/*.es6")
		.pipe(plumber({errorHandler:notify.onError("ES6 Error:<%=error.message %>")}))
		.pipe(gulpif(isDev,changed(PATH.compileJsPath,{extension:".js"})))
		.pipe(babel({"presets":[es2015]}))
		.pipe(gulp.dest(PATH.compileJsPath))
		.pipe(selfNotify({title:"ES6 to js and minify",message:"ES6 package task complete."}));
});

gulp.task("reactes6",["es6"],function(){
    return gulp.src(PATH.sourceJsPath+"jsx/*.jsx")
		.pipe(plumber({errorHandler:notify.onError("React ES6 Error:<%=error.message %>")}))
		.pipe(gulpif(isDev,changed(PATH.compileJsPath,{extension:".js"})))
		.pipe(babel({"presets":[presetreact,es2015]}))
		.pipe(gulp.dest(PATH.compileJsPath))
		.pipe(selfNotify({title:"React JSX (use ES6) to js and minify",message:"JSX package task complete."}));

});

gulp.task("less",function(){
	if(_isPxToRem){
		var processors = [px2rem({remUnit:75})];
		return gulp.src([PATH.sourceCssPath+"less/*.less","!"+PATH.sourceCssPath+"less/common/*.less","!"+PATH.sourceCssPath+"less/anims/*.less"])
			.pipe(plumber({errorHandler:notify.onError("Less Error:<%=error.message %>")}))
			.pipe(gulpif(isDev,changed(PATH.distCssPath,{extension:".css"})))
			.pipe(less())
			.pipe(postcss(processors))
			.pipe(gulpif(!isDev,minifycss()))
			.pipe(gulp.dest(PATH.distCssPath))
			.pipe(selfNotify({title:"Less to Css and minify",message:"CSS task complete."}));
	}else{
		return gulp.src([PATH.sourceCssPath+"less/*.less","!"+PATH.sourceCssPath+"less/common/*.less","!"+PATH.sourceCssPath+"less/anims/*.less"])
			.pipe(plumber({errorHandler:notify.onError("Less Error:<%=error.message %>")}))
			.pipe(gulpif(isDev,changed(PATH.distCssPath,{extension:".css"})))
			.pipe(less())
			.pipe(gulpif(!isDev,minifycss()))
			.pipe(gulp.dest(PATH.distCssPath))
			.pipe(selfNotify({title:"Less to Css and minify",message:"CSS task complete."}));
	}
});
gulp.task("image",function(){
	return gulp.src(PATH.sourceImagePath+"**")
	.pipe(plumber({errorHandler:notify.onError("Images Error:<%=error.message %>")}))
	.pipe(gulpif(isDev,changed(PATH.distImagePath)))
	.pipe(gulpif(!isDev,imagemin()))
	.pipe(gulp.dest(PATH.distImagePath))
	.pipe(selfNotify({title:"Images copy to dist",message:"Images copy task complete."}));
});
gulp.task("browsersync",function(){
	browsersync.init({
		// ui:{
		// 	port:80
		// },
		// server: {
		// 	baseDir: PATH.rootPath,
		// 	middleware: [
		// 		modRewrite(['^([^.]+)$ /index.html [L]'])
		// 	],
		//rewriteRules:[
		//{
		//	match:"/Cannot GET/g",
		//	fn:function(match){
		//		return "/";
		//	}
		//}]
		// },
		proxy:{
			target:"http://api.taotaole.local/activity/page_main?pid=10040413",
		}
	});
});
gulp.task("watch",function(){
	gulp.watch(PATH.sourceHtmlPath+"**/*.html",browsersync.reload);
	gulp.watch(PATH.sourceCssPath+"less/*.less",["less",browsersync.reload]);
	gulp.watch(PATH.sourceImagePath+"**",["image",browsersync.reload]);
	gulp.watch(PATH.sourceJsPath+"jsx/*.jsx",["reactes6","webpack",browsersync.reload]);
	gulp.watch(PATH.sourceJsPath+"**/*.es6",["es6","reactes6","webpack",browsersync.reload]);
	gulp.watch(PATH.sourceJsPath+"**/*.js",["js",browsersync.reload]);
	// gulp.watch([PATH.sourceJsPath+"i18n/lang.js",PATH.sourceJsPath+"config/config.js"],["merge:js",browsersync.reload]);
})
gulp.task("libs:build",function(){
	return gulp.src(PATH.sourceJsPath+"libs/*")
		.pipe(plumber({errorHandler:notify.onError("Js libs copy Error:<%=error.message%>")}))
		.pipe(gulp.dest(PATH.distJsPath+"libs/"))
		.pipe(selfNotify({title:"Js libs copy to dist",message:"Js libs copy task complete."}));
})
gulp.task("font:build",function(){
	return gulp.src(PATH.sourceFontPath+"**")
		.pipe(plumber({errorHandler:notify.onError("Font copy Error:<%=error.message%>")}))
		.pipe(gulp.dest(PATH.distFontPath))
		.pipe(selfNotify({title:"Font copy to dist",message:"Font copy task complete."}));
})
gulp.task("webpack",function(){

	return gulp.src(PATH.compileJsPath+"**/*.js")
		.pipe(plumber({errorHandler:notify.onError("Webpack Error:<%=error.message %>")}))
		.pipe(webpack({
			entry:{
				lib:["react","react-dom","jquery"],
				main:PATH.compileJsPath+"active.js",
			},
			output:{
        path:PATH.distJsPath,
        filename:"[name].js",
      },
      stats: {
          // Nice colored output
          colors: true
      },
			module:{
				loaders:[
					{test:require.resolve("jquery"),loader:"expose?jQuery"}
				]
			},
			plugins: [
				new wp.DefinePlugin({
					'process.env.NODE_ENV':envName,//production,development
				}),
				new wp.optimize.CommonsChunkPlugin("lib.js"),
		  ]
		}))
		.pipe(gulpif(!isDev,uglify()))
		.pipe(gulp.dest(PATH.distJsPath))
		.pipe(selfNotify({title:"Webpack",message:"Webpack task complete."}));
});

gulp.task("dev",["clean"],function(){
	runSequence(["less","font:build","reactes6","image","libs:build","js"],"watch","webpack","browsersync");
});
gulp.task("release",["clean"],function(){
	runSequence(["less","font:build","reactes6","libs:build","image","js"],"webpack");
})

gulp.task("default",["clean"],function(){
	gulp.start("dev");
});

// var APPKEY = "DkizKeUPgUeOrOn08-sJJn7i_GrmWKRa";
// gulp.task("image:release",function(){
// 		return gulp.src(PATH.sourceImagePath+"**")
// 		.pipe(changed(PATH.distImagePath))
// 		.pipe(plumber({errorHandler:notify.onError("Images Error:<%=error.message %>")}))
// 		// .pipe(tinypng(APPKEY))
// 		.pipe(imagemin())
// 		//.pipe(rev())
// 		//.pipe(gulp.dest(PATH.distImagePath))
// 		//.pipe(rev.manifest())
// 		//.pipe(gulp.dest(PATH.compileRevPath+"image/"))
// 		.pipe(gulp.dest(PATH.distImagePath))
// 		.pipe(selfNotify({title:"Image minify",message:"Image task complete."}));
// });
