import { useState, useEffect } from 'react';
import { useSharedValue, useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';
import { AlertConfig } from '../types';
import { PROMPT_TYPES, BUTTON_LAYOUTS } from '../AlertTypes';
import { LAYOUT_CONFIG } from './constants';

export const useStyledAlert = (visible: boolean, config: AlertConfig) => {
  const {
    defaultValue = '',
    promptType = PROMPT_TYPES.PLAIN_TEXT,
    buttonLayout = BUTTON_LAYOUTS.ROW,
    buttons = [],
  } = config;

  const [inputValue, setInputValue] = useState<string>(defaultValue || '');
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  useEffect(() => {
    if (visible) {
      setInputValue(defaultValue || '');
      setIsInputFocused(false);
    }
  }, [visible, defaultValue]);

  const backdropOpacity = useSharedValue(0);
  const modalScale = useSharedValue(0.9);
  const modalOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      backdropOpacity.value = withTiming(LAYOUT_CONFIG.modalOpacity, { duration: 300 });
      modalScale.value = withSpring(1, { damping: 15, stiffness: 150 });
      modalOpacity.value = withTiming(1, { duration: 300 });
    } else {
      backdropOpacity.value = withTiming(0, { duration: 200 });
      modalScale.value = withTiming(0.9, { duration: 200 });
      modalOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [visible]);

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const modalAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: modalScale.value }],
    opacity: modalOpacity.value,
  }));

  const isSecure = promptType === PROMPT_TYPES.SECURE_TEXT || promptType === PROMPT_TYPES.LOGIN_PASSWORD;
  const shouldStack = buttonLayout === BUTTON_LAYOUTS.COLUMN || buttons.length > 2;

  return {
    inputValue,
    setInputValue,
    isInputFocused,
    setIsInputFocused,
    isSecure,
    shouldStack,
    backdropAnimatedStyle,
    modalAnimatedStyle,
  };
};
