<template>
<div id="detail">
  <DetailNavBar @titleClick="titleClick" class="detail-nav" ref="nav"></DetailNavBar>
  <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/>
    <detail-param-info ref="params" :param-info="paramInfo"/>
    <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
    <detail-recommend-info ref="recommend" :recommend-list="recommendList" @detailImageLoad="detailImageLoad"></detail-recommend-info>
  </scroll>
  <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  <detail-bottom-bar @addCart="addToCart"/>
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
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import {backTop} from "common/mixin"



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
      DetailCommentInfo,
      DetailBottomBar,
    },
    mixins:[backTop],
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
        getThemeTopY:null,
        currentIndex:0,
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
          this.themeTopYs.push(Number.MAX_VALUE)
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
      },
      contentScroll(position){
        // 获取Y值
        const positionY=-position.y

        // 与主题中的值进行对比
        let length=this.themeTopYs.length
        //条件一是防止赋值条件过于频繁，条件二是获取争取的i
        for(let i=0;i<length-1;i++){
          if(this.currentIndex!==i&&(positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])){
              this.currentIndex=i
              this.$refs.nav.currentIndex=this.currentIndex
          }
        }

        //是否显示回到顶部
        this.isShowBackTop=(-position.y)>1000
      },
      addToCart(){
        //1.获取购物车需要展示的商品信息
        const product={}
        product.image=this.topImages[0]
        product.title=this.goods.title
        product.desc=this.goods.desc
        product.price=this.goods.realPrice
        product.iid=this.iid

        // 2、将商品添加到购物车
        this.$store.dispatch('addCart',product)
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
    height: calc(100% - 44px - 49px);
  }

  .detail-nav{
    position: relative;
    z-index:9;
    background-color: white;
  }
</style>
