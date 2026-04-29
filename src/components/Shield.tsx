import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Shield as ShieldIcon, ShieldCheck } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface ShieldProps {
  isActive: boolean;
  onToggle: () => void;
  size: number;
  width: number;
}

export const Shield = ({ isActive, onToggle, size, width }: ShieldProps) => {
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.3);

  useEffect(() => {
    if (isActive) {
      glowOpacity.value = withRepeat(withTiming(0.8, { duration: 1500 }), -1, true);
    } else {
      glowOpacity.value = withTiming(0.3);
    }
  }, [isActive]);

  const toggleProtection = () => {
    onToggle();
    scale.value = withSpring(isActive ? 1 : 1.1, { damping: 10, stiffness: 100 });
    setTimeout(() => {
      scale.value = withSpring(1);
    }, 200);
  };

  const shieldStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      borderRadius: size / 2,
      shadowOpacity: glowOpacity.value,
      shadowColor: isActive ? '#00E5FF' : '#666',
      shadowRadius: 20,
      ...(Platform.OS === 'web' && width > 0 && {
        boxShadow: `0 0 40px ${isActive ? 'rgba(0, 229, 255, ' + glowOpacity.value + ')' : 'rgba(0, 0, 0, 0)'}`,
      } as any),
    };
  }, [isActive, size, width]);

  return (
    <Animated.View style={[styles.shieldContainer, shieldStyle]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={toggleProtection}
        style={[
          styles.shieldCircle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderColor: isActive ? '#00E5FF' : '#333',
          },
        ]}
      >
        <LinearGradient
          colors={isActive ? ['#00E5FF', '#0091EA'] : ['#333', '#111']}
          style={[styles.shieldGradient, { borderRadius: (size - 16) / 2 }]}
        >
          {isActive ? (
            <ShieldCheck color="#fff" size={size * 0.4} strokeWidth={1.5} />
          ) : (
            <ShieldIcon color="#aaa" size={size * 0.4} strokeWidth={1.5} />
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  shieldContainer: {
    marginBottom: 24,
    shadowOffset: { width: 0, height: 0 },
    elevation: 20,
  },
  shieldCircle: {
    borderWidth: 2,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shieldGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
