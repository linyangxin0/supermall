<template>
  <div>
    <swiper class="detail-swiper" v-if="topImages.length">
      <swiper-item v-for="item in topImages" class="swiper-item" >
        <img :src="item">
      </swiper-item>
    </swiper>
  </div>

</template>

<script>

  import {Swiper,SwiperItem} from "components/common/swiper";
  export default {
    name: "DetailSwiper",
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      topImages:{
        type:Array,
        default(){
          return[]
        }
      }
    }
  }
</script>

<style scoped>
  .swiper-item{
    height: 300px;
    /*overflow: hidden;*/
    text-align: center;
  }
</style>
