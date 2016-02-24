
var work = require('./lib/workspace')(process, __dirname)

var gulp = require('gulp')
var  src = gulp.src
var  dst = gulp.dest

var css = require('./lib/css')
var js  = require('./lib/js')


gulp.task('default', () =>
{
	return src(work.source('carcass/**'))
	.pipe(dst(work.target()))
})

gulp.task('less', () =>
{
	if (work.args.watch)
	{
		console.info('watch…')
		return css.pipelines.dev.watch(work)
	}
	else
	{
		return css.pipelines.dev(work)
	}
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
	return js.pipelines.dev(work)
})
