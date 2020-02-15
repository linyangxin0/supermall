<template>
<div id="detail">
  <DetailNavBar class="detail-nav"></DetailNavBar>
  <scroll class="content">
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detail-info="detailInfo"/>
  </scroll>

</div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import {getDetail,Goods,Shop} from "network/detail";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import Scroll from "components/common/scroll/Scroll";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";

  export default {
    name: "detail",
    components:{
      DetailBaseInfo,
      DetailNavBar,
      DetailSwiper,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo
    },
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{}
      }
    },
    created() {
      //保存iid
      this.iid=this.$route.params.iid

      //请求数据
      getDetail(this.iid).then(res=>{
        console.log(res);
        const data=res.result
        //轮播图数据
        this.topImages=data.itemInfo.topImages

        //获取商品信息
        this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        //创建店铺信息
        this.shop=new Shop(data.shopInfo)

        //保存商品详情数据
        this.detailInfo=data.detailInfo
      })

    }
  }
</script>

<style scoped>

  #detail{
    position: relative;
    z-index: 9;
    background-color: white;
    height: 100vh;
  }

  .content{
    height: calc(100% - 44px);
  }

  .detail-nav{
    position: relative;
    z-index:9;
    background-color: white;
  }
</style>
