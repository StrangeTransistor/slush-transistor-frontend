
var root   = require('rootpath')(__dirname)
var target = require('rootpath')(process.cwd())
var buns   = target.partial('web/buns')
var build  = target.partial('build')

var gulp = require('gulp')
var  src = gulp.src
var  dst = gulp.dest

var watch = require('gulp-watch')

var cat = require('gulp-concat')
var css = require('./lib/css')

var through = require('mississippi').through.obj

gulp.task('default', () =>
{
	return src(root('carcass/**'))
	.pipe(dst(target()))
})

function less ()
{
	return src(buns('index/index.less'))
	.pipe(css.less())
	.pipe(css.prefix())
	// .pipe(css.min())
	.pipe(cat('bundle.css'))
	.pipe(dst(build()))
}

gulp.task('less', () =>
{
	return less()
})

gulp.task('less-watch', () =>
{
	return watch(buns([ '**/*.less' ]))
	.pipe(through((vfile, _, next) =>
	{
		less()
		next()
	}))
})
