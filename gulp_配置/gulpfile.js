
var config = require("./gulplocation.json"),
	gulp = require("gulp"),
	browsersync = require("browser-sync").create(),
	less = require("gulp-less"),
	uglify = require("gulp-uglify"),
	rename = require("gulp-rename"),
	babel = require("gulp-babel"),
	clean = require("gulp-clean"),
	notify = require("gulp-notify"),
	es2015 = require("babel-preset-es2015"),
	presetreact = require("babel-preset-react"),
	minifycss = require("gulp-minify-css"),
	postcss= require("gulp-postcss"),
	px2rem = require("postcss-px2rem"),
	plumber = require("gulp-plumber"),
	webpack = require("webpack-stream"),
	wp = require('webpack'),
	//ExtractTextPlugin = require("extract-text-webpack-plugin"),
	changed = require("gulp-changed"),
	//rev = require("gulp-rev"),
	tinypng = require("gulp-tinypng");
	//modRewrite  = require('connect-modrewrite');



var PATH = config.path;

var selfNotify = notify.withReporter(function(options,callback){
	options.templateOptions={
		date:new Date()
	}
	callback();
});
gulp.task("clean",function(){
	return gulp.src([PATH.distJsPath+"**/*",PATH.distCssPath+"**/*.css",PATH.buildJsPath+"**/*"],{read:false})
	.pipe(plumber({errorHandler:notify.onError("Clean Error:<%=error.message %>")}))
	.pipe(clean({force:true}))
	.pipe(selfNotify({
		title:"Clean Css,Js,Image",
		message:"Clean task complete."
	}));
});

gulp.task("reactes6:compile",function(){
    return gulp.src(PATH.jsPath+"jsx/*.jsx")
		.pipe(changed(PATH.jsPath))
		.pipe(plumber({errorHandler:notify.onError("React ES6 Error:<%=error.message %>")}))
		.pipe(babel({"presets":[presetreact,es2015]}))
		.pipe(gulp.dest(PATH.buildJsPath))
		.pipe(webpack({
			entry:{main:PATH.buildJsPath+"index.js"},
			output:{
	        path:PATH.distJsPath,
	        filename:"[name].js",
	      },
      stats: {
          // Nice colored output
          colors: true
      }
		}))
		.pipe(gulp.dest(PATH.distJsPath))
		.pipe(selfNotify({title:"React JSX (use ES6) to js and minify",message:"JSX package task complete."}));
});

gulp.task("es6:compile",function(){
    return gulp.src(PATH.jsPath+"jsx/*.es6")
		//.pipe(changed(PATH.jsPath+"**/*.es6"))
		.pipe(plumber({errorHandler:notify.onError("ES6 Error:<%=error.message %>")}))
		.pipe(babel({"presets":[es2015]}))
		.pipe(gulp.dest(PATH.distJsPath))
		.pipe(selfNotify({title:"ES6 to js and minify",message:"ES6 package task complete."}));
});

gulp.task("less:compile",function(){

		// if(_isPxToRem){
			var processors = [px2rem({remUnit:75})];
			return gulp.src([PATH.cssPath+"less/*.less","!"+PATH.cssPath+"less/{common,public}.less"])
				.pipe(plumber({errorHandler:notify.onError("Less Error:<%=error.message %>")}))
				.pipe(less())
				.pipe(postcss(processors))
				
				.pipe(gulp.dest(PATH.distCssPath))

				.pipe(gulp.dest(PATH.distCssPath))
				.pipe(selfNotify({title:"Less to Css and minify",message:"CSS task complete."}));
		// }else{
			// return gulp.src([PATH.cssPath+"less/*.less","!"+PATH.cssPath+"less/{common,public}.less"])
			// 	.pipe(plumber({errorHandler:notify.onError("Less Error:<%=error.message %>")}))
			// 	.pipe(less())
			// 	.pipe(gulp.dest(PATH.distCssPath))
			// 	.pipe(gulp.dest(PATH.distCssPath))
			// 	.pipe(selfNotify({title:"Less to Css and minify",message:"CSS task complete."}));
		// }
	
});

gulp.task("browsersync",function(){
	browsersync.init({
		server:{baseDir:PATH.rootPath}
	});
});
gulp.task("watch",function(){
	console.log(PATH.htmlPath);
	gulp.watch(PATH.htmlPath+"**/*.html",browsersync.reload);
	gulp.watch(PATH.cssPath+"less/*.less",["less:compile",browsersync.reload]);
	gulp.watch(PATH.jsPath+"jsx/*.jsx",["reactes6:compile",browsersync.reload]);
	gulp.watch(PATH.jsPath+"**/*.es6",["es6:compile",browsersync.reload]);
})
gulp.task("build",["clean"],function(){
	gulp.start("reactes6:compile","less:compile","es6:compile");
})
gulp.task("default",["clean"],function(){
	gulp.start("reactes6:compile","less:compile","es6:compile","watch","browsersync");
});
