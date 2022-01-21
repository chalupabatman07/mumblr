import dayjs from 'dayjs';

export function todayISOString() {
  return dayjs().toISOString();
}
