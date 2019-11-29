import utils from 'utils'
import {
    Dialog
} from 'vant'

export default {
    createOrder(groupGoods, totalPrice, groupCode, isDetail) {
        let shopCarts = []
        let products = []
        let batchNum = groupGoods.minBatchNum
        groupGoods.forEach((good, goodIndex) => {
            if (good.productShelves === 1) {
                good.colorSkuList.filter((item) => {
                    item.skuList.filter((skuItem) => {
                        return skuItem.num >= batchNum && skuItem.entityStock >= skuItem.num
                    })
                    return item.skuList.length > 0
                })
                if (good.colorSkuList.length > 0) {
                    products.push(good)
                }
            }
        })
        let designerIds = []
        products.forEach(item => {
            designerIds.push(item.designer.id)
        })
        designerIds.forEach(idStr => {
            let arr = products.filter(item => item.designer.id === idStr)
            let skuArr = []
            arr.forEach(productItem => {
                productItem.colorSkuList.forEach(skuItem => {
                    // skuItem.mainPic = productItem.mainPic
                    skuItem.skuList.forEach(sku => {
                        sku.mainPic = productItem.mainPic
                    })
                    let skus = skuItem.skuList.filter(sku => sku.num > 0)
                    productItem.selectSku = skus
                    skuArr = skuArr.concat(skus)
                })
            })
            let designerObj = arr[0].designer
            if (skuArr.length > 0) {
                let obj = {
                    products: arr,
                    designer: designerObj,
                    skuProductList: skuArr
                }
                shopCarts.push(obj)
            }
        })
        if (shopCarts.length <= 0) {
            if (isDetail) {
                window.globalVue.$toast('没有满足购买条件的商品')
            } else {
                Dialog.alert({
                    message: '商品数据有变动，请确认后再购买'
                }).then(() => {
                    // on close
                    window.globalVue.$router.push({
                        path: '/hall/groupListDetail',
                        query: {
                            groupId: groupCode
                        }
                    })
                })
            }
        } else {
            const params = {
                jumpUrl: 'createOrder://',
                totalPrice: totalPrice,
                groupCode: groupCode,
                discount: '1',
                orderData: shopCarts
            }

            utils.postMessage('', params)
        }
    }
}
