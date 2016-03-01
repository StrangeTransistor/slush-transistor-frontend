
var defer = require('lodash/defer')

module.exports = function (work, pipeline)
{
	if (work.isWatch())
	{
		pipeline.watch(work)

		defer(console.info.part('watch %s…', pipeline.name))
	}
	else
	{
		return pipeline(work)
	}
}
