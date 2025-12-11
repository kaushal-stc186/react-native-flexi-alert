// src/types.ts
import { ImageSourcePropType, KeyboardTypeOptions, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type AlertType = 'default' | 'success' | 'error' | 'warning' | 'info';
export type PromptType = 'default' | 'plain-text' | 'secure-text' | 'login-password';
export type ButtonLayout = 'row' | 'column';
export type ButtonStyle = 'default' | 'cancel' | 'destructive';

export interface AlertButton {
  text?: string;
  style?: ButtonStyle;
  onPress?: (value?: string, close?: () => void) => void | boolean;
  closable?: boolean;          // Explicit flag to prevent auto-close
  preventAutoClose?: boolean;  // Legacy flag support
}

export interface AlertConfig {
  id?: string;
  title?: string;
  message?: string;
  buttons?: AlertButton[];
  type?: AlertType;
  isPrompt?: boolean;
  promptType?: PromptType;
  defaultValue?: string;
  keyboardType?: KeyboardTypeOptions;
  closeOnTouchOutside?: boolean;
  showCloseIcon?: boolean;
  buttonLayout?: ButtonLayout;
  
  // Styling overrides
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  messageStyle?: StyleProp<TextStyle>;
  icon?: string | ImageSourcePropType;
}

// The interface for the methods exposed by GlobalAlert to AlertService
export interface AlertRefInterface {
  show: (config: AlertConfig) => void;
  close: () => void;
  closeAll: () => void;
}