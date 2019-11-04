<template>
  <c-view title="积分明细">
    <label>c-tab</label>
    <c-tab :tabs="tabs" :currentTab="currentTab" @onClick="handleClick"></c-tab>

    <label>c-card</label>
    <c-card></c-card>

     <label>c-header</label>
     <c-header>12313<template slot="right">3213132</template></c-header>

     <label>c-loading</label>
     <c-loading></c-loading>

     <label>c-nav</label>
     <c-nav :resData="[{title:1112,picUrl:''},{title:1112,picUrl:''}]"></c-nav>

     <label>c-panel</label>
     <c-panel label="21212" isMore>
       <c-card></c-card>
    </c-panel>

     <label>c-popup</label>
     <!-- <c-popup>23223</c-popup> -->

<label>c-spinner</label>
<c-spinner></c-spinner>

<label>c-toast</label>
<!-- <c-toast :content-obj="{title:21212, msg:13213}" show></c-toast> -->

    <!-- <component :is="currentTabComponent" :type="type"></component> -->
  </c-view>
</template>

<script>
// import listSort from '../common/scroll-list.vue'

export default {
  data () {
    return {
      tabs: [{
        title: 'Tab 1',
        value: 'listCom_3'
      }, {
        title: 'Tab 2',
        value: 'listCom_5'
      }, {
        title: 'Tab 3',
        value: 'listCom_8'
      }],
      type: 3,
      currentTab: 'listCom_3'
    }
  },
  // computed: {
  //   currentTabComponent () {
  //     return listSort
  //   }
  // },
  methods: {
    handleClick (tab) {
      this.currentTab = tab.value
      const num = tab.value.split('_')
      this.type = Number(num[1])
    }
  },
  components: {
    // listSort
  }
}
</script>
