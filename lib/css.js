
var gulp = require('gulp')

var src = gulp.src
var dst = gulp.dest
var cat = require('gulp-concat')
var log = require('gulp-util').log

var watch = require('gulp-watch')

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

css.less = function ()
{
	return less()
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

css.pipelines.dev = function (buns, build)
{
	return src(buns('index/index.less'))
	.pipe(css.less())
	.pipe(css.prefix())
	// .pipe(css.min())
	.pipe(cat('bundle.css'))
	.pipe(dst(build()))
}

css.pipelines.dev.watch = function (buns, build)
{
	return watch(buns([ '**/*.less' ]))
	.pipe(through((vfile, _, next) =>
	{
		css.pipelines.dev(buns, build)
		log('less')
		next()
	}))
}

css.list = function (buns)
{
	return src(buns('**/*.less'))
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
	.pipe(dst(buns()))
}

css.list.watch = function (buns)
{
	return watch([ buns('**/*.less'), '!' + buns('buns.list.less') ])
	.pipe(through((vfile, _, next) =>
	{
		css.list(buns)
		log('less-list')
		next()
	}))
}
