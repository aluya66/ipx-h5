/**
 *  获取手机验证码
 */
export default {
  data () {
    return {
      isShow: true,
      count: 60
    }
  },
  methods: {
    verifyHandle () {
      this.isShow = false
      setTimeout(() => {
        this.count -= 1
        if (this.count === -1) {
          this.isShow = true
          this.count = 60
        } else {
          this.verifyHandle()
        }
      }, 1000)
    }
  }
}
