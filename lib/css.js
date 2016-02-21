
var gulp = require('gulp')
var  src = gulp.src
var  dst = gulp.dest
var  cat = require('gulp-concat')

var watch = require('gulp-watch')

var through = require('mississippi').through.obj

var less = require('gulp-less')
var postcss = require('gulp-postcss')

var autoprefixer = require('autoprefixer')
var cssnano = require('cssnano')


var css = module.exports = {}

css.less = function ()
{
	return less()
}

css.prefix = function ()
{
	return postcss([ autoprefixer ])
}

css.min = function ()
{
	return postcss([ cssnano ])
}

css.pipelines = {}

css.pipelines.dev = function (buns, build)
{
	return src(buns('index/index.less'))
	.pipe(css.less())
	.pipe(css.prefix())
	// .pipe(css.min())
	.pipe(cat('bundle.css'))
	.pipe(dst(build()))
}

css.pipelines.dev.watch = function (buns, build)
{
	return watch(buns([ '**/*.less' ]))
	.pipe(through((vfile, _, next) =>
	{
		css.pipelines.dev(buns, build)
		next()
	}))
}
