<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>
          <i class="el-icon-menu">基础表格</i>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-button type="primary" icon="el-icon-delete"
                 class="handle-del mr10" @click="delAllSelection">批量删除
      </el-button>
      <el-select v-model="query.address" clearable
                 @change="querySelect"
                 placeholder="地址" class="handle-select mr10">
        <el-option v-for="item in options" :label="item.label"
                   :value="item.label" :key="item.value">
        </el-option>

      </el-select>
      <el-input v-model="query.name" clearable placeholder="用户名" class="handle-input mr10"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    </div>
    <el-table :data="list"
              border class="table"
              ref="multipleTable"
              header-cell-class-name="table-header"
              @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
      <el-table-column prop="name" label="用户名"></el-table-column>
      <el-table-column label="账户余额">
        <template slot-scope="scope">¥{{scope.row.money}}</template>
      </el-table-column>
      <el-table-column label="头像" align="center">
        <template slot-scope="scope">
          <el-image class="table-td-thumb" :src="scope.row.thumb" :preview-src-list="[scope.row.thumb]"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-tag
              :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')">
            {{scope.row.state}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="date" label="注册时间"></el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="text"
                     icon="el-icon-edit"
                     @click="handleEdit(scope.$index,scope.row)">编辑
          </el-button>
          <el-button type="text"
                     icon="el-icon-delete"
                     @click="handleDelete(scope.$index,scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background
                     layout="total,prev,pager,next"
                     :current-page="query.pageIndex"
                     :total="list.length"
                     @current-change="handlePageChange"
      ></el-pagination>
    </div>

<!--        编辑弹出框-->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
          <el-form ref="form" :model="form" label-width="70px">
            <el-form-item label="用户名">
              <el-input v-model="form.name" :placeholder="form.name" ></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="form.address" :placeholder="form.address"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible=false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
          </span>
        </el-dialog>
  </div>
</template>

<script>
  import {fetchData} from "../../api";

  export default {
    name: 'BaseTable',
    data() {
      return {
        options: [{
          value: '选项1',
          label: '广东省'
        }, {
          value: '选项2',
          label: '湖南省'
        }, {
          value: '选项3',
          label: '福建省'
        }],
        query: {
          address: '',
          name: '',
          pageIndex: 1,
          pageSize: 10
        },
        tableData: [],
        list:[],
        result: [],
        pageTotal: 0,
        hideItem: [],
        editVisible:false,
        form: {},
        idx:0,
      }
    },
    created() {
      this.getData()
    },
    computed:{

    },
    methods: {
      async getData() {
        let res = await fetchData()
        this.tableData = res.list
        this.list=this.tableData
        this.pageTotal = res.pageTotal || 50
      },
      //选中的checkbox
      handleSelectionChange(val) {
        this.result = val
      },
      delAllSelection() {
        for (let i = 0; i < this.result.length; i++) {
          let n = this.list.findIndex(item => item == this.result[i])
          this.tableData.splice(n, 1)
          this.list=this.tableData
        }
      },
      //查询地址
      querySelect(val) {
        this.list = this.tableData.filter((item, i) => item.address.indexOf(val) != -1)
      },
      //查询用户名
      handleSearch() {
        this.list=this.tableData.filter(item=>item.name.indexOf(this.query.name)!=-1)
      },
      //修改用户
      handleEdit(index,row) {
        this.idx = index;
        this.form = {
          name:row.name,
          address:row.address
        }
        this.editVisible = true;
      },
      //确认修改
      saveEdit(){
        this.editVisible=false
        this.$message.success(`修改第 ${this.idx + 1} 行成功`)
        this.tableData[this.idx].name=this.form.name
        this.tableData[this.idx].address=this.form.address
        this.list=this.tableData
      },
      // 删除用户
      handleDelete(index) {
        this.$confirm('确定要删除吗?','提示',{
          type:'warning'
        }).then(()=>{
          this.$message.success('删除成功')
          this.tableData.splice(index,1)
          this.list=this.tableData
        }).catch(()=>{})
      },
      handlePageChange() {
      }
    }

  }
</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }

  .table {
    width: 100%;
    font-size: 14px;
  }

  .red {
    color: #ff0000;
  }

  .mr10 {
    margin-right: 10px;
  }

  .table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
  }
</style>
