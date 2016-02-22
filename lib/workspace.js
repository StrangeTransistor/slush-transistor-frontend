
module.exports = function (source, target)
{
	var workspace = {}

	workspace.source = source

	workspace.target = target
	workspace.buns   = target.partial('web/buns')
	workspace.build  = target.partial('build')

	return workspace
}
