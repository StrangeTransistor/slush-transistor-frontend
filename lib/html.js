
var gulp = require('gulp')

var src = gulp.src
var dst = gulp.dest

var watch   = require('gulp-watch')
var plumber = require('gulp-plumber')
var through = require('mississippi').through.obj

var jade = require('gulp-jade')


var html = module.exports = {}

html.jade = function (work)
{
	return jade({ basedir: work.buns() })
}

html.pipeline = function jade (work)
{
	var notify = work.notify('jade')

	return notify.ok(src(work.buns('index/index.jade'))
	.pipe(plumber({ errorHandler: notify.error }))
	.pipe(html.jade(work))
	.pipe(dst(work.build())))
}

html.pipeline.watch = function (work)
{
	html.pipeline(work)

	return watch(work.buns('**/*.jade'))
	.pipe(through((vfile, _, next) =>
	{
		html.pipeline(work)
		console.info('jade')
		next()
	}))
}
