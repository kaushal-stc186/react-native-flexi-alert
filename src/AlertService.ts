import { ALERT_TYPES, PROMPT_TYPES } from './AlertTypes';
import { 
  AlertConfig, 
  AlertRefInterface, 
  AlertButton, 
  PromptType,
  AlertType 
} from './types';
import { KeyboardTypeOptions } from 'react-native';

let alertRef: AlertRefInterface | null = null;

export const setAlertRef = (ref: AlertRefInterface | null) => {
  alertRef = ref;
};

export const hideAlert = () => {
  if (alertRef) alertRef.close();
};

const generateId = (): string => Date.now().toString() + Math.floor(Math.random() * 1000);

const show = (config: AlertConfig) => {
  if (alertRef) {
    alertRef.show({
      ...config,
      id: generateId(),
    });
  }
};

const ensureButtons = (buttons?: AlertButton[]): AlertButton[] => {
  if (!buttons || buttons.length === 0) {
    return [{ text: 'OK', onPress: () => {} }];
  }
  return buttons;
};

// --- Public API Options Interface ---
export interface AlertOptions extends Omit<AlertConfig, 'title' | 'message' | 'buttons' | 'type' | 'isPrompt'> {}

/**
 * @param title
 * @param message
 * @param buttons
 * @param options - Customization options like buttonLayout, containerStyle, etc.
 * @param type
 */
const alert = (
  title?: string, 
  message?: string, 
  buttons?: AlertButton[], 
  options: AlertOptions = {}, 
  type: AlertType = ALERT_TYPES.DEFAULT as AlertType
) => {
  show({
    title,
    message,
    buttons: ensureButtons(buttons),
    type,
    ...options, 
    isPrompt: false,
  });
};

const prompt = (
  title?: string, 
  message?: string, 
  callbackOrButtons?: ((text: string) => void) | AlertButton[], 
  type: PromptType = PROMPT_TYPES.PLAIN_TEXT as PromptType, 
  defaultValue: string = '', 
  keyboardType: KeyboardTypeOptions = 'default',
  options: AlertOptions = {}
) => {
  let buttons: AlertButton[] = [];
  
  if (typeof callbackOrButtons === 'function') {
    buttons = [
      { text: 'Cancel', style: 'cancel', onPress: () => {} },
      { text: 'OK', onPress: (val) => callbackOrButtons(val || '') }
    ];
  } else if (Array.isArray(callbackOrButtons)) {
    buttons = callbackOrButtons;
  } else {
    buttons = [
      { text: 'Cancel', style: 'cancel', onPress: () => {} },
      { text: 'OK', onPress: () => {} }
    ];
  }

  show({
    title,
    message,
    buttons,
    type: ALERT_TYPES.DEFAULT as AlertType,
    isPrompt: true,
    promptType: type,
    defaultValue,
    keyboardType,
    ...options,
  });
};

// Helpers
const error = (title?: string, message?: string, buttons?: AlertButton[], options?: AlertOptions) => 
  alert(title, message, buttons, options, ALERT_TYPES.ERROR as AlertType);

const warn = (title?: string, message?: string, buttons?: AlertButton[], options?: AlertOptions) => 
  alert(title, message, buttons, options, ALERT_TYPES.WARNING as AlertType);

const success = (title?: string, message?: string, buttons?: AlertButton[], options?: AlertOptions) => 
  alert(title, message, buttons, options, ALERT_TYPES.SUCCESS as AlertType);

const info = (title?: string, message?: string, buttons?: AlertButton[], options?: AlertOptions) => 
  alert(title, message, buttons, options, ALERT_TYPES.INFO as AlertType);

export default {
  alert,
  prompt,
  error,
  warn,
  success,
  info,
  hide: hideAlert,
};