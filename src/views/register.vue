<template>
  <c-view>
    <div class="title">立即注册</div>
    <div class="form-box">
      <c-input pre-icon="mobilephone" placeholder="手机号码"></c-input>
    </div>
    <div class="validate">
      <img src alt />
      <div class="line-container">
        请拖动滑块至正确缺口 >>
        <div class="line">
          <c-icon name="arrows-2-7-copy-copy-copy" class="ver-icon"></c-icon>
        </div>
      </div>
    </div>
    <div class="form-box">
      <c-input pre-icon="yanzhengma" placeholder="请输入短信验证码">
        <template v-slot:right>
          <div class="input-btn" v-if="isShow" @click="verifyHandle">获取验证码</div>
          <div class="input-btn" v-else>{{count}}s</div>
        </template>
      </c-input>
    </div>
    <div class="btn-submit">开始使用</div>

    <div class="login-register-bottom">
      已有账号？请直接
      <router-link to="/login">
        <span>登录</span>
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
      verify: ''
    }
  },
  methods: {}
}
</script>

<style lang="less">
.title {
  margin-top: 22px;
  margin-bottom: 24px;
  color: @label-color;
  font-size: @f30;
  font-weight: 600;
  text-align: center;
}
.form-box {
  background-color: @white;
  border-radius: 4px;
  margin: 0 @safe-width;
}
.validate {
  margin: 13px @safe-width 12px @safe-width;
  img {
    height: 175px;
    background: #fff;
    border-radius: 4px;
    margin-bottom: 7px;
  }
  .line-container {
    padding: 16px 0;
    line-height: 19px;
    background-color: @white;
    font-size: @f14;
    color: @title-color;
    text-align: center;
    position: relative;

    .line {
      position: absolute;
      left: 0;
      top: 0;
      border: 1px solid @verify-border;
      background-color: @verify-bg;
      padding: 13px 20px;
      border-radius: 4px;
    }
  }
}

</style>
