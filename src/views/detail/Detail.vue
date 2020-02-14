<template>
<div id="detail">
  <DetailNavBar></DetailNavBar>
  <detail-swiper :top-images="topImages"></detail-swiper>
</div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import {getDetail} from "network/detail";
  import DetailSwiper from "./childComps/DetailSwiper";

  export default {
    name: "detail",
    components:{
      DetailNavBar,
      DetailSwiper
    },
    data(){
      return{
        iid:null,
        topImages:[]
      }
    },
    created() {
      //保存iid
      this.iid=this.$route.params.iid

      //请求数据
      getDetail(this.iid).then(res=>{
        console.log(res);
        this.topImages=res.result.itemInfo.topImages
      })
    }
  }
</script>

<style scoped>

</style>
