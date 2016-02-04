module.exports = function(config){
	var hostPath = config.JCSTATIC_BASE
	var isDebug = config.isDebug
	var now = new Date()
	var version = [now.getFullYear(), now.getMonth()+1, now.getDay()].join('') + config.version

	function load(){
		var filePath = isDebug ? config.path.src : config.path.dist
		var tags = []
		tags.push('<script src="' + hostPath + filePath + 'loader.js?'+ version+'"></script>')

		config.depends.global && config.depends.global.map(function(v){
			tags.push('<script src="' + hostPath + filePath + v +'.js?'+ version+'"></script>')	
		})

		return tags.join('')
	}
	function loadSingleJS(fileList, opts){
		opts = opts || {}
		var filePath = isDebug ? config.path.src : config.path.dist
		var tags = []

		fileList.map(function(v){
			tags.push('<script src="' + hostPath + filePath + v +'.js?'+ version+'"></script>')	
		})

		return tags.join('')
	}

	function loadJS(fileList, opts){
		opts = opts || {}
		var jss = loadSingleJS(fileList, opts)
		var runs = '<script>cello.runModules(' + JSON.stringify(fileList) + ');</script>'

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


	return {
		load : load 
		, loadJS : loadJS 
		, loadSingleJS : loadSingleJS
		, loadCSS : loadCSS 
	} 
}

