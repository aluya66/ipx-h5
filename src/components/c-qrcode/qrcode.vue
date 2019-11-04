<template>
  <div :class="bem()">
    <div v-if="show">
      <img :src="imageUrl" :title="msg">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// import { qrcode } from 'api/innerApi'
import create from 'utils/create'

export default create({
  name: 'qrcode',
  props: {
    msg: String
  },
  data () {
    return {
      imageUrl: '',
      show: true
    }
  },
  mounted () {
    this.getQrcode()
  },
  methods: {
    getQrcode () {
      // const no = this.msg
      // qrcode({
      //   no,
      //   size: '232'
      // }).then((res) => {
      //   this.imageUrl = `data:image/png;base64,${btoa(
      //     new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), '')
      //   )}`
      // })
    }
  }
})
</script>
