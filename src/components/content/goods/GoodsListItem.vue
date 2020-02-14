<template>
<div class="goods_item">
  <img :src="goodsItem.show.img" @load="imageLoad">
  <div class="goods_info">
    <p>{{goodsItem.title}}</p>
    <span class="price">{{goodsItem.price}}</span>
    <span class="collect">{{goodsItem.cfav}}</span>
  </div>
</div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      goodsItem:{
        type:Object,
        default(){
          return{}
        }
      }
    },
    methods:{
      imageLoad(){
        //事件总线bus
        this.$bus.$emit('itemImageLoad')
      }
    }
  }
</script>
<style scoped>
  .goods_item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods_item img {
    width: 100%;
    border-radius: 5px;
  }
  .goods_info {
    /* 信息 */
    font-size: 12px;
    text-align: center;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .goods_info p {
    /* 标题 */
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods_info .price {
    /* 价格 */
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods_info .collect{
    color: var(--color-high-text);
    position: relative;
  }

  .goods_info .collect::before {
    content: "";
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }

</style>
