import { createBrowserHistory } from 'history';
import { useState, useEffect, useLayoutEffect } from 'react';
import { Environment } from 'utils/Environment';
import { Router, BrowserRouterProps } from 'react-router-dom';
import GTMModule from 'react-gtm-module';

export const BrowserRouter = (props: BrowserRouterProps) => {
  const history = createBrowserHistory();
  const [historyObj, setHistoryObj] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => {
    history.listen(() => {
      setHistoryObj(history);
    });
  }, [history]);

  useEffect(() => {
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
