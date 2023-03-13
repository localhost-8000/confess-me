const formatter = new Intl.RelativeTimeFormat('en-us', {
   numeric: 'auto',
});

const DIVISIONS = [
   { amount: 60, name: 'seconds' },
   { amount: 60, name: 'minutes' },
   { amount: 24, name: 'hours' },
   { amount: 7, name: 'days' },
   { amount: 4.34524, name: 'weeks' },
   { amount: 12, name: 'months' },
   { amount: Number.POSITIVE_INFINITY, name: 'years' },
]

export function formatTimeAgo(date?: string) {
   if(!date) return;
   let duration = (date as any - (new Date() as any)) / 1000;

   for (const { amount, name } of DIVISIONS) {
      if (Math.abs(duration) < amount) {
         return formatter.format(Math.round(duration), name as Intl.RelativeTimeFormatUnit);
      }
      duration /= amount;
   }
}
