<template>
  <layout-view>
    <c-header slot="header" :left-arrow="true">
      <div slot="title">编辑组货名称</div>
    </c-header>
    <div class="panel">
      <van-field v-model="groupName" clearable placeholder="请输入组货名称" />
      <button @click="commit">完成</button>
    </div>
  </layout-view>
</template>

<script>
import { Field } from "vant";
// import utils from 'utils'
export default {
  components: {
    [Field.name]: Field
  },
  data() {
    return {
      groupName: ''
    };
  },
  activated() {
      this.groupName = this.$route.query.name
  },
  methods: {
    commit() {
      if (this.groupName === "") {
        this.$toast("请输入组货名称");
        return;
      }
      const params = {
        groupGoodsId: this.$route.query.groupGoodsId,
        name: this.groupName
      };
      this.$api.groupGoods
        .updateGroupListDetail(params)
        .then(res => {
          if (res.code === 0) {
            this.$toast.success("已修改");
            this.$router.go(-1);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.panel {
  height: calc(100vh - 55px);
  background-color: white;
  padding: 8px 10px 0 0;
  > button {
    margin: 32px 16px;
    height: 50px;
    width: calc(100vw - 32px);
    background: @color-ec;
    border-radius: 25px;
    font-size: 18px;
    font-weight: 500;
    color: white;
    line-height: 25px;
  }
}
</style>
