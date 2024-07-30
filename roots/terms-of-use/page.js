import Image from 'next/image';
import ExampleClientComponent from '@/components/ExampleClientComponent';
import initTranslations from '../i18nController';
import {router} from '../roots-router'

export default async function Home({
  params,
  pageHref
}) {
  const pageLocale = router.getLocaleFromHref(pageHref)
  const { t } = await initTranslations(pageLocale, ['default']);

  return (
    <main className={[]}>
      <h1>{t('chamada0')}</h1>
      <ExampleClientComponent />
    </main>
  );
}