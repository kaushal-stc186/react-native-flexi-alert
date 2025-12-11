import { AlertType, ButtonLayout, PromptType } from "./types";

export const ALERT_TYPES: Record<string, AlertType> = {
  DEFAULT: 'default',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

export const PROMPT_TYPES: Record<string, PromptType> = {
  DEFAULT: 'default',
  PLAIN_TEXT: 'plain-text',
  SECURE_TEXT: 'secure-text',
  LOGIN_PASSWORD: 'login-password',
};

export const BUTTON_LAYOUTS: Record<string, ButtonLayout> = {
  ROW: 'row',       
  COLUMN: 'column', 
};