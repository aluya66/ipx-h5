<template>
  <c-view>
    <ul class="list">
      <li class="picture">
        <span class="name">头像</span>
        <div class="poster">
          <img src="~/images/ic_successful.png" />
        </div>
        <c-icon name="jiantou" class="picture-icon"></c-icon>
      </li>
      <li>
        <span class="name">手机号码</span>
        <span class="phone">185 6515 2515</span>
        <c-icon name="jiantou" class="icon-small"></c-icon>
      </li>
    </ul>
  </c-view>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.list {
  margin: 0 12px;
  li {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid @default-border;
    padding: 15px 0;

    .name {
      width: 20%;
      font-size: @f14;
      color: @default-color;
    }
    .phone {
      width: 70%;
      text-align: right;
    }
  }
  li.picture {
    .name{
      margin-top: 16px;
    }
    .picture-icon {
      margin-top: 16px;
      font-size: @f16;
    }
    .poster {
      width: 70%;
      text-align: right;
      img {
        display: inline-block;
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
    }
  }
}
</style>
