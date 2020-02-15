<template>
  <div>
    <div>
      <div class="detail-base-info-title">{{goods.title}}</div>
    </div>
    <div class="detail-base-info-price">
      <div class="detail-base-info-newprice">{{goods.newPrice}}</div>
      <span><s>{{goods.oldPrice}}</s></span>
      <div class="detail-base-info-discount">{{goods.discount}}</div>
    </div>
  </div>


</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props:{
      goods:{
        type:Object,
        default(){
          return{}
        }
      }
    }
  }
</script>

<style scoped>

  .detail-base-info-title{
    margin-top: 10px;
    margin-left: 5px;
    margin-right: 5px;
    font-size: 16px;
    color: black;
  }

  .detail-base-info-price{
    display: flex;
    margin-top: 10px;
  }

  .detail-base-info-newprice{
    color: var(--color-high-text);
    font-size: 20px;
    margin-left: 10px;
  }

  .detail-base-info-price s{
    font-size: 12px;
    color: #999999;
    margin-left: 8px;
    margin-bottom: 0;
  }

  .detail-base-info-discount{
    background-color: #ff5777;
    color: white;
    font-size: 12px;
    margin: 3px;
    border-radius: 25px;
  }
</style>
