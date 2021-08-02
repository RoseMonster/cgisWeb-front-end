<template>
    <header>
      <div class="nav">
        <div class="s_logo">
          <img src="../assets/gxust_logo.png">
        </div>
        <span id="s_tl">| 校园地图</span>
          <ul>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" @click="dialogFormNav = true">
                <span class="icon-front"><a-icon type="setting" theme="filled" /></span>
                路线导航
              </a>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle">
                <span class="icon-front"><a-icon type="home"/></span>
                  校内建筑
                <span class="caret"><a-icon type="caret-down"/></span>
                  <ul>
                    <li v-for="item in items">
                      <a href="#" @click="showPopWin($event)">{{item.value}}</a>
                    </li>
                  </ul>
              </a>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" @click="showSearch">
                <span class="icon-front"><a-icon type="search" /></span>
                建筑查询
              </a>
            </li>
          </ul>
        <div id="search" style="display: none">
          <input type="text" v-model="searchValue"/>
          <button>
            <span class="icon-front"><a-icon type="search" @click="searchPoi"></a-icon></span>
          </button>
        </div>
        <div class="tool">
          <el-dropdown @command="disCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-attract" style="font-size: 16px"></i>
              工具
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">地图测距</el-dropdown-item>
              <el-dropdown-item command="b">地图标记</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div style="width: 10%;position: absolute;right: 15px">
          <el-dropdown @command="handleCommand">
            <i class="el-icon-user-solid" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="admain">管理员登录</el-dropdown-item>
              <el-dropdown-item command="superAdmain">超级管理员登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

      <el-dialog :title="nowTypeName" :visible.sync="dialogFormSwitch" :center="true" :modal="false" class="typeDialog">
        <ul>
          <li v-for="item in buildByTypeData">
            <i class="el-icon-location"></i>
            <a href="#" @click="showPoi($event)">{{item.buildName}}</a>
          </li>
        </ul>
      </el-dialog>

      <el-dialog title="校内导航" :visible.sync="dialogFormNav" :modal="false" :center="true" class="navDialog">
        <el-radio-group v-model="labelNavType" style="margin: 0 0 10px 100px">
          <el-radio-button label="walk">步行</el-radio-button>
          <el-radio-button label="car">驾车</el-radio-button>
        </el-radio-group>
        <el-form :inline="true" :model="navData" class="demo-form-inline">
          <el-form-item label="起点">
            <el-input v-model="navData.start" placeholder="起点..."></el-input>
          </el-form-item>
          <el-form-item label="终点">
            <el-input v-model="navData.end" placeholder="终点..."></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="navSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-dialog title="地图纠错" :visible.sync="dialogFormError" :modal="false" :center="true" style="width: 50%;position: relative;left: 100px">
        <el-form :model="errorData">
          <el-form-item label="错误描述">
            <el-input type="textarea"  v-model="errorData.errorDescript" auto-complete="off" style="height: 100px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormError = false">取 消</el-button>
          <el-button type="primary" @click="subError">提交</el-button>
        </div>
      </el-dialog>
    </header>
</template>

