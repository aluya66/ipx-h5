<template>
    <div>

    </div>
</template>

<script>
export default {
  data () {
    return {
      appid: 'wxc2d190b40fb12b9d',
      redirect_uri: 'http://h5.yosar.com'
    //   appendUrl: '/testStyle/vote'
    }
  },
  created () {

  },
  mounted () {
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appid}&redirect_uri=${this.redirect_uri}&response_type=code&scope=snsapi_userinfo&state=12`
  }

}
</script>
