
var find = require('find-root')

module.exports = function (frompath)
{
	try
	{
		return find(frompath)
	}
	catch (e)
	{
		return frompath
	}
}
