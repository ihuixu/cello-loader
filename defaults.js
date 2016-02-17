var fs = require('fs')
var path = require('path')

exports.defaultJS = {
	'rem_screen' : fs.readFileSync(path.join(__dirname, './lib/rem_screen.js'), 'utf8')
}

