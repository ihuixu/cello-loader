var UglifyJS = require("uglify-js");
var defaults = require('./defaults')
var defaultJS = defaults.defaultJS

console.log(defaultJS.rem_screen)

module.exports = function(config){
	var hostPath = config.JCSTATIC_BASE
	var isDebug = config.isDebug
	var now = new Date()
	var version = [now.getFullYear(), now.getMonth()+1, now.getDay()].join('') + config.version

	function load(){
		var filePath = isDebug ? 'src/' : config.path.dist
		var tags = []
		tags.push('<script src="' + hostPath + filePath + 'loader.js?'+ version+'"></script>')

		config.depends.global && config.depends.global.map(function(v){
			tags.push('<script src="' + hostPath + filePath + v +'.js?'+ version+'"></script>')	
		})

		return tags.join('')
	}
	function loadSingleJS(fileList, opts){
		opts = opts || {}
		var filePath = isDebug ? 'src/' : config.path.dist
		var tags = []

		fileList.map(function(v){
			tags.push('<script src="' + hostPath + filePath + v +'.js?'+ version+'"></script>')	
		})

		return tags.join('')
	}

	function loadJS(fileList, opts){
		opts = opts || {}
		var jss = loadSingleJS(fileList, opts)
		var runs = '<script type="text/javascript">cello.runModules(' + JSON.stringify(fileList) + ');</script>'

		return jss + runs 
	}

	function loadCSS(fileList, opts){
		opts = opts || {}
		var filePath = 'css'
		var tags = []
		fileList.map(function(v){
			tags.push('<link rel="stylesheet" type="text/css" href="' + hostPath + filePath + '/' + v + '.css" />')
		})

		return tags.join('')
	}

	function loadRem(use_screen_base){
		var os = {}
		var meta = '<meta name="viewport" content="width=device-width,' + (os.android ? 'target-densitydpi=device-dpi,' : ' ') + 'initial-scale=1.0,user-scalable=no">'

		var jss = '<script type="text/javascript"> window.use_screen_base="' + (use_screen_base||640) + '"; </script>'

		var content = UglifyJS.minify(jss, {fromString: true}).code

		return meta + jss	
	}

	return {
		load : load 
		, loadJS : loadJS 
		, loadSingleJS : loadSingleJS
		, loadCSS : loadCSS 
		, loadRem : loadRem 
	} 
}

