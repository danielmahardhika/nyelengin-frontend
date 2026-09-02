<template>
    <div class="auth-container">
        <!-- Panel Kiri (Banner Hijau) -->
        <div class="auth-banner">
            <div class="brand">
                <h2>Nyelengin</h2>
            </div>

            <div class="hero-text">
                <h1>The modern way to <br /><span class="brand-highlight">Nyelengin.</span></h1>
                <p>Inspired by the Javanese tradition of saving (<i>nyelengin</i>), we built this space for you to track
                    finances, set goals, and secure your future—one step at a time.</p>
            </div>

            <div class="footer-text">
                <p>Secure &bull; Private &bull; Always with you</p>
            </div>
        </div>

        <!-- Panel Kanan (Konten Dinamis Form) -->
        <div class="auth-content">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
/* 1. Import Font dari Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Inter:ital,wght@0,400;0,600;0,800;1,400&display=swap');

.auth-container {
    display: flex;
    min-height: 100vh;
    /* Jadikan Inter sebagai font default seluruh halaman */
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Sisi Kiri */
.auth-banner {
    flex: 1;
    background-color: #497755;
    color: white;
    padding: 3rem 4rem;
    /* Padding disesuaikan agar lebih bernapas */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

/* 2. Styling Logo Brand di Kiri Atas */
.brand h2 {
    margin: 0;
    font-family: 'Dancing Script', cursive;
    /* Font latin */
    font-size: 2.8rem;
    /* Diperbesar */
    font-weight: 700;
    letter-spacing: 1px;
}

/* 3. Styling Heading Utama */
.hero-text h1 {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.5rem;
}

/* 4. Highlight teks 'Nyelengin' di dalam Heading */
.brand-highlight {
    font-family: 'Dancing Script', cursive;
    /* Font latin */
    font-size: 4.2rem;
    /* Dibuat lebih besar dari teks sekitarnya agar stand-out */
    font-weight: 700;
    color: #e2e8f0;
    /* Warna sedikit lebih redup dari putih murni untuk dimensi */
    display: inline-block;
    margin-top: 0.5rem;
}

/* 5. Styling Paragraf Penjelasan */
.hero-text p {
    font-size: 1.15rem;
    opacity: 0.9;
    max-width: 90%;
    line-height: 1.7;
    font-weight: 400;
}

/* 6. Italic khusus pada kata dalam kurung */
.hero-text p i {
    font-weight: 600;
    letter-spacing: 0.5px;
    color: #f8fafc;
}

.footer-text p {
    font-size: 0.95rem;
    opacity: 0.8;
    letter-spacing: 0.5px;
}

/* Sisi Kanan */
.auth-content {
    flex: 1.2;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
}

/* Responsif: Sembunyikan banner hijau di HP */
@media (max-width: 900px) {
    .auth-banner {
        display: none;
    }
}
</style>