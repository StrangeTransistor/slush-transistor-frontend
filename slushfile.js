
require('console-ultimate/global').replace()

var work = require('./lib/workspace')(process, __dirname)

var gulp = require('gulp')
var  src = gulp.src
var  dst = gulp.dest

var wwhen = require('./lib/watch-when')
var constant = require('lodash/constant')

var html = require('./lib/html')
var css  = require('./lib/css')
var js   = require('./lib/js')

var assets = require('./lib/assets')


/* setup: run once only */
gulp.task('setup', () =>
{
	return src(work.source('carcass/**'))
	.pipe(dst(work.target()))
})


/* default → watch = true → all */
gulp.task('default', () =>
{
	return gulp.start('watch')
})

gulp.task('watch', () =>
{
	work.isWatch = constant(true)

	console.info('watch all')

	return gulp.start('all')
})

gulp.task('all', () =>
{
	return gulp.start([ 'less', 'brw', 'jade', 'assets', 'less-list', 'brw-autoentry' ])
})


/* certain tasks */
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
