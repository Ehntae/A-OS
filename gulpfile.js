var gulp = require("gulp");
var ts = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var uglifyJS = require("gulp-uglify");
var uglifyCSS = require("gulp-uglifycss");
var concat = require("gulp-concat");
var es = require("event-stream");

var paths = {
	node: [
		"./src/ts/**/*.ts",
		"./typings/tsd.d.ts"
	],
	package: "./src/package.json",
	build: "./dist",
	bundleInJS: "./src/bundle/js/**/*.js",
	bundleInTS: ["./src/bundle/ts/**/*.ts", "./typings/tsd.d.ts"],
	bundleOut: "./dist/www/js",

	clientJsIn: ["./src/www/**/*.ts", "./typings/tsd.d.ts"],
	clientJsOut: "./dist/www/js", 

	cssIn : "./src/www/css/**/*.css",
	cssOut : "./dist/www/css",
	sourcemaps : "sourcemaps"
};

var tsProject = ts.createProject("tsconfig.json");

gulp.task("typescript", () => {
	var tsResult = gulp.src(paths.node)
		.pipe(sourcemaps.init())
		.pipe(ts("./tsconfig.json"))
 
		tsResult.dts
			.pipe(gulp.dest(paths.build))
 
		return tsResult.js
		.pipe(sourcemaps.write(paths.sourcemaps))
		.pipe(gulp.dest(paths.build));
});

gulp.task("bundle.js", () => {
	return es.merge(
		gulp.src(paths.bundleInJS),
		
		gulp.src(paths.bundleInTS)
			.pipe(ts({target:"ES5"}))
	)
	.pipe(concat("bundle.js"))
	// .pipe(uglifyJS())
	.pipe(gulp.dest(paths.bundleOut));
});

gulp.task( "clientJS", () => {
	var tsResult = gulp.src(paths.clientJsIn)
		.pipe(sourcemaps.init())
		.pipe(ts("./tsconfig.json"))
 
		tsResult.dts
			.pipe(gulp.dest(paths.clientJsOut))
 
		return tsResult.js
		.pipe(sourcemaps.write(paths.sourcemaps))
		.pipe(gulp.dest(paths.clientJsOut));
});

gulp.task("style.css", () => {
	return gulp.src(paths.cssIn)
		.pipe(concat("style.css"))
		.pipe(uglifyCSS())
		.pipe(gulp.dest(paths.cssOut));
})

gulp.task("watch", () => {
	gulp.watch(paths.node, ["typescript"]);
	gulp.watch(paths.bundleInJS, ["bundle.js"]);
	gulp.watch(paths.bundleInTS, ["bundle.js"]);
	gulp.watch(paths.cssIn, ["style.css"]);
	gulp.watch(paths.clientJsIn, ["clientJS"]);
});

gulp.task("default", ["watch", "typescript", "bundle.js", "style.css", "clientJS"]);