<template>
    <div>
        <!-- 弹出层 -->
        <div class="CustomPopupContent " :class="{'CustomPopupContentShow':showCustomPopup}" :style="getBottomOffset(0)">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import utils from 'utils'
export default {
  data () {
    return {
      showCustomPopup: false
    }
  },
  methods: {
    showCustom () {
      this.showCustomPopup = true
    },
    maskClick () {
      this.showCustomPopup = false
    },
    getBottomOffset (offset) {
      return utils.bottomOffset(offset)
    }
  }
}
</script>

<style scoped>
    .CustomPopupContent {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        transition: all 0.3s ease;
        transform: translateY(100%);
        z-index: 3000;
        background: #fff;
        box-shadow:0px -1px 6px 0px rgba(33,44,98,0.06);
        border-radius:12px 12px 0px 0px;
    }

    .CustomPopupContentShow {
        transform: translateY(0);
    }
</style>
