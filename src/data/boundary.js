// export function showBoundary() {
//   const Bdary = new BMap.Boundary();
//
//   const setBoundary = (name) => {
//     Bdary.get(`${name}`, function (rs) {                        //获取行政区域
//       //获取行政区域
//       var count = rs.boundaries.length; //行政区域的点有多少个
//       if (count === 0) {
//         // console.log(name);
//         // 如果没有成功获取到，再次调用
//         setBoundary(name);
//         return;
//       }
//       var pointArray = [];
//       for (var i = 0; i < count; i++) {
//         var ply = new BMap.Polygon(rs.boundaries[i], {
//           strokeWeight: 2,
//           strokeColor: '#000',
//           fillColor: ''
//         }); //建立多边形覆盖物
//         Map.addOverlay(ply); //添加覆盖物
//         pointArray = pointArray.concat(ply.getPath());
//       }
//     });
//   }
//
//   setBoundary('广西');
// }

export function showBoundary(){
  // 城区边框
  let polygonArr = []
  var polygon = new BMap.Polygon(polygonArr, {strokeColor: '#069DED', strokeWeight: 4, strokeOpacity: 0, fillColor: '', fillOpacity: 0})
  polygon.disableMassClear()
  map.addOverlay(polygon)
  addMask(points,map, polygonArr)
}

export function addMask() {
  var maskPoints = points
  var E_JW = new BMap.Point(109.457627,24.334966);//东
  var EN_JW = new BMap.Point(109.452596,24.341749)//东北角
  var N_JW = new BMap.Point(109.445984,24.341584)//北
  var NW_JW = new BMap.Point(109.446667,24.336662)//西北角
  var W_JW = new BMap.Point(109.450512,24.336464)//西
  var WC_JW = new BMap.Point(109.452201,24.335674)
  var WS_JW = new BMap.Point(109.452704,24.334654)//西南角
  var S_JW = new BMap.Point(109.452632,24.329632)//南
  var SE_JW = new BMap.Point(109.45874,24.330324)//东南角
  // 添加环形遮罩层
  if (points.length > 0) {
    maskPoints.push(maskPoints[0])
  }
  maskPoints.push(E_JW)
  maskPoints.push(EN_JW)
  maskPoints.push(N_JW)
  maskPoints.push(NW_JW)
  maskPoints.push(W_JW)
  maskPoints.push(WC_JW)
  maskPoints.push(WS_JW)
  maskPoints.push(S_JW)
  maskPoints.push(SE_JW)
  var mask = new BMap.Polygon(maskPoints, { strokeColor: 'none', fillColor: '#0d131e', strokeOpacity: 1, fillOpacity: 0.3 })
  mask.disableMassClear()
  map.addOverlay(mask)
}
