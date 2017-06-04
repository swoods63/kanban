

import axios from 'axios'
import router from '../router'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


let api = axios.create({
  baseURL: 'https://vue-dustysue1.herokuapp.com/api/',
  timeout: 2000,
  withCredentials: true
})

let auth = axios.create({
  baseURL: 'https://vue-dustysue1.herokuapp.com/',
  timeout: 2000,
  withCredentials: true
})

// REGISTER ALL DATA HERE
let state = {
  boards: [],
  activeBoard: {},
  lists: [],
  // activeList: {},
  error: {},
  // activeTask: {},
  // activeComment: {},
  user: {},
  tasks: {},
  comments: {}

}

let handleError = (state, err) => {
  state.error = err
}

export default new Vuex.Store({
  // ALL DATA LIVES IN THE STATE
  state,
  //Mutations are the only thing alowed to update the store directly through store.propName

  mutations: {
    setBoards(state, boards) {
      state.boards = boards
    },
    setActiveBoard(state, activeBoard) {
      state.activeBoard = activeBoard
    },
    // setLogin(state, user) {
    //   state.user = user
    // },
    // setLists(state, lists) {
    //   state.lists = lists
    // },
    setActiveList(state, activeList) {
      state.activeList = activeList
    },
    // setActiveTask(state, task) {
    //   state.activeTasks[listId] = task
    setTasks(state, list) {
      Vue.set(state.tasks, list._id, list.tasks)
    },
    // setActiveComment(state, comment) {
    //   state.activeComment = comment
    setComments(state, task) {
      Vue.set(state.comments, task._id, task.comments)
    },
    setUser(state, user) {
      state.user = user
    }
    // setRegister(state, user) {
    //   state.user = user
    // },
    // setAuth(state, Auth){
    //   state.Auth = Auth
    // }

  },

  // ACTIONS ARE RESPONSIBLE FOR MANAGING ALL ASYNC REQUESTS
  // Dispatch fires actions, commit fires mutations
  actions: {
    getBoards({commit, dispatch}) {
      api('boards')
        .then(res => {
          commit('setBoards', res.data.data)
        })
        .catch(handleError)
    },


    getBoard({commit, dispatch}, id) {
      api('boards/' + id)
        .then(res => {
          commit('setActiveBoard', res.data.data)
        })
        .catch(handleError)
    },



    createBoard({commit, dispatch}, board) {
      api.post('boards/', board)
        .then(res => {
          dispatch('getBoards')
        })
        .catch(handleError)
    },


    removeBoard({commit, dispatch}, board) {
      api.delete('boards/' + board._id)
        .then(res => {
          //router.push('/')
          dispatch('getBoards')
        })
        .catch(handleError)
    },
    // ===========================
    getLists({commit, dispatch}, id) {
      api('/boards/' + id + '/lists')
        .then(res => {
          commit('setActiveList', res.data.data)
        })
        .catch(handleError)
    },
    // -------------------------------------
    createList({commit, dispatch}, list) {
      api.post('/lists', list)
        .then(res => {
          dispatch('getLists', list.boardId)
        })
        .catch(handleError)
    },
    editList(list) {
      api.put('/lists', list)
        .then(res => {
          this.getLists(list._id)
        })
        .catch(handleError)
    },

    removeList({commit, dispatch}, list) {
      api.delete('lists/' + list._id)
        .then(res => {
          dispatch('getLists', list.boardId)
        })
        .catch(handleError)
    },

    getTasks({commit, dispatch}, boardId, listId) {
      api('boards/' + boardId + '/lists/' + listId + '/tasks')
        .then(res => {
          //Vue.set(state.tasks, listId, res.data.data.tasks)
          commit('setTasks', res.data.data.tasks)
        })
        .catch(handleError)
    },

    moveTask({commit, dispatch}, task) {
      api.put('tasks/' + task._id, task)
        .then(res => {
          dispatch('getTasks', { boardId: task.boardId, listId: task.listId })
          //  (task.boardId, task.listId)
        })
        .catch(handleError)
    },
    createTask({commit, dispatch}, task) {
      api.post('task/', task)
        .then(res => {
          dispatch('getTasks', { boardId: task.boardId, listId: task.listId })
        })
        .catch(handleError)
    },
    removeTask({commit, dispatch}, task) {
      api.delete('task/' + task._id)
        .then(res => {
          dispatch('getTasks', { boardId: task.boardId, listId: task.listId })
        })
        .catch(handleError)
    },
    getActiveComment({commit, dispatch}, boardId, listId, taskId) {
      Vue.set(state.comments, taskId, [])
      api('boards/' + boardId + '/lists/' + listId + '/tasks/' + taskId + '/comments')
        .then(res => {

          commit('setActiveComment', res.data.data.comments)
        })
        .catch(handleError)
    },
    createComment({commit, dispatch}, comment) {
      api.post('/comments', comment)
        .then(res => {
          dispatch('getComments', { boardId: comment.boardId, listId: comment.listId, taskId: comment.taskId })
        })
        .catch(handleError)
    },
    removeComment({commit, dispatch}, comment) {
      api.delete('comments/' + comment._id)
        .then(res => {
          dispatch('getComments', { boardId: comment.boardId, listId: comment.listId, taskId: comment.taskId })
          //this.getLists(list.boardId)
        })
        .catch(handleError)
    },

    login({commit, dispatch}, user) {
      auth.post('login', user)
        .then(res => {
          console.log(res)
          commit('setUser', res.data.data)
          router.push('/boards')
        })
        .catch(handleError)
    },

    register({commit, dispatch}, user) {
      auth.post('register', user)
        .then(res => {
          console.log(res)
          if (res.data.error) {
            return handleError(res.data.error)
          }
          //LETS REDIRECT THE PAGE
          commit('setRegister', res.data.data)
          router.push('/boards')
        })
        .catch(handleError)
    },
    getAuth({commit, dispatch}) {
      auth('authenticate')
        .then(res => {
          commit('setUser', res.data.data)
          if (state.user === null) {
            router.push('/')
          } else {
            router.push('/boards')
          }

        }).catch(err => {
          router.push('/login')
        })
    },
    logout({commit, dispatch}, user) {
      auth.delete('logout', user)
        .then(res => {
          router.push('/')
          //console.log(res)
        }).catch(handleError)

    },
    clearError({commit, dispatch}) {
      commit('setError')
    }
  }
})