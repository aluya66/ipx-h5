import utils from 'utils'
import { Dialog } from 'vant'

export default {
    createOrder(groupGoods, totalPrice, groupCode) {
        let shopCarts = []
        let products = groupGoods
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
            Dialog.alert({
                message: '商品数据有变动，请确认后再购买'
            }).then(() => {
                // on close
                window.globalVue.$router.push({ path: '/hall/groupListDetail', query: { groupId: groupCode } })
            })
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
