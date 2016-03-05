
require('console-ultimate/global').replace()

var gulp = require('gulp')

var src = gulp.src
var dst = gulp.dest

var plumber = require('gulp-plumber')

var jade = require('gulp-jade')


var html = module.exports = {}

html.pipelines = {}

html.pipelines.dev = function (work)
{
	var notify = work.notify('jade')

	return notify.ok(src(work.buns('index/index.jade'))
	.pipe(plumber({ errorHandler: notify.error }))
	.pipe(jade({ basedir: work.buns() }))
	.pipe(dst(work.build())))
}
