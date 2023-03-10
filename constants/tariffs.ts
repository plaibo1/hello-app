export const MOC_TARIFFS = [
  {
    title: "1 месяц",
    free: "1 месяц бесплатно",
    freeDescription: "каждый следующий месяц - по тарифу",
    benefitPercent: "%",
    benefitDescription: "Нет выгоды",
    benefitBackground: "rgba(23, 23, 23, 0.12)",
    id: "month",
    modalTitle: "Перейти на ежемесячную подписку?",
    modalDescription: "Далее каждый месяц — по тарифу",
  },
  {
    title: "3 месяца",
    free: "1 месяц бесплатно",
    freeDescription: "каждые следующие 3 месяца - по тарифу",
    benefitPercent: "-10%",
    benefitDescription: "выгода по сравнению с тарифом 1 месяц",
    benefitBackground: "#F56E51",
    id: "quarter",
    modalTitle: "Перейти на 3-х месячную подписку?",
    modalDescription: "Далее каждые 3 месяца — по тарифу",
  },
  {
    title: "1 год",
    free: "1 месяц бесплатно",
    freeDescription: "каждый следующий год - по тарифу",
    benefitPercent: "-20%",
    benefitDescription: "выгода по сравнению с тарифом 1 месяц",
    benefitBackground: "#A351F5",
    id: "year",
    modalTitle: "Перейти на ежегодную подписку?",
    modalDescription: "Далее каждый год — по тарифу",
  },
];

interface TarippsSchema {
  [key: string]: string;
  month: string;
  quarter: string;
  year: string;
  trial: string;
}

export const TARIFFS: TarippsSchema = {
  month: "1 месяц",
  quarter: "3 месяца",
  year: "1 год",
  trial: "Пробный период",
};
