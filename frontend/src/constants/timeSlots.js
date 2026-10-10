const SLOT_START_MINUTES = 6 * 60
const SLOT_END_MINUTES = 21 * 60
const SLOT_INTERVAL_MINUTES = 30

const formatTime = (totalMinutes) => {
  const hours24 = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const period = hours24 >= 12 ? 'PM' : 'AM'
  const hours12 = hours24 % 12 || 12
  return `${hours12}:${String(minutes).padStart(2, '0')} ${period}`
}

export const TIME_SLOTS = Array.from(
  { length: (SLOT_END_MINUTES - SLOT_START_MINUTES) / SLOT_INTERVAL_MINUTES + 1 },
  (_, index) => formatTime(SLOT_START_MINUTES + index * SLOT_INTERVAL_MINUTES)
)
