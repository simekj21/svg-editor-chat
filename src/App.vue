<template>
  <div id="app">
    <User 
      v-if="!isUserRegistered"
      @submit="user = $event" 
    />

    <h3 v-if="isUserRegistered">
      {{ user }}
    </h3>  
    
    <Editor
      v-if="isUserRegistered"
      :user="user"
      @send-message="svgImg = $event" 
    />
    
    <Websocket
      v-if="isUserRegistered"
      :sended-img="svgImg"
      @received-img="receivedImg = $event" 
    />
    
    <Displayer
      v-if="isUserRegistered"
      :received-img="receivedImg"
    />
  </div>
</template>

<script>
import User from './components/User'
import Editor from './components/Editor'
import Websocket from './components/Websocket'
import Displayer from './components/Displayer'
import logMixin from "./mixins/logMixin"

export default {
  name: 'App',
  mixins: [logMixin],
  components: {
    User,
    Editor,
    Websocket,
    Displayer
  },
  data() {
    return {
      user: 'John',
      isUserRegistered: true,
      svgImg: '',
      receivedImg: ''
    }
  },
  watch: {
    user: function () {
      this.isUserRegistered = true
    },
  },
}
</script>

<style>
  #app {
    width: 480px;
    font-family: Helvetica, Arial, sans-serif;
    text-align: center;
    color: #4b4b4b;

    border: 1px solid gray;
    border-radius: 10px;
  }
</style>
