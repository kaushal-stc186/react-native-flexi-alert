import React, { useState, useEffect, useCallback } from 'react';
import StyledAlert from './StyledAlert';
import { setAlertRef } from './AlertService';
import { AlertConfig, AlertButton } from './types';

const GlobalAlert: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertConfig[]>([]);

  useEffect(() => {
    setAlertRef({
      show: (newConfig: AlertConfig) => {
        setAlerts((prev) => [...prev, newConfig]);
      },
      close: () => {
        setAlerts((prev) => {
          if (prev.length === 0) return prev;
          return prev.slice(0, -1);
        });
      },
      closeAll: () => {
        setAlerts([]);
      }
    });

    return () => setAlertRef(null);
  }, []);

  const removeAlert = useCallback((id?: string) => {
    if (!id) return;
    setAlerts((prev) => prev.filter(alert => alert.id !== id));
  }, []);

  if (alerts.length === 0) return null;

  // Render only the top-most alert
  const activeAlertConfig = alerts[alerts.length - 1];

  return (
    <StyledAlertWrapper 
      key={activeAlertConfig.id} 
      config={activeAlertConfig} 
      onDismiss={() => removeAlert(activeAlertConfig.id)} 
    />
  );
};

interface WrapperProps {
  config: AlertConfig;
  onDismiss: () => void;
}

const StyledAlertWrapper: React.FC<WrapperProps> = ({ config, onDismiss }) => {
  const handleButtonPress = (btn: AlertButton, inputValue?: string) => {
    // 1. Define the manual close function
    const close = () => onDismiss();

    // 2. Check if user explicitly wants to prevent auto-close
    const isManualCloseOnly = btn.closable === false || btn.preventAutoClose === true;

    if (btn.onPress) {
      // 3. Call the onPress with args: (inputValue?, closeMethod)
      const result = config.isPrompt 
        ? btn.onPress(inputValue, close) 
        : (btn.onPress as Function)(close); // Type assertion for non-prompt flow

      // 4. If manual close is requested, we STOP here. 
      if (isManualCloseOnly) {
        return;
      }

      // Legacy support: returning explicit false also stops closing
      if (result === false) {
        return;
      }
    }

    // 5. Default behavior: Auto Close
    close();
  };

  const handleClose = () => {
    // Handle 'X' button or Backdrop press
    const cancelBtn = config.buttons?.find(b => b.style === 'cancel');
    if (cancelBtn && cancelBtn.onPress) {
      // We pass undefined for value, and a dummy close function
      cancelBtn.onPress(undefined, () => {}); 
    }
    onDismiss();
  };

  return (
    <StyledAlert
      visible={true} 
      config={config}
      onClose={handleClose}
      onButtonPress={handleButtonPress}
    />
  );
};

export default GlobalAlert;