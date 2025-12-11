# 🚨 React Native Flexi Alert

A flexible, responsive, and easy-to-use alert system for React Native. Features global alerts, input prompts, async flows, and full TypeScript support.

---

## ✨ Features

React Native Flexi Alert provides a rich alert and prompt modal API with:

- **Global Access:** Trigger alerts from anywhere (Redux, Sagas, Components).
- **Responsive:** Built with `react-native-size-matters` for scaling.
- **Prompts:** Supports plain text, secure text, and input validation logic.
- **Async Flows:** Prevent auto-closing for async operations or loading states.
- **Customizable:** Override styles, layouts (row/column), and alert themes.
- **Types:** Full TypeScript support for all public APIs.

---

## 📦 Installation

Install the package via npm or yarn:

```bash
npm install react-native-flexi-alert
# or
yarn add react-native-flexi-alert
```

---

## 🛠️ Setup

For the alert system to work globally, **place the `<GlobalAlert />` component at the root of your app (outside navigation containers):**

```jsx
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GlobalAlert } from 'react-native-flexi-alert';
import App from './App';

export default function Root() {
  return (
    <SafeAreaProvider>
      <App />
      {/* Add this at the very end */}
      <GlobalAlert />
    </SafeAreaProvider>
  );
}
```

---

## 🚀 Usage Examples

You can use Flexi Alert anywhere in your app — just import the `Alert` object and call its methods.

### Basic Alerts

Show different types of alerts:

```js
import { Alert } from 'react-native-flexi-alert';

// Success Alert
Alert.success(
  "Profile Saved",
  "Your changes have been saved."
);

// Error Alert
Alert.error(
  "Upload Failed",
  "Network connection timed out."
);

// Info Alert
Alert.info(
  "Did you know?",
  "You can swipe left to delete items."
);

// Warning with Buttons
Alert.warn(
  "Storage Full",
  "Low storage space remaining.",
  [
    { text: "Later", style: "cancel" },
    { text: "Clean Up", onPress: () => console.log("Navigate") }
  ]
);
```

---

### Input Prompts

Prompt the user for input (plain or secure, with validation):

```js
Alert.prompt(
  "Rename File",
  "Enter a new name:",
  (text) => console.log("New name:", text),
  "plain-text", // type
  "Untitled_Doc" // default value
);
```

#### Prompt with Validation

Prevent closing until input is valid, by setting `closable: false`:

```js
Alert.prompt(
  "Age Verification",
  "You must be 18+ to enter.",
  [
    { text: "Cancel", style: "cancel" },
    {
      text: "Enter",
      closable: false, // Prevents auto-close
      onPress: (age, close) => {
        const num = parseInt(age);
        if (num < 18) {
          Alert.error("Error", "Must be 18+");
        } else {
          close(); // Manually close
          Alert.success("Welcome", "Access Granted");
        }
      }
    }
  ],
  "plain-text",
  "",
  "numeric" // Keyboard type
);
```

---

### Async & Blocking Alerts

Display a blocking alert (for loading states) and then update when ready:

```js
const handleSync = () => {
  // 1. Show a blocking alert (no close button)
  Alert.alert(
    "Syncing Data",
    "Please wait...",
    [], // No buttons
    { showCloseIcon: false, closeOnTouchOutside: false }
  );

  // 2. Perform Async Action
  setTimeout(() => {
    // 3. Hide loading and show success
    Alert.hide();
    Alert.success("Done", "Sync Complete");
  }, 3000);
};
```

---

### Custom Layouts and Styles

Customize button layouts, styles, and icons:

```js
Alert.alert(
  "Share Content",
  "Choose a platform",
  [
    { text: "Instagram", onPress: () => {} },
    { text: "Twitter", onPress: () => {} },
    { text: "Copy Link", onPress: () => {} },
    { text: "Cancel", style: "cancel" }
  ],
  { buttonLayout: 'column' }
);

Alert.alert(
  "Premium Unlocked!",
  "Enjoy your gold features.",
  [{ text: "Awesome!", style: "default" }],
  {
    containerStyle: {
      borderWidth: 2,
      borderColor: '#F59E0B',
      backgroundColor: '#FFFBEB'
    },
    titleStyle: { color: '#D97706' },
    messageStyle: { color: '#92400E' }
  },
  'success'
);
```

---

## 📚 API Overview

### Alert API Methods

| Method           | Description                                             |
|------------------|--------------------------------------------------------|
| `Alert.alert()`  | Show a custom alert dialog                             |
| `Alert.prompt()` | Show an input prompt (plain, secure, login-password)   |
| `Alert.error()`  | Show an error alert (shortcut)                         |
| `Alert.warn()`   | Show a warning alert (shortcut)                        |
| `Alert.success()`| Show a success alert (shortcut)                        |
| `Alert.info()`   | Show an info alert (shortcut)                          |
| `Alert.hide()`   | Hide the currently active alert                        |

### Alert Button Options

Alert button objects:

```ts
{
  text: string,                 // Button label
  style: 'default' | 'cancel' | 'destructive', // Button style
  onPress: (inputValue, close) => void | boolean, // Callback
  closable: boolean,            // If false, must call close() manually
}
```

### Prompt Types

- `"plain-text"`: Standard text input
- `"secure-text"`: Password-style input
- `"login-password"`: Two-field prompt (username + password)

---

## 🧩 File Overview & Architecture

This library exposes two main public entry points: **Alert** and **GlobalAlert**. You only need to import and use these when integrating the library in your app.

---

## 📝 License

MIT License (see [LICENSE](./LICENSE)).

---

```card
{
  "title": "Best Practices",
  "content": "Always mount <GlobalAlert /> at the root level. Use button 'closable: false' for async/validated actions to avoid premature closure."
}
```

---

## 🧑‍💻 Contributing

PRs, issues, and suggestions are welcome! See the repository for details.

---

## ⚠️ Known Limitations

- Only one alert is visible at a time (stacked alerts are managed in order).
- All icon images must exist in the expected asset paths, or customize via config.

---

## 📞 Support

For questions or issues, please open an issue on [GitHub](https://github.com/kaushal-stc186/react-native-flexi-alert).

---

Happy Alerting! 🚀