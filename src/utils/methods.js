
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

export default {
    bottomOffset
}
