import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppScreen } from '../components/AppScreen';
import { CardSurface, PrimaryButton, TextButton } from '../components/AppPrimitives';
import { profileMenuItems } from '../data/program';
import { RootStackParamList } from '../navigation/types';
import { useProgram } from '../state/ProgramContext';
import { colors, radii, spacing } from '../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export function ProfileScreen({ navigation }: Props) {
  const {
    currentLevel,
    currentLevelId,
    deactivateParticipation,
    promoteToPremium,
  } = useProgram();

  const reward = currentLevel.reward;
  const progress = currentLevelId === 'premium' ? 1 : currentLevelId === 'advanced' ? 0.5 : 0.2;

  return (
    <AppScreen contentContainerStyle={styles.content}>
      <View style={styles.topSpacer} />
      <Text style={styles.title}>Ваш профиль данных</Text>

      <LinearGradient
        colors={[colors.profileGradientStart, colors.profileGradientEnd]}
        style={styles.summaryCard}
      >
        <View style={styles.connectedChip}>
          <Text style={styles.connectedChipText}>Подключено</Text>
        </View>
        <Text style={styles.summaryLabel}>Текущий уровень</Text>
        <Text style={styles.summaryLevel}>{currentLevel.label}</Text>
        <View style={styles.rewardLine}>
          <Text style={styles.summaryReward}>{reward} ₽</Text>
          <Text style={styles.summaryRewardSuffix}>/ мес</Text>
        </View>
        <View style={styles.progressMeta}>
          <Text style={styles.progressLabel}>
            {currentLevelId === 'premium' ? 'Максимальный уровень' : 'До Премиум'}
          </Text>
          <Text style={styles.progressTarget}>
            {currentLevelId === 'premium' ? '500 ₽ / мес' : '500 ₽ / мес'}
          </Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
        </View>
        <View style={styles.summaryCircle} />
      </LinearGradient>

      <View style={styles.menuList}>
        {profileMenuItems.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => {
              if (item.id === 'shared-data') {
                navigation.navigate('AnonymizationInfo');
                return;
              }
              Alert.alert('Скоро', 'Этот экран можно добавить следующим шагом.');
            }}
            style={({ pressed }) => [pressed && styles.pressed]}
          >
            <CardSurface style={styles.menuCard}>
              <View style={styles.menuIconWrap}>
                <MaterialCommunityIcons
                  color={colors.textSoft}
                  name={item.icon}
                  size={20}
                />
              </View>
              <View style={styles.menuCopy}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <MaterialCommunityIcons
                color="#C9CBD1"
                name="chevron-right"
                size={20}
              />
            </CardSurface>
          </Pressable>
        ))}
      </View>

      {currentLevelId !== 'premium' ? (
        <CardSurface style={styles.upsellCard}>
          <View style={styles.upsellDecoration} />
          <Text style={styles.upsellTitle}>Можно получать больше</Text>
          <Text style={styles.upsellText}>
            Подключите премиум-уровень и получайте до 500 ₽ в месяц
          </Text>
          <PrimaryButton
            onPress={promoteToPremium}
            style={styles.upsellButton}
            title="Повысить уровень"
          />
        </CardSurface>
      ) : null}

      <TextButton
        danger={false}
        onPress={() => {
          deactivateParticipation();
          navigation.reset({
            index: 0,
            routes: [{ name: 'Welcome' }],
          });
        }}
        title="Отключить участие"
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
  },
  topSpacer: {
    height: 8,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
  },
  summaryCard: {
    borderRadius: radii.xl,
    padding: 22,
    overflow: 'hidden',
    minHeight: 246,
  },
  connectedChip: {
    alignSelf: 'flex-start',
    borderRadius: radii.pill,
    backgroundColor: 'rgba(0,0,0,0.08)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginBottom: 18,
  },
  connectedChipText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  summaryLabel: {
    color: 'rgba(26,26,26,0.6)',
    fontSize: 14,
    marginBottom: 8,
  },
  summaryLevel: {
    color: colors.text,
    fontSize: 26,
    lineHeight: 39,
    fontWeight: '700',
  },
  rewardLine: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginTop: 8,
  },
  summaryReward: {
    color: colors.text,
    fontSize: 36,
    lineHeight: 40,
    fontWeight: '700',
  },
  summaryRewardSuffix: {
    color: 'rgba(26,26,26,0.45)',
    fontSize: 16,
  },
  progressMeta: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    color: 'rgba(26,26,26,0.45)',
    fontSize: 12,
  },
  progressTarget: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  progressTrack: {
    marginTop: 6,
    height: 6,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(0,0,0,0.08)',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: radii.pill,
    backgroundColor: colors.text,
  },
  summaryCircle: {
    position: 'absolute',
    right: -10,
    bottom: -16,
    width: 90,
    height: 90,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  menuList: {
    gap: 10,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
    gap: 14,
  },
  menuIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.cardMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuCopy: {
    flex: 1,
    gap: 2,
  },
  menuTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  menuSubtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
  upsellCard: {
    borderWidth: 1,
    borderColor: colors.accentBorder,
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 20,
    overflow: 'hidden',
  },
  upsellDecoration: {
    position: 'absolute',
    right: -10,
    top: -12,
    width: 72,
    height: 72,
    borderRadius: radii.pill,
    backgroundColor: colors.warningSoft,
  },
  upsellTitle: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 27,
    fontWeight: '700',
  },
  upsellText: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 21,
    marginTop: 8,
    maxWidth: 260,
  },
  upsellButton: {
    marginTop: 20,
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
  },
  pressed: {
    opacity: 0.88,
  },
});
