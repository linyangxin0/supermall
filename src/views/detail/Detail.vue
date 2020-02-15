<template>
<div id="detail">
  <DetailNavBar class="detail-nav"></DetailNavBar>
  <scroll class="content" ref="scroll">
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
    <detail-param-info :param-info="paramInfo"/>
    <detail-comment-info></detail-comment-info>
    <detail-recommend-info></detail-recommend-info>
  </scroll>

</div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import Scroll from "components/common/scroll/Scroll";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailRecommendInfo from "./childComps/DetailRecommendInfo";

  export default {
    name: "detail",
    components:{
      DetailBaseInfo,
      DetailNavBar,
      DetailSwiper,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailRecommendInfo,
      DetailCommentInfo
    },
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        recommendList:[],
        commentInfo:{}
      }
    },
    created() {
      //保存iid
      this.iid=this.$route.params.iid

      //请求数据
      getDetail(this.iid).then(res=>{
        const data=res.result
        //轮播图数据
        this.topImages=data.itemInfo.topImages

        //获取商品信息
        this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        //创建店铺信息
        this.shop=new Shop(data.shopInfo)

        //保存商品详情数据
        this.detailInfo=data.detailInfo
        //获取参数信息
        this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //保存评论信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
      })

      getRecommend().then((res, error) => {
        if (error) return
        this.recommendList = res.data.list
      })
    },
    methods:{
      imageLoad(){
        this.refs.scroll.refresh()
      }
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
