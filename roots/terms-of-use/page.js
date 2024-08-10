import Image from 'next/image';
import ExampleClientComponent from '@/components/ExampleClientComponent';
import LanguageChanger from '@/components/LanguageChanger';
import initTranslations from '../i18nController';
import {rootsRouter} from '../roots-router'
import TranslationsProvider from '@/components/TranslationsProvider';

const i18nNamespaces = ['default'];

export default async function TermsOfUse({
  params,
  pageHref
}) {
  const currentLocale = rootsRouter.getLocaleFromHref(pageHref)
  const { t, resources } = await initTranslations(currentLocale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={currentLocale}
      resources={resources}>
      <main className={[]}>
        <h1>{t('chamada0')}</h1>
        <ExampleClientComponent />
        <LanguageChanger {...{pageHref, currentLocale}} />
      </main>
    </TranslationsProvider>
  );
}