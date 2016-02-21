
var promisify = require('bluebird').promisify
var npmi = promisify(require('npmi'))
var last = require('lodash/last')

module.exports = function (options)
{
	return npmi(options)
	.then(function (seq)
	{
		if (seq)
		{
			return last(seq)
		}
		else
		{
			return null
		}
	})
}
