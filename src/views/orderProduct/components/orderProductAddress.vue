<template>
  <div class="contain">
    <h1>参会导航</h1>
    <img src="@/themes/images/app/map@3x.png" alt="">
    <div class="address">
      <section>
        <p>地址:</p>
        <p style="width:calc(100vw - 0.82rem)">武汉市硚口区中山大道388号武汉国际时尚中心 C馆2楼2C102-1 优选集成店</p>
      </section>
      <section>
        <p>联系人:</p>
        <p>张经理   <a href="tel:15323428080" style="">15323428080</a></p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
    components: {

    },
    props: {

    },
    data () {
        return {

        }
    }
}
</script>

<style lang='less' scoped>
.contain {
  padding:0 16px;
  h1 {
    // height: 40px;
    font-size: 28px;
    font-weight: 600;
    color: #2a2b33;
    margin-top: 64px;
    text-align: center;
  }
  img {
    display: block;
    margin-top: 24px;
    border-radius: 8px;
    // background-color: #c4c4c4;
    // height: 153px;
    width: 100%
  }
  .address {
    padding-bottom: 40px;
    section {
      display: flex;
      flex-direction: row;
      justify-content:flex-start;
      align-items: flex-start;
      margin-top: 4px;

      p {
        font-size: 12px;
        color: #585b66;
        margin: 0;
        line-height:20px;
        a{
          color: #3c5cf6
        }
      }
      &:first-child {
        margin-top: 12px;
        margin-bottom: 0;
        p:nth-child(1) {
          display: block;
          width: 50px;
          height:20px;
        }
      }
      &:last-child {
        p:nth-child(1){
          display: block;
          width: 50px;
          height:20px;
        }
      }

    }
  }
}
</style>
