
var gulp = require('gulp')

var src = gulp.src
var dst = gulp.dest

var watch   = require('gulp-watch')
var plumber = require('gulp-plumber')
var through = require('mississippi').through.obj

var brw = require('browserify')
var vfs = require('vinyl-source-stream')


var js = module.exports = {}

js.brw = function (work)
{
	return brw
	({
		paths: [ work.buns() ]
	})
}

js.gulp = function (brw, work)
{
	var notify = work.notify('brw')

	return notify.ok(brw.bundle()
	.on('error', notify.error)
	.pipe(plumber({ errorHandler: notify.error }))
	.pipe(vfs('bundle.js')))
}

js.pipelines = {}

js.pipelines.dev = function (work)
{
	var brw = js.brw(work)
	.add(work.buns('index/index.js'))

	brw = js.gulp(brw, work)

	return brw
	// .pipe(cat('bundle.js'))
	.pipe(dst(work.build()))
}

js.pipelines.dev.watch = function (work)
{
	js.pipelines.dev(work)

	return watch(work.buns([ '**/*.js' ]))
	.pipe(through((vfile, _, next) =>
	{
		js.pipelines.dev(work)
		console.info('brw')
		next()
	}))
}
