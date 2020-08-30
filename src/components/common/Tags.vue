<template>
  <div class="tags" v-if="showTags">
    <ul>
      <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active':item.path==$route.fullPath}" :key="index">
        <router-link :to="item.path" class="tags-li-title">
          {{item.title}}
        </router-link>
        <span class="tags-li-icon" @click.stop="closeTags(index)">
          <i class="el-icon-close"></i>
        </span>
      </li>
      <div class="tags-close-box">
        <el-dropdown @command="handleTags">
          <el-button size="mini" type="primary">
            标签选项<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu size="small" slot="dropdown">
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
            <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Tags",
    data() {
      return {
        tagsList: []
      }
    },
    computed: {
      showTags() {
        return this.tagsList.length > 0
      }
    },
    methods: {
      setTags(e) {
        let isExist = this.tagsList.some(item => item.path == e.fullPath)
        if (!isExist) {
          if (this.tagsList > 8) {
            this.tagsList.shift()
          }
          this.tagsList.push({
            title: e.meta.title,
            path: e.fullPath,
            name: e.matched[1].components.default.name
          })
        }

      },
      closeTags(index) {
        let delItem = this.tagsList.splice(index, 1)[0]
        let item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1]
        if (item) {
          this.$route.fullPath == delItem.path && this.$router.push(item.path)
        } else {
          this.$router.push('/')
        }

      },
      handleTags(command) {
        if (command == 'other') {
          let item = this.tagsList.filter(item => item.path == this.$route.fullPath)
          this.tagsList = item
        } else if (command == 'all') {
          this.tagsList = []
          this.$router.push('/')
        }
      }
    },
    watch: {
      $route(newValue, oldValue) {
        this.setTags(newValue)
      }
    },
    created() {
      this.setTags(this.$route)
    }
  }
</script>

<style scoped>
  .tags {
    position: relative;
    height: 30px;
    overflow: hidden;
    background: #fff;
    padding-right: 120px;
    box-shadow: 0 5px 10px #ddd;
  }

  .tags ul {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  .tags-li {
    float: left;
    margin: 3px 5px 2px 3px;
    border-radius: 3px;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 23px;
    line-height: 23px;
    border: 1px solid #e9eaec;
    background: #fff;
    padding: 0 5px 0 12px;
    vertical-align: middle;
    color: #666;
    -webkit-transition: all .3s ease-in;
    -moz-transition: all .3s ease-in;
    transition: all .3s ease-in;
  }

  .tags-li:not(.active):hover {
    background: #f8f8f8;
  }

  .tags-li.active {
    color: #fff;
    border: 1px solid #409EFF;
    background-color: #409EFF;
  }

  .tags-li-title {
    float: left;
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #666;
  }

  .tags-li.active .tags-li-title {
    color: #fff;
  }

  .tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 110px;
    height: 30px;
    background: #fff;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
    z-index: 10;
  }
</style>