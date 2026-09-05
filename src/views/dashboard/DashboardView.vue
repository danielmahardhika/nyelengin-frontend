<template>
  <MainLayout>
    <div class="dashboard-header">
      <h1>Good morning, Daniel.</h1>
      <p>September 2026 — here's your financial overview.</p>
    </div>

    <!-- 1. Baris Metrik Keuangan -->
    <section class="metrics-grid">
      <div class="metric-card">
        <span class="label">Total Balance</span>
        <h2 class="amount">Rp 14.830.000</h2>
        <span class="subtext">All accounts</span>
      </div>
      <div class="metric-card highlight">
        <span class="label">Total Spaces</span>
        <h2 class="amount">{{ spaces.length }}</h2>
        <span class="subtext">Active space{{ spaces.length !== 1 ? 's' : '' }}</span>
      </div>
      <div class="metric-card">
        <span class="label">Income This Month</span>
        <h2 class="amount income">Rp 8.700.000</h2>
        <span class="subtext positive">+12% vs last month</span>
      </div>
      <div class="metric-card">
        <span class="label">Expenses This Month</span>
        <h2 class="amount">Rp 3.412.000</h2>
        <span class="subtext negative">-5% vs last month</span>
      </div>
    </section>

    <!-- 2. Baris Konten Tengah (Spaces & Breakdown) -->
    <section class="content-grid">
      <!-- Kiri: Spaces (Menggantikan data dummy Savings Goals) -->
      <div class="card goals-section">
        <div class="card-header">
          <h3>Spaces ({{ spaces.length }})</h3>
          <button class="add-btn">+ Add Space</button>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="state-container">
          <p class="state-text">Memuat data spaces...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="errorMessage" class="state-container error">
          <p class="state-text">{{ errorMessage }}</p>
          <button @click="fetchSpaces" class="retry-btn">Coba Lagi</button>
        </div>

        <!-- Empty State -->
        <div v-else-if="spaces.length === 0" class="state-container">
          <p class="state-text">Belum ada space yang dibuat.</p>
        </div>

        <!-- Dynamic Spaces List -->
        <div v-else class="spaces-list">
          <div v-for="space in spaces" :key="space.id" class="goal-item">
            <div class="goal-info">
              <span class="goal-name">{{ space.name }}</span>
              <span class="space-badge" :class="space.type.toLowerCase()">
                {{ space.type }}
              </span>
            </div>
            <div class="goal-footer">
              <span>Tipe: {{ space.type }}</span>
              <span>Dibuat: {{ formatDate(space.createdAt) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Kanan: Monthly Breakdown -->
      <div class="card breakdown-section">
        <div class="card-header">
          <h3>Monthly Breakdown</h3>
        </div>

        <div class="breakdown-list">
          <div class="breakdown-item">
            <div class="bd-info"><span>Makanan & Minuman</span><span>Rp 1.240.000</span></div>
            <div class="bd-bar">
              <div class="fill" style="width: 35%"></div>
            </div>
          </div>
          <div class="breakdown-item">
            <div class="bd-info"><span>Tagihan & Utilitas</span><span>Rp 830.000</span></div>
            <div class="bd-bar">
              <div class="fill" style="width: 25%"></div>
            </div>
          </div>
          <div class="breakdown-item">
            <div class="bd-info"><span>Hiburan</span><span>Rp 420.000</span></div>
            <div class="bd-bar">
              <div class="fill" style="width: 15%"></div>
            </div>
          </div>
        </div>

        <div class="savings-rate">
          <span>Savings rate this month</span>
          <h2>61%</h2>
        </div>
      </div>
    </section>

    <!-- 3. Baris Transaksi Terakhir -->
    <section class="card transactions-section">
      <div class="card-header">
        <h3>Recent Transactions</h3>
        <a href="#" class="view-all">View all</a>
      </div>

      <div class="transaction-list">
        <div class="trx-item">
          <div class="trx-icon in">&darr;</div>
          <div class="trx-details">
            <span class="trx-title">Gaji Bulan Agustus</span>
            <span class="trx-date">Income &bull; 28 Aug</span>
          </div>
          <div class="trx-amount income">+Rp 7.500.000</div>
        </div>

        <div class="trx-item">
          <div class="trx-icon out">&uarr;</div>
          <div class="trx-details">
            <span class="trx-title">Belanja Groceries</span>
            <span class="trx-date">Food &bull; 27 Aug</span>
          </div>
          <div class="trx-amount">-Rp 342.000</div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { ledgerApi } from '@/services/api'

export interface Space {
  id: string
  name: string
  type: 'PERSONAL' | 'SHARED' | 'ENTERPRISE' | string
  createdAt: string
}

const spaces = ref<Space[]>([])
const isLoading = ref<boolean>(false)
const errorMessage = ref<string | null>(null)

const fetchSpaces = async () => {
  isLoading.value = true
  errorMessage.value = null
  try {
    const response = await ledgerApi.get('/api/spaces')
    spaces.value = Array.isArray(response.data) ? response.data : (response.data?.data ?? [])
  } catch (err: unknown) {
    console.error('Error fetching spaces:', err)
    errorMessage.value = 'Gagal memuat data spaces dari ledger-service.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchSpaces()
})

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
</script>

<style scoped>
/* Header */
.dashboard-header {
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  font-size: 2.2rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
}

.dashboard-header p {
  color: #94a3b8;
  font-size: 1rem;
  margin: 0;
}

/* Grid Umum */
.card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.card-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #0f172a;
}

/* 1. Metrics Grid */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.metric-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.metric-card.highlight {
  background-color: #497755;
  border-color: #497755;
  color: white;
}

.metric-card.highlight .label,
.metric-card.highlight .subtext {
  color: #d1fae5;
}

.metric-card .label {
  font-size: 0.9rem;
  color: #64748b;
}

.metric-card .amount {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  color: #0f172a;
}

.metric-card .amount.income {
  color: #497755;
}

.metric-card.highlight .amount {
  color: white;
}

.metric-card .subtext {
  font-size: 0.85rem;
  color: #94a3b8;
}

.subtext.positive {
  color: #10b981;
}

.subtext.negative {
  color: #94a3b8;
}

/* 2. Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

/* Spaces */
.add-btn {
  background: #ecfdf5;
  color: #497755;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}

.goal-item {
  padding: 1rem;
  border-radius: 8px;
  background-color: #f8fafc;
  border: 1px solid #f1f5f9;
  margin-bottom: 1rem;
  transition: all 0.2s;
}

.goal-item:hover {
  border-color: #cbd5e1;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.goal-item:last-child {
  margin-bottom: 0;
}

.goal-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: #1e293b;
}

.space-badge {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.55rem;
  border-radius: 9999px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.space-badge.personal {
  background-color: #ecfdf5;
  color: #059669;
}

.space-badge.shared {
  background-color: #f3e8ff;
  color: #7c3aed;
}

.space-badge.enterprise {
  background-color: #fef3c7;
  color: #d97706;
}

.goal-footer {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #94a3b8;
}

.state-container {
  text-align: center;
  padding: 2.5rem 1rem;
  color: #64748b;
}

.state-container.error {
  color: #dc2626;
}

.state-text {
  margin: 0 0 0.75rem 0;
  font-size: 0.95rem;
}

.retry-btn {
  background-color: #497755;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  font-weight: 600;
}

.retry-btn:hover {
  background-color: #3b6346;
}

/* Monthly Breakdown */
.breakdown-item {
  margin-bottom: 1.25rem;
}

.bd-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  margin-bottom: 0.4rem;
  color: #334155;
}

.bd-bar {
  width: 100%;
  height: 6px;
  background-color: #f1f5f9;
  border-radius: 3px;
}

.bd-bar .fill {
  background-color: #cbd5e1;
  height: 100%;
  border-radius: 3px;
}

.savings-rate {
  margin-top: 2rem;
  background-color: #f8fafc;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #f1f5f9;
}

.savings-rate span {
  font-size: 0.9rem;
  color: #64748b;
}

.savings-rate h2 {
  color: #497755;
  font-size: 2.5rem;
  margin: 0.5rem 0 0 0;
}

/* 3. Transactions */
.view-all {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.9rem;
}

.trx-item {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #f1f5f9;
}

.trx-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.trx-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 1rem;
}

.trx-icon.in {
  background-color: #ecfdf5;
  color: #10b981;
}

.trx-icon.out {
  background-color: #f8fafc;
  color: #94a3b8;
}

.trx-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.trx-title {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.95rem;
}

.trx-date {
  font-size: 0.85rem;
  color: #94a3b8;
}

.trx-amount {
  font-weight: 700;
  color: #0f172a;
}

.trx-amount.income {
  color: #497755;
}

/* Responsif */
@media (max-width: 1024px) {
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
