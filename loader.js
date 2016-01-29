module.exports = function(config){
	var hostPath = config.JCSTATIC_BASE
	var isDebug = config.isDebug

	function load(){
		var filePath = isDebug ? 'src' : 'dist'
		var tags = []
		tags.push('<script src="' + hostPath + filePath + '/' + 'loader.js"></script>')

		config.depends.global && config.depends.global.map(function(v){
			tags.push('<script src="' + hostPath + filePath + '/' + v +'.js"></script>')	
		})

		return tags.join('')
	}

	function loadJS(fileList, opts){
		opts = opts || {}
		var filePath = isDebug ? 'src' : 'dist'
		var runModuleNames = [] 
		var tags = []

		opts.depends && opts.depends.map(function(v){
			tags.push('<script src="' + hostPath + filePath + '/' + v +'.js' + '"></script>')	
		})

		fileList.map(function(v){
			tags.push('<script src="' + hostPath + filePath + '/' + v +'.js' + '"></script>')	
			runModuleNames.push(v) 
		})

		tags.push('<script>cello.runModules(' + JSON.stringify(runModuleNames) + ');</script>')

		return tags.join('')
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


	return {
		load : load 
		, loadJS : loadJS 
		, loadCSS : loadCSS 
	} 
}