<script>
  import img from '../assets/resizeApi.png';
    export default {
      name: "header",
      props: {
        username: {
          type: String
        }
      },
      data(){
        return{
          items:[{"value":"行政办公"}, {"value":"教学科研"}, {"value":"校内场馆"}, {"value":"学生宿舍"},
            {"value":"校内风景"}, {"value":"家属住宅"}, {"value":"其他建筑"}],
          buildByTypeData: [],
          searchValue:'',
          searchBuild: [{
            lng:'',
            lat:''
          }],
          dialogFormSwitch:false,
          dialogFormNav:false,
          dialogFormError:false,
          nowTypeName:'',
          labelNavType:'walk',
          navData:{
            start:'',
            end:''
          },
          navValue:[],
          index:0,
          distance:[],
          pointLng:[],
          pointLat:[],
          errorData:{
            id:0,
            errorDescript:'',
            buildId:'',
            createDate:''
          }
        }
      },
      methods: {
        showSearch() {
          let div = document.getElementById("search");
          if (div.style.display == "none") {
            div.style.display = "block"
          } else {
            div.style.display = "none"
          }
        },
        showPopWin(event){
          let typeName = event.currentTarget.innerHTML
          this.nowTypeName = typeName
          this.$axios({
            method:'post',
            url:'map/listByType',
            data:{typeName : typeName},
            headers:{
              'Content-Type':'application/json;charset=utf-8'
            }
          }).then(res => {
            this.buildByTypeData = res.data.data;
            console.log(this.buildByTypeData)
            this.dialogFormSwitch = true
          })
            .catch(function (error) {
              console.log(error)
              alert('请求失败')
            })
        },
        searchPoi(){
          if(this.searchValue!=null){
            this.$axios({
            method:'post',
            url:'map/search',
            data:{buildName:this.searchValue},
            headers:{
              'Content-Type':'application/json;charset=utf-8'
            }
          }).then(res => {
              this.searchBuild = res.data.data
              console.log(this.searchBuild)
              this.openInfo()
          })
            .catch(function (error) {
              console.log(error)
              alert('请求失败')
            })
          }else {
            alert('查询条件不能为空')
          }
        },
        showPoi(event){
          let buildName = event.currentTarget.innerHTML
          this.$axios({
            method:'post',
            url:'map/search',
            data:{buildName:buildName},
            headers:{
              'Content-Type':'application/json;charset=utf-8'
            }
          }).then(res => {
            this.searchBuild = res.data.data
            console.log(this.searchBuild)
            this.openInfo()
          })
            .catch(function (error) {
              console.log(error)
              alert('请求失败')
            })
        },
        openInfo(){
          let point = new BMap.Point(this.searchBuild[0].lng,this.searchBuild[0].lat);
          // 创建信息窗口
          let opts = {
            width: 200,
            height: 140,
            enableAutoPan : true,
          };
          //信息窗口内容
          let content ="<div style='color: #01AAED;font-size: 20px;border-bottom: 1px solid #eee;padding: 0 10px 0 10px;height: 30px;line-height: 30px;'>" +this.searchBuild[0].buildName+"</div>"+
            "<div style='margin:0;line-height:20px;padding:2px;'>简介："+this.searchBuild[0].descript+"<br/>经度："+this.searchBuild[0].lng+"<br/>纬度："+this.searchBuild[0].lat+"</div>"+
            "<Button id='btn' style='display:block;margin:0 auto;border-color:#01AAED;color: #01AAED;width: 90px;background-color: white;-moz-border-radius: 10px;-webkit-border-radius: 5px;-khtml-border-radius: 10px;text-align: center;font-size: 100%;height: 25px;'  class = 'linkButton' id='myBtn' onclick='gotolink(\""+this.searchBuild[0].buildName+"\")'>地图纠错</Button>";
          let infoWindow = new BMap.InfoWindow(content, opts);
          map.openInfoWindow(infoWindow, point); // 开启信息窗口
        },
        navSubmit(){
          console.log(this.navData)
          this.$axios({
            method:'post',
            url:'nav/getPoint',
            data:{start:this.navData.start,end:this.navData.end},
            headers:{
              'Content-Type':'application/json;charset=utf-8'
            }
          }).then(res => {
            this.navValue = res.data.data
            console.log(this.navValue)

            let pointStart = new BMap.Point(this.navValue[0].lng,this.navValue[0].lat)
            let pointEnd = new BMap.Point(this.navValue[1].lng,this.navValue[1].lat)
            if(this.labelNavType == "car"){
              let driving = new BMap.DrivingRoute(map, {renderOptions: {map: map,autoViewport: true}})
              driving.search(pointStart,pointEnd)
              driving.setSearchCompleteCallback(function() {
                let pts = driving.getResults().getPlan(0).getRoute(0).getPath();
                let polyline = new BMap.Polyline(pts,{strokeColor:"blue"});
                map.addOverlay(polyline);
                map.addOverlay(m1);
              })
            }else if(this.labelNavType == "walk"){
              let walking = new BMap.WalkingRoute(map, {renderOptions:{map: map,autoViewport: true}});
              walking.search(pointStart,pointEnd)
              walking.setSearchCompleteCallback(function() {
                let pts = walking.getResults().getPlan(0).getRoute(0).getPath();
                let polyline = new BMap.Polyline(pts,{strokeColor:"red"});
                map.addOverlay(polyline);
                map.addOverlay(m1);
              })
            }

          })
            .catch(function (error) {
              console.log(error)
              alert('输入建筑不存在')
            })
        },
        disCommand(command){
          if(command == "a"){
            this.addMapDisEvent()
          }
          if(command == "b"){
            this.addMapMarker()
          }
        },
        addMapDisEvent(){                //地图测距
          map.setDefaultCursor("crosshair");
          this.distance[0] = 0
          map.removeEventListener('click',this.getMarker)
          map.addEventListener('click',this.getDistance)
        },
        getDistance(e){                   //地图测距
          this.pointLng[this.index] = e.point.lng
          this.pointLat[this.index] = e.point.lat
          this.index++

          this.calculate()
          let points = new Array();
          for(let x = 0;x<this.index;x++){
            points[x] = new BMap.Point(this.pointLng[x],this.pointLat[x])
            let opts = {
              position: new BMap.Point(this.pointLng[x],this.pointLat[x]),
              offset: new BMap.Size(30, -30)
            }
            let label = new BMap.Label(this.distance[x]+'米', opts);
            map.addOverlay(label)
          }
          let polyline = new BMap.Polyline(points,{strokeColor:"yellow"});
          map.addOverlay(polyline);
        },
        calculate(){               //地图测距
          if(this.index>1){
            for(let x = 1;x<this.index;x++) {
              let lat1 = (Math.PI / 180) * this.pointLat[x-1];
              let lat2 = (Math.PI / 180) * this.pointLat[x];
              let lng1 = (Math.PI / 180) * this.pointLng[x-1];
              let lng2 = (Math.PI / 180) * this.pointLng[x];
              let R = 6371;
              this.distance[x] = Math.round(this.distance[x-1] +
                Math.acos(Math.sin(lat1) * Math.sin(lat2) +
                  Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1)) * R * 1000);
            }
          }
        },
        addMapMarker(){
          map.setDefaultCursor("default");
          map.removeEventListener('click',this.getDistance)
          map.addEventListener('click',this.getMarker)
        },
        getMarker(e){
          let icon = new BMap.Icon(img, new BMap.Size(30, 42), {
            anchor: new BMap.Size(10, 30)
          });
          let marker = new BMap.Marker(new BMap.Point(e.point.lng,e.point.lat),{icon: icon})
          map.addOverlay(marker)

          marker.addEventListener('click',()=>{
            map.removeOverlay(marker)
          })
        },
        subError(){           //地图纠错
          if(this.errorData.errorDescript == ''){
            alert("输入信息不能为空")
          }else {
            this.errorData.buildId = this.searchBuild[0].buildId
            var params ={
              'errorDescript' : this.errorData.errorDescript,
              'buildId' : this.errorData.buildId,
            }
            this.$axios({
              method:'post',
              url:'map/error',
              data:params,
              headers:{
                'Content-Type':'application/json;charset=utf-8'
              }
            }).then(res => {
              alert("提交成功")
              console.log(res)
            })
              .catch(function (error) {
                console.log(error)
                alert('请求失败')
              })
          }
        }
        ,
        // 判断下拉菜单指令
        handleCommand(command) {
          if (command == "admain"){
            this.admainLogin()
          }else if(command == "superAdmain"){
            this.superAdmainLogin()
          }
        },
        // // 退出
        // async logout() {
        //   this.$message("点击退出");
        // },
        admainLogin(){
          this.$router.push({
            name: 'AdmainLogin'
          })
        },
        superAdmainLogin(){
          this.$router.push({
            name: 'SuperAdmainLogin'
          })
        }
      },
      mounted() {
        let _this = this;
        window.gotolink = function (e) {
          _this.dialogFormError = true
          _this.searchBuild[0].buildId = e
        }
      }
    }
</script>

<style scoped>
  header {
    position: relative;
    top: 0;
    height: 3rem;
    left: 0;
    right: 0;
    background: #1b263c;
    z-index: 9;
  }
  .nav {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    /*justify-content: center;*/
  }
  .nav ul{
    float: left;
    margin-left: 100px;
  }
  .nav ul li ul {
    position:absolute;
    top:50px;
    left:580px;
    background: #ccc;
    width: 105px;
    display:none;
  }
  .nav ul li ul li {
    display: block;
    margin: 5px 0px 5px -40px;
    float:none;
    border-top:1px solid #EEEEEE;
  }
  .nav ul li ul li a{
    text-decoration: none;
    color: black;
  }
  .nav ul li:hover ul {
    display:block;
  }
  .dropdown {
    display: inline-block;
    padding: 1rem 1rem;
    margin-right: 30px;
  }
  .dropdown:hover{
    background: #EEEEEE;
  }
  .dropdown:hover .dropdown-toggle{
    color: #1b263c;
  }
  .dropdown-toggle{
    color: #EEEEEE;
    font-family: KaiTi;
    font-size: 18px;
    text-decoration: none;
  }
  .s_logo{
    width: 220px;
    height: auto;
    float: left;
    margin: 5px 10px;
  }
  .s_logo img{
    float: right;
    height: auto;
    width: 65%;
  }
  #s_tl{
    font-family: STKaiti;
    font-weight: bold;
    font-size: 18px;
    color: #EEEEEE;
  }
  .el-dropdown i{
    display: inline-block;
    position: relative;
    color: #FFFFFF;
    font-size: 30px;
  }

  .typeDialog{
    width: 30%;
    height: 250%;
  }
  .typeDialog ul li{
    list-style: none;
    margin: 5px 0px 5px -40px;
    border-top:1px solid #EEEEEE;
  }
  .typeDialog ul li a{
    text-decoration: none;
    color: black;
  }
  .navDialog{
    width: 50%;
    height: 70%;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #EEEEEE;
    font-size: 18px;
    font-family: STKaiti;
    font-weight: bold;
  }
  .tool{
    width: 100px;
    height: auto;
    position: absolute;
    right: 160px;
  }
</style>
<style>
  .typeDialog .el-dialog__body{
    padding: 10px 20px;
    background-color: rgb(255, 255, 255);
  }
  .typeDialog .el-dialog__header {
    padding: 20px 20px 5px;
    background-color: rgb(250, 250, 200);
  }
  .navDialog .el-dialog__body{
    padding: 10px 20px;
    background-color: rgb(255, 255, 255);
  }
  .navDialog .el-dialog__header {
    padding: 20px 20px 5px;
    background-color: rgb(250, 250, 200);
  }
</style>

