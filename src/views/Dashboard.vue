<template>
  <div class="dashboard-container">
    <div class="dashboard-box">
      <h1>Student Dashboard</h1>

      <p v-if="user">Welcome, {{ user.displayName || user.name || user.email }}</p>

      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const user = ref(null)

onMounted(async () => {
  try {
    const res = await fetch("http://localhost:4000/auth/user", {
      credentials: "include"
    })
    const data = await res.json()
    if (data.user) {
      user.value = data.user
    } else {
      router.push("/login") // protect dashboard
    }
  } catch {
    router.push("/login")
  }
})

async function logout() {
  await fetch("http://localhost:4000/auth/logout", { credentials: "include" })
  router.push("/")
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #eef2f3, #ffffff);
}

.dashboard-box {
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
