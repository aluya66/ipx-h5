export default {
    // 金额格式转化
    changeFormat(num) {
        var str = (num / 100 * 100).toFixed(2) + ''
        var intSum = str.substring(0, str.indexOf('.')).replace(/\B(?=(?:\d{3})+$)/g, ',') // 取到整数部分
        var dot = str.substring(str.length, str.indexOf('.')) // 取到小数部分搜索
        var ret = intSum + dot
        return ret
    },
    //数字格式化
    changeNumberFormat(num){
        let str = num.toString()
        var intSum = str.substring(0, str.length).replace(/\B(?=(?:\d{3})+$)/g, ',')
        return  intSum
        
    }
}
