import { logEvent, EventNameString, EventParams, Analytics } from 'firebase/analytics';
import { FC, useEffect, useState } from 'react'
import { useAnalytics } from '~/lib/firebase';

interface Props {
   children: React.ReactNode;
}

const AnalyticsProvider: FC<Props> = ({ children }) => {
   const [analytics, setAnalytics] = useState<Analytics>(useAnalytics());

   const createAnalytics = (eventName: EventNameString, params: EventParams ) => {
      logEvent(analytics, eventName as never, params);
   }

   return (
      <div></div>
   );
}

export default AnalyticsProvider;
