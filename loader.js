function loader(config){
	console.log(config)
	var hostPath = config.JCSTATIC_BASE
	var isDebug = config.isDebug

	function loadSingleJS(mainPath, opts){
		return loadJS(mainPath, opts, true)
	}

	function loadJS(mainPath, opts, single){
		opts = opts || {}
		var filePath = isDebug ? 'src' : 'dist'
		var tags = []

		if(!single){ 
			tags.push('<script src="' + hostPath + filePath + '/' + 'loader.js' + '" data-main="' + mainPath + '"></script>')

			config.depends.global && config.depends.global.map(function(v){
				tags.push('<script src="' + hostPath + filePath + '/' + v +'.js' + '"></script>')	
			})
		}

		opts.depends && opts.depends.map(function(v){
			tags.push('<script src="' + hostPath + filePath + '/' + v +'.js' + '"></script>')	
		})

		tags.push('<script src="' + hostPath + filePath + '/' + mainPath +'.js' + '"></script>')	

		return tags.join('')
	}

	function loadCSS(fileList, opts){
		var filePath = 'css'
		var tags = []
		fileList.map(function(v){
			tags.push('<link rel="stylesheet" type="text/css" href="' + hostPath + filePath + '/' + v + '.css" />')
		})

		return tags.join('')
	}


	return {
		loadJS : loadJS 
		, loadSingleJS : loadSingleJS
		, loadCSS : loadCSS 
	} 
}

module.exports = loader 
