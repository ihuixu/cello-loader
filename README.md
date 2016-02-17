# cello-loader 

静态文件加载器

## 用法 
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

### js

#### 初始化
```
<%- loaderFn.load() %>
```

#### 引用js
```
<%- loaderFn.loadJS(['a', 'page/flash/back']) %>
```

### css 

#### 引用css
```
<%- loaderFn.loadCSS(['cssresetm']) %>
```

### rem布局
```
<%- loaderFn.loadRem() %>
```

