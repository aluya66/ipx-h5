<template>
  <div>
    <div>{{name}}</div>
    <button @click="btn"></button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '店铺'
    }
  },
  mounted () {
    console.log(5555)
    this.name = '店铺1'
  },
  methods: {
    btn () {
      this.name = '店铺2'
    }
  }
}
</script>
