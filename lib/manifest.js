
var find = require('find-root')
var load = require('fs-sync').readJSON

module.exports = function (frompath)
{
	try
	{
		var manpath = find(frompath)

		var manifest = load(manpath + '/package.json')

		return manifest
	}
	catch (e)
	{
		return {
			name: '<untitled project>'
		}
	}
}
