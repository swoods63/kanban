<template>
  <div class="boards">
    <div class="container">
      <div class="row">
        <div class="col-xs-12">
          <div class="well well-outer">
            <h1>Welcome Back to Your Boards</h1>
            <button type="button" class="btn btn-success" @click="logout">Logout</button>
            <div class="row">
              <div class="col-xs-4 col-xs-offset-4 margin-top">
                <form @submit.prevent="createBoard">
                  <div class="form-group">
                    <input type="text" class="form-control" v-model="name" placeholder="Board Name" required>
                  </div>
                  <div class="form-group">
                    <textarea rows="4" cols="50" class="form-control" v-model="description" placeholder="Description"></textarea>
                  </div>
                  <button class="btn btn-primary" type="submit">Create Board</button>
                </form>
              </div> 
              <div class="col-xs-12 margin-top" v-for="board in boards">
                <router-link :to="'/boards/'+board._id">{{board.name}}</router-link>
                <button @click="removeBoard(board)">X</button>
              </div>              
            </div>             
          </div>
        </div>        
      </div>      
    </div>
  </div>
</template>

<script>
  //<button @click="createBoard">Add Board</button>
  // v-for="board in boards">
  //       <router-link :to="'/boards/'+board._id">{{board.name}}</router-link> <span @click="removeBoard(board)">x</span></li>
  export default {
    name: 'boards',
    data() {
      return {
        name: '',
        description: '',
        creatorId: this.$store.state.user._id
      }
    },
    mounted() {
      this.$store.dispatch('getBoards')
    },
    computed: {
      boards() {
        return this.$store.state.boards
      }
    },
    methods: {
      createBoard() {
        this.$store.dispatch('createBoard', {
          name: this.name,
          description: this.description,
          creatorId: this.creatorId
        })
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

.margin-top{
  margin-top: 2%;
}

.well-outer{
  background:  #b3d9ff;
  opacity: .8;
  border-color: darkblue;
  color: darkblue
}

</style>