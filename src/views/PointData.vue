<template>
  <div>
      <h1>建筑信息</h1>
    <span>
      <el-button type="type" style="position: absolute;right: 100px;top: 30px" @click="toMap">返回地图<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </span>
    <el-tabs v-model="activeDataName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="查看标注点信息" name="first">
        <el-table :data="tableData" stripe border style="width:100%" highlight-current-row>
          <el-table-column prop="id" label="ID" align="center" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.id}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="buildName" label="建筑名称" align="center" min-width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.buildName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="descript" label="描述" align="center" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.descript}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="buildId" label="建筑编号" align="center" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.buildId}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="lng" label="经度" align="center" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.lng}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="lat" label="纬度" align="center" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.lat}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="lat" label="建筑类型" align="center" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.typeId}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="100">
            <template slot-scope="scope">
              <el-button type="info" @click="toEdit(scope)">修改</el-button>
              <el-button type="info" @click="deleteBuild(scope)">删除</el-button>
              <el-button type="primary" @click="toAdd">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="查看纠错信息" name="second">
        <el-table :data="errorAllData" stripe border style="width:100%" highlight-current-row>
          <el-table-column prop="id" label="ID" align="center" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.id}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="errorDescript" label="纠错描述" align="center" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.errorDescript}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="buildId" label="建筑编号" align="center" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.buildId}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createDate" label="创建日期" align="center" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="100">
            <template slot-scope="scope">
              <el-button type="info" @click="deleteError(scope)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="修改" :visible.sync="dialogFormEdit">
      <el-form :model="build">
        <el-form-item label="建筑编号" >
          <el-input v-model="build.buildId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="建筑名称" >
          <el-input v-model="build.buildName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" >
          <el-input v-model="build.descript" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="经度" >
          <el-input v-model="build.lng" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="纬度" >
          <el-input v-model="build.lat" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="建筑类型" >
          <el-input v-model="build.typeId" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEdit = false">取 消</el-button>
        <el-button type="primary" @click="edit(build)">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加" :visible.sync="dialogFormAdd">
      <el-form :model="build">-->
        <el-form-item label="建筑编号" >
          <el-input v-model="build.buildId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="建筑名称" >
          <el-input v-model="build.buildName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" >
          <el-input v-model="build.descript" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="经度" >
          <el-input v-model="build.lng" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="纬度" >
          <el-input v-model="build.lat" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="建筑类型" >
          <el-input v-model="build.typeId" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAdd = false">取 消</el-button>
        <el-button type="primary" @click="add(build)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "PointData",

    data () {
      return {
        tableData: [],
        errorAllData:[],
        result: 0,
        dialogFormEdit: false,
        dialogFormAdd:false,
        build: {
          id:'',
          buildName: '',
          descript: '',
          buildId:'',
          lng: '',
          lat: '',
          typeId: '',
          activeDataName: 'first'
        }
      }
    },
    methods: {
      init() {
        var self = this
        this.$axios.get('map/listAll')
          .then(function (res) {
            self.tableData = res.data.data
          })
          .catch(function (err) {
            console.log(err)
          })
        this.$axios.get('map/listAllError')
          .then(function (res) {
            self.errorAllData = res.data.data
          })
          .catch(function (err) {
            console.log(err)
          })
        this.activeDataName = 'first'
      },
      add(build) {
        var params = {
          'buildId': build.buildId,
          'buildName': build.buildName,
          'descript': build.descript,
          'lng': build.lng,
          'lat': build.lat,
          'typeId': build.typeId
        }
        this.$axios({
          method: 'post',
          url: 'admain/pointInsert',
          data: params,
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        }).then(res => {
          this.$message.success('添加成功')
          this.dialogFormAdd = false
          this.init()
        })
          .catch(function (error) {
            console.log(error)
            alert('添加失败，id重复')
          })
      },
      edit(build) {
        var params = {
          'id': this.build.id,
          'buildId': build.buildId,
          'buildName': build.buildName,
          'descript': build.descript,
          'lng': build.lng,
          'lat': build.lat,
          'typeId': build.typeId
        }
        console.log(build.id)
        this.$axios({
          method: 'post',
          url: 'admain/pointUpdate',
          data: params,
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        }).then(res => {
          this.$message.success('修改成功')
          this.dialogFormEdit = false
          this.init()
        }).catch(function (error) {
          console.log(error)
        })
      },
      toEdit(scope) {
        this.build.id = scope.row.id
        this.build.buildId = scope.row.buildId
        this.build.buildName = scope.row.buildName
        this.build.descript = scope.row.descript
        this.build.lng = scope.row.lng
        this.build.lat = scope.row.lat
        this.build.typeId = scope.row.typeId
        this.dialogFormEdit = true
      },
      toAdd() {
        this.build.buildId = "b001"
        this.build.buildName = "xxxx"
        this.build.descript = "xxxx"
        this.build.lng = "xxx.xxxxxx"
        this.build.lat = "xxx.xxxxxx"
        this.build.typeId = "t001"
        this.dialogFormAdd = true
      },
      handleClick(e) {
        console.log(e)
      }
      ,
      deleteBuild(scope) {
        if (!scope.row.id) {
          this.tableData.splice(scope.$index, 1)
        } else {
          this.$confirm('确认是否删除', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          })
            .then(() => {
              console.log(scope.row.id)
              this.$axios.post('admain/pointDelete/' + scope.row.id, {id: scope.row.id}).then(res => {
                this.$message.success('删除成功')
                this.init()
              })
                .catch(function (error) {
                  console.log(error)
                  alert("删除失败")
                })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
        }
      },
      deleteError(scope) {
        if (!scope.row.id) {
          this.tableData.splice(scope.$index, 1)
        } else {
          this.$confirm('确认是否删除', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          })
            .then(() => {
              console.log(scope.row.id)
              this.$axios.post('admain/errorDelete/' + scope.row.id, {id: scope.row.id}).then(res => {
                this.$message.success('删除成功')
                this.init()
              })
                .catch(function (error) {
                  console.log(error)
                  alert("删除失败")
                })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          }
        },
        toMap(){
          this.$router.push({
            name: 'Home',
          })
        }
      },
      mounted: function () {
        this.init()
      }
    }
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
