import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { colors, radii, spacing } from '../theme';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

type TopNavBarProps = {
  mode?: 'none' | 'back' | 'close';
  onPress?: () => void;
};

type CardSurfaceProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

type TierDotsProps = {
  active: number;
};

export function PrimaryButton({
  title,
  onPress,
  style,
  disabled = false,
}: PrimaryButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.primaryButton,
        disabled && styles.primaryButtonDisabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <Text style={styles.primaryButtonText}>{title}</Text>
    </Pressable>
  );
}

export function TextButton({
  title,
  onPress,
  danger = false,
}: {
  title: string;
  onPress: () => void;
  danger?: boolean;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.pressed]}>
      <Text style={[styles.textButton, danger && styles.textButtonDanger]}>{title}</Text>
    </Pressable>
  );
}

export function TopNavBar({ mode = 'back', onPress }: TopNavBarProps) {
  return (
    <View style={styles.topBar}>
      {mode === 'back' ? (
        <Pressable onPress={onPress} style={styles.navIconButton}>
          <MaterialCommunityIcons color="#5887FF" name="chevron-left" size={30} />
        </Pressable>
      ) : (
        <View style={styles.navSpacer} />
      )}

      {mode === 'close' ? (
        <Pressable onPress={onPress} style={styles.navIconButton}>
          <MaterialCommunityIcons color="#9EA3AD" name="close" size={22} />
        </Pressable>
      ) : (
        <View style={styles.navSpacer} />
      )}
    </View>
  );
}

export function CardSurface({ children, style }: CardSurfaceProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function TierDots({ active }: TierDotsProps) {
  return (
    <View style={styles.dotsRow}>
      {[0, 1, 2].map((index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index < active ? styles.dotActive : styles.dotInactive,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    minHeight: 50,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navSpacer: {
    width: 30,
    height: 30,
  },
  navIconButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.pill,
  },
  primaryButton: {
    height: 54,
    borderRadius: radii.md,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonDisabled: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  textButton: {
    color: colors.textFaint,
    fontSize: 16,
    textAlign: 'center',
  },
  textButtonDanger: {
    color: colors.danger,
  },
  pressed: {
    opacity: 0.85,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radii.pill,
  },
  dotActive: {
    backgroundColor: colors.accent,
  },
  dotInactive: {
    backgroundColor: colors.cardMuted,
  },
});
