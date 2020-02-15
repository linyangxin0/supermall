<template>
  <div>
    <div class="detail-shop-top">
      <img :src="shop.logo"/>
      <span>{{shop.name}}</span>
    </div>
    <div class="detail-shop-cnter">
      <div class="left1">
        <div class="left2">
          <div class="num">{{shop.sells}}</div>
          <div class="title">总销量</div>
        </div>
        <div class="right2">
          <div class="num">{{shop.goodsCount}}</div>
          <div class="title">全部宝贝</div>
        </div>
      </div>
      <div class="right1">
        <div v-for="(item,index) in shop.score">
          <span class="left2">{{item.name}}</span>
          <span class="right2" :class="{better:item.isBetter}">{{item.score}}</span>
        </div>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailShopInfo",
    props:{
      shop:{
        type:Object
      }
    },
    methods:{

    }
  }
</script>

<style scoped>
  .detail-shop-top{
    margin-top: 15px;
    margin-left: 10px;
    line-height: 45px;
    /* 让元素垂直中心对齐 */
    display: flex;
    align-items: center;
  }
  .detail-shop-top img{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,.1);
  }

  .detail-shop-top span{
    margin-left: 15px;
    vertical-align: center;
  }

  .detail-shop-cnter{
    display: flex;
    flex: 1;
    padding: 10px;
  }

  .detail-shop-cnter .left1{
    display: flex;
    flex: 1;
    border-right: 1px solid rgba(100,100,100,.1);
  }

  .detail-shop-cnter .left1 .left2{
    /*margin-right: 10px;*/
    width: 89.32px;
    vertical-align: center;
  }

  .detail-shop-cnter .left1 .right2{
    /*margin-left: 10px;*/
    width: 89.32px;
  }

  .detail-shop-cnter .left1 .title{
    font-size: 10px;
    margin-top: 10px;
    text-align: center;

  }

  .detail-shop-cnter .left1 .num{
    font-size: 20px;
    margin-top: 10px;
    text-align: center;
  }

  .detail-shop-cnter .right1{
    margin-left: 10px;
  }


  .detail-shop-cnter .right1 span{
    padding: 5px;
    font-size: 12px;
  }


  .shop-bottom {
    text-align: center;
  }

  .enter-shop {
    display: inline-block;
    font-size: 14px;
    background-color: #f2f5f8;
    width: 150px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
  }

  .better{
    color: #ff5777;
  }




</style>
