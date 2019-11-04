# 样式编码规范

## 1、目录文件说明

### 1、common为公共样式
- `base.less`         全局基础样式

- `mixin.less`        全局样式函数
```
    .wh(@w, @h) {
        width: @w;
        height: @h;
    }
调用方式：
    .aa {
        .wh(200px, 100px)
    }
    等价于
    .aa {
        width: 200px;
        height: 100px;
    }
```

- `variables.less`    全局变量

```定义全局变量
    @primary-color: red;
    @primary-font-color: #004d93;

```
### 2、views为业务样式
### 3、其他为框架样式


## 2、全局样式引用方式

- `mixin`与`variables`框架默认全局导入,参考`vue.config.js`配置文件
- `App.vue`中引入`app.less`，`app.less`引入`base.less`

```
    <style lang="less" scope>
    @import '~themes/styles/app.less';

    // codeing...
    </style>
```

## 3、业务样式引用

- 若考虑到后续换主题，可以将业务组件中的样式按业务文件名全部提取至`themes/styles/views`目录下，否则直接写在业务组件中，但要注意公共样式提取

```存放themes/styles/views引用方式
    <style lang="less" scoped>
    @import '~themes/styles/views/app.less';
    </style>
```
