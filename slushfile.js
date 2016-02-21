
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

gulp.task('less', () =>
{
	return css.pipelines.dev(buns, build)
})

gulp.task('less-watch', () =>
{
	return css.pipelines.dev.watch(buns, build)
})
