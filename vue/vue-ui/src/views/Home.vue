<template>
  <div>
    <router-view />
    <ul class="footer">
      <li class="icons"><router-link :to="{name:'list'}">新闻列表</router-link></li>
      <li class="icons"><router-link :to="{name:'user'}">个人中心</router-link></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Home'
}
</script>
<style scoped lang="scss">
  *{
    margin:0;
    padding:0;
    list-style:none;
  }
  .footer{
    position: fixed;
    height:60px;
    line-height:60px;
    width:100%;
    left:0;
    bottom:0;
    display: flex;
    justify-content: space-around;
    flex-flow:row nowrap;
  }
  .icons{
    font-size:16px;
    flex:1;
    text-align: center;
    border-top:1px solid #42b983;
    a{
      color:#42b983;
      display:block;
      text-decoration: none;
      &.active{
        color:#fff;
        background: #42b983;
      }
    }
  }
</style>
