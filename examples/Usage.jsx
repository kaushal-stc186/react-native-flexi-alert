import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Alert } from 'react-native-flexi-alert';
import { ScaledSheet } from 'react-native-size-matters';

// ==========================================
// CONFIGURATION & THEME
// ==========================================
const COLORS = {
  background: '#F8FAFC',
  surface: '#FFFFFF',
  textPrimary: '#0F172A', 
  textSecondary: '#64748B', 
  border: '#E2E8F0', 
  
  // Accents
  successBg: '#F0FDF4',
  successText: '#166534',
  errorBg: '#FEF2F2',
  errorText: '#991B1B',
  warnBg: '#FFFBEB',
  warnText: '#92400E',
  infoBg: '#EFF6FF',
  infoText: '#1E40AF',
  darkBg: '#1E293B',
  darkText: '#FFFFFF',
};

const Usage = () => {

  // ==========================================
  // 1. BASIC FEEDBACK
  // ==========================================
  const showSuccess = () => {
    Alert.success("Profile Saved", "Your changes have been successfully saved to the cloud.");
  };

  const showError = () => {
    Alert.error("Upload Failed", "Network connection timed out. Please try again later.");
  };

  const showInfo = () => {
    Alert.info("Did you know?", "You can swipe left on items to delete them quickly.");
  };

  const showWarning = () => {
    Alert.warn("Storage Full", "You are running low on storage space.", [
      { text: "Later", style: "cancel" },
      { text: "Clean Up", onPress: () => console.log("Nav to cleanup") }
    ]);
  };

  // ==========================================
  // 2. INPUT & VALIDATION (ADVANCED)
  // ==========================================

  const showSimplePrompt = () => {
    Alert.prompt(
      "Rename File", 
      "Enter a new name for your document:", 
      (text) => Alert.success("Renamed", `File renamed to ${text}`),
      "plain-text",
      "Untitled_Doc" 
    );
  };

  const showValidationPrompt = () => {
    Alert.prompt(
      "Age Verification", 
      "You must be 18+ to enter.", 
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Enter", 
          closable: false, 
          onPress: (age, close) => {
            const num = parseInt(age);
            if (!num || num < 18) {
              Alert.error("Access Denied", "You must be over 18.");
            } else {
              close(); 
              Alert.success("Access Granted", "Welcome to the club!");
            }
          }
        }
      ],
      "plain-text",
      "", 
      "numeric"
    );
  };

  const showSecurePrompt = () => {
    Alert.prompt(
      "Confirm Password", 
      "Enter your current password to make changes.", 
      (pass) => console.log("Password entered"),
      "secure-text"
    );
  };

  // ==========================================
  // 3. BLOCKING & ASYNC FLOWS
  // ==========================================

  const showBlockingLoader = () => {
    Alert.alert(
      "Syncing Data", 
      "Please do not close the app while we sync your data...",
      [{ text: "Wait...", closable: false, onPress: () => {} }],
      { showCloseIcon: false, closeOnTouchOutside: false } 
    );

    setTimeout(() => {
      Alert.hide(); 
      Alert.success("Sync Complete", "Your data is up to date.");
    }, 3000);
  };

  const showAsyncAction = () => {
    Alert.alert(
      "Download Item?",
      "This file is 50MB.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Download",
          closable: false, 
          onPress: (close) => {
            setTimeout(() => {
              close(); 
              Alert.success("Downloaded", "Check your downloads folder.");
            }, 1500); 
          }
        }
      ]
    );
  };

  // ==========================================
  // 4. LAYOUTS & STYLING
  // ==========================================

  const showDestructive = () => {
    Alert.alert(
      "Delete Account?",
      "This action cannot be undone. All data will be lost.",
      [
        { text: "Keep Account", style: "cancel" },
        { text: "Delete Forever", style: "destructive", onPress: () => console.log("Deleted") }
      ],
      {
        buttonLayout: "column"
      }
    );
  };

  const showCustomStyle = () => {
    Alert.alert(
      "Premium Unlocked!", 
      "You now have access to all gold features.",
      [{ text: "Awesome!", style: "default" }],
      {
        containerStyle: { borderWidth: 2, borderColor: '#F59E0B', backgroundColor: '#FFFBEB' },
        titleStyle: { color: '#D97706', fontSize: 22 },
        messageStyle: { color: '#92400E' }
      },
      'success' 
    );
  };

  const showVerticalStack = () => {
    Alert.alert(
      "Share Content", 
      "Choose a platform",
      [
        { text: "Share to Instagram", onPress: () => {} },
        { text: "Share to Twitter", onPress: () => {} },
        { text: "Copy Link", onPress: () => {} },
        { text: "Cancel", style: "cancel" }
      ],
      { buttonLayout: 'column' } 
    );
  };

  // ==========================================
  // 5. LONG TEXT EXAMPLES
  // ==========================================

  const showLongText = () => {
    Alert.info(
      "System Log Details", 
      "This is an example of a reasonably long message that might appear in an alert. It contains enough text to wrap multiple lines to test the line-height and alignment logic of the alert component. Usually, alerts should be concise, but sometimes verbose errors occur."
    );
  };

  const showExtremeText = () => {
    Alert.alert(
      "Terms of Service Update", 
      "1. Introduction\nWelcome to our app. By using this app, you agree to the following terms.\n\n2. Privacy Policy\nWe value your privacy. We do not sell your data to third parties without consent. All data is encrypted in transit and at rest.\n\n3. User Conduct\nYou agree not to use the app for illegal purposes, harassment, or spamming other users. Violation of these rules will result in immediate termination of your account.\n\n4. Liability\nWe are not liable for any damages arising from the use of this software. Use it at your own risk.\n\n5. Updates\nWe may update these terms at any time. Continued use of the app implies acceptance.\n\n(Scroll to read more...)",
      [{ text: "I Agree", onPress: () => {} }, { text: "Decline", style: "cancel" }]
    );
  };

  // ==========================================
  // COMPONENTS
  // ==========================================

  const ExampleButton = ({ label, color = COLORS.surface, textColor = COLORS.textPrimary, onPress, fullWidth = false }) => (
    <TouchableOpacity 
      style={[
        styles.button, 
        { 
          backgroundColor: color, 
          // Only show border if the button is white/surface color
          borderColor: color === COLORS.surface ? COLORS.border : 'transparent',
        },
        fullWidth ? styles.fullWidth : styles.halfWidth
      ]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Alerts Playground</Text>
        <Text style={styles.headerSubtitle}>Comprehensive usage examples</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        {/* 1. Standard Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Standard Feedback</Text>
          <View style={styles.rowContainer}>
            <ExampleButton label="Success" color={COLORS.successBg} textColor={COLORS.successText} onPress={showSuccess} />
            <ExampleButton label="Error" color={COLORS.errorBg} textColor={COLORS.errorText} onPress={showError} />
          </View>
          <View style={styles.rowContainer}>
            <ExampleButton label="Warning" color={COLORS.warnBg} textColor={COLORS.warnText} onPress={showWarning} />
            <ExampleButton label="Info" color={COLORS.infoBg} textColor={COLORS.infoText} onPress={showInfo} />
          </View>
        </View>

        {/* 2. Advanced Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Input & Validation</Text>
          <View style={styles.columnContainer}>
            <ExampleButton label="Simple Text Prompt" fullWidth onPress={showSimplePrompt} />
            <ExampleButton label="Validation (Must be 18+)" fullWidth onPress={showValidationPrompt} />
            <ExampleButton label="Secure Password" fullWidth onPress={showSecurePrompt} />
          </View>
        </View>

        {/* 3. Logic Flows */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Blocking & Async Logic</Text>
          <View style={styles.columnContainer}>
            <ExampleButton 
              label="Blocking Loader (No Close)" 
              fullWidth 
              color={COLORS.darkBg} 
              textColor={COLORS.darkText} 
              onPress={showBlockingLoader} 
            />
            <ExampleButton 
              label="Async Action (Wait -> Close)" 
              fullWidth 
              color={COLORS.darkBg} 
              textColor={COLORS.darkText} 
              onPress={showAsyncAction} 
            />
          </View>
        </View>

        {/* 4. Layouts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Layouts & Styling</Text>
          <View style={styles.columnContainer}>
            <ExampleButton 
              label="Destructive Action" 
              fullWidth 
              color={COLORS.errorBg} 
              textColor={COLORS.errorText} 
              onPress={showDestructive} 
            />
            <View style={styles.rowContainer}>
              <ExampleButton label="Custom CSS" onPress={showCustomStyle} />
              <ExampleButton label="Vertical Stack" onPress={showVerticalStack} />
            </View>
          </View>
        </View>

        {/* 5. Long Text & Edge Cases */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Edge Cases (Long Text)</Text>
          <View style={styles.columnContainer}>
            <ExampleButton 
              label="Long Message Paragraph" 
              fullWidth 
              onPress={showLongText} 
            />
            <ExampleButton 
              label="Very Long Text (Scrollable)" 
              fullWidth 
              onPress={showExtremeText} 
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Usage;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingVertical: '20@s',
    paddingHorizontal: '24@s',
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: '4@s',
  },
  headerTitle: {
    fontSize: '22@s',
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: '13@s',
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  
  
  scrollContent: {
    padding: '24@s',
    gap: '32@s', 
  },
  section: {
    gap: '12@s',
  },
  sectionTitle: {
    fontSize: '11@s',
    fontWeight: '700',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  
  
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '12@s',
  },
  columnContainer: {
    gap: '12@s',
  },

  button: {
    paddingVertical: '14@s',
    paddingHorizontal: '16@s',
    borderRadius: '12@s',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent', 
  },
  halfWidth: {
    flex: 1,
  },
  fullWidth: {
    width: '100%',
  },
  buttonText: {
    fontSize: '13@s',
    fontWeight: '600',
    textAlign: 'center',
  },
  footerSpacer: {
    height: '20@s',
  }
});