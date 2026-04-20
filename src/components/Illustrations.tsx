import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radii } from '../theme';

export function WelcomeIllustration() {
  return (
    <View style={styles.welcomeWrap}>
      <View style={styles.baseShadow} />
      <View style={[styles.stackLayer, styles.stackTop]}>
        <MaterialCommunityIcons color="#B8860B" name="chart-line" size={16} />
      </View>
      <View style={[styles.stackLayer, styles.stackMiddle]}>
        <Coin left={170} top={28} />
      </View>
      <View style={[styles.stackLayer, styles.stackBottom]}>
        <Coin left={34} top={28} />
        <View style={styles.smallBadge}>
          <MaterialCommunityIcons color="#B8BCC4" name="minus-box-outline" size={14} />
        </View>
        <View style={[styles.smallBadge, styles.smallBadgeRight]}>
          <MaterialCommunityIcons color="#B8BCC4" name="account-outline" size={14} />
        </View>
      </View>
      <Coin left={90} top={0} />
      <Coin left={182} top={18} small />
      <View style={[styles.sparkle, { left: 38, top: 48 }]} />
      <View style={[styles.sparkle, { left: 198, top: 52 }]} />
    </View>
  );
}

export function ConfirmIllustration() {
  return (
    <View style={styles.confirmWrap}>
      <LinearGradient
        colors={['rgba(124, 159, 255, 0.16)', 'rgba(255,255,255,0.02)']}
        style={styles.confirmHalo}
      >
        <View style={styles.confirmShield}>
          <MaterialCommunityIcons color="#8FB1FF" name="shield-check" size={96} />
        </View>
      </LinearGradient>
    </View>
  );
}

export function SuccessIllustration() {
  return (
    <View style={styles.successWrap}>
      <View style={styles.successShadow} />
      <View style={styles.successCard}>
        <MaterialCommunityIcons color="#FFC928" name="shield-check" size={54} />
      </View>
      <Coin left={34} top={36} />
      <Coin left={222} top={36} />
      <View style={[styles.sparkle, { left: 92, top: 28 }]} />
      <View style={[styles.sparkle, { left: 246, top: 78 }]} />
    </View>
  );
}

function Coin({
  left,
  top,
  small = false,
}: {
  left: number;
  top: number;
  small?: boolean;
}) {
  return (
    <View
      style={[
        styles.coin,
        small && styles.coinSmall,
        { left, top },
      ]}
    >
      <Text style={[styles.coinText, small && styles.coinTextSmall]}>₽</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeWrap: {
    width: 242,
    height: 162,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  baseShadow: {
    position: 'absolute',
    left: 30,
    right: 30,
    bottom: 2,
    height: 24,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  stackLayer: {
    position: 'absolute',
    left: 30,
    right: 30,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stackTop: {
    top: 20,
    left: 72,
    right: 72,
    height: 30,
    backgroundColor: '#FFE8AA',
  },
  stackMiddle: {
    top: 50,
    left: 44,
    right: 44,
    height: 36,
    backgroundColor: '#E9EBF2',
  },
  stackBottom: {
    top: 82,
    left: 16,
    right: 16,
    height: 42,
    backgroundColor: '#E4E6ED',
  },
  smallBadge: {
    position: 'absolute',
    top: 11,
    left: 92,
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallBadgeRight: {
    left: 140,
  },
  sparkle: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: radii.pill,
    backgroundColor: '#E8EAF1',
  },
  coin: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: radii.pill,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinSmall: {
    width: 18,
    height: 18,
  },
  coinText: {
    color: '#B8860B',
    fontSize: 12,
    fontWeight: '700',
  },
  coinTextSmall: {
    fontSize: 9,
  },
  confirmWrap: {
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  confirmHalo: {
    width: 228,
    height: 228,
    borderRadius: 114,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmShield: {
    width: 176,
    height: 176,
    borderRadius: 88,
    backgroundColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successWrap: {
    width: 220,
    height: 160,
    alignSelf: 'center',
    marginTop: 24,
  },
  successCard: {
    position: 'absolute',
    left: 64,
    right: 64,
    top: 38,
    height: 86,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8DAE2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successShadow: {
    position: 'absolute',
    left: 56,
    right: 56,
    bottom: 18,
    height: 20,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
});
