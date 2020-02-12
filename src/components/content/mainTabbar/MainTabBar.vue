<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="green">
      <img slot="item-icon" src="~assets/img/tabbar/plant-01.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/plant-01-actived.svg">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="green">
      <img slot="item-icon" src="~assets/img/tabbar/plant-14.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/plant-14-actived.svg">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="green">
      <img slot="item-icon" src="~assets/img/tabbar/plant-07.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/plant-07-actived.svg">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="green">
      <img slot="item-icon" src="~assets/img/tabbar/plant-13.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/plant-13-actived.svg">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>

  import TabBarItem from "components/common/tabbar/TabBarItem";
  import TabBar from "components/common/tabbar/TabBar";

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
