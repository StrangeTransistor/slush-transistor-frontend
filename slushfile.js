
var source = require('rootpath')(__dirname)
var target = require('rootpath')(process.cwd())

var work = require('./lib/workspace')(source, target)


var gulp = require('gulp')
var  src = gulp.src
var  dst = gulp.dest

var css = require('./lib/css')

gulp.task('default', () =>
{
	return src(work.source('carcass/**'))
	.pipe(dst(work.target()))
})

gulp.task('less', () =>
{
	return css.pipelines.dev(work)
})

gulp.task('less-watch', () =>
{
	return css.pipelines.dev.watch(work)
})

gulp.task('less-list', () =>
{
	return css.list(work)
})

gulp.task('less-list-watch', () =>
{
	return css.list.watch(work)
})
