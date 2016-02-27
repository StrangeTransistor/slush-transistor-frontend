
var gulp = require('gulp')

var src = gulp.src
var dst = gulp.dest

var brw = require('browserify')
var vfs = require('vinyl-source-stream')

var plumber = require('gulp-plumber')

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
	var notify = work.notify('brw')

	var stream = js.brw(work)
	.add(work.buns('index/index.js'))

	stream = js.gulp(stream)

	return notify.ok(stream
	.pipe(plumber({ errorHandler: notify.error }))
	// .pipe(cat('bundle.js'))
	.pipe(dst(work.build())))
}
