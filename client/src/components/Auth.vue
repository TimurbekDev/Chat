<template>
  <div class="container">
    <h2 class="mt-4 text-center">Register or Login</h2>
    
    <form @submit.prevent="register" class="mb-4">
      <h4>Register</h4>
      <div class="mb-3">
        <label for="registerUsername" class="form-label">Username</label>
        <input v-model="registerUsername" type="text" class="form-control" id="registerUsername" required />
      </div>
      <div class="mb-3">
        <label for="registerPassword" class="form-label">Password</label>
        <input v-model="registerPassword" type="password" class="form-control" id="registerPassword" required />
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>

    <form @submit.prevent="login" class="mb-4">
      <h4>Login</h4>
      <div class="mb-3">
        <label for="loginUsername" class="form-label">Username</label>
        <input v-model="loginUsername" type="text" class="form-control" id="loginUsername" required />
      </div>
      <div class="mb-3">
        <label for="loginPassword" class="form-label">Password</label>
        <input v-model="loginPassword" type="password" class="form-control" id="loginPassword" required />
      </div>
      <button type="submit" class="btn btn-success">Login</button>
    </form>

    <p v-if="error" class="text-danger">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      registerUsername: '',
      registerPassword: '',
      loginUsername: '',
      loginPassword: '',
      error: ''
    };
  },
  methods: {
    async register() {
      try {
        await axios.post('http://localhost:3000/auth/register', {
          username: this.registerUsername,
          password: this.registerPassword
        });
        alert('Registration successful! Please log in.');
      } catch (err) {
        this.error = 'Error: User already exists';
      }
    },
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          username: this.loginUsername,
          password: this.loginPassword
        });
        sessionStorage.setItem('username', response.data.username);
        this.$emit('loginSuccess');
      } catch (err) {
        this.error = 'Login failed! Invalid credentials.';
      }
    }
  }
};
</script>
