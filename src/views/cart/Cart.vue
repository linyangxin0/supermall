<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center" >
        购物车({{cartLength}})
      </div>
    </nav-bar>
  </div>
</template>

<script>

  import NavBar from "components/common/navbar/NavBar";

  import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    components: {NavBar},
    computed:{
      //映射setters
      ...mapGetters(['cartLength'])
      //如果需要改名，可以写成对象，如下：
      // ...mapGetters({
      //   length:'cartLength'
      // })
    }
  }
</script>

<style scoped>

  .nav-bar{
    background-color: var(--color-tint);
    color: white;
    font-weight: 700;
  }
</style>
