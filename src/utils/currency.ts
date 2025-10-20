import i18n from '../i18n/index';

export const formatCurrency = (amount: number): string => {
  const numAmount = Number(amount) || 0;
  const currency = i18n.t('currency');
  const position = i18n.t('currencyPosition');
  const formattedAmount = numAmount.toFixed(2);
  
  return position === 'before' 
    ? `${currency}${formattedAmount}`
    : `${formattedAmount} ${currency}`;
};