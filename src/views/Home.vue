<template>
  <div>
    <a-header></a-header>
    <main>
      <baidu-map class="bm-view" :ak="ak" :center="center" :zoom="zoom" :scrollWheelZoom="scrollWheelZoom" :maxZoom="maxZoom" :minZoom="minZoom"
                 @ready="handler">
      </baidu-map>
    </main>
    <footer>

    </footer>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    components:{
      aHeader: () => import("../components/header.vue"),
      baiduMap: () => import("../components/baiduMap.vue"),
    },
    data(){
      return{
        ak:'79FQV7f66aSbiwtRwOhwM3HyyFH3ul8l',
        center: {lng: 109.453324, lat: 24.336022},
        zoom: 17,
        scrollWheelZoom: true,
        maxZoom: 20,
        minZoom: 17,
      }
    },
    methods: {
      handler ({BMap, map}) {
        console.log(BMap, map)
        window.map = map   //将map变量储存在全局
      }
    }
  }

</script>

<style scoped>
  main{
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    /*z-index: -1;*/
  }
  .bm-view {
    width: 100%;
    height: 673px;
  }
</style>
