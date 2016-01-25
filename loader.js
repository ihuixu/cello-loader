exports.loader = function(hostPath, mainPath, opts){
	var filePath = opts.debug ? 'src' : 'dist'
	var tags = []
	tags.push('<script src="' + hostPath + filePath + '/' + 'loader.js' + '" data-main="' + mainPath + '"></script>')
	opts.depends && opts.depends.map(function(v){
		tags.push('<script src="' + hostPath + filePath + '/' + v +'.js' + '"></script>')	
	})
	tags.push('<script src="' + hostPath + filePath + (opts.depends ? '~'+opts.depends.join(',') : '') + '/' + mainPath +'.js' + '"></script>')	

	return tags.join('')
}

