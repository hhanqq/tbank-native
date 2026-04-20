import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import { AppScreen } from '../components/AppScreen';
import { CardSurface, PrimaryButton, TopNavBar } from '../components/AppPrimitives';
import { ConfirmIllustration } from '../components/Illustrations';
import { RootStackParamList } from '../navigation/types';
import { useProgram } from '../state/ProgramContext';
import { colors, spacing } from '../theme';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'ConfirmParticipation'
>;

export function ConfirmParticipationScreen({ navigation }: Props) {
  const {
    activateParticipation,
    currentLevel,
    currentRewardLabel,
    currentShareText,
  } = useProgram();

  return (
    <AppScreen contentContainerStyle={styles.content}>
      <TopNavBar mode="back" onPress={navigation.goBack} />

      <ConfirmIllustration />

      <View style={styles.header}>
        <Text style={styles.title}>Подтвердите участие</Text>
        <Text style={styles.subtitle}>Проверьте условия перед подключением</Text>
      </View>

      <CardSurface style={styles.detailsCard}>
        <SectionRow label="Уровень" value={currentLevel.label} />
        <Separator />
        <SectionRow label="Награда" value={currentRewardLabel} />
        <Separator />
        <SectionRow label="Передаём" multiline value={currentShareText} />
        <Separator />
        <SectionRow
          label="Не передаём"
          labelColor={colors.green}
          value="ФИО, номер карты, адрес, переписку"
        />
        <Separator />
        <SectionRow
          label="Можно"
          multiline
          value="Изменить уровень или отключиться в любой момент"
        />
      </CardSurface>

      <PrimaryButton
        onPress={() => {
          activateParticipation();
          navigation.replace('Success');
        }}
        title="Подключить"
      />

      <Text style={styles.legalText}>
        Нажимая «Подключить», вы соглашаетесь с условиями программы передачи
        обезличенных данных.
      </Text>
    </AppScreen>
  );
}

function SectionRow({
  label,
  value,
  multiline = false,
  labelColor = colors.textMuted,
}: {
  label: string;
  value: string;
  multiline?: boolean;
  labelColor?: string;
}) {
  return (
    <View style={styles.sectionRow}>
      <Text style={[styles.sectionLabel, { color: labelColor }]}>{label}</Text>
      <Text style={[styles.sectionValue, multiline && styles.sectionValueMultiline]}>
        {value}
      </Text>
    </View>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
    paddingTop: spacing.xs,
  },
  header: {
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: -8,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
  },
  detailsCard: {
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  sectionRow: {
    gap: 8,
    paddingVertical: 8,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  sectionValue: {
    color: colors.text,
    fontSize: 20,
    lineHeight: 27,
    fontWeight: '700',
  },
  sectionValueMultiline: {
    fontSize: 15,
    lineHeight: 20.5,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  legalText: {
    color: '#C9C9C9',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    paddingHorizontal: 12,
    marginTop: -6,
  },
});
