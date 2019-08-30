import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*定义容器*/
export default new Vuex.Store({
  state: {
    count:0
  },
  mutations: {
    increase(){
      this.state.count++;
    }
  },
  actions: {

  }
})
