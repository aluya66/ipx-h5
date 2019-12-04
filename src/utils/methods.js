
export const bottomOffset = (offset) => {
    const ua = navigator.userAgent
    const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi)
    const statusBarHeight = ua.match(/statusBarHeight\/(\d{2})/i)
    let h = statusBarHeight ? statusBarHeight[1] : 20
    if (h > 20 && isIos) {
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
