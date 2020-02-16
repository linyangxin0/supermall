<template>
  <div class="all">
    <div class="detail-recommend-title">
      热门推荐
    </div>

    <div class="goods">
      <div  class="goods_item" v-for="item in recommendList">
          <img :src="item.image" @load="imgLoad">
          <div class="goods_info">
            <p>{{item.title}}</p>
            <span class="price">{{item.discountPrice}}</span>
            <span class="collect">{{item.cfav}}</span>
          </div>
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    name: "DetailRecommendInfo",
    props:{
      recommendList:{
        type:Array
      }
    },
    data(){
      return{
        counter:0,
        imagesLength:0
      }
    },
    mounted() {
      this.imagesLength=this.recommendList.length
    },
    methods:{
      imgLoad(){
        if(++this.counter===this.imagesLength)
          this.$emit('detailImageLoad')
      }
    },
  }
</script>

<style scoped>
  .all{
    background-color: white;
    padding: 10px;
  }

  .detail-recommend-title{
    margin-top: 10px;
    margin-left: 10px;
    color: #333333;
    margin-bottom: 20px;
  }

  .goods{
    display: flex;
    flex-wrap: wrap;

  }

  .goods_item {
    width: 50%;
    padding-bottom: 40px;
    position: relative;
  }

  .goods_item img {
    width: 97%;
    padding-left: 2px;
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
