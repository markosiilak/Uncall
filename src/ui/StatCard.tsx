import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}

export const StatCard = ({ icon, value, label }: StatCardProps) => {
  return (
    <BlurView intensity={20} tint="dark" style={styles.statCard}>
      {icon}
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel} numberOfLines={1}>
        {label}
      </Text>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 24,
    overflow: 'hidden',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginTop: 10,
  },
  statLabel: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 4,
  },
});
