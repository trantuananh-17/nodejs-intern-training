import {formatDistanceToNow} from 'date-fns';

export function formatTimeAgo(timestamp) {
  if (!timestamp) return '';

  const date = new Date(timestamp);
  if (isNaN(date)) return '';

  const text = formatDistanceToNow(date, {addSuffix: true});

  return text
    .replace('about ', '')
    .replace('less than ', '')
    .replace('almost ', '')
    .replace('over ', '');
}
