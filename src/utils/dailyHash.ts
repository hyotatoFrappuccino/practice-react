// djb2-style hash seeded by today's date string (YYYYMMDD)
function hashDate(dateStr: string): number {
  let hash = 5381;
  for (let i = 0; i < dateStr.length; i++) {
    hash = ((hash << 5) + hash) ^ dateStr.charCodeAt(i);
    hash = hash >>> 0; // keep as unsigned 32-bit
  }
  return hash;
}

function todayString(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}${m}${day}`;
}

export function getDailyIndex(total: number): number {
  if (total === 0) return 0;
  return hashDate(todayString()) % total;
}
