import React from 'react';
import { 
  Text, 
  View, 
  Pressable, 
  TextInput, 
  ScrollView,
  Image,
  Modal,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageSourcePropType
} from 'react-native';
import Animated from 'react-native-reanimated';
import { ALERT_TYPES, PROMPT_TYPES, BUTTON_LAYOUTS } from '../AlertTypes';
import { images } from '../constants/images';
import { AlertConfig, AlertButton } from '../types';
import { THEMES } from './constants';
import { useStyledAlert } from './useStyledAlert';
import { styles } from './styles';

interface StyledAlertProps {
  visible?: boolean;
  config?: AlertConfig;
  onClose: () => void;
  onButtonPress: (btn: AlertButton, inputValue?: string) => void;
}

const StyledAlert: React.FC<StyledAlertProps> = ({
  visible = false,
  config = {},
  onClose,
  onButtonPress
}) => {
  const {
    title,
    message,
    buttons = [],
    type = ALERT_TYPES.DEFAULT,
    isPrompt = false,
    promptType = PROMPT_TYPES.PLAIN_TEXT,
    keyboardType = 'default',
    closeOnTouchOutside = true,
    showCloseIcon = true,
    buttonLayout = BUTTON_LAYOUTS.ROW, 
    containerStyle = {},
    titleStyle = {},
    messageStyle = {},
    icon: customIcon, 
  } = config;

  const {
    inputValue,
    setInputValue,
    isInputFocused,
    setIsInputFocused,
    isSecure,
    shouldStack,
    backdropAnimatedStyle,
    modalAnimatedStyle,
  } = useStyledAlert(visible, config);

  const theme = THEMES[type] || THEMES[ALERT_TYPES.DEFAULT];
  const activeIcon = customIcon !== undefined ? customIcon : theme.icon;
  const isImageIcon = typeof activeIcon === 'number' || (typeof activeIcon === 'object' && activeIcon !== null);

  const getButtonStyle = (btnStyle?: string): StyleProp<ViewStyle> => {
    const base: any[] = [styles.buttonBase];

    if (btnStyle === 'cancel') {
      base.push(styles.btnCancel);
    } else if (btnStyle === 'destructive') {
      base.push(styles.btnDestructive);
    } else {
      base.push({ backgroundColor: theme.primary });
    }
    return base;
  };

  const getTextStyle = (btnStyle?: string): StyleProp<TextStyle> => {
    if (btnStyle === 'cancel') return styles.textCancel;
    return styles.textWhite;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={() => closeOnTouchOutside && onClose()}
      statusBarTranslucent
    >
      <View style={styles.modalWrapper}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => closeOnTouchOutside && onClose()}
        >
          <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }, backdropAnimatedStyle]} />
        </Pressable>
        <Animated.View style={[styles.modal, modalAnimatedStyle]} pointerEvents="box-none">
          <View style={[
            styles.alertContainer, 
            { borderTopColor: theme.primary },
            containerStyle
          ]}>
        
            {showCloseIcon && (
              <Pressable 
                style={styles.closeButton}
                onPress={onClose} 
                hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
              >
                <Image source={images.close} style={styles.closeIcon}/>
              </Pressable>
            )}

            <View>
              {isImageIcon ? (
                <Image 
                  source={activeIcon as ImageSourcePropType} 
                  style={[styles.iconImage]}
                  resizeMode="contain"
                />
              ) : (
                <Text style={[styles.iconText, { color: theme.primary }]}>
                  {activeIcon as string}
                </Text>
              )}
            </View>

            {title ? <Text style={[styles.title, titleStyle]}>{title}</Text> : null}

            {message ? (
              <View style={styles.messageWrapper}>
                <ScrollView 
                  style={styles.scrollView}
                  contentContainerStyle={styles.scrollContent}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                  bounces={false}
                >
                  <View style={styles.textContainer}>
                    <Text style={[styles.message, messageStyle]}>
                      {message}
                    </Text>
                  </View>
                </ScrollView>
              </View>
            ) : null}
            
            {isPrompt && (
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[
                    styles.input,
                    isInputFocused && { 
                      borderColor: theme.primary, 
                      backgroundColor: '#FFFFFF',
                    }
                  ]}
                  value={inputValue}
                  onChangeText={setInputValue}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  placeholder=""
                  secureTextEntry={isSecure}
                  keyboardType={keyboardType}
                  autoFocus={true}
                  selectTextOnFocus={true}
                  placeholderTextColor="#9CA3AF"
                  selectionColor={theme.primary}
                  multiline={false} 
                />
              </View>
            )}

            <View style={[
              styles.actionContainer, 
              shouldStack ? styles.colLayout : styles.rowLayout,
            ]}>
              {buttons.map((btn, index) => (
                <Pressable 
                  key={index}
                  style={[
                    getButtonStyle(btn.style),
                    shouldStack ? styles.fullWidth : styles.flex1
                  ]}
                  onPress={() => onButtonPress(btn, isPrompt ? inputValue : undefined)}
                >
                  <Text 
                    style={[styles.buttonText, getTextStyle(btn.style)]} 
                    numberOfLines={1}
                  >
                    {btn.text}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default StyledAlert;
