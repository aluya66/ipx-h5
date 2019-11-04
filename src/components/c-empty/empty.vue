<template>
  <div :class="[bem(), className]">
    <img src="~images/img_no_record.png">
    <div class="emptyMsg">{{name}}</div>
  </div>
</template>

<script>
import create from 'utils/create'

export default create({
  name: 'empty',
  props: {
    className: [String, Object, Array],
    name: {
      type: String,
      default () {
        return this.$t('tip.empty')
      }
    }
  }
})
</script>

<style lang='less'>
.c-empty {
  overflow: hidden;
  margin: 120px auto 0 auto;
  text-align: center;
  img {
    width: 126px;
    height: 84px;
    display: inline-block;
  }
  .emptyMsg {
    margin-top: 16px;
    font-size: @f14;
    color: @text-empty;
    line-height: @f14;
  }
}
</style>
