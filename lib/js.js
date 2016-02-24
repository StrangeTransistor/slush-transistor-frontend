
var gulp = require('gulp')

var src = gulp.src
var dst = gulp.dest

var brw = require('browserify')
var vfs = require('vinyl-source-stream')

var plumber = require('gulp-plumber')
var notify = require('./notify-flow')()

var js = module.exports = {}

js.brw = function (entry)
{
	return brw().add(entry)
}

js.gulp = function (brw)
{
	return brw
	.bundle()
	.pipe(vfs('bundle.js'))
}

js.pipelines = {}

js.pipelines.dev = function (work)
{
	var n = notify()

	var stream = js.brw(work.buns('index/index.js'))
	stream = js.gulp(stream)

	return n.ok(stream
	.pipe(plumber({ errorHandler: n.error }))
	// .pipe(cat('bundle.js'))
	.pipe(dst(work.build())))
}
