<template>
    <div>

    </div>
</template>

<script>
export default {
  data () {
    return {
      participantCode: '',
      bookActivityCode: '',
      appid: 'wxc2d190b40fb12b9d',
      redirect_uri: 'https%3A%2F%2Fh5.yosar.com%2Fipxhybrid%2F'
      //   appendUrl: '/testStyle/vote'
    }
  },
  created () {
    this.participantCode = this.$route.query.participantCode
    this.bookActivityCode = this.$route.query.bookActivityCode
  },
  mounted () {
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appid}&redirect_uri=${this.redirect_uri}%3FparticipantCode%3D${this.participantCode}%26bookActivityCode%3d${this.bookActivityCode}&response_type=code&scope=snsapi_userinfo&state=12`
  }

}
</script>
