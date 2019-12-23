<template>
   <div class="empty">
       <img :src="getImage" alt="">
       <p>{{emptyDesc}}</p>
   </div>
</template>

<script>
export default {
    components: {

    },
    props: {
        emptyType: {
            type: String,
            default: 'build'
        },
        emptyDesc: {
            type: String,
            default: '业务建设中，敬请期待'
        }
    },
    data () {
        return {
            buildImg: require('@/themes/images/app/default_empty.png'),
            errorImg: require('@/themes/images/app/default_no search copy@2x.png'),
            groupImg: require('@/themes/images/empty_Exhibition.png'),
            hallImg: require('@/themes/images/empty_hall.png')
        }
    },
    computed: {
        getImage() {
            switch (this.emptyType) {
            case 'build':
                return this.buildImg
            case 'error':
                return this.errorImg
            case 'groupEmpty':
                return this.groupImg
            case 'hallEmpty':
                return this.hallImg
            default:
                break
            }
            return this.buildImg
        }
    }
}
</script>

<style lang='less' scoped>
.empty {
    background:rgba(255,255,255,1);
    text-align: center;
    p {
        font-size:14px;
        font-weight:400;
        color:rgba(138,140,153,1);
        line-height:20px;
        text-align: center;
        margin-top: 12px;
    }
    img {
        height: 184px;
        object-fit: cover;
    }
}
</style>
