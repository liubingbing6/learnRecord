<template>
  <div class="list">
    <ul>
      <li v-for="(item,index) in pageList" :key="index">{{item.title}}--{{item.content}}</li>
    </ul>
  </div>
</template>
<script>
import store from '@/store'
export default {
  name: 'List',
  store,
  computed: {
    pageList () {
      return store.state.lists
    }
  }
}
</script>
<style scoped lang="scss">
/**{
  margin:0;
  padding:0;
}*/
.list{
  & li{
    list-style: none;
    color: red;
  }
}
</style>
