<template>
  <div>
    <form v-if="!isReg">
      <div>
        用户名：<input type="text" v-model="name">
      </div>
      <div>
        密码：<input type="password" v-model="password">
      </div>
      <div>
        <button @click="login()">登陆</button>
        <button @click="reg()">注册</button>
      </div>
    </form>
    <form v-else>
      <div>
        用户名：<input type="text" v-model="r_name">
      </div>
      <div>
        密码：<input type="password" v-model="r_password">
      </div>
      <div>
        确认密码：<input type="password" v-model="r_repeat">
      </div>
      <div>
        <button @click="addUser()">确定</button>
        <button @click="cancle()">取消</button>
      </div>
    </form>

  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      isReg: false,
      name: '',
      password: '',
      repeat: '',
      r_name: '',
      r_password: '',
      r_repeat: ''
    }
  },
  methods: {
    login: function () {
      var name = localStorage.getItem('name')
      var pass = localStorage.getItem('password')
      if (name === this.name && pass === this.password) {
        this.$router.push('/home/list')
      } else {
        alert('用户名或密码错误！')
      }
    },
    reg () {
      this.isReg = true
    },
    cancle () {
      this.isReg = false
    },
    addUser () {
      if (this.r_password === this.r_repeat) {
        localStorage.setItem('name', this.r_name)
        localStorage.setItem('password', this.r_password)
        this.r_repeat = ''
        this.r_password = ''
        this.r_name = ''
        this.isReg = false
      } else {
        alert('两次密码输入不一致')
      }
    }
  }
}
</script>
<style scoped lang="scss">
form{
  div{
    width:100%;
    height:32px;
    text-align: left;
    margin-bottom:10px;
    display: flex;
    justify-content:space-around;
    flex-flow:row nowrap;
    &>input{
      border:1px solid #999;
      outline:none;
      width:160px;
      padding:10px;
    }
  }
  button{
    width:120px;
    height:32px;
    line-height:32px;
    outline:none;
    border:1px solid #ddd;
    background: #fff;
    color: #333;
  }
}
</style>
