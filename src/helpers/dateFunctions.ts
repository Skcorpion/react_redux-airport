export function toDateFormat(date: string | null) {
  if (date) {
    return new Date(date.split('-').reverse().join('-'));
  }
  return new Date();
}

export function stringifyDate(date: Date) {
  return date.toLocaleDateString('en-GB').split('/').join('-');
}

export function getStringTime(date: string) {
  return new Date(date).toLocaleTimeString('en-GB', {
    hour: 'numeric',
    minute: '2-digit',
  });
}
