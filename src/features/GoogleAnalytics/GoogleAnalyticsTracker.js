import GoogleAnalytics from 'react-ga4';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function GoogleAnalyticsTracker() {
    const location = useLocation();

    useEffect(() => {
        GoogleAnalytics.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID);
    }, []);

    useEffect(() => {
        GoogleAnalytics.send({ hitType: 'pageview', page: location.pathname });
    }, [location]);

    return null;
}
