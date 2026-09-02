<template>
    <AuthLayout>
        <div class="login-wrapper">
            <div class="header">
                <h1>Welcome back</h1>
                <p>Sign in to your account to continue</p>
            </div>

            <form @submit.prevent="handleLogin" class="form-container">
                <!-- Email Input -->
                <div class="input-group">
                    <label>Email address or username</label>
                    <input type="text" v-model="email" placeholder="Enter your username or email" required />
                </div>

                <!-- Password Input -->
                <div class="input-group">
                    <label>Password</label>
                    <div class="password-wrapper">
                        <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="••••••••"
                            required />
                        <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                            {{ showPassword ? 'Hide' : 'Show' }}
                        </button>
                    </div>
                </div>

                <div class="form-actions">
                    <a href="#" class="forgot-link">Forgot password?</a>
                </div>

                <button type="submit" class="submit-btn">Sign in</button>
            </form>

            <p class="register-link">
                Don't have an account? <a href="#">Create one</a>
            </p>
        </div>
    </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '../../layouts/AuthLayout.vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)

const handleLogin = () => {
    // Simulasi login sukses, arahkan ke dashboard
    console.log('Login attempt:', email.value)
    router.push('/')
}
</script>

<style scoped>
.login-wrapper {
    width: 100%;
    max-width: 420px;
}

.back-link {
    color: #9ca3af;
    text-decoration: none;
    font-size: 0.9rem;
    margin-bottom: 2rem;
    display: inline-block;
}

.header h1 {
    font-size: 2rem;
    color: #111827;
    margin-bottom: 0.5rem;
    font-weight: 800;
}

.header p {
    color: #6b7280;
    margin-bottom: 2rem;
}

.form-container {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.input-group label {
    display: block;
    font-size: 0.9rem;
    color: #374151;
    margin-bottom: 0.5rem;
}

input {
    width: 100%;
    padding: 0.875rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 1rem;
    box-sizing: border-box;
    outline: none;
    transition: border-color 0.2s;
}

input:focus {
    border-color: #497755;
}

.password-wrapper {
    position: relative;
}

.toggle-password {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    font-size: 0.9rem;
    padding: 0;
}

.form-actions {
    text-align: right;
}

.forgot-link {
    color: #6b7280;
    text-decoration: none;
    font-size: 0.9rem;
}

.submit-btn {
    width: 100%;
    padding: 1rem;
    background-color: #497755;
    /* Hijau Nyelengin */
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 0.5rem;
}

.submit-btn:hover {
    background-color: #3b6346;
}

.register-link {
    text-align: center;
    margin-top: 2rem;
    color: #6b7280;
    font-size: 0.9rem;
}

.register-link a {
    color: #497755;
    text-decoration: underline;
    font-weight: 600;
}
</style>