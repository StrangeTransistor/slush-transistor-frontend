
var less = require('gulp-less')
var postcss = require('gulp-postcss')

var autoprefixer = require('autoprefixer')

var css = module.exports = {}

css.less = function ()
{
	return less()
}

css.prefix = function ()
{
	return postcss([ autoprefixer ])
}
