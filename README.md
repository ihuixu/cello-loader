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
var loaderFn = loader.loader(config.JCSTATIC_BASE, config.debug)
```

```
<%- loader('page/demo', {depends:['jquery'], debug:true}) %>
```
