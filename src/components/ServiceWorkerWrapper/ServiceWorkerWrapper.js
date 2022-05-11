import React, { useEffect } from 'react';
import { Snackbar, Button } from '@mui/material';
import * as serviceWorker from '../../serviceWorkerRegistration';

const ServiceWorkerWrapper = () => {
  const [showReload, setShowReload] = React.useState(false);
  const [waitingWorker, setWaitingWorker] = React.useState(ServiceWorker | null);

  const onSWUpdate = (registration) => {
    setShowReload(true);
    setWaitingWorker(registration.waiting);
  };

  useEffect(() => {
    serviceWorker.register({ onUpdate: onSWUpdate });
  }, []);

  const reloadPage = () => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
    setShowReload(false);
    window.location.reload(true);
  };

  return (
    <Snackbar
      open={showReload}
      message="Una nuova versione è disponibile!"
      onClick={reloadPage}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      action={
        <Button
          color="inherit"
          size="small"
          onClick={reloadPage}
        >
          Aggiorna
        </Button>
      }
    />
  );
}

export default ServiceWorkerWrapper;