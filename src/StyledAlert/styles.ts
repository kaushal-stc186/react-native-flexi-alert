import { Platform } from 'react-native';
import { ScaledSheet, s } from 'react-native-size-matters';

export const styles = ScaledSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    width: '90%',
    maxHeight: '95%', 
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
  closeIcon: {
    width: '20@s',
    height: '20@s',
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
    padding: 0,
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
    width: '100%',
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
    width: '100%',
  },
  input: {
    width: '100%',
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
    width: '100%',
    gap: '12@s',
  },
  rowLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colLayout: {
    flexDirection: 'column',
  },
  flex1: { 
    flex: 1 
  },
  fullWidth: { 
    width: '100%',
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
