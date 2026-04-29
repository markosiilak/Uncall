import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Settings, Users, PhoneOff, Info } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Components
import { Shield } from './src/components/Shield';
import { StatCard } from './src/ui/StatCard';
import { ActivityItem } from './src/components/ActivityItem';
import { SettingsModal } from './src/components/SettingsModal';
import { LanguageSwitcher } from './src/components/LanguageSwitcher';

// Hooks & Constants
import { useContacts } from './src/hooks/useContacts';
import i18n from './src/constants/i18n';

export default function App() {
  const { width } = useWindowDimensions();
  const [locale, setLocale] = useState(i18n.locale);
  const [isActive, setIsActive] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const { contactCount } = useContacts();

  const changeLanguage = (newLocale: string) => {
    i18n.locale = newLocale;
    setLocale(newLocale);
  };

  // Responsive sizes
  const isSmallScreen = width < 380;
  const shieldSize = width * 0.5 > 220 ? 220 : width * 0.55;

  return (
    <SafeAreaView style={styles.container}>
      <ExpoStatusBar style="light" />
      <LinearGradient colors={['#0A0A0A', '#1A1A2E']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={[styles.title, isSmallScreen && { fontSize: 24 }]}>{i18n.t('appName')}</Text>
          <Text style={styles.subtitle}>{i18n.t('tagline')}</Text>
        </View>
        <TouchableOpacity style={styles.iconButton} onPress={() => setIsSettingsVisible(true)}>
          <Settings color="#fff" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <Shield
            isActive={isActive}
            onToggle={() => setIsActive(!isActive)}
            size={shieldSize}
            width={width}
          />

          <Text style={[styles.statusText, { color: isActive ? '#00E5FF' : '#aaa' }]}>
            {isActive ? i18n.t('protectionActive') : i18n.t('protectionInactive')}
          </Text>
          <Text style={styles.statusSubtext}>
            {isActive ? i18n.t('activeSubtext') : i18n.t('inactiveSubtext')}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <StatCard
            icon={<Users color="#00E5FF" size={24} />}
            value={contactCount ?? '--'}
            label={i18n.t('contacts')}
          />
          <View style={{ width: 16 }} />
          <StatCard
            icon={<PhoneOff color="#FF5252" size={24} />}
            value={12}
            label={i18n.t('blocked')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n.t('recentActivity')}</Text>
          {[
            {
              id: 1,
              number: '+372 555 1234',
              time: `2h ${i18n.t('ago')}`,
              status: i18n.t('blocked'),
            },
            {
              id: 2,
              number: '+44 20 7946 0958',
              time: `5h ${i18n.t('ago')}`,
              status: i18n.t('blocked'),
            },
            {
              id: 3,
              number: i18n.t('privateNumber'),
              time: i18n.t('yesterday'),
              status: i18n.t('blocked'),
            },
          ].map((item) => (
            <ActivityItem key={item.id} item={item} />
          ))}
        </View>

        <TouchableOpacity style={styles.infoBanner}>
          <Info color="#00E5FF" size={20} />
          <Text style={styles.infoText}>{i18n.t('iosInfo')}</Text>
        </TouchableOpacity>

        <LanguageSwitcher currentLocale={locale} onLanguageChange={changeLanguage} />
      </ScrollView>

      <SettingsModal isVisible={isSettingsVisible} onClose={() => setIsSettingsVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
    marginTop: -2,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroSection: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 8,
  },
  statusSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
  },
  infoBanner: {
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 229, 255, 0.05)',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.1)',
  },
  infoText: {
    color: '#00E5FF',
    fontSize: 12,
    marginLeft: 12,
    flex: 1,
  },
});
