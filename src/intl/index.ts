import { OptionalIntlConfig } from '@formatjs/intl';
import enMessages from '../translations/en.json';
import ptMessages from '../translations/pt.json';

type Language = 'pt' | 'en';

type Messages = {
  [language in Language]: Record<string, string>;
};

const messages: Messages = {
  en: enMessages,
  pt: ptMessages,
};

const locale = window.navigator.language.split('-').shift() as Language;

const intlConfig: OptionalIntlConfig = {
  locale,
  defaultLocale: 'en',
  messages: messages[locale],
};

export default intlConfig;
