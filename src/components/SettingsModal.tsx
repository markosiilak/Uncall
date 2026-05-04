import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
  Switch,
  TextInput,
} from 'react-native';
import { Shield, Users, ChevronRight, X, ChevronLeft, Search, UserPlus, CheckCircle2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LanguageSwitcher } from './LanguageSwitcher';
import i18n from '../constants/i18n';
import { useContacts } from '../hooks/useContacts';

interface SettingsModalProps {
  isVisible: boolean;
  onClose: () => void;
  currentLocale: string;
  onLanguageChange: (locale: string) => void;
}

type ViewType = 'main' | 'privacy' | 'terms' | 'whitelist';

export const SettingsModal = ({ isVisible, onClose, currentLocale, onLanguageChange }: SettingsModalProps) => {
  const [activeView, setActiveView] = useState<ViewType>('main');
  const [isAutoBlockEnabled, setIsAutoBlockEnabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [whitelist, setWhitelist] = useState<string[]>([]);
  const { contacts } = useContacts();

  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedAutoBlock = await AsyncStorage.getItem('@auto_block');
        if (savedAutoBlock !== null) setIsAutoBlockEnabled(JSON.parse(savedAutoBlock));

        const savedWhitelist = await AsyncStorage.getItem('@whitelist');
        if (savedWhitelist !== null) setWhitelist(JSON.parse(savedWhitelist));
      } catch (e) {
        console.error('Failed to load settings', e);
      }
    };
    loadSettings();
  }, []);

  // Save auto-block setting
  const toggleAutoBlock = async (value: boolean) => {
    setIsAutoBlockEnabled(value);
    try {
      await AsyncStorage.setItem('@auto_block', JSON.stringify(value));
    } catch (e) {
      console.error('Failed to save auto-block', e);
    }
  };

  // Toggle whitelist item
  const toggleWhitelist = async (number: string) => {
    let newWhitelist;
    if (whitelist.includes(number)) {
      newWhitelist = whitelist.filter((n) => n !== number);
    } else {
      newWhitelist = [...whitelist, number];
    }
    setWhitelist(newWhitelist);
    try {
      await AsyncStorage.setItem('@whitelist', JSON.stringify(newWhitelist));
    } catch (e) {
      console.error('Failed to save whitelist', e);
    }
  };

  const handleClose = () => {
    setActiveView('main');
    onClose();
  };

  const filteredContacts = contacts.filter((c) => {
    const name = c.name?.toLowerCase() || '';
    const number = c.phoneNumbers?.[0]?.number || '';
    return name.includes(searchQuery.toLowerCase()) || number.includes(searchQuery);
  });

  const renderContent = () => {
    if (activeView === 'privacy') {
      return (
        <View style={styles.subPage}>
          <Text style={styles.subPageText}>{i18n.t('privacyContent')}</Text>
        </View>
      );
    }
    if (activeView === 'terms') {
      return (
        <View style={styles.subPage}>
          <Text style={styles.subPageText}>{i18n.t('termsContent')}</Text>
        </View>
      );
    }
    if (activeView === 'whitelist') {
      return (
        <View style={styles.subPage}>
          <Text style={[styles.subPageText, { marginBottom: 20 }]}>{i18n.t('whitelistDesc')}</Text>
          <View style={styles.searchBar}>
            <Search color="#666" size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder={i18n.t('searchContacts')}
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          {filteredContacts.length > 0 ? (
            filteredContacts.slice(0, 50).map((contact, idx) => {
              const number = contact.phoneNumbers?.[0]?.number;
              if (!number) return null;
              const isInWhitelist = whitelist.includes(number);

              return (
                <View key={contact.id || idx} style={styles.whitelistItem}>
                  <View style={styles.whitelistInfo}>
                    <Text style={styles.whitelistName}>{contact.name || 'Unknown'}</Text>
                    <Text style={styles.whitelistNumber}>{number}</Text>
                  </View>
                  <TouchableOpacity 
                    style={[styles.addButton, isInWhitelist && styles.removeButton]} 
                    onPress={() => toggleWhitelist(number)}
                  >
                    {isInWhitelist ? (
                      <CheckCircle2 color="#00E5FF" size={20} />
                    ) : (
                      <UserPlus color="#666" size={20} />
                    )}
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <Text style={[styles.subPageText, { textAlign: 'center', marginTop: 40 }]}>No contacts found</Text>
          )}
        </View>
      );
    }

    return (
      <>
        <View style={styles.settingGroup}>
          <Text style={styles.settingGroupTitle}>{i18n.t('protectionSettings')}</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Shield color="#00E5FF" size={20} />
            </View>
            <Text style={styles.settingLabel}>{i18n.t('autoBlockUnknown')}</Text>
            <Switch
              value={isAutoBlockEnabled}
              onValueChange={toggleAutoBlock}
              trackColor={{ false: '#333', true: 'rgba(0, 229, 255, 0.3)' }}
              thumbColor={isAutoBlockEnabled ? '#00E5FF' : '#666'}
            />
          </View>
          <TouchableOpacity style={styles.settingItem} onPress={() => setActiveView('whitelist')}>
            <View style={styles.settingIcon}>
              <Users color="#00E5FF" size={20} />
            </View>
            <Text style={styles.settingLabel}>{i18n.t('manageWhitelist')}</Text>
            <ChevronRight color="#333" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.settingGroup}>
          <Text style={styles.settingGroupTitle}>Support</Text>
          <TouchableOpacity style={styles.settingItem} onPress={() => setActiveView('privacy')}>
            <Text style={styles.settingLabel}>{i18n.t('privacyPolicy')}</Text>
            <ChevronRight color="#333" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem} onPress={() => setActiveView('terms')}>
            <Text style={styles.settingLabel}>{i18n.t('termsOfService')}</Text>
            <ChevronRight color="#333" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.settingGroup}>
          <Text style={styles.settingGroupTitle}>{i18n.t('language') || 'Language'}</Text>
          <LanguageSwitcher currentLocale={currentLocale} onLanguageChange={onLanguageChange} />
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>{i18n.t('version')} 1.0.0 (Build 42)</Text>
        </View>
      </>
    );
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={handleClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <LinearGradient colors={['#0A0A0A', '#1A1A2E']} style={StyleSheet.absoluteFill} />
        <View style={styles.modalHeader}>
          {activeView !== 'main' ? (
            <TouchableOpacity style={styles.backButton} onPress={() => setActiveView('main')}>
              <ChevronLeft color="#fff" size={24} />
              <Text style={styles.backText}>{i18n.t('back')}</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.modalTitle}>{i18n.t('settings')}</Text>
          )}
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <X color="#fff" size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.modalContent}>{renderContent()}</ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  modalContent: {
    padding: 24,
  },
  subPage: {
    paddingTop: 10,
  },
  subPageText: {
    color: '#aaa',
    fontSize: 16,
    lineHeight: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 16,
    borderRadius: 16,
    height: 50,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    marginLeft: 12,
    fontSize: 16,
  },
  whitelistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  whitelistInfo: {
    flex: 1,
  },
  whitelistName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  whitelistNumber: {
    color: '#666',
    fontSize: 14,
    marginTop: 2,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButton: {
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
  },
  settingGroup: {
    marginBottom: 32,
  },
  settingGroupTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingLabel: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 40,
  },
  versionText: {
    color: '#333',
    fontSize: 12,
  },
});
