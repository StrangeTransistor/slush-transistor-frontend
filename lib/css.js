
var less = require('gulp-less')
var postcss = require('gulp-postcss')

var autoprefixer = require('autoprefixer')
var cssnano = require('cssnano')

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
