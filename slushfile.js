
require('console-ultimate/global').replace()

var work = require('./lib/workspace')(process, __dirname)

var gulp = require('gulp')
var  src = gulp.src
var  dst = gulp.dest

var wwhen = require('./lib/watch-when')

var html = require('./lib/html')
var css  = require('./lib/css')
var js   = require('./lib/js')

var assets = require('./lib/assets')


var constant = require('lodash/constant')


gulp.task('setup', () =>
{
	return src(work.source('carcass/**'))
	.pipe(dst(work.target()))
})

gulp.task('default', () =>
{
	work.isWatch = constant(true)

	return gulp.start([ 'less', 'brw', 'jade', 'less-list', 'brw-autoentry' ])
})

gulp.task('jade', () =>
{
	return wwhen(work, html.pipeline)
})

gulp.task('less', () =>
{
	return wwhen(work, css.pipeline)
})

gulp.task('less-list', () =>
{
	return wwhen(work, css.list)
})

gulp.task('brw', () =>
{
	return wwhen(work, js.pipeline)
})

gulp.task('brw-autoentry', () =>
{
	return wwhen(work, js.autoentry)
})

gulp.task('assets', () =>
{
	return wwhen(work, assets.pipeline)
})
