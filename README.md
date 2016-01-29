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
var config = require('config/static.json')
var loaderFn = loader(config)
```

```
<%- loaderFn.load() %>

<%- loaderFn.loadJS(['a', 'page/flash/back'], {depends:['jquery']}) %>
<%- loaderFn.loadCSS(['cssresetm']) %>
```
