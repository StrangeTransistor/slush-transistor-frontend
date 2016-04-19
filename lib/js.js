
var gulp = require('gulp')

var src = gulp.src
var dst = gulp.dest

var watch   = require('gulp-watch')
var plumber = require('gulp-plumber')
var through = require('mississippi').through.obj

var brw = require('browserify')
var uglify = require('gulp-uglify')

var vfs = require('vinyl-source-stream')
var vinyl = require('vinyl')
var streamify = require('gulp-streamify')

var parse  = require('path').parse
var exists = require('fs-sync').exists
var format = require('util').format


var js = module.exports = {}

js.brw = function (work)
{
	return brw({
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

js.min = function (work)
{
	if (work.isRelease())
	{
		return streamify(uglify())
	}
	else
	{
		return through()
	}
}


js.pipeline = function brw (work)
{
	var brw = js.brw(work)
	.add(work.buns('index/index.js'))

	brw = js.gulp(brw, work)

	return brw
	.pipe(js.min(work))
	.pipe(dst(work.build()))
}

js.pipeline.watch = function (work)
{
	js.pipeline(work)

	return watch(work.buns('**/*.js'))
	.pipe(through((vfile, _, next) =>
	{
		js.pipeline(work)
		console.info('brw')
		next()
	}))
}


js.autoentry = function brw__autoentry (work, stream)
{
	stream || (stream = src(glob(work)))

	return stream
	.pipe(through((vfile, _, next) =>
	{
		var path = parse(vfile.relative)

		if (path.dir === path.name)
		{
			if (path.dir !== 'index')
			{
				return next(null, [ vfile, path ])
			}
		}

		return next()
	}))
	.pipe(through((tuple, _, next) =>
	{
		var vfile = tuple[0]
		var path  = tuple[1]

		var indexname = work.buns(path.dir, 'index.js')

		if (exists(indexname))
		{
			console.info('index.js already exists for %s/%s', path.dir, path.name)

			return next()
		}
		else
		{
			console.info('creating %s/%s', path.dir, 'index.js')

			var template = "\nmodule.exports = require('./%s')\n"
			var contents = format(template, path.name)

			vfile = new vinyl({
				cwd:  vfile.cwd,
				base: vfile.base,
				path: indexname,
				contents: new Buffer(contents)
			})

			return next(null, vfile)
		}
	}))
	.pipe(dst(work.buns()))
}

js.autoentry.watch = function (work)
{
	js.autoentry(work)

	return js.autoentry(work, watch(glob(work)))
}

function glob (work)
{
	return [
		      work.buns('*/*.js'),
		'!' + work.buns('*/index.js')
	]
}
