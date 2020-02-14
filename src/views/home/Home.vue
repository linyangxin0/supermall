<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScrol"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"/>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
<!--    组件的原生事件监听要使用native属性-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from "./childComponents/HomeSwiper";
  import RecommendView from "./childComponents/RecommendView";
  import FeatureView from "./childComponents/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backtop/BackTop";

  import {getHomeMultidata, getHomeGoods} from "../../network/home";
  import {debounce} from "common/Utils";

  export default {
    name: "Home",
    components:{
      BackTop,
      RecommendView,
      NavBar,
      HomeSwiper,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        curretType:'pop',
        isShowBackTop:false,
        tabOffSetTop:0,
        isTabFixed:false,
        saveY:0
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.curretType].list
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()

      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      //监听item中图片的加载完成
      //防抖动函数调用
      const refresh=debounce(this.$refs.scroll.refresh,500)
      this.$bus.$on('itemImageLoad',()=>{
        //使用上述的refresh
        refresh()
      })
    },
    beforeDestroy() {
      this.$bus.$off()
    },
    //返回home时保持位置
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    //离开home时，记录位置
    deactivated(){
      this.saveY=this.$refs.scroll.getScrollY()
    },
    methods:{
      /**
       * 网络请求方法
       */
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          this.banners=res.data.banner.list
          this.recommends=res.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page=this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page+=1
          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      },
      /**
       * 事件监听方法
       */
      tabClick(index){
        switch (index) {
          case 0:
            this.curretType='pop'
            break
          case 1:
            this.curretType='new'
            break
          case 2:
            this.curretType='sell'
            break
        }
        this.$refs.tabControl1.currentIndex=index
        this.$refs.tabControl2.currentIndex=index
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScrol(position){
        //决定BackTop是否显示
        this.isShowBackTop=(-position.y)>1000

        //决定tabControll是否吸顶
        this.isTabFixed=(-position.y)>this.tabOffSetTop
      },
      loadMore(){
        this.getHomeGoods(this.curretType)
      },
      swiperImageLoad(){
        this.tabOffSetTop=this.$refs.tabControl2.$el.offsetTop
      }
    }
  }
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: white;
  }

  .content{
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
  }

  .tab-control{
    position: relative;
    z-index: 9;
  }

</style>
