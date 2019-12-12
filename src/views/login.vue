<template>
  <c-view>
    <div class="title">欢迎您 请<span>登录</span></div>
    <div class="form-box">
      <c-input pre-icon="mobilephone" placeholder="手机号码" v-model="iphone"></c-input>
      <c-input pre-icon="yanzhengma" placeholder="请输入短信验证码" v-model="verify">
        <template v-slot:right>
          <div class="input-btn" v-if="isShow" @click="verifyHandle">获取验证码</div>
          <div class="input-btn" v-else>{{count}}s</div>
        </template>
      </c-input>
    </div>
    <div class="btn-submit" @click="routerLink('/')">登录</div>
    <div class="login-register-bottom">
      还没有账号？立即
      <router-link to="/register">
        <span>注册</span>
      </router-link>
    </div>
  </c-view>
</template>

<script>
import CheckVerify from './mixins/checkVerify'

export default {
  mixins: [CheckVerify],
  data () {
    return {
      iphone: '',
      verify: ''
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.title {
  margin: 42px 0 24px 0;
  color: @label-color;
  font-size: @f30;
  text-align: center;
  span{
    font-weight: 600;
  }
}
.form-box {
  background-color: @white;
  border-radius: 4px;
  margin: 0 12px;
}
</style>
