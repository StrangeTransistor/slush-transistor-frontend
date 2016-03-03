
require('console-ultimate/global').replace()

var gulp = require('gulp')

var src = gulp.src
var dst = gulp.dest
var cat = require('gulp-concat')

var watch = require('gulp-watch')
var plumber = require('gulp-plumber')

var through = require('mississippi').through.obj
var concat  = require('mississippi').concat
var source  = require('vinyl-source-stream')

var less = require('gulp-less')
var postcss = require('gulp-postcss')

var autoprefixer = require('autoprefixer')
var cssnano = require('cssnano')

var format = require('util').format
var parse = require('path').parse


var css = module.exports = {}

css.less = function (options)
{
	return less(options)
}

css.prefix = function ()
{
	return postcss([ autoprefixer ])
}

css.min = function ()
{
	return postcss([ cssnano ])
}

css.pipelines = {}

css.pipelines.dev = function less (work)
{
	var notify = work.notify('less')

	return notify.ok(src(work.buns('index/index.less'))
	.pipe(plumber({ errorHandler: notify.error }))
	.pipe(css.less({ paths: [ work.buns() ] }))
	.pipe(css.prefix())
	// .pipe(css.min())
	.pipe(cat('bundle.css'))
	.pipe(dst(work.build())))
}

css.pipelines.dev.watch = function (work)
{
	css.pipelines.dev(work)

	return watch(work.buns([ '**/*.{le,c}ss' ]))
	.pipe(through((vfile, _, next) =>
	{
		css.pipelines.dev(work)
		console.info('less')
		next()
	}))
}


var list__glob = '*/*.less'

css.list = function (work)
{
	return src(work.buns(list__glob))
	.pipe(through((vfile, _, next) =>
	{
		var path = parse(vfile.relative)

		if (path.dir == path.name)
		{
			if (path.dir != 'index')
			{
				return next(null, path)
			}
		}

		return next()
	}))
	.pipe(through((path, _, next) =>
	{
		path = format('./%s/%s', path.dir, path.name)

		var imprt = format("@import '%s';\n", path)

		next(null, imprt)
	}))
	.pipe(source('buns.list.less'))
	.pipe(dst(work.buns()))
}

css.list.watch = function (work)
{
	css.list(work)

	return watch([ work.buns(list__glob) ])
	.pipe(through((vfile, _, next) =>
	{
		css.list(work)
		console.info('less-list')
		next()
	}))
}
