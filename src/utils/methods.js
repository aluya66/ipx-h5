
import utils from 'utils'

export const bottomOffset = (offset) => {
    let baseparams = utils.getStore('baseParams')
    if (baseparams.isIphoneX) {
        let y = window.devicePixelRatio * (offset + 34)
        return `padding-bottom:${y}px !important`
    } else {
        let y = window.devicePixelRatio * offset
        return `padding-bottom:${y}px !important`
    }
}
// 四舍五入，保留位数为roundDigit
export const roundFun = (numberRound, roundDigit) => {
    if (numberRound >= 0) {
        let tempNumber = parseInt((numberRound * Math.pow(10, roundDigit) + 0.5)) / Math.pow(10, roundDigit)
        var xsd = tempNumber.toString().split('.')
        if (xsd.length === 1) {
            tempNumber = tempNumber.toString() + '.00'
            return tempNumber
        }
        if (xsd.length > 1) {
            if (xsd[1].length < 2) {
                tempNumber = tempNumber.toString() + '0'
            }
            return tempNumber
        }
    }
}

export const priceFormat = (num) => {
    let price = parseFloat(num).toFixed(2)
    var str = price.toString()
    var reg = str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
    return str.replace(reg, '$1,')
}

export const hidePrice = (num, isHide) => {
    console.log('num = ' + num + ', isHide = ' + isHide)
    if (isHide !== 1) {
        return '???'
    }
    return priceFormat(num)
}

export default {
    bottomOffset,
    roundFun,
    priceFormat,
    hidePrice
}
