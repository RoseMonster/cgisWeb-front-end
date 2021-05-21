//鼠标移入事件
export function mouseoverMark (area) {
  //加了定时器是防止频繁触发移入事件
  clearTimeout(this.c);
  this.c = setTimeout(() => {
    //这是通过传入省或者市或者区，然后画出该区域
    this.addDistrict(area) //该函数在下面有

  }, 50)
}
//鼠标移出事件
export function mouseoutMark () {
  let map = this.map;
  clearTimeout(this.c); //清除移入事件的定时器，防止鼠标移入事件继续画图
  //获取到地图所有的覆盖物，包括所有类型的覆盖物
  var allOverlay = map.getOverlays();
  for (var i = 0; i < allOverlay.length - 1; i++) {
    //判断覆盖物类型是不是Polygon 多边形覆盖物
    if (allOverlay[i].toString() == "[object Polygon]") {
      //是的话进行清除
      map.removeOverlay(allOverlay[i]);
    }
  }
}
//通过传进去的对应的省或者市或者区，画出对应点位
export function addDistrict (area) {
  //Bmap和map都是其他地方定义在全局
  let BMap = this.BMap;
  let map = this.map;
  let bdary = new BMap.Boundary();
  let blist = [];
  //通过传进去的对应的省或者市，或者区，获取到对应的区域
  bdary.get(area, (rs) => {       //获取行政区域
    var count = rs.boundaries.length; //行政区域的点有多少个
    for (var j = 0; j < count; j++) {
      blist.push({ points: rs.boundaries[j], name: area});
    }
    for (var i = 0; i < blist.length; i++) {
      //添加多边形层并显示
      var ply = new BMap.Polygon(blist[i].points, {
        strokeWeight: 1,   //边框宽度
        strokeColor: "#014F99",   //边框颜色
        fillColor: " #DDE4F0"//填充颜色
      }); //建立多边形覆盖物
      ply.name = blist[i].name;
      //画点位
      map.addOverlay(ply);
    }
  });
}
