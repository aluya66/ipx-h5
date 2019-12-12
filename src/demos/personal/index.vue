<template>
  <c-view>
    <div class="header">
      <img class="poster" src="~/images/ic_successful.png" />
      <div class="phone">188****9596</div>
      <c-icon name="jiantou" class="icon-small"></c-icon>
    </div>
    <div class="nav">
      <div class="item">
        <c-icon name="activity" class="icon-big icon-active"></c-icon>
        <p class="title">我的预约</p>
      </div>
      <div class="item">
        <c-icon name="barrage" class="icon-big icon-red"></c-icon>
        <p class="title">检查档案</p>
      </div>
    </div>
    <c-panel label="就诊人管理" isShow class="panel">
      <template v-slot:right>
        <c-icon name="addition"></c-icon>
        <span class="panel-add">新增</span>
      </template>
      <c-list :list-items="listItems" class-name="panel">
        <template v-slot="slotProps">
          <div class="list-slot">
            <span class="name">
              {{slotProps.item.name}}
              <c-icon name="checkboxes" class="default-icon"></c-icon>
            </span>
            <span class="phone">{{showPhone(slotProps.item.phone)}}</span>
          </div>
          <c-icon name="jiantou" class="enter-arrow"></c-icon>
        </template>
      </c-list>
    </c-panel>
  </c-view>
</template>

<script>
export default {
  data () {
    return {
      listItems: [
        {
          name: '李梓淇1',
          phone: '1882131331'
        },
        {
          name: '李梓淇2',
          phone: '1882131332'
        },
        {
          name: '李梓淇3',
          phone: '1882131333'
        }
      ]
    }
  },
  methods: {
    showPhone (num) {
      console.log(num)
      return num.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  margin: 20px 12px;
  line-height: 72px;
  justify-content: space-between;
  .poster {
    width: 72px;
    height: 72px;
    border-radius: 50%;
  }
  .phone {
    font-size: @f22;
    font-weight: bold;
    color: @label-color;
    width: 68%;
  }
}
.nav {
  background-color: @white;
  margin-bottom: 20px;
  display: flex;
  .item {
    width: 50%;
    text-align: center;
    margin: 10px 0;
    border-right: 1px solid @default-border;

    .title {
      color: @default-color;
      font-size: @f14;
    }
  }
  .item:last-child {
    border-right: none;
  }
}

.panel-add{
    position: relative;
    top: 2px;
}

.list-slot {
  span {
    display: block;
  }
  .name {
    margin-bottom: 4px;
    font-size: @f18;
    font-weight: 600;
    color: @label-color;
  }
  .phone {
      color:@title-color;
  }
}

.default-icon{
    margin-left:12px;
    height:20px;
}

.enter-arrow {
  position: relative;
  top: 10px;
  font-size: @f16;
}

</style>
