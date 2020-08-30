<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb>
        <el-breadcrumb-item><i class="el-icon-suitcase-1"></i> tab选项卡</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="container">
        <el-tabs v-model="message">
          <el-tab-pane :label="`未读消息(${unread.length})`" name="first">
            <el-table
                :show-header="false"
                :data="unread"
                style="width: 100%">
              <el-table-column prop="title"></el-table-column>
              <el-table-column prop="date" width="180"></el-table-column>
              <el-table-column width="120">
                <template slot-scope="scope">
                  <el-button @click="readClick(scope.$index)">标为已读</el-button></template>
              </el-table-column>
            </el-table>
            <div class="handle-row">
              <el-button type="primary" @click="readAll">全部标为已读</el-button>
            </div>
          </el-tab-pane>

          <el-tab-pane :label="`已读消息(${read.length})`" name="second">
            <el-table
                :show-header="false"
                :data="read"
                style="width: 100%">
              <el-table-column prop="title"></el-table-column>
              <el-table-column prop="date" width="180"></el-table-column>
              <el-table-column width="120">
                <template slot-scope="scope">
                  <el-button @click="del(scope.$index)">删除</el-button></template>
              </el-table-column>
            </el-table>
            <div class="handle-row">
              <el-button type="danger" @click="delAll">删除全部</el-button>
            </div>
          </el-tab-pane>

          <el-tab-pane :label="`回收站(${recycle.length})`" name="third">
            <el-table
                :show-header="false"
                :data="recycle"
                style="width: 100%">
              <el-table-column prop="title"></el-table-column>
              <el-table-column prop="date" width="180"></el-table-column>
              <el-table-column width="120">
                <template slot-scope="scope">
                  <el-button @click="recovery(scope.$index)">还原</el-button></template>
              </el-table-column>
            </el-table>
            <div class="handle-row">
              <el-button type="danger" @click="closeAll">清空回收站</el-button>
            </div>
          </el-tab-pane>

        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tabs',
    data(){
      return{
        message:'first',
        unread: [{
          date: '2018-04-19 20:00:00',
          title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
        },{
          date: '2018-04-19 21:00:00',
          title: '今晚12点整发大红包，先到先得',
        }],
        read: [{
          date: '2018-04-19 20:00:00',
          title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
        }],
        recycle: [{
          date: '2018-04-19 20:00:00',
          title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
        }]
      }
    },
    methods:{
      readClick(index){
        let item=this.unread.splice(index,1)
        this.read=this.read.concat(item)
      },
      readAll(){
        let item=this.unread.splice(0)
        this.read=this.read.concat(item)
      },
      del(index){
        let item=this.read.splice(index,1)
        this.recycle=this.recycle.concat(item)
      },
      delAll(){
        let item=this.read.splice(0)
        this.recycle=this.recycle.concat(item)
      },
      recovery(index){
        let item=this.recycle.splice(index,1)
        this.unread=this.unread.concat(item)
      },
      closeAll(){
        this.recycle=[]
      }
    }

  }

</script>

<style>
  .message-title {
    cursor: pointer;
  }

  .handle-row {
    margin-top: 30px;
  }
</style>

