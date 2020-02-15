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
    <div class="detail-base-info-service-info">
      <div>{{goods.columns[0]}}</div>
      <div>{{goods.columns[1]}}</div>
      <div>{{goods.services[3].name}}</div>
    </div>
    <div>
      <div class="detail-base-info-services">
        <span v-for="index in goods.services.length-1">
          <img :src="goods.services[index-1].icon">
          <span>{{goods.services[index-1].name}}</span>
        </span>
      </div>
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

  .detail-base-info-service-info{
    margin-top: 10px;
    display: flex;
    text-align: center;
    font-size: 12px;
    color: #999999;
    border-bottom: 1px solid rgba(100,100,100,.1);
    padding-bottom: 10px;
  }

  .detail-base-info-service-info div{
    flex: 1;
    text-align: center;
  }

  .detail-base-info-services{
    margin-top: 10px;
    padding-bottom: 10px;
    display: flex;
    font-size: 13px;
    border-bottom: 3px solid rgba(100,100,100,.1);
  }

  .detail-base-info-services span{
    flex: 1;
    text-align: center;
  }

  .detail-base-info-services img{
    width: 12px;
    height: 12px;
  }



</style>
