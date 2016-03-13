
var gulp = require('gulp')

var src = gulp.src
var dst = gulp.dest

var watch = require('gulp-watch')


var assets = module.exports = {}

assets.pipeline = function assets (work)
{
	return src(work.buns('*/*.{png,jpg,gif,svg}'))
	.pipe(dst(work.build('assets')))
}

assets.pipeline.watch = function (work)
{
	
}
