<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">Vue Chat App</a>
        <button class="btn btn-danger" v-if="isAuthenticated" @click="logout">Logout</button>
      </div>
    </nav>

    <Auth v-if="!isAuthenticated" @loginSuccess="handleLoginSuccess" />
    <Chat v-else />
  </div>
</template>

<script>
import Auth from './components/Auth.vue';
import Chat from './components/Chat.vue';

export default {
  data() {
    return {
      isAuthenticated: false
    };
  },
  components: {
    Auth,
    Chat
  },
  methods: {
    handleLoginSuccess() {
      this.isAuthenticated = true;
    },
    logout() {
      localStorage.removeItem('token');
      this.isAuthenticated = false;
    }
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuthenticated = true;
    }
  }
};
</script>
