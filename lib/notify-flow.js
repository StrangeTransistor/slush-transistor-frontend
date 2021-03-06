
var finished = require('mississippi').finished

var keys = Object.keys
var notify = require('./notify')

module.exports = function (work)
{
	var errors = {}

	return function (label)
	{
		return {
			error: error,
			ok: ok
		}

		function error (e)
		{
			errors[label] = true

			console.error(e)

			return say('error in ' + label)
		}

		function ok (stream)
		{
			finished(stream, () =>
			{
				if (problm(errors))
				{
					delete errors[label]

					if (! problm(errors))
					{
						return say('OK now')
					}
				}
			})

			return stream
		}
	}

	function problm (errors)
	{
		return keys(errors).length
	}

	function say (msg)
	{
		var title = 'Project: ' + work.manifest.name

		return notify({ title: title, message: msg })
	}
}
