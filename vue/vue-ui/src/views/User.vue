<template>
  <div>
    <button @click="add">添加</button>
  </div>
</template>
<script>
export default {
  name: 'User',
  methods: {
    add () {
      this.$router.push('/add')
    }
  }
}
</script>
<style scoped lang="scss">
button{
  width:120px;
  height:32px;
  background: #42b983;
  color: #fff;
  border:1px solid #42b983;
  cursor: pointer;
}
</style>
