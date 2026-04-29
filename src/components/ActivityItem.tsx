import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { History } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import i18n from '../constants/i18n';

interface ActivityItemProps {
  item: {
    id: number;
    number: string;
    time: string;
    status: string;
  };
}

export const ActivityItem = ({ item }: ActivityItemProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const formatNumber = (num: string) => {
    if (isRevealed || num === i18n.t('privateNumber')) return num;
    return num.slice(0, -3) + '...';
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={() => setIsRevealed(true)}
      onPressOut={() => setIsRevealed(false)}
      style={{ marginBottom: 12 }}
    >
      <BlurView intensity={10} tint="dark" style={styles.activityItem}>
        <View style={styles.activityIcon}>
          <History color="#aaa" size={20} />
        </View>
        <View style={styles.activityInfo}>
          <Text style={styles.activityNumber}>{formatNumber(item.number)}</Text>
          <Text style={styles.activityTime}>{item.time}</Text>
        </View>
        <Text style={styles.activityStatus}>{item.status}</Text>
      </BlurView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityNumber: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  activityTime: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  activityStatus: {
    color: '#FF5252',
    fontSize: 12,
    fontWeight: '700',
  },
});
