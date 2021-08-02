<template>
  <div>
    <h1>管理员信息</h1>
    <el-table :data="tableData" stripe border style="width:100%" highlight-current-row>
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="id" label="ID" align="center" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="admainName" label="管理员编号" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.admainId}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="descript" label="管理员类型(01:超级管理员，02:管理员)" align="center" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.admainType}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="admainId" label="账号" align="center" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="lng" label="密码" align="center" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.password}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="100">
        <template slot-scope="scope">
          <el-button type="info" @click="toEdit(scope)">修改</el-button>
          <el-button type="info" @click="deleteadmain(scope)">删除</el-button>
          <el-button type="primary" @click="toAdd">添加</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改" :visible.sync="dialogFormEdit">
      <el-form :model="admain">
        <el-form-item label="管理员编号" >
          <el-input v-model="admain.admainId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" >
          <el-input v-model="admain.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input v-model="admain.password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEdit = false">取 消</el-button>
        <el-button type="primary" @click="edit(admain)">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加" :visible.sync="dialogFormAdd">
      <el-form :model="admain">
        <el-form-item label="管理员编号" >
          <el-input v-model="admain.admainId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" >
          <el-input v-model="admain.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input v-model="admain.password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAdd = false">取 消</el-button>
        <el-button type="primary" @click="add(admain)">确 定</el-button>
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
        result: 0,
        dialogFormEdit: false,
        dialogFormAdd:false,
        admain: {
          id:'',
          admainId: '',
          admainType: '',
          username:'',
          password: '',
        }
      }
    },
    methods: {
      init () {
        var self = this
        this.$axios.get('admain/listAllAdmain')
          .then(function (res) {
            self.tableData = res.data.data
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      add (admain) {
        var params ={
          'admainId' : admain.admainId,
          'username' : admain.username,
          'password' : admain.password
        }
        this.$axios({
          method:'post',
          url:'admain/admainInsert',
          data:params,
          headers:{
            'Content-Type':'application/json;charset=utf-8'
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
      edit (admain) {
        var params ={
          'id' : this.admain.id,
          'admainId' : admain.admainId,
          'username' : admain.username,
          'password' : admain.password
        }

        this.$axios({
          method:'post',
          url:'admain/admainUpdate',
          data:params,
          headers:{
            'Content-Type':'application/json;charset=utf-8'
          }
        }).then(res => {
          this.$message.success('修改成功')
          this.dialogFormEdit = false
          this.init()
        }).catch(function (error) {
          alert("修改失败，id重复")
          console.log(error)
        })
      },
      toEdit (scope) {
        this.admain.id = scope.row.id
        this.admain.admainId = scope.row.admainId
        this.admain.username = scope.row.username
        this.admain.password = scope.row.password
        this.dialogFormEdit = true
      },
      toAdd(){
        this.admain.admainId = "a001"
        this.admain.username = "xxxx"
        this.admain.password = "xxxx"
        this.dialogFormAdd = true
      },
      deleteadmain (scope) {
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
              this.$axios.post('admain/admainDelete/' + scope.row.id, {id: scope.row.id}).then(res => {
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
