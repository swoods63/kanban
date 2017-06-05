<template>
  <div class="list">
    <div class="row">
      <div class="col-xs-10">        
        <h4>List Name: {{list.name}}</h4>        
      </div>
      <div class="col-xs-1">
        <button type="button" @click="removeList(listProp)">X</button>
      </div>
    </div>
    <div class="row" v-for="task in tasks">
      <div class="col-xs-12">
        <form @submit.prevent="createTask(task)">
          <input type="text" v-model="name" required placeholder="Create Task">
          <button type="submit">create </button>
        </form>
        <Task :taskProp="task"></Task>
      </div>
    </div>
  </div>  
</template>
<!--<task v-for="task in tasks" :taskProp = task></task>-->

<script>
  import Task from './Task'  
  export default {
    name: 'list',
    props: ["listProp"],
    data() {
      return {
        //name: this.listProp.name,
        name: '',
        description: '',
        boardId: this.$store.state.activeBoard._id,
        listId: this.listProp._id,
        tasks: [],
        list: this.listProp
      }
    },
    mounted() {

      this.tasks = this.$store.state.tasks;
    },
    created() {
      // debugger

      this.$store.dispatch('getTasks', { boardId: this.boardId, listId: this.listId })
    },
    computed: {
      tasks() {
        //debugger
        //return this.$store.state.tasks[this.listProp._id]
      }
    },
    methods: {
      createTask() {
        this.$store.dispatch('createTask', { name: this.name, description: this.description, boardId: this.boardId, listId: this.listId })
      },
      removeList(list) {
        this.$store.dispatch('removeList', list)
      },
      editList(list) {
        this.$store.dispatch('editList', list)
      },
      
    },
    components: {
      Task
    }
  }

</script>


<style scoped>

</style>

