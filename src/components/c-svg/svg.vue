<template>
  <svg :class="[bem(), svgClass]" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
import create from 'utils/create'

export default create({
  name: 'svg',
  props: {
    name: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.name}`
    },
    svgClass () {
      if (this.className) {
        return 'c-svg ' + this.className
      } else {
        return ''
      }
    }
  }
})
</script>

<style scoped>
.c-svg {
  font-size: 32px;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
