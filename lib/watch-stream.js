
var src = require('gulp').src
var watch = require('gulp-watch')
var through = require('mississippi').through.obj

module.exports = function (globs)
{
	return src(globs)
	.pipe(watch(globs))
	.pipe(through((vfile, _, next) =>
	{
		console.dir(vfile.history[0].slice(-20))
		next(null, vfile)
	}))
}
