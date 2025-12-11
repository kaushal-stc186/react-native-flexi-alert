import React, { useState, useEffect } from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  Image,
  Platform,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageSourcePropType
} from 'react-native';
import { s, ScaledSheet } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import { ALERT_TYPES, PROMPT_TYPES, BUTTON_LAYOUTS } from './AlertTypes';
import { images } from './constants/images';
import { AlertConfig, AlertButton } from './types';


interface Theme {
  primary: string;
  light: string;
  icon: ImageSourcePropType;
}

const THEMES: Record<string, Theme> = {
  [ALERT_TYPES.DEFAULT]: { primary: '#6366F1', light: '#EEF2FF', icon: images.info },
  [ALERT_TYPES.SUCCESS]: { primary: '#10B981', light: '#ECFDF5', icon: images.success },
  [ALERT_TYPES.ERROR]:   { primary: '#EF4444', light: '#FEF2F2', icon: images.error },
  [ALERT_TYPES.WARNING]: { primary: '#F59E0B', light: '#FFFBEB', icon: images.warning },
  [ALERT_TYPES.INFO]:    { primary: '#3B82F6', light: '#EFF6FF', icon: images.info },
};

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
    defaultValue = '',
    closeOnTouchOutside = true,
    showCloseIcon = true,
    buttonLayout = BUTTON_LAYOUTS.ROW, 
    containerStyle = {},
    titleStyle = {},
    messageStyle = {},
    icon: customIcon, 
  } = config;

  const [inputValue, setInputValue] = useState<string>(defaultValue || '');
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  useEffect(() => {
    if (visible) {
      setInputValue(defaultValue || '');
      setIsInputFocused(false);
    }
  }, [visible, defaultValue]);

  const theme = THEMES[type] || THEMES[ALERT_TYPES.DEFAULT];
  const activeIcon = customIcon !== undefined ? customIcon : theme.icon;
  // Check if activeIcon is a number (require) or object (uri), otherwise treat as string/component
  const isImageIcon = typeof activeIcon === 'number' || (typeof activeIcon === 'object' && activeIcon !== null);
  const isSecure = promptType === PROMPT_TYPES.SECURE_TEXT || promptType === PROMPT_TYPES.LOGIN_PASSWORD;
  
  const shouldStack = buttonLayout === BUTTON_LAYOUTS.COLUMN || buttons.length > 2;

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
      isVisible={visible}
      onBackdropPress={() => closeOnTouchOutside && onClose()}
      onBackButtonPress={() => closeOnTouchOutside && onClose()}
      backdropOpacity={0.4}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      avoidKeyboard={true}
      style={styles.modal} 
    >
      <View style={[
        styles.alertContainer, 
        { borderTopColor: theme.primary },
        containerStyle
      ]}>
        
        {showCloseIcon && (
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={onClose} 
            hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          >
            <Image source={images.close} style={{width: 20, height: 20}}/>
          </TouchableOpacity>
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
            <TouchableOpacity 
              key={index}
              style={[
                getButtonStyle(btn.style),
                shouldStack ? styles.fullWidth : styles.flex1
              ]}
              onPress={() => onButtonPress(btn, isPrompt ? inputValue : undefined)}
              activeOpacity={0.9}
            >
              <Text 
                style={[styles.buttonText, getTextStyle(btn.style)]} 
                numberOfLines={1}
              >
                {btn.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

      </View>
    </Modal>
  );
};

export default StyledAlert;

const styles = ScaledSheet.create({
  modal: {
    margin: 0, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    width: '90%',
    minWidth: "90%",
    maxHeight: '80%', 
    backgroundColor: '#FFFFFF',
    borderRadius: '20@s',
    paddingHorizontal: '24@s',
    paddingBottom: '24@s',
    paddingTop: '36@s',
    borderTopWidth: '5@s', 
    borderWidth: 0,
    borderLeftWidth: 1, 
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
    alignItems: 'center', 
    overflow: 'hidden',
    gap: '16@s',
  },
  iconImage: {
    width: '32@s', 
    height: '32@s',
  },
  iconText: {
    fontSize: '28@s',
    fontWeight: 'bold',
    paddingTop: Platform.OS === 'ios' ? s(2) : 0,
  },
  closeButton: {
    position: 'absolute',
    top: '12@s',
    right: '12@s',
    width: '28@s',
    height: '28@s',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '14@s',
    backgroundColor: '#F9FAFB',
    zIndex: 20,
  },
  title: {
    fontSize: '19@s',
    fontWeight: '800',
    color: '#1F2937', 
    textAlign: 'center',
    letterSpacing: 0.2,
    width: '100%', 
  },
  messageWrapper: {
    alignSelf: 'stretch',
    maxHeight: '200@s',
  },
  scrollView: {
    width: '100%',
    flexGrow: 0, 
  },
  scrollContent: {
    flexGrow: 0,
    width: '100%',
  },
  textContainer: {
    width: '100%',
  },
  message: {
    fontSize: '14@s',
    color: '#6B7280', 
    textAlign: "center", 
    lineHeight: '22@s',
    fontWeight: '500',
  },
  inputWrapper: {
    alignSelf: 'stretch', 
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    height: '48@s',
    borderWidth: 1,
    borderColor: '#E5E7EB', 
    borderRadius: '12@s',
    paddingHorizontal: '16@s',
    fontSize: '16@s',
    backgroundColor: '#F9FAFB',
    color: '#1F2937',
  },
  actionContainer: {
    alignSelf: 'stretch', 
    gap: '12@s',
  },
  rowLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colLayout: {
  },
  flex1: { 
    flex: 1 
  },
  fullWidth: { 
    alignSelf: 'stretch', 
  },
  buttonBase: {
    height: '48@s', 
    borderRadius: '12@s',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '16@s',
  },
  btnCancel: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  btnDestructive: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    fontSize: '15@s',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  textWhite: {
    color: '#FFFFFF',
  },
  textCancel: {
    color: '#4B5563', 
  },
});