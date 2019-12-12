<template>
  <c-view>
    <div class="info">您已使用188 **** 6191，如需修改请重新验证手机号码后，下次登录需要使用新手机号码</div>
    <div class="form-box">
      <c-input pre-icon="mobilephone" placeholder="手机号码" v-model="iphone"></c-input>
      <c-input pre-icon="yanzhengma" placeholder="请输入短信验证码" v-model="verify">
        <template v-slot:right>
          <div class="input-btn" v-if="isShow" @click="verifyHandle">获取验证码</div>
          <div class="input-btn" v-else>{{count}}s</div>
        </template>
      </c-input>
    </div>
    <div class="btn-submit">确认修改</div>
  </c-view>
</template>

<script>
export default {
  data () {
    return {
      iphone: '',
      isShow: true,
      count: 60,
      verify: ''
    }
  },
  methods: {
    inputHandle () {
      this.$emit('input-right-handle')
    },
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
</script>

<style lang="less" scoped>
.info {
  color: @default-color;
  font-size: @f14;
  margin: 33px 49px 20px 32px;
  line-height: 24px;
}
.form-box {
  margin: 12px 12px;
  background-color: @white;
  border-radius: 4px;
}
</style>
