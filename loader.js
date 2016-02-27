var UglifyJS = require("uglify-js");
var defaults = require('./defaults')
var defaultJS = defaults.defaultJS

module.exports = function(config){
	var hostPath = config.JCSTATIC_BASE
	var isDebug = config.isDebug
	var now = new Date()
	var version = [now.getFullYear(), (now.getMonth() <= 9 ? '0' : '') + (now.getMonth()+1), now.getDate()].join('') + '.' + config.version

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

		fileList && fileList.map(function(v){
			tags.push('<script src="' + hostPath + filePath + v +'.js?'+ version+'"></script>')	
		})

		return tags.join('')
	}

	function loadJS(fileList, opts){
		opts = opts || {}
		var jss = loadSingleJS(fileList, opts)
		var runs = fileList ? '<script type="text/javascript">cello.runModules(' + JSON.stringify(fileList) + ');</script>' : ''

		return jss + runs 
	}

	function loadCSS(fileList, opts){
		opts = opts || {}
		var filePath = isDebug ? 'less/' : config.path.css
		var tags = []
		fileList && fileList.map(function(v){
			tags.push('<link rel="stylesheet" type="text/css" href="' + hostPath + filePath + '/' + v + '.css?' + version + '" />')
		})

		return tags.join('')
	}

	function loadRem(use_screen_base){
		var os = {}
		var meta = '<meta name="viewport" content="width=device-width,' + (os.android ? 'target-densitydpi=device-dpi,' : ' ') + 'initial-scale=1.0,user-scalable=no">'

		return meta + setRem(use_screen_base)	
	}

	function setRem(use_screen_base){
		var jss = '<script type="text/javascript"> window.use_screen_base="' + (use_screen_base||750) + '_mate' + '";' + UglifyJS.minify(defaultJS.rem_screen, {fromString: true}).code + '</script>'

		return jss	
	}


	return {
		load : load 
		, loadJS : loadJS 
		, loadSingleJS : loadSingleJS
		, loadCSS : loadCSS 
		, loadRem : loadRem 
		, setRem : setRem 
	} 
}

