<template>
  <div class="add">
    <div>
      <span>标题</span>
      <input type="text" v-model="title">
    </div>
    <div>
      <span>内容</span>
      <input type="text" v-model="content">
    </div>
    <div>
      <button @click="addContent">添加</button>
    </div>
  </div>
</template>
<script>
import store from '@/store'
export default {
  name: 'Add',
  store,
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    addContent () {
      store.commit('addItems', { title: this.title, content: this.content })
      this.title = ''
      this.content = ''
      this.$router.push('/home/list')
    }
  }
}
</script>
<style scoped lang="scss">
  .add{
    padding-top:20px;
    &>div{
      width:100%;
      display: flex;
      justify-content:space-around;
      margin-bottom:10px;
      height:32px;
      &>input{
        padding:10px;
      }
      &>button{
        width:160px;
        border:1px solid #42c983;
        height:32px;
        line-height:32px;
        color: #fff;
        background: #43c983;
      }
    }
  }
</style>
