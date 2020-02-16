<template>
  <div class="detail-goods-info" v-if="Object.keys(detailInfo).length !== 0">
    <div class="top">
      {{detailInfo.desc}}
    </div>
    <div class="center">
      {{detailInfo.detailImage[0].key}}
    </div>
    <div  class="detail-goods-images">
        <img v-for="(item,index) in detailInfo.detailImage[0].list" :src="item" @load="imgLoad">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsInfo",
    props:{
      detailInfo:{
        type:Object
      }
    },
    data(){
      return{
        counter:0,
        imagesLength:0
      }
    },
    methods:{
      imgLoad(){
        if(++this.counter===this.imagesLength)
          this.$emit('detailImageLoad')
      }
    },
    watch:{
      detailInfo(){
        this.imagesLength=this.detailInfo.detailImage[0].list.length
      }
    }
  }
</script>

<style scoped>

  .detail-goods-info{
    border-top: 1px solid rgba(100,100,100,.1);
    margin-top: 15px;
    padding-top: 15px;
  }

  .detail-goods-info .top{
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(100,100,100,.1);
  }

  .detail-goods-info .center{
    padding-top: 15px;
    color: black;
  }

  .detail-goods-images img{
    width: 100%;
  }
</style>
