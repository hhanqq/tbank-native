import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppScreen } from '../components/AppScreen';
import { CardSurface, TopNavBar } from '../components/AppPrimitives';
import {
  anonymizationSteps,
  companyViewText,
  faqItems,
  neverSharedItems,
} from '../data/program';
import { RootStackParamList } from '../navigation/types';
import { colors, radii, spacing } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'AnonymizationInfo'>;

export function AnonymizationInfoScreen({ navigation }: Props) {
  const [expandedFaqId, setExpandedFaqId] = useState<string>(faqItems[0].id);

  return (
    <AppScreen contentContainerStyle={styles.content}>
      <TopNavBar mode="back" onPress={navigation.goBack} />

      <View style={styles.header}>
        <Text style={styles.title}>Как работает обезличивание</Text>
        <Text style={styles.subtitle}>
          Объясняем простым языком, как мы защищаем ваши данные
        </Text>
      </View>

      <View style={styles.stepList}>
        {anonymizationSteps.map((step) => (
          <CardSurface key={step.number} style={styles.stepCard}>
            <View style={styles.stepIconColumn}>
              <View style={styles.stepIconWrap}>
                <MaterialCommunityIcons
                  color={colors.textSoft}
                  name={step.icon}
                  size={20}
                />
              </View>
              <Text style={styles.stepNumber}>{step.number}</Text>
            </View>
            <View style={styles.stepCopy}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
          </CardSurface>
        ))}
      </View>

      <View style={styles.neverShareBlock}>
        <View style={styles.neverShareHeader}>
          <MaterialCommunityIcons color={colors.text} name="lock-outline" size={18} />
          <Text style={styles.neverShareTitle}>Никогда не передаём</Text>
        </View>
        <View style={styles.neverShareList}>
          {neverSharedItems.map((item) => (
            <View key={item} style={styles.neverShareItem}>
              <View style={styles.neverShareDot} />
              <Text style={styles.neverShareText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <CardSurface style={styles.companyCard}>
        <Text style={styles.companyTitle}>Что видит компания</Text>
        <Text style={styles.companyText}>{companyViewText}</Text>
      </CardSurface>

      <View style={styles.faqList}>
        {faqItems.map((faq) => {
          const expanded = expandedFaqId === faq.id;

          return (
            <CardSurface key={faq.id} style={styles.faqCard}>
              <Pressable
                onPress={() =>
                  setExpandedFaqId((current) => (current === faq.id ? '' : faq.id))
                }
                style={styles.faqHeader}
              >
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <MaterialCommunityIcons
                  color={colors.textFaint}
                  name={expanded ? 'chevron-up' : 'chevron-down'}
                  size={18}
                />
              </Pressable>
              {expanded ? (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              ) : null}
            </CardSurface>
          );
        })}
      </View>
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
    maxWidth: 260,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 21,
    maxWidth: 260,
  },
  stepList: {
    gap: 12,
  },
  stepCard: {
    paddingHorizontal: 18,
    paddingVertical: 18,
    flexDirection: 'row',
    gap: 14,
  },
  stepIconColumn: {
    width: 40,
    alignItems: 'center',
    gap: 6,
  },
  stepIconWrap: {
    width: 40,
    height: 40,
    borderRadius: radii.sm,
    backgroundColor: colors.cardMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: {
    color: colors.background,
    fontSize: 12,
    fontWeight: '700',
  },
  stepCopy: {
    flex: 1,
    gap: 6,
  },
  stepTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  stepDescription: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  neverShareBlock: {
    borderRadius: radii.md,
    backgroundColor: colors.cardMuted,
    padding: 18,
    gap: 12,
  },
  neverShareHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  neverShareTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
  },
  neverShareList: {
    gap: 8,
  },
  neverShareItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  neverShareDot: {
    width: 6,
    height: 6,
    borderRadius: radii.pill,
    backgroundColor: '#D0D0D5',
  },
  neverShareText: {
    color: colors.textSoft,
    fontSize: 15,
  },
  companyCard: {
    padding: 18,
    gap: 10,
  },
  companyTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
  },
  companyText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  faqList: {
    gap: 10,
  },
  faqCard: {
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqQuestion: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  faqAnswer: {
    marginTop: 12,
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
});
