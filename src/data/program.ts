import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ComponentProps } from 'react';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

export type ProgramLevelId = 'basic' | 'advanced' | 'premium';

export type ProgramLevel = {
  id: ProgramLevelId;
  label: string;
  badge: string;
  reward: number;
  activeDots: number;
  features: string[];
  highlight?: boolean;
  maxReward?: boolean;
};

export const programLevels: ProgramLevel[] = [
  {
    id: 'basic',
    label: 'Базовый',
    badge: 'Простой старт',
    reward: 100,
    activeDots: 1,
    features: ['Категории расходов', 'Демография'],
  },
  {
    id: 'advanced',
    label: 'Продвинутый',
    badge: 'Больше аналитической ценности',
    reward: 250,
    activeDots: 2,
    highlight: true,
    features: [
      'Всё из базового',
      'Поведенческие паттерны',
      'География в агрегированном виде',
    ],
  },
  {
    id: 'premium',
    label: 'Премиум',
    badge: 'Максимальная награда',
    reward: 500,
    activeDots: 3,
    maxReward: true,
    features: [
      'Всё из продвинутого',
      'Инвестиционный профиль',
      'Real-time транзакционные сигналы',
      'Кредитные поведенческие индикаторы',
    ],
  },
];

export const introHints = [
  {
    icon: 'tune-variant',
    text: 'Вы сами выбираете объём участия',
  },
  {
    icon: 'power-standby',
    text: 'Можно изменить или отключить в любой момент',
  },
] as const;

export const levelDetails: Record<
  ProgramLevelId,
  {
    shareText: string;
    rewardLabel: string;
  }
> = {
  basic: {
    rewardLabel: '100 ₽ / мес',
    shareText: 'Категории расходов, демографию',
  },
  advanced: {
    rewardLabel: '250 ₽ / мес',
    shareText:
      'Категории расходов, средний чек, частоту покупок, географию в агрегированном виде, поведенческие паттерны',
  },
  premium: {
    rewardLabel: '500 ₽ / мес',
    shareText:
      'Всё из продвинутого, инвестиционный профиль, real-time транзакционные сигналы и кредитные поведенческие индикаторы',
  },
};

export const anonymizationSteps: Array<{
  number: number;
  title: string;
  description: string;
  icon: IconName;
}> = [
  {
    number: 1,
    title: 'Убираем личные данные',
    description:
      'Имя, номер карты, счёт, адрес и другие прямые идентификаторы не участвуют в передаче',
    icon: 'account-remove-outline',
  },
  {
    number: 2,
    title: 'Обобщаем информацию',
    description:
      'Точные данные превращаются в более широкие категории: регион вместо адреса, диапазон вместо точной суммы',
    icon: 'layers-triple-outline',
  },
  {
    number: 3,
    title: 'Смешиваем с общей выборкой',
    description:
      'Ваши данные становятся частью большой обезличенной группы, где нельзя выделить одного человека',
    icon: 'account-group-outline',
  },
  {
    number: 4,
    title: 'Передаём только аналитику',
    description:
      'Компании получают не список людей, а только агрегированные выводы, тренды и поведенческие паттерны',
    icon: 'chart-box-outline',
  },
];

export const neverSharedItems = [
  'ФИО',
  'Номер карты и счёта',
  'Адрес',
  'Паспортные данные',
  'Переписку',
];

export const companyViewText =
  'Например: средний чек, частоту покупок, сезонность трат, интерес к категориям, активность в приложении — только в обезличенном виде';

export const faqItems = [
  {
    id: 'can-identify',
    question: 'Можно ли вычислить меня?',
    answer:
      'Нет. Данные проходят несколько этапов защиты и используются только в общей выборке',
    initiallyExpanded: true,
  },
  {
    id: 'can-disable',
    question: 'Можно ли отказаться?',
    answer:
      'Да. Участие можно изменить или отключить в любой момент из профиля данных.',
    initiallyExpanded: false,
  },
] as const;

export const profileMenuItems: Array<{
  id: 'shared-data' | 'rewards' | 'usage';
  title: string;
  subtitle: string;
  icon: IconName;
}> = [
  {
    id: 'shared-data',
    title: 'Какие данные участвуют',
    subtitle: '5 категорий подключено',
    icon: 'database-outline',
  },
  {
    id: 'rewards',
    title: 'История начислений',
    subtitle: 'В этом месяце: 250 ₽',
    icon: 'cash-multiple',
  },
  {
    id: 'usage',
    title: 'История использования',
    subtitle: '3 обращения к обезличенной аналитике',
    icon: 'chart-box-outline',
  },
];
