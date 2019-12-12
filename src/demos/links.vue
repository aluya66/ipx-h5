<template>
  <div class="links">
    <div class="title">页面路由</div>
    <ul>
      <li v-for="(item, key) in items" :key="key">
        <router-link :to="`/${item}`">{{item}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import routes from '../routes/modules'

export default {
  name: 'links',
  data () {
    return {
      items: []
    }
  },
  created () {
    this.items = Object.keys(routes)
  }
}
</script>

<style lang='less' scoped>
  .links{
    padding: 20px;
    .title{
      font-size: @f28;
      color: red;
      padding: 10 20px;
      width: 100%;
      text-align: center;
      margin-bottom: 20px;
    }
    ul{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li{
        padding: 5px 10px;
        font-size: @f14;
        border: 1px solid red;
        text-align: center;
        line-height: @f14;
        margin: 10px;
      }
    }
  }
</style>
