import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

export const translations = {
  en: {
    appName: 'Uncall',
    tagline: 'Intelligent Call Protection',
    protectionActive: 'PROTECTION ACTIVE',
    protectionInactive: 'PROTECTION INACTIVE',
    activeSubtext: 'Blocking all calls from unknown numbers',
    inactiveSubtext: 'Tap the shield to start blocking unknown calls',
    contacts: 'Contacts',
    blocked: 'Blocked',
    recentActivity: 'Recent Activity',
    ago: 'ago',
    yesterday: 'Yesterday',
    iosInfo: 'iPhone users: Enable "Silence Unknown Callers" in Phone Settings for best results.',
    privateNumber: 'Private Number',
    settings: 'Settings',
    done: 'Done',
    version: 'Version',
    protectionSettings: 'Protection Settings',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    privacyContent: 'Uncall respects your privacy. We do not store your contacts or call logs on any server. All call screening logic happens locally on your device.',
    termsContent: 'By using Uncall, you agree that the app is provided "as is". We are not responsible for any missed calls or technical issues. Always keep your whitelist updated.',
    back: 'Back',
    manageWhitelist: 'Manage Whitelist',
    autoBlockUnknown: 'Auto-Block Unknown',
    whitelistDesc: 'Numbers in your whitelist will always be allowed, even if they are not in your main contacts.',
    searchContacts: 'Search contacts...',
  },
  et: {
    appName: 'Uncall',
    tagline: 'Nutikas kõnekaitse',
    protectionActive: 'KAITSE AKTIIVNE',
    protectionInactive: 'KAITSE MITTEAKTIIVNE',
    activeSubtext: 'Blokeerime kõik kõned tundmatutelt numbritelt',
    inactiveSubtext: 'Vajuta kilbile, et alustada blokeerimist',
    contacts: 'Kontaktid',
    blocked: 'Blokeeritud',
    recentActivity: 'Viimased tegevused',
    ago: 'tagasi',
    yesterday: 'Eile',
    iosInfo: 'iPhone kasutajad: Parima tulemuse saamiseks lülita sisse "Silence Unknown Callers".',
    privateNumber: 'Varjatud number',
    settings: 'Seaded',
    done: 'Valmis',
    version: 'Versioon',
    protectionSettings: 'Kaitse seaded',
    privacyPolicy: 'Privaatsuspoliitika',
    termsOfService: 'Kasutustingimused',
    privacyContent: 'Uncall austab teie privaatsust. Me ei salvesta teie kontakte ega kõneloge üheski serveris. Kogu kõnefiltreerimine toimub lokaalselt teie seadmes.',
    termsContent: 'Uncalli kasutades nõustute, et rakendust pakutakse "nagu on". Me ei vastuta vastamata jäänud kõnede ega tehniliste probleemide eest.',
    back: 'Tagasi',
    manageWhitelist: 'Halda valget nimekirja',
    autoBlockUnknown: 'Blokeeri tundmatud',
    whitelistDesc: 'Valges nimekirjas olevaid numbreid lubatakse alati, isegi kui neid pole sinua põhikontaktide hulgas.',
    searchContacts: 'Otsi kontakte...',
  },
};

const i18n = new I18n(translations);
i18n.locale = Localization.getLocales()[0].languageCode ?? 'en';
i18n.enableFallback = true;

export default i18n;
