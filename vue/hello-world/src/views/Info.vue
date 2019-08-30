<template>
  <div class="info">
    <ul>
      <li v-for="(item,index) in list"
          :key="index"
          @click="active(index)"
          :class="{active:index === current}"
      >
        {{item}}
      </li>
      <button @click="add()">添加</button>
      <button @click="es()">ES6</button>
    </ul>
    <ol>
      <li v-for="(val,key) in valList" :key="key">{{val}}</li>
    </ol>
  </div>
</template>
<script>
  import store from '@/store'
  export default{
      name:'Info',
      store,
      data(){
          return{
              list:[1,2,3,4,5,6,7,8,9],
              current:'',
              valList:[]
          }
      },
      methods:{
          active(index){
              this.current = index;
          },
          add(){
              if(this.current === '') return;
              this.valList.push(this.list[this.current]);
              this.current = '';
          },
          es(){
              return new Promise((res,rej)=>{res()})
                  .then(()=>{
                  return Promise().resol;
                  console.log('1');
              }).then((res,rej)=>{
                  console.log('2');
              }).catch(()=>{
                  console.log('失败');
              }).catch(()=>{
                  console.log('失败2');
              });
          }
      }
  }
</script>
<style>
  .active{background:red}
</style>
