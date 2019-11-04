## 接口目录使用说明(初稿)

- 按后台接口模块做文件名区分，比如`nvrct`
- 支持直接和间接调用方式，同时支持`async/await`语法

## 接口调用方式
> 例如调用`checkLogin`接口

- `promise`直接引用
```
    import { checkLogin } from 'api/common';

    // 调用方式
    checkLogin(params).then(res => {
        // codeing ...
    })
```

- `promise`间接调用
```
    import innerApi from 'api';

    // 调用方式
    innerApi.common.checkLogin(params).then(res => {
        // codeing ...
    })
```


- `promise`间接调用,在mian.js全局引入，vue实例时挂载在原型prototype上，目前项目采用这种
```
    // 调用方式
    this.$api.common.checkLogin(params).then(res => {
        // codeing ...
    })
```

- `async/await`调用
```
    import innerApi from 'api';

    // method里面调用函数
    async getData(){
        try{
            const resData = innerApi.common.checkLogin(params);
            if(resData.data){
                // coding ...
            }
        }catch(err){
            throw(err);
        }
    }
```
