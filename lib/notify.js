
var notifier = require('node-notifier')
var promisify = require('bluebird').promisify

module.exports = promisify(notifier.notify, { context: notifier })
