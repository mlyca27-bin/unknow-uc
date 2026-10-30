export function formatCurrentTimeDate(d = new Date()): string {
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // convert 0 to 12
  const strTime = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
  return `${day}-${month}-${year} ${strTime}`;
}
