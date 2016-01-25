function loader(hostPath, debug){

	function loadJS(mainPath, opts){
		var filePath = debug ? 'src' : 'dist'
		var tags = []
		tags.push('<script src="' + hostPath + filePath + '/' + 'loader.js' + '" data-main="' + mainPath + '"></script>')
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
			tags.push('<link rel="stylesheet" type="text/css" href="' + hostPath + filepath + '/' + v + '.css" />')
		})

		return tags.join('')
	}


	return {
		loadJS : loadJS 
		, loadCSS : loadCSS 
	} 
}

module.exports = loader 
