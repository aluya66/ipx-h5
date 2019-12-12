<template>
  <c-view>
    <c-panel label="必填信息">
      <div class="form-box">
        <c-input label="姓名" dir="right" placeholder="姓名"></c-input>
        <c-input label="手机号码所在地" after-icon="jiantou" dir="right" placeholder="手机号码所在地"></c-input>
        <c-input label="手机号码" dir="right" placeholder="手机号码"></c-input>
      </div>
    </c-panel>
    <c-panel label="选填信息">
      <div class="form-box">
        <c-input label="证件类型" dir="right" placeholder="证件类型" after-icon="jiantou"></c-input>
        <c-input label="证件号码" after-icon="jiantou" dir="right" placeholder="证件号码"></c-input>
        <c-input label="性别" dir="right" placeholder="性别" after-icon="jiantou"></c-input>
        <c-input label="出生日期" dir="right" placeholder="出生日期" after-icon="jiantou"></c-input>
        <c-input label="成员关系" after-icon="jiantou" dir="right" placeholder="成员关系"></c-input>
      </div>
    </c-panel>
    <div class="info">
        <p>温馨提示</p>
        <p>婴幼儿身份证信息可在户口本中查看，若未办理可不填写证件号码，部分医院未填写身份证无法预约挂号。</p>
    </div>
    <div class="fix-submit">保存</div>
  </c-view>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.form-box {
  background-color: @white;
  border-radius: 4px;
}

.info{
    margin: 0 12px;
    color:@title-color;
    font-size: @f14;
    line-height: 18px;
}
</style>
