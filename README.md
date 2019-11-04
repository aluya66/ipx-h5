# 混合星Go前端h5
 > 混合星Go h5版本，基于vue、vue-router、vuex、less、vue-i18n、vant、axios、vue-cli3构建的移动端混合开发解决方案

## 特性
+ 基于`vue-cli3`脚手架，并添加业务个性化配置`vue.config.js`构建基础工程结构
+ 框架布局基于`layout`组件，并支持动画和缓存`keep-active`
+ 使用`postcss-pxtorem`插件做单位换算实现`px->rem`
+ 采用淘宝高清适配方案，自动适配`html`的`font-size`和`meta`的`viewport`值的配置
+ 页面组件基于`vant`做二次封装，避免直接使用`vant`组件库，方便后期做组件替换
+ 支持本地`mock`数据，本地mock文件，统一存放`devMock`文件夹
+ 请求数据方法统一，基于`axios`封装方法，统一处理常规异常，异步接口全部放在`api`文件夹
+ 支持本地请求服务器接口代理，主要基于`devServer`的`proxy`特性
+ 基于`vue-i18n`做国际化支撑
+ ESLint代码检查，以及修复检测异常代码
+ 支持基于plop脚手架快速构建基础业务模版，后续业务脚手架功能再扩展

## 1、基础目录结构
```
├── devMock					- mock文件夹
├── plop-templates			- 业务脚手架，待完善
├── public					- 公共静态文件
├── server					- 基于node自建http-server服务
└── src						- 核心文件
    ├── api					- 服务端api
    ├── components			- 组件库，自建或二次封装
    ├── demo				- demo示例
    ├── layout				- 框架结构组件
    ├── plugins				- 插件库
    │   └── i18n			- 国际化
    ├── routes				- 路由（基于vue-router）
    ├── store				- 数据管理（基于vuex）
    ├── themes				- 主题库（包含样式、图片、icon等）
    │   ├── icons
    │   ├── images
    │   └── default
    ├── utils				- 公共功能模块
    └── views				- 业务模块
        ├── common			- 公共业务组件
        ├── mixins			- mixins 前置钩子
        └── home			- 首页
```

## 2、项目配置

> 见`.env.development & .env.production` 配置项

- 注意：
    - 本地服务端口
    - 代理数量（默认只代理一个，需要更多，修改`vue.config.js`中的`proxy`配置项）
    - 接口服务地址
    - 路由模式（基于nginx服务时，正式部署时以history模式，开发阶段以hash）

> 菜单配置

## 3、开发构建

- 安装依赖
```
	npm install
```

- 开发服务
```
	npm start

or

	npm run dev
```

- 语法检测
```
	npm run lint
```

- 打包生成部署包（需先执行依赖安装）.
```
	npm run build
```

## 4、服务部署
> nginx 部署

- 1、在工程根目录中,将`dist`目录下文件部署在`nginx`服务器`html`目录下.

- 2、配置`nginx`代理
```
	location /dm-admin {
		try_files $uri $uri/ /dm-admin/index.html;
	}

	location /api {
		proxy_pass  http://ip:port  /*线上框架后台服务域名及端口*/
	}

```

- 3、重启`nginx`
```
	nginx -s reload
```

> 自建node 服务部署，node版本8.11.0+

## 5、相关参考

- 组件编码规范
- See [Configuration Reference](https://cli.vuejs.org/config/).
- vue-cli3 [doc-en](https://cli.vuejs.org/) [doc-zh](https://cli.vuejs.org/zh/)
- vue-router [doc-en](https://router.vuejs.org/) [doc-zh](https://router.vuejs.org/zh/)
- vuex [doc-en](https://vuex.vuejs.org/) [doc-zh](https://vuex.vuejs.org/zh/)
- vant [doc-en](https://youzan.github.io/vant/#/en-US/intro) [doc-zh](https://youzan.github.io/vant/#/zh-CN/intro)
- axios [github](https://github.com/axios/axios)
- less [doc-en](http://lesscss.org/usage/) [doc-zh](http://lesscss.cn/)
