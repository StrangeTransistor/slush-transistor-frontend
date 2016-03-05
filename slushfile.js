
var work = require('./lib/workspace')(process, __dirname)

var gulp = require('gulp')
var  src = gulp.src
var  dst = gulp.dest

var wwhen = require('./lib/watch-when')

var html = require('./lib/html')
var css  = require('./lib/css')
var js   = require('./lib/js')

var constant = require('lodash/constant')


gulp.task('setup', () =>
{
	return src(work.source('carcass/**'))
	.pipe(dst(work.target()))
})

gulp.task('default', () =>
{
	work.isWatch = constant(true)

	return gulp.start([ 'less', 'brw' ])
})

gulp.task('jade', () =>
{
	return wwhen(work, html.pipelines.dev)
})

gulp.task('less', () =>
{
	return wwhen(work, css.pipelines.dev)
})

gulp.task('less-list', () =>
{
	return wwhen(work, css.list)
})

gulp.task('brw', () =>
{
	return wwhen(work, js.pipelines.dev)
})

gulp.task('brw-autoentry', () =>
{
	return wwhen(work, js.autoentry)
})
