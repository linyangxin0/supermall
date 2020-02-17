<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center" >
        购物车({{cartLength}})
      </div>
    </nav-bar>
    <cart-list></cart-list>
  </div>
</template>

<script>

  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";

  import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    components: {NavBar,CartList},
    computed:{
      //将store中getters映射到此
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

  .cart{
    height: 100vh;
  }
</style>
