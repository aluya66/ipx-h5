<template>
  <layout-view>
    <div
      class="-openinstall-banner openinstall-banner"
      style="position: fixed; left: 0; bottom: 0; width: 100%; background: rgba(9, 9, 9, 0.5)"
    >
      <table style="table-layout: fixed; width: 100%;" border="0" cellspacing="0" cellpadding="0">
        <tbody>
          <tr>
            <td style class="logo">
              <img
                class="-openinstall-banner-icon"
                src="https://res.cdn.openinstall.io/app_icon/bj5q9y/6642324794889720759-1565679966853.png"
                alt
                style="vertical-align: middle;  "
              />
            </td>
            <td style="vertical-align: middle;  text-align: left">
              <p
                class="-openinstall-banner-title"
                style=" margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: rgb(255, 255, 255)"
              >每日尚来</p>
              <p
                class="-openinstall-banner-desc"
                style=" margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: rgb(255, 255, 255)"
              >欢迎进入每日尚来</p>
            </td>
            <td class="openinstall-btn" style="vertical-align: middle; ">
              <a class="-openinstall-banner-button" href="javascript:void;" style>进入App</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </layout-view>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.openinstall-banner {
  td {
  }
  img {
    width: 41px;
    height: 41px;
    margin: 0 5px;
  }
  .logo {
    width: 50px;
    height: 60px;
    vertical-align: middle;
    text-align: center;
  }
  .-openinstall-banner-title {
    font-size: 18px;
    line-height: 25px;
  }
  .-openinstall-banner-desc {
    font-size: 14px;
  }

  .openinstall-btn {
    height: 60px;
    text-align: center;
    width: 100px;
    .-openinstall-banner-button {
      display: inline-block;
      text-decoration: none;
      cursor: pointer;
      font-size: 14px;
      margin: 0;
      border-radius: 15px;
      padding: 12px 20px;
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border: rgb(224, 14, 14) solid 1px;
      background: rgb(224, 14, 14);
      color: rgb(255, 255, 255);
    }
  }
}
</style>