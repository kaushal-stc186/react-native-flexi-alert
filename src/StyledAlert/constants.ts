import { ImageSourcePropType } from 'react-native';
import { ALERT_TYPES } from '../AlertTypes';
import { images } from '../constants/images';

export const LAYOUT_CONFIG = {
  modalOpacity: 0.4,
};

interface Theme {
  primary: string;
  light: string;
  icon: ImageSourcePropType;
}

export const THEMES: Record<string, Theme> = {
  [ALERT_TYPES.DEFAULT]: { primary: '#6366F1', light: '#EEF2FF', icon: images.info },
  [ALERT_TYPES.SUCCESS]: { primary: '#10B981', light: '#ECFDF5', icon: images.success },
  [ALERT_TYPES.ERROR]:   { primary: '#EF4444', light: '#FEF2F2', icon: images.error },
  [ALERT_TYPES.WARNING]: { primary: '#F59E0B', light: '#FFFBEB', icon: images.warning },
  [ALERT_TYPES.INFO]:    { primary: '#3B82F6', light: '#EFF6FF', icon: images.info },
};
