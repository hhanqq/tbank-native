import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppScreen } from '../components/AppScreen';
import {
  CardSurface,
  PrimaryButton,
  TierDots,
  TopNavBar,
} from '../components/AppPrimitives';
import { programLevels } from '../data/program';
import { RootStackParamList } from '../navigation/types';
import { useProgram } from '../state/ProgramContext';
import { colors, radii, spacing } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'LevelSelection'>;

export function LevelSelectionScreen({ navigation }: Props) {
  const { currentLevelId, setLevel } = useProgram();

  return (
    <AppScreen contentContainerStyle={styles.content}>
      <TopNavBar mode="back" onPress={navigation.goBack} />

      <View style={styles.header}>
        <Text style={styles.title}>Выберите уровень участия</Text>
        <Text style={styles.subtitle}>
          Чем больше обезличенных данных участвует, тем выше награда
        </Text>
      </View>

      <View style={styles.levelList}>
        {programLevels.map((level) => {
          const selected = currentLevelId === level.id;

          return (
            <Pressable
              key={level.id}
              onPress={() => setLevel(level.id)}
              style={({ pressed }) => [pressed && styles.pressed]}
            >
              <CardSurface
                style={[
                  styles.levelCard,
                  selected && styles.levelCardSelected,
                  level.maxReward && styles.levelCardPremium,
                ]}
              >
                <View
                  style={[
                    styles.levelBadge,
                    selected ? styles.levelBadgeSelected : styles.levelBadgeMuted,
                    level.maxReward && styles.levelBadgePremium,
                  ]}
                >
                  <Text
                    style={[
                      styles.levelBadgeText,
                      selected && styles.levelBadgeTextSelected,
                    ]}
                  >
                    {level.badge}
                  </Text>
                </View>

                {selected ? (
                  <View style={styles.selectedTick}>
                    <MaterialCommunityIcons color="#FFFFFF" name="check" size={16} />
                  </View>
                ) : null}

                <View style={styles.levelTopRow}>
                  <Text style={styles.levelTitle}>{level.label}</Text>
                  <View style={styles.levelRewardRow}>
                    <Text style={styles.levelRewardValue}>{level.reward} ₽</Text>
                    <Text style={styles.levelRewardSuffix}>/ мес</Text>
                  </View>
                </View>

                <View style={styles.featureList}>
                  {level.features.map((feature) => (
                    <View key={feature} style={styles.featureRow}>
                      <MaterialCommunityIcons
                        color={colors.textSoft}
                        name="check"
                        size={17}
                      />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
              </CardSurface>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        onPress={() => navigation.navigate('AnonymizationInfo')}
        style={({ pressed }) => [styles.howItWorksRow, pressed && styles.pressed]}
      >
        <Text style={styles.howItWorksText}>Как работает обезличивание</Text>
        <MaterialCommunityIcons
          color="#B0B0B6"
          name="chevron-right"
          size={20}
        />
      </Pressable>

      <PrimaryButton
        onPress={() => navigation.navigate('ConfirmParticipation')}
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
  header: {
    gap: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    maxWidth: 240,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 21,
    maxWidth: 280,
  },
  levelList: {
    gap: 12,
  },
  levelCard: {
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: '#FFFFFF',
  },
  levelCardSelected: {
    borderColor: colors.accentBorder,
  },
  levelCardPremium: {
    shadowColor: colors.accent,
    shadowOpacity: 0.18,
    shadowRadius: 12,
  },
  levelBadge: {
    alignSelf: 'flex-start',
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 14,
  },
  levelBadgeMuted: {
    backgroundColor: colors.cardMuted,
  },
  levelBadgeSelected: {
    backgroundColor: colors.warningSoft,
  },
  levelBadgePremium: {
    backgroundColor: colors.accent,
  },
  levelBadgeText: {
    color: colors.textSoft,
    fontSize: 12,
    fontWeight: '600',
  },
  levelBadgeTextSelected: {
    color: '#B8860B',
  },
  selectedTick: {
    position: 'absolute',
    top: 18,
    right: 18,
    width: 24,
    height: 24,
    borderRadius: radii.pill,
    backgroundColor: '#FFE9A0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  levelTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  levelRewardRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  levelRewardValue: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  levelRewardSuffix: {
    color: colors.textMuted,
    fontSize: 14,
  },
  featureList: {
    gap: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  featureText: {
    flex: 1,
    color: colors.textSoft,
    fontSize: 15,
    lineHeight: 21,
  },
  howItWorksRow: {
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: colors.cardMuted,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  howItWorksText: {
    color: colors.text,
    fontSize: 15.5,
    fontWeight: '500',
  },
  pressed: {
    opacity: 0.88,
  },
});
