
var work = require('./lib/workspace')(process, __dirname)

var gulp = require('gulp')
var  src = gulp.src
var  dst = gulp.dest

var wwhen = require('./lib/watch-when')

var css = require('./lib/css')
var js  = require('./lib/js')


gulp.task('default', () =>
{
	return src(work.source('carcass/**'))
	.pipe(dst(work.target()))
})

gulp.task('less', () =>
{
	return wwhen(work, css.pipelines.dev)
})

gulp.task('less-list', () =>
{
	if (work.args.watch)
	{
		console.info('watch…')
		return css.list.watch(work)
	}
	else
	{
		return css.list(work)
	}
})

gulp.task('brw', () =>
{
	return wwhen(work, js.pipelines.dev)
})
