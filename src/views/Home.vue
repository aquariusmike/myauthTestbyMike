<template>
  <div class="home-container">
    <div class="home-box">
      <h1>Welcome to Pathfinder Portal</h1>

      <!-- Error message for non-verified users -->
      <div v-if="$route.query.error === 'not_verified'" class="error">
        You're not a verified student of Pathfinder Institute Myanmar
      </div>

      <!-- Check if user is logged in -->
      <div v-if="user">
        <p>Welcome, {{ user.displayName || user.name || user.email }}</p>
        <button @click="goDashboard">Go to Dashboard</button>
      </div>

      <!-- Show login button if not logged in -->
      <div v-else>
        <button @click="goLogin">Login</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const user = ref(null)

function goLogin() {
  router.push("/login")
}

function goDashboard() {
  router.push("/dashboard")
}

// Check if user is logged in
onMounted(async () => {
  try {
    const res = await fetch("http://localhost:4000/auth/user", {
      credentials: "include"
    })
    const data = await res.json()
    if (data.user) {
      user.value = data.user
    }
  } catch (err) {
    console.log("Not logged in")
  }
})
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #eef2f3, #ffffff);
}

.home-box {
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

.error {
  color: red;
  margin-bottom: 15px;
  font-weight: bold;
}
</style>
