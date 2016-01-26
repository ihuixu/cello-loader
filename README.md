# cello-loader 

静态文件加载器

### 用法 
```
{
"JCSTATIC_BASE":"http://xhstatic.cello.com/",
"debug":true
}
```

```
var loader = require('cello-loader')
var config = require('config/site.json')
var loaderFn = loader(config.JCSTATIC_BASE, config.debug)
```

```
<%- loaderFn.loadJS('page/demo', {depends:['jquery']}) %>
<%- loaderFn.loadSingleJS('page/demo', {depends:['jquery']}) %>

<%- loaderFn.loadCSS(['cssresetm']) %>
```
