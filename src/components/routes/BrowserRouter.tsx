import { createBrowserHistory } from 'history';
import { useState, useEffect, useLayoutEffect } from 'react';
import ReactGa4 from 'react-ga4';
import { Environment } from 'utils/Environment';
import { Router, BrowserRouterProps } from 'react-router-dom';
import { GAEvents } from 'utils/GAEvents';
import GTMModule from 'react-gtm-module';

export const BrowserRouter = (props: BrowserRouterProps) => {
  const history = createBrowserHistory();
  const [historyObj, setHistoryObj] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => {
    history.listen((update) => {
      setHistoryObj(history);
      GAEvents.pageView(update.location.pathname);
    });
  }, [history]);

  useEffect(() => {
    ReactGa4.initialize(Environment.gaTrackingId);
    GTMModule.initialize({
      gtmId: Environment.gtmTrackingId,
    });
  }, []);

  return (
    <Router
      {...props}
      location={historyObj.location}
      navigator={history}
      navigationType={history.action}
    />
  );
};
