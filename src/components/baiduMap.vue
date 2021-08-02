<template>
  <div id="myMap" ref="allMap"></div>
</template>

<script>
  export default {
    name: "baiduMap",
    props: {
      ak: {
        type: String
      },
      center: {
        type: [Object, String]
      },
      zoom: {
        type: Number
      },
      minZoom: {
        type: Number
      },
      maxZoom: {
        type: Number
      },
      highResolution: {
        type: Boolean,
        default: true
      },
      mapClick: {
        type: Boolean,
        default: true
      },
      mapType: {
        type: String
      },
      scrollWheelZoom: {
        type: Boolean,
        default: false
      },
      doubleClickZoom: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        tableData: [], //存放从后端传来的数据
        dialogFormError:false
      }
    },
    methods: {
      // 初始化
      reset () {
        const {setMp, initMap} = this
        setMp(this.ak).then(initMap)
      },
      // 获取BMap, 初始化地图
      initMap (BMap) {
        this.BMap = BMap
        this.init(BMap)
      },
      init (BMap) {
        let $el = this.$refs.allMap
        const map = new BMap.Map($el,{
          enableMapClick: false,
          mapType:BMAP_SATELLITE_MAP
        })
        this.map = map
        map.centerAndZoom(new BMap.Point(this.center.lng, this.center.lat), this.zoom) // 初始化地图,设置中心点坐标和地图级别
        this.setMapOptions(map)
        this.$emit('ready', {BMap, map})              //子组件向父组件传值,将BMap、map传到业务组件
        this.map_tag()
        console.log(this.tableData)
        // showBoundary()
      },
      // 设置地图配置
      setMapOptions (map) {
        map.setMinZoom(this.minZoom)
        map.setMaxZoom(this.maxZoom)
        this.scrollWheelZoom?map.enableScrollWheelZoom(true):map.disableScrollWheelZoom(true)//是否启鼠标滚轮缩放
        map.addControl(
          new BMap.MapTypeControl({
            //添加地图类型控件
            mapTypes: [BMAP_SATELLITE_MAP
              // ,BMAP_NORMAL_MAP
            ]
          })
        )
        map.addControl(new BMap.NavigationControl())
        map.addControl(new BMap.OverviewMapControl({
          anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
          isOpen: true
        }))
      },
      setMp(ak) {
        if (!global.BMap) {
          global.BMap = {}
          global.BMap._preloader = new Promise((resolve, reject) => {
            global._initBaiduMap = function () {
              resolve(global.BMap)
              global.document.body.removeChild($script)
              global.BMap._preloader = null
              global._initBaiduMap = null
            }
            const $script = document.createElement('script')
            global.document.body.appendChild($script)
            $script.src = `https://api.map.baidu.com/api?v=2.0&ak=${ak}&callback=_initBaiduMap`
          })
          return global.BMap._preloader
        } else if (!global.BMap._preloader) {
          return Promise.resolve(global.BMap)
        } else {
          return global.BMap._preloader
        }
      },
      fetchdata() {
        this.$axios
          .get("map/listAll")
          .then(
            response => {
              this.tableData = response.data.data;
            },
            response => {
              console.log("error");
              alert("listAll 请求失败");
            }
          );
      },
      map_tag() {
        map.clearOverlays();
        let tableData = this.tableData;
        let objRecords = tableData;//后台得到的数据包含经纬度，json格式的
        for ( var i = 0; i < objRecords.length; i++) {
          let json = objRecords[i];
          let point = new BMap.Point(json.lng,json.lat);//循环生成新的地图点
          let marker = new BMap.Marker(point);//按照地图点坐标生成标记
          map.addOverlay(marker);
          marker.setLabel(new BMap.Label(json.buildName,{offset:new BMap.Size(20,-10)}));
          // 创建信息窗口
          let opts = {
            width: 200,
            height: 140,
            enableAutoPan : true,
          };
          //信息窗口内容
          let content ="<div style='color: #01AAED;font-size: 20px;border-bottom: 1px solid #eee;padding: 0 10px 0 10px;height: 30px;line-height: 30px;'>" +json.buildName+"</div>"+
            "<div style='margin:0;line-height:20px;padding:2px;'>简介："+json.descript+"<br/>经度："+json.lng+"<br/>纬度："+json.lat+"</div>"+
              "<Button id='btn' style='display:block;margin:0 auto;border-color:#01AAED;color: #01AAED;width: 90px;background-color: white;-moz-border-radius: 10px;-webkit-border-radius: 5px;-khtml-border-radius: 10px;text-align: center;font-size: 100%;height: 25px;'  class = 'linkButton' id='myBtn' onclick='gotolink(\""+json.buildId+"\")'>地图纠错</Button>";
          let infoWindow = new BMap.InfoWindow(content, opts);
          //var iw = createInfoWindow(i);//创建信息窗口对象
          marker.addEventListener('click', function () {
            // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            map.openInfoWindow(infoWindow, point); // 开启信息窗口
          });
        }
      }
    },
    created(){
      let _this = this
      _this.fetchdata()
    },
    mounted () {
      let _this = this
      _this.reset()
      }
  }

</script>

<style scoped>
</style>
