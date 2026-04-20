import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import { AppScreen } from '../components/AppScreen';
import { PrimaryButton, TextButton } from '../components/AppPrimitives';
import { SuccessIllustration } from '../components/Illustrations';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Success'>;

export function SuccessScreen({ navigation }: Props) {
  return (
    <AppScreen contentContainerStyle={styles.content} scrollable={false}>
      <View style={styles.body}>
        <SuccessIllustration />
        <View style={styles.textBlock}>
          <Text style={styles.title}>Вы подключены</Text>
          <Text style={styles.subtitle}>
            Теперь вы участвуете в программе и можете получать вознаграждение
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <PrimaryButton
          onPress={() => navigation.replace('Profile')}
          title="Перейти в профиль данных"
        />
        <TextButton onPress={() => navigation.popToTop()} title="На главную" />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: spacing.xxl,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  textBlock: {
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: 8,
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
    fontSize: 16,
    lineHeight: 22.5,
    textAlign: 'center',
    maxWidth: 280,
  },
  actions: {
    gap: 20,
    paddingBottom: spacing.md,
  },
});
