<template>
  <div class="board">
    <div class="container">
      <div class="row">
        <div class="col-xs-12">
          <div class="well well-outer">
            <div class="row">
              <div class="col-xs-4">
                <form @submit.prevent="createList">
                  <div class="form-group">
                    <input type="text" class="form-control" v-model="name" placeholder="Create List" required>
                  </div>
                  <div class="form-group">
                    <textarea rows="4" cols="50" class="form-control" v-model="description" placeholder="Description"></textarea>
                  </div>
                  <button class="btn btn-primary" type="submit">Create List</button>
                </form>
              </div>
              <div class="col-xs-8">
                <h1>Board Name: {{board.name}}</h1>
                <h4>Board description: {{board.description}}</h4>
              </div>
              <div class="col-xs-2 col-xs-offset-3">
                <button type="button" class="btn btn-success" @click="logout">Logout</button>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12">
                <h2>Board Lists:</h2>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-4" v-for="list in lists">
                <div class="well">            
                  <List :listProp="list"></List>            
                </div>
              </div>    
            </div>
          </div>
        </div>        
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
        boardId: this.$route.params.id,
        lists: []
      }
    },
    mounted() {

      this.$store.dispatch('getBoard', this.boardId)
      // this.$store.dispatch('getLists', this.$route.params.id)
      this.$store.dispatch('getLists', this.boardId)
      this.lists = this.$store.state.activeList.lists;
      console.log(this.$store.state.activeList.lists);


    },
    computed: {
      board() {
        return this.$store.state.activeBoard
      },
      lists() {

        return this.$store.state.activeLists
        //return this.$store.state.lists//
      }
    },
    components: {
      List
    },
    methods: {
      createList() {
        this.$store.dispatch('createList', {
          name: this.name,
          boardId: this.board._id
        })
        // this.$store.dispatch('createList', { name: this.name, description: this.description, boardId: this.boardId })
        // this.name = ''
      },
      removeBoard(board) {
        this.$store.dispatch('removeBoard', board)
      },

      logout() {
        this.$store.dispatch('logout', this.user)
      }
    }
  }

</script>

<style scoped>

.well{
  opacity: .8;
  color: darkblue; 
  border-color: darkblue;

}

.well-outer{
  background:  #b3d9ff

}
</style>