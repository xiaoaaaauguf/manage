<template>
  <div class="wrapper">
    <v-head></v-head>
    <Sidebar></Sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <tags></tags>
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive>
            <router-view/>
          </keep-alive>
        </transition>
        <el-backtop target=".content"></el-backtop>
      </div>

    </div>
  </div>
</template>

<script>
  import vHead from "components/common/Header";
  import Sidebar from "components/common/Sidebar";
  import Tags from "components/common/Tags";
  export default {
    name: "Home",
    data() {
      return {
        collapse: false
      }
    },
    components: {
      vHead,
      Sidebar,
      Tags
    },
    created() {
      this.$bus.$on('collapse-content',msg=>{
        this.collapse=msg
      })
    }
  }
</script>

<style scoped>
  /*.content-box {*/
  /*  position: absolute;*/
  /*  left: 250px;*/
  /*  right: 0;*/
  /*  top: 70px;*/
  /*  bottom: 0;*/
  /*  padding-bottom: 30px;*/
  /*  -webkit-transition: left .3s ease-in-out;*/
  /*  transition: left .3s ease-in-out;*/
  /*  background: #f0f0f0;*/
  /*}*/

  /*.content {*/
  /*  width: 100%;*/
  /*  height: 100%;*/
  /*  padding: 10px;*/
  /*  overflow-y: scroll;*/
  /*  box-sizing: border-box;*/
  /*}*/

  /*.content-collapse {*/
  /*  left: 65px;*/
  /*}*/

  /*.move-enter-active,*/
  /*.move-leave-active {*/
  /*  transition: all .5s;*/
  /*}*/

  /*.move-enter,*/
  /*.move-leave {*/
  /*  opacity: 0;*/
  /*}*/
</style>