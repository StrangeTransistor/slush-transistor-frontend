
module.exports = function (work, pipeline)
{
	if (work.args.watch)
	{
		console.info('watch…')
		return pipeline.watch(work)
	}
	else
	{
		return pipeline(work)
	}
}
