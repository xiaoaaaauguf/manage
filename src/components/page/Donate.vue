<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="→">
        <el-breadcrumb-item><i class="el-icon-coffee-cup"></i> 点个赞吧</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="plugins-tips">
        如果觉得本站对你有所帮助, 记得点个
        <a style="font-size: 18px" href="#">star</a>吧!
      </div>
      <Clock02/>
    </div>
  </div>
</template>

<script>
  import Clock02 from "../common/Clock02";
  export default {
    components:{Clock02}
  }
</script>

<style>
</style>