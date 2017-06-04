<template>
  <div class="board">
    <div class="container">
      <div class="row">
        <div class="col-xs-12">
          <div>
            <button type="button" class="btn btn-success" @click="logout">Logout</button>
          </div>
        </div>
        <div class="col-xs-4">
          <form @submit.prevent="createList">
          <div class="form-group">
            <input type="text" class="form-control" v-model="name" placeholder="List Name" required>
          </div>
          <div class="form-group">
            <textarea rows="4" cols="50" class="form-control" v-model="description" placeholder="Description"></textarea>
          </div>
            <button class="btn btn-primary" type="submit">Create List</button>
        </form>
        </div>
      </div>
      <div class="row">
        <!--<div class="col-xs-4">
          <div class="well">
            <list :listProp="list"></list>
            <h1>Board Name: {{board.name}}</h1>
            <h2>Board description: {{board.description}}</h2>
          </div>
        </div>-->
        <List v-for="list in lists" :listProp="list" class="col-xs-4"></List>
      </div>
    </div>
  </div>  
</template>

<script>
import List from "./List"
export default {
  name: 'board',
  data() {
      return {
        name: '',
        description: '',
        // boardId: this.$store.state.activeBoard._id 
        boardId: this.$route.params.id//
      }
    },
  mounted(){
    this.$store.dispatch('getBoard', this.$route.params.id)
    // this.$store.dispatch('getLists', this.$route.params.id)
    this.lists = this.$store.dispatch('getLists', this.boardId)
  },
  computed:{
    board(){
      return this.$store.state.activeBoard
    },
    lists(){
      // return this.$store.state.activeLists
      return this.$store.state.lists//
    } 
  },
  methods:{
    createList(){
      // this.$store.dispatch('createlist', {
      //   name: this.name,
      //   boardId: this.board._id
      // })
        this.$store.dispatch('createList', {name: this.name, description: this.description, boardId: this.boardId})
      // this.name = ''
    },
    logout(){
      this.$store.dispatch.logout()

    }


  },
  components: {
    List
  }
}
</script> 

<style scoped>

</style>
