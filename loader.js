function loader(hostPath, debug){
	function loadSingleJS(mainPath, opts){
		return loadJS(mainPath, opts, true)
	}

	function loadJS(mainPath, opts, single){
		opts = opts || {}
		var filePath = debug ? 'src' : 'dist'
		var tags = []

		!single && tags.push('<script src="' + hostPath + filePath + '/' + 'loader.js' + '" data-main="' + mainPath + '"></script>')

		opts.depends && opts.depends.map(function(v){
			tags.push('<script src="' + hostPath + filePath + '/' + v +'.js' + '"></script>')	
		})

		tags.push('<script src="' + hostPath + filePath + ((opts.depends && opts.depends.length) ? '~'+opts.depends.join(',') : '') + '/' + mainPath +'.js' + '"></script>')	

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
