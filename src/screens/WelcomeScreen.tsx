import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import { AppScreen } from '../components/AppScreen';
import {
  CardSurface,
  PrimaryButton,
  TierDots,
  TopNavBar,
} from '../components/AppPrimitives';
import { WelcomeIllustration } from '../components/Illustrations';
import { introHints, programLevels } from '../data/program';
import { RootStackParamList } from '../navigation/types';
import { colors, radii, spacing } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  return (
    <AppScreen contentContainerStyle={styles.content}>
      <TopNavBar mode="close" onPress={() => navigation.navigate('Welcome')} />

      <WelcomeIllustration />

      <View style={styles.centerBlock}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Новая программа</Text>
        </View>
        <Text style={styles.title}>Получайте до 500 ₽ в месяц</Text>
        <Text style={styles.subtitle}>
          Подключите передачу обезличенных данных и получайте вознаграждение от
          банка
        </Text>
      </View>

      <CardSurface style={styles.summaryCard}>
        {programLevels.map((level, index) => (
          <View key={level.id}>
            <View style={styles.levelRow}>
              <View style={styles.levelInfo}>
                <TierDots active={level.activeDots} />
                <Text style={styles.levelLabel}>{level.label}</Text>
              </View>
              <View style={styles.rewardWrap}>
                <Text style={styles.rewardValue}>{level.reward} ₽</Text>
                <Text style={styles.rewardSuffix}>/ мес</Text>
              </View>
            </View>
            {index !== programLevels.length - 1 ? <View style={styles.divider} /> : null}
          </View>
        ))}
      </CardSurface>

      <View style={styles.hintList}>
        {introHints.map((hint) => (
          <View key={hint.text} style={styles.hintRow}>
            <View style={styles.hintIconWrap}>
              <Text style={styles.hintIcon}>{hint.icon === 'power-standby' ? '⏻' : '⚙'}</Text>
            </View>
            <Text style={styles.hintText}>{hint.text}</Text>
          </View>
        ))}
      </View>

      <PrimaryButton
        onPress={() => navigation.navigate('LevelSelection')}
        title="Далее"
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
    paddingTop: spacing.xs,
  },
  centerBlock: {
    alignItems: 'center',
    gap: spacing.md,
  },
  badge: {
    borderRadius: radii.pill,
    backgroundColor: colors.warningSoft,
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  badgeText: {
    color: '#C89600',
    fontSize: 13,
    fontWeight: '600',
  },
  title: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    textAlign: 'center',
    maxWidth: 300,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'center',
  },
  summaryCard: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  levelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  levelLabel: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '600',
  },
  rewardWrap: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  rewardValue: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  rewardSuffix: {
    color: colors.textMuted,
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  hintList: {
    gap: spacing.md,
    paddingHorizontal: 4,
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  hintIconWrap: {
    width: 36,
    height: 36,
    borderRadius: radii.sm,
    backgroundColor: colors.cardMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintIcon: {
    color: colors.textSoft,
    fontSize: 16,
  },
  hintText: {
    color: colors.textSoft,
    fontSize: 15,
    lineHeight: 20,
  },
});
