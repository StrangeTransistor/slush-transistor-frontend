
var gulp = require('gulp')

var src = gulp.src
var dst = gulp.dest

var watch = require('gulp-watch')
var through = require('mississippi').through.obj


var assets = module.exports = {}

assets.pipeline = function assets (work, stream)
{
	stream || (stream = src(glob(work)))

	return stream
	.pipe(through((vfile, _, next) =>
	{
		console.info('asset %s', vfile.relative)

		return next(null, vfile)
	}))
	.pipe(dst(work.build('assets')))
}

assets.pipeline.watch = function (work)
{
	assets.pipeline(work)

	return assets.pipeline(work, watch(glob(work)))
}

function glob (work)
{
	return work.buns('*/*.{png,jpg,gif,svg}')
}
