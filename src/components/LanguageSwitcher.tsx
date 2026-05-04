import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface LanguageSwitcherProps {
  currentLocale: string;
  onLanguageChange: (locale: string) => void;
}

export const LanguageSwitcher = ({ currentLocale, onLanguageChange }: LanguageSwitcherProps) => {
  return (
    <View style={styles.languageContainer}>
      <TouchableOpacity
        onPress={() => onLanguageChange('en')}
        style={[styles.langButton, currentLocale === 'en' && styles.langButtonActive]}
      >
        <Text style={[styles.langText, currentLocale === 'en' && styles.langTextActive]}>EN</Text>
      </TouchableOpacity>
      <View style={styles.langSeparator} />
      <TouchableOpacity
        onPress={() => onLanguageChange('et')}
        style={[styles.langButton, currentLocale === 'et' && styles.langButtonActive]}
      >
        <Text style={[styles.langText, currentLocale === 'et' && styles.langTextActive]}>ET</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 10,
  },
  langButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  langButtonActive: {
    backgroundColor: 'rgba(0, 229, 255, 0.2)',
    borderColor: 'rgba(0, 229, 255, 0.4)',
    borderWidth: 1,
  },
  langText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '700',
  },
  langTextActive: {
    color: '#00E5FF',
  },
  langSeparator: {
    width: 1,
    height: 14,
    backgroundColor: '#333',
    marginHorizontal: 16,
  },
});
