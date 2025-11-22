<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Login Page</h1>

      <button @click="loginGoogle">Login with Google</button>
    </div>
  </div>
</template>

<script setup>
function loginGoogle() {
  window.location.href = "http://localhost:4000/auth/google"
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #eef2f3, #ffffff);
}

.login-box {
  text-align: center;
  background-color: white;
  padding: 50px 40px;
  border-radius: 12px;
  box-shadow: 0 15px 30px rgba(0,0,0,0.15);
  max-width: 400px;
  width: 100%;
}

h1 {
  margin-bottom: 20px;
  font-size: 28px;
  color: #333;
}

button {
  background-color: #4285f4;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.2s ease-in-out;
}

button:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}
</style>
