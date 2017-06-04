<template>
  <!--<div class="list">
    <div class="container">
      <div class="row" v-for="task in tasks">
        <div class="col-xs-4">
          <div class="well">
            <task :taskProp="task"></task>
            
          </div>
        </div>
      </div>
    </div>
       
 </div>
        <!--<task v-for="task in tasks" :taskProp = task></task>-->
  <div class="well well-sm">
    <div class="list" droppable="true" v-on:drop.capture="createTasks" ondragover="event.preventDefault()">
      Active List: {{listData.name}} ---- {{listData.description}} ---- {{listData._id}}
      <form @submit.prevent="createNewTasks(task)">
        <input type="text" v-model="name" required placeholder="Create Tasks">
        <button type="submit">+</button>
        <span @submit.prevent="removeTasks(task)">x</span>
      </form>
      <div v-for="(task, i) in tasks" :key="i" :id="i" class="tasks" draggable="true" v-on:dragstart.capture="moving">
        <task :taskData="task"></task>
        <div @click="getDets" v-on:dragend="moveTasks">
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import Tasks from './Tasks'
  import draggable from 'vuedraggable'
  export default {
    name: 'lists',
    props: ["listProp", "listIndex"],
    data() {
      return {
        name: '',
        description: '',
        boardId: this.$store.state.activeBoard._id,
        listId: this.listProp._id
      }
    },
    created() {
      // debugger
      this.$store.dispatch('getTasks', { boardId: this.listProp.boardId, listId: this.listProp._id })
    },
    computed: {
      tasks() {
        //debugger
        return this.$store.state.tasks[this.listProp._id]
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
      removeTask(event) {
        //     let i = this.tasks.indexOf(this.tasks)
        debugger
        var task = this.tasks[event.target.id]
        //   this.$store.tasks.splice(index, 1)
        this.$store.dispatch('removeTask', task)
      },
      moving(event) {
        var task = this.tasks[event.target.id]
        event.dataTransfer.setData('text/javascript', JSON.stringify(task))
      },
      createTasks(event) {
        var task = JSON.parse(event.dataTransfer.getData('text/javascript'))
        // this.$store.dispatch('removeTask', task)
        task.listId = this.listProp._id
        this.$store.dispatch('moveTasks', task)
      }
    },
    components: {
      Tasks
    }
  }

</script>


<style scoped>

</style>

<!-------------------------------------->


<!--<template>
<div class="well well-sm">
  <div class="list" droppable="true" v-on:drop.capture="createTasks" ondragover="event.preventDefault()">
    Active List: {{listData.name}}  ---- {{listData.description}} ---- {{listData._id}}
    <form @submit.prevent="createNewTasks(task)">
      <input type="text" v-model="name" required placeholder="Create Tasks">
      <button type="submit">+</button>
      <span @submit.prevent="removeTasks(task)">x</span>
    </form>
    <div v-for="(task, i) in tasks" :key="i" :id="i" class="tasks" draggable="true" v-on:dragstart.capture="moving">
      <task :taskData="task"></task>
      <div @click="getDets" v-on:dragend="moveTasks">
      </div>
    </div>
  </div>
</div>
</template>


<script>
  import Task from './task'
  import draggable from 'vuedraggable'
  export default {
    name: 'list',
    data(){
      return {
        name: ''
      }
    },
    //props recieves data
    props: ['listData'],
    mounted() {
      this.$store.dispatch('getTasks', this.listData)
        },
    computed: {
      tasks() {
       return this.$store.state.activeTasks[this.listData._id]
    }
    },
    methods: {
      getDets() {
        console.log(this.tasks.description)
      },
      createTasks(event) {
        var task = JSON.parse(event.dataTransfer.getData('text/javascript'))
        task.listId = this.listData._id
        this.$store.dispatch('moveTask', task)
      },
      createNewTasks() {
        this.$store.dispatch('createNewTasks',{
          name: this.name,
          description: this.description,
          listId: this.$route.params.id,
          boardId: this.$route.params.id
        })
        this.name = ''
      },
      moving(event) {
        console.log(event.target, event.target.id)
        var task = this.tasks[event.target.id]
        event.dataTransfer.setData('text/javascript', JSON.stringify(task))
        console.log('We are moving')
      },
      moveTasks() {
        let i = this.tasks.indexOf(this.tasks)
        this.tasks.splice(i, 1)
        this.$store.dispatch('moveTasks', tasks)
      }
    },
    components: {
      Task,
      draggable
    },
  }
</script>


<style scoped>
.well{
  background-color: orange;
}
</style>-->