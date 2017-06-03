<template>
  <div class="boards">
    <div class="container">
      <div class="row">
        <div class="col-xs-12">
          <div>
            <button type="button" class="btn btn-success" @click="logout">Logout</button>
          </div>
        </div>
        <div class="col-xs-4">
          <form @submit.prevent="createBoard">
            <div class="form-group">
              <input type="text" class="form-control" v-model="name" placeholder="List Name" required>
            </div>
            <div class="form-group">
              <textarea rows="4" cols="50" class="form-control" v-model="description" placeholder="Description"></textarea>
            </div>
            <button class="btn btn-primary" type="submit">Add Board</button>
          </form>
        </div>
        <div class="col-xs-4 col-xs-offset-1" v-for="board in boards">
          <router-link :to="'/boards/'+board._id">{{board.name}}</router-link>
          <button @click="removeBoard(board)">X</button>
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
        creatorId: '',
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
          description: this.description
        })
        this.name = ''
        this.description = ''
      },
      removeBoard(board) {
        this.$store.dispatch('removeBoard', board)
      },
      logout() {
        this.$store.dispatch('logout')
      }
    }
  }

</script>

<style scoped>

</style>