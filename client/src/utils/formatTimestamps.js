export function formatTimestamp(timestamp) {
  const options = { year: 'numeric', month: 'long', day: '2-digit' };
  const formattedDate = new Date(timestamp).toLocaleDateString(
    'en-US',
    options
  );
  return formattedDate;
}
