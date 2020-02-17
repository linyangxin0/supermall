<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  export default {
    name: "CartButtonBar",
    components:{
      CheckButton
    },
    computed:{
      totalPrice(){
        return '￥'+this.$store.getters.cartList.filter(item=>{
          return item.checked
        }).reduce((preValue,item)=>{
          return preValue+item.price*item.count
        },0)
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    position: relative;
    display: flex;

    line-height: 40px;
    height: 40px;

    background-color: #eee;
  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price{
    margin-left: 20px;
  }
</style>
