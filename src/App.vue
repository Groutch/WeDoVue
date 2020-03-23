<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <div id="myApplication">
      <h1>{{ title }}</h1>
      <input id="inputAdd" v-model="currentTask" v-on:keyup.13="addTask">
      <button class="btn btn-success" v-on:click="addTask">+</button>
      <hr style="width:10%">
      <table id="task-list">
        <tr v-for="(task) in tasks" :key="task._id">
          <!--<td><input type="checkbox" v-model="task.show"></td>-->
          <td v-on:click="toggleTask(task)">
            <span v-if="task.show" >
              {{ task.name }}
            </span>
            <span v-else>
              <strike>{{ task.name }}</strike>
            </span>
          </td>
          <td><button class="btn btn-danger" v-on:click="delTask(task._id)">X</button></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data(){
    return{
      title: "Groutch's ToDoList",
      currentTask: "",
      tasks: []
    }
  },
  mounted() {
    this.loadToDo();
  },
  methods: {
    addTask : function (){
      if (this.currentTask!=""){
        axios.post("https://api4u.herokuapp.com/tasks", { name:this.currentTask, show:true, headers: {'Access-Control-Allow-Origin': '*'}})
        .then(response => {console.log(response), this.loadToDo()})
        this.currentTask="";
      }
    },
    delTask : function (index){
      axios.delete("https://api4u.herokuapp.com/tasks"+"/"+index, {headers: {'Access-Control-Allow-Origin': '*'}})
        .then(response => {console.log(response), this.loadToDo()});

    },
    toggleTask : function (task){
      console.log(task.show);console.log(task._id);
      task.show = !task.show
      axios.put("https://api4u.herokuapp.com/tasks"+"/"+task._id, {show : task.show, headers: {'Access-Control-Allow-Origin': '*'}})
        .then(response => {console.log(response), this.loadToDo()});
      
    },
    loadToDo : function(){
      axios.get("https://api4u.herokuapp.com/tasks", {headers: {'Access-Control-Allow-Origin': '*'}})
        .then(response => {this.tasks= response.data})
    }
  }
}
</script>

<style lang="scss">
  @import './styles/custom-bootstrap.scss';
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  text-align: center;
}
table{
  margin: 0px auto;
}
span { cursor: pointer; }

</style>
