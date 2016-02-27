
var gulp = require('gulp')

var src = gulp.src
var dst = gulp.dest

var brw = require('browserify')
var vfs = require('vinyl-source-stream')

var plumber = require('gulp-plumber')
var notify = require('./notify-flow')()

var js = module.exports = {}

js.brw = function (work)
{
	return brw
	({
		paths: [ work.buns() ]
	})
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
	var n = notify('brw')

	var stream = js.brw(work)
	.add(work.buns('index/index.js'))

	stream = js.gulp(stream)

	return n.ok(stream
	.pipe(plumber({ errorHandler: n.error }))
	// .pipe(cat('bundle.js'))
	.pipe(dst(work.build())))
}
