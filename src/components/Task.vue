<template>
  <div class="task">
    <div class="container">
      <div class="row" v-for="comment in comments">
        <div class="col-xs-4">
          <div class="well">
            <comment :commentProp="comment"></comment>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import Comment from './comment'

  export default {
    name: 'task',
    props: ["taskProp", "taskIndex"],
    data() {
      return {
        name: '',
        boardId: this.$store.state.activeBoard._id,
        listId: this.taskProp.listId,
        taskId: this.taskProp._id
      }
      // selected: this.list.name
    },
    mounted() {
      this.$store.dispatch('getComments', { boardId: this.taskProp.boardId, listId: this.taskProp.listId, taskId: this.taskProp._id })
      // debugger
    },
    computed: {
      comments() {
        //  debugger
        return this.$store.state.comments[this.taskProp._id]
      }
    },
    methods: {
      removeTask(task) {
        this.$store.dispatch('removeTask', task)
      },
      createComment() {
        //   debugger
        this.$store.dispatch('createComment', { name: this.name, boardId: this.taskProp.boardId, listId: this.taskProp.listId, taskId: this.taskProp._id })
      }
    },
    components: {
      Comments
    }
  }

</script>


<style scoped>

</style>