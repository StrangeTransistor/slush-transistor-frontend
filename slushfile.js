
var gulp = require('gulp')
var  src = gulp.src
var  dst = gulp.dest

var root   = require('rootpath')(__dirname)
var target = require('rootpath')(process.cwd())

gulp.task('default', () =>
{
	src(root('carcass/**'))
	.pipe(dst(target('result')))
})
