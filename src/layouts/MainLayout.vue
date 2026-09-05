<template>
    <div class="main-layout">
        <!-- Top Navigation Bar -->
        <nav class="navbar">
            <div class="nav-container">
                <!-- Logo -->
                <div class="brand">
                    <h2>Nyelengin</h2>
                </div>

                <!-- Menu Tengah -->
                <ul class="nav-links">
                    <li><a href="#" class="active">Overview</a></li>
                    <li><a href="#">Goals</a></li>
                    <li><a href="#">Transactions</a></li>
                    <li><a href="#">Reports</a></li>
                </ul>

                <!-- Profil Kanan -->
                <div class="user-menu">
                    <div class="user-info">
                        <span class="user-name">{{ displayName }}</span>
                        <span class="user-email">{{ userEmail }}</span>
                    </div>
                    <div class="avatar">{{ userInitial }}</div>
                    <button @click="handleLogout" class="logout-btn" title="Sign out from application">Sign out</button>
                </div>
            </div>
        </nav>

        <!-- Konten Halaman (Dinamis) -->
        <main class="main-content">
            <slot></slot>
        </main>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

// Parse user email from JWT token jika ada di localStorage
const userEmail = computed(() => {
    const token = localStorage.getItem('token')
    if (!token) return 'user@email.com'
    try {
        const payloadBase64 = token.split('.')[1]
        if (!payloadBase64) return 'user@email.com'
        const decoded = JSON.parse(atob(payloadBase64))
        return decoded.email || decoded.Email || 'user@email.com'
    } catch {
        return 'user@email.com'
    }
})

const displayName = computed(() => {
    if (userEmail.value.includes('@')) {
        const namePart = userEmail.value.split('@')[0]
        return namePart.charAt(0).toUpperCase() + namePart.slice(1)
    }
    return 'User'
})

const userInitial = computed(() => {
    return displayName.value.charAt(0).toUpperCase() || 'U'
})

const handleLogout = () => {
    // Kembali ke halaman login
    authStore.logout()
    router.push('/login')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Inter:wght@400;500;600;700;800&display=swap');

.main-layout {
    min-height: 100vh;
    background-color: #f8fafc;
    /* Latar belakang abu-abu sangat muda */
    font-family: 'Inter', sans-serif;
}

/* Navbar */
.navbar {
    background-color: #ffffff;
    border-bottom: 1px solid #e2e8f0;
    position: sticky;
    top: 0;
    z-index: 10;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
}

.brand h2 {
    margin: 0;
    font-family: 'Dancing Script', cursive;
    font-size: 2rem;
    font-weight: 700;
    color: #497755;
    /* Hijau Nyelengin */
}

/* Menu Tengah */
.nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
    margin: 0;
    padding: 0;
}

.nav-links a {
    text-decoration: none;
    color: #64748b;
    font-weight: 500;
    font-size: 0.95rem;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    transition: all 0.2s;
}

.nav-links a:hover {
    color: #497755;
    background-color: #f1f5f9;
}

.nav-links a.active {
    color: #497755;
    background-color: #ecfdf5;
    font-weight: 600;
}

/* Profil Kanan */
.user-menu {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.user-info {
    display: flex;
    flex-direction: column;
    text-align: right;
}

.user-name {
    font-size: 0.85rem;
    font-weight: 600;
    color: #334155;
}

.user-email {
    font-size: 0.75rem;
    color: #94a3b8;
}

.avatar {
    width: 36px;
    height: 36px;
    background-color: #497755;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
}

.logout-btn {
    background: none;
    border: none;
    color: #94a3b8;
    font-size: 0.9rem;
    cursor: pointer;
    margin-left: 0.5rem;
    font-weight: 500;
    transition: color 0.2s;
}

.logout-btn:hover {
    color: #ef4444;
}

.main-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2.5rem 2rem;
}
</style>
