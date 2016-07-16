var UglifyJS = require("uglify-js");
var defaults = require('./defaults')
var defaultJS = defaults.defaultJS

module.exports = function(config){
	var hostPath = config.JCSTATIC_BASE
	var isDebug = config.isDebug
	var now = new Date()
	var version = [now.getFullYear(), (now.getMonth() <= 9 ? '0' : '') + (now.getMonth()+1), now.getDate()].join('') + '.' + config.version

	var basePath = {
		host : hostPath
		, js : hostPath + (isDebug ? 'src' : config.path.dist) + '/'
		, css : hostPath + (isDebug ? 'less' : 'css') + '/'
	}

	function load(os){
		os = os || {}
		var tags = []
		var modNames = []

		if(isDebug){
			var dependsArray = config.depends.global.split('+')
			dependsArray.map(function(v){
				modNames.push(v)
			})

		}else{
			modNames.push(config.depends.global.replace(/\//g, '~'))
		}

		modNames.map(function(v){
			tags.push('<script src="' + basePath.js + v +'.js' +'?'+ version+'"></script>')	
		})

		return tags.join('')
	}
	function loadSingleJS(fileList, opts){
		opts = opts || {}
		return getJSList(fileList, basePath.js, opts)
	}

	function getJSList(fileList, filePath, opts){
		opts = opts || {}
		var tags = []

		fileList && fileList.map(function(v){
			tags.push('<script src="' + filePath + v +'.js' +'?'+ version+'"></script>')	
		})

		return tags.join('')
	}

	function loadJS(fileList, opts){
		opts = opts || {}
		var jss = getJSList(fileList, basePath.js, opts)
		var runs = fileList ? '<script type="text/javascript">fml.runModules(' + JSON.stringify(fileList) + ');</script>' : ''

		return jss + runs 
	}

	function openJS(fileList, opts){
		opts = opts || {}
		var jss = getJSList(fileList, 'open', opts)

		return jss 
	}

	function loadCSS(fileList, opts){
		opts = opts || {}
		var tags = []
		fileList && fileList.map(function(v){
			tags.push('<link rel="stylesheet" type="text/css" href="' + basePath.css + v +'.css' + '?' + version + '" />')
		})

		return tags.join('')
	}

	function loadRem(os, use_screen_base){
		os = os || {}
		var meta = '<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no">'

		return meta + setRem(use_screen_base)	
	}

	function setRem(use_screen_base){
		var jss = '<script type="text/javascript"> window.use_screen_base="' + (use_screen_base||750) + '_mate' + '";' + UglifyJS.minify(defaultJS.rem_screen, {fromString: true}).code + '</script>'

		return jss	
	}


	return {
		load : load 
		, loadJS : loadJS 
		, openJS : openJS
		, loadSingleJS : loadSingleJS
		, loadCSS : loadCSS 
		, loadRem : loadRem 
		, setRem : setRem 
		, basePath : basePath
	} 
}

