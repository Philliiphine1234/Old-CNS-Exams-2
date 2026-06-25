// ─── UNIQUE VISITOR COUNTER ──────────────────────────────────────────
// Uses free CountAPI (countapi.xyz) – no backend needed.

const COUNTER_NAMESPACE = 'cns-quiz';
const TOTAL_KEY = 'total';
const UNIQUE_KEY = 'unique';
const STORAGE_KEY = 'cns_visitor_counted';

// ─── Helper: update the display ──────────────────────────────────────
function updateCounterDisplay(total, unique) {
    const totalEl = document.getElementById('totalVisitors');
    const uniqueEl = document.getElementById('uniqueVisitors');
    if (totalEl) totalEl.textContent = total;
    if (uniqueEl) uniqueEl.textContent = unique;
}

// ─── Core: fetch, increment, display ─────────────────────────────────
async function updateVisitorCounter() {
    try {
        // 1. Get current counts (without incrementing)
        const [totalRes, uniqueRes] = await Promise.all([
            fetch(`https://api.countapi.xyz/get/${COUNTER_NAMESPACE}/${TOTAL_KEY}`),
            fetch(`https://api.countapi.xyz/get/${COUNTER_NAMESPACE}/${UNIQUE_KEY}`)
        ]);

        if (!totalRes.ok || !uniqueRes.ok) throw new Error('Failed to fetch counts');

        const totalData = await totalRes.json();
        const uniqueData = await uniqueRes.json();

        let currentTotal = totalData.value || 0;
        let currentUnique = uniqueData.value || 0;

        // 2. Check if this visitor has been counted before
        const alreadyCounted = localStorage.getItem(STORAGE_KEY);

        // 3. Increment total always
        const incTotalRes = await fetch(`https://api.countapi.xyz/hit/${COUNTER_NAMESPACE}/${TOTAL_KEY}`);
        if (!incTotalRes.ok) throw new Error('Failed to increment total');
        const incTotalData = await incTotalRes.json();
        currentTotal = incTotalData.value;

        // 4. Increment unique only if not counted before
        if (!alreadyCounted) {
            const incUniqueRes = await fetch(`https://api.countapi.xyz/hit/${COUNTER_NAMESPACE}/${UNIQUE_KEY}`);
            if (!incUniqueRes.ok) throw new Error('Failed to increment unique');
            const incUniqueData = await incUniqueRes.json();
            currentUnique = incUniqueData.value;
            // Mark this visitor as counted
            localStorage.setItem(STORAGE_KEY, 'true');
        }

        // 5. Update the display
        updateCounterDisplay(currentTotal, currentUnique);

    } catch (error) {
        console.warn('Visitor counter error:', error);
        updateCounterDisplay('?', '?');
    }
}

// ─── Run when the page loads ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', updateVisitorCounter);