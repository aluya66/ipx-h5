import utils from 'utils'
import {
    Dialog
} from 'vant'

export default {
    createOrder(groupName, groupGoods, groupCode, isDetail) {
        let shopCarts = []
        let oldGoods = JSON.parse(JSON.stringify(groupGoods))
        let products = []
        let totalPrice = 0
        oldGoods.forEach((good, goodIndex) => {
            let batchNum = good.minBatchNum
            let selectSku = 0
            if (good.productShelves === 1) {
                good.colorSkuList = good.colorSkuList.filter((item) => {
                    item.skuList = item.skuList.filter((skuItem) => {
                        selectSku += skuItem.num
                        return (skuItem.num > 0) && (skuItem.entityStock >= skuItem.num)
                    })
                    return item.skuList.length > 0
                })
                if (good.colorSkuList.length > 0 && selectSku >= batchNum) {
                    products.push(good)
                }
            }
        })
        let designerIds = []
        products.forEach(item => {
            let index = designerIds.indexOf(item.designer.id)
            if (index < 0) {
                designerIds.push(item.designer.id)
            }
        })
        designerIds.forEach(idStr => {
            let arr = products.filter(item => item.designer.id === idStr)
            let skuArr = []
            arr.forEach(productItem => {
                let selectSkus = []
                productItem.colorSkuList.forEach(skuItem => {
                    skuItem.skuList.forEach(sku => {
                        totalPrice += Number(sku.defaultSkuPrice) * Number(sku.num)
                        sku.mainPic = sku.skuDefaultImg
                    })
                    let skus = skuItem.skuList.filter(sku => sku.num > 0)
                    selectSkus = selectSkus.concat(skus)
                    skuArr = skuArr.concat(skus)
                })
                productItem.selectSku = selectSkus
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
                totalPrice: totalPrice + '',
                groupName: groupName,
                groupCode: groupCode === undefined ? '' : groupCode + '',
                discount: '1',
                orderData: shopCarts
            }
            utils.postMessage('', params)
        }
    }
}
