
module.exports = function (process, srcdir)
{
	var workspace = {}

	workspace.source = require('rootpath')(srcdir)

	workspace.target = require('rootpath')(process.cwd())
	workspace.buns   = workspace.target.partial('web/buns')
	workspace.build  = workspace.target.partial('build')

	workspace.argv = process.argv
	workspace.args = args(process.argv.slice(2))

	return workspace
}

function args (argv)
{
	return require('minimist')(argv,
	{
		boolean: [ 'watch' ]
	})
}
