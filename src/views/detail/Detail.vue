<template>
<div id="detail">
  <DetailNavBar @titleClick="titleClick" class="detail-nav"></DetailNavBar>
  <scroll class="content" ref="scroll">
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/>
    <detail-param-info ref="params" :param-info="paramInfo"/>
    <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
    <detail-recommend-info ref="recommend" :recommend-list="recommendList" @detailImageLoad="detailImageLoad"></detail-recommend-info>
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
  import {debounce} from "../../common/Utils";

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
        commentInfo: {},
        themeTopYs:[],
        getThemeTopY:null
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
        //获取参数信息
        this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //保存评论信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
          console.log(this.commentInfo);
        }

        // 给top数组赋值,防抖操作
        this.getThemeTopY=debounce(()=>{
          this.themeTopYs=[]
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        },100)
      })

      getRecommend().then((res, error) => {
        if (error) return
        this.recommendList = res.data.list
      })
    },
    mounted() {
    },
    updated() {
    },
    methods:{
      detailImageLoad(){
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
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
