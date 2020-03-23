<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <div id="myApplication">
      <div v-if="isVisible" class="loader-overlay">
        <div class="loader"></div>
        <span class="text"></span>
      </div>
      <h1>{{ title }} <button v-on:click="reload" class="btn btn-outline-primary"><i class="fas fa-sync"></i></button></h1>
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
      isVisible:false,
      title: "Groutch's ToDoList",
      currentTask: "",
      tasks: []
    }
  },
  mounted() {
    this.isVisible=true;
    this.loadToDo();
  },
  methods: {
    reload: function(){
      this.isVisible=true;  
      this.loadToDo();
    },
    addTask : function (){
      if (this.currentTask!=""){
        this.isVisible=true;
        axios.post("https://api4u.herokuapp.com/tasks", { name:this.currentTask, show:true, headers: {'Access-Control-Allow-Origin': '*'}})
        .then(response => {console.log(response), this.loadToDo()})
        this.currentTask="";
      }
    },
    delTask : function (index){
      this.isVisible=true;
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
        .then(response => {this.tasks= response.data, this.isVisible=false})
    }
  }
}
</script>

<style lang="scss">
  @import './styles/custom-bootstrap.scss';
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
  .loader-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 999;
    cursor: pointer;
    span.text {
      display: inline-block;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      color: #fff;
    }
    .loader {
      animation: loader-animate 1.5s linear infinite;
      clip: rect(0, 80px, 80px, 40px);
      height: 80px;
      width: 80px;
      position: absolute;
      left: calc(50% - 40px);
      top: calc(50% - 40px);
      &:after {
        animation: loader-animate-after 1.5s ease-in-out infinite;
        clip: rect(0, 80px, 80px, 40px);
        content: '';
        border-radius: 50%;
        height: 80px;
        width: 80px;
        position: absolute;
      }
    }
    @keyframes loader-animate {
      0% {
        transform: rotate(0deg)
      }
      100% {
        transform: rotate(220deg)
      }
    }
    @keyframes loader-animate-after {
      0% {
        box-shadow: inset #fff 0 0 0 17px;
        transform: rotate(-140deg);
      }
      50% {
        box-shadow: inset #fff 0 0 0 2px;
      }
      100% {
        box-shadow: inset #fff 0 0 0 17px;
        transform: rotate(140deg);
      }
    }
  }
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
