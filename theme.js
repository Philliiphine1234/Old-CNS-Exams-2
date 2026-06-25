// ─── Dark / Light Mode ──────────────────────────────────────────────

function toggleTheme() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = isDark ? '☀️' : '🌓';
}

function loadTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
        document.body.classList.add('dark');
        const btn = document.getElementById('themeToggle');
        if (btn) btn.textContent = '☀️';
    }
}

// Auto-load on page start
document.addEventListener('DOMContentLoaded', loadTheme);