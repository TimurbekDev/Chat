<template>
  <div class="container">
    <h2 class="text-center my-4">Chat Room</h2>
    <div v-if="typingUser" class="typing-indicator text-center">{{ typingUser }} is typing...</div>
    <div class="chat-box p-3 border mb-4" style="height: 300px; overflow-y: auto;">
      <div v-for="msg in messages" :key="msg.timestamp" :class="['message', msg.username === currentUser ? 'right' : 'left']">
        <strong>{{ msg.username }}:</strong> {{ msg.text }}
      </div>
    </div>

    <form @submit.prevent="sendMessage">
      <div class="input-group">
        <input 
          v-model="message" 
          type="text" 
          class="form-control" 
          placeholder="Type your message" 
          @keyup="notifyTyping" 
          required 
        />
        <button class="btn btn-primary" type="submit">Send</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import io from 'socket.io-client';

export default {
  data() {
    return {
      message: '',
      messages: [],
      currentUser: sessionStorage.getItem('username') || 'Anonymous',
      typingUser: null,
    };
  },
  mounted() {
    const socket = io('http://localhost:3000');

    socket.on('allMessages', (allMessages) => {
      this.messages = allMessages;
    });

    socket.on('messageBroadcast', (msg) => {
      this.messages.push(msg);
      this.typingUser = null;
    });

    socket.on('userTyping', (username) => {
      this.typingUser = username;
      setTimeout(() => {
        this.typingUser = null;
      }, 2000);
    });

    this.socket = socket;
  },
  methods: {
    sendMessage() {
      const username = this.currentUser;
      const msg = { username, text: this.message, timestamp: new Date().toISOString() };

      this.socket.emit('newMessage', msg);
      this.message = '';
      this.typingUser = null;
    },
    notifyTyping() {
      this.socket.emit('typing', this.currentUser);
    },
  },
};
</script>

<style scoped>
.typing-indicator {
  margin-top: 5px;
  font-style: italic;
  color: gray;
}

.chat-box {
  background-color: #f8f9fa;
  height: 300px;
  overflow-y: auto;
}

.message {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  max-width: 60%;
  word-wrap: break-word;
}

.message.right {
  background-color: #007bff;
  color: white;
  align-self: flex-end;
  margin-left: auto;
  text-align: right;
}

.message.left {
  background-color: #f1f1f1;
  color: black;
  align-self: flex-start;
  margin-right: auto;
  text-align: left;
}

.chat-box {
  display: flex;
  flex-direction: column;
}
</style>
