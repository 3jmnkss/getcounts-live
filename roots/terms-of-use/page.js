import Footer from '@/components/Footer';
import { i18nRouter } from '../roots-router'
import HomeHeader from '@/components/HomeHeader';
import initTranslations from '../i18nController';
import { capitalizeIfI18N } from '../../utils/string'

const i18nNamespaces = ['terms-of-use', 'footer', 'routes'];

/** @type {import("next").Metadata} */
export async function generateMetadata({ pageHref }) {
  const locale = i18nRouter.getLocaleFromHref(pageHref)
  const { t, isBaseLng } = await initTranslations(locale, i18nNamespaces);

  return {
    title: capitalizeIfI18N(t('terms-of-use', { ns: 'routes' }), isBaseLng),
    description: t('terms-of-use', { ns: 'routes' }) + ' - GetCounts.Live!',
  }
}

export default async function TermsOfUse({ pageHref }) {
  const locale = i18nRouter.getLocaleFromHref(pageHref)
  const { t, isBaseLng } = await initTranslations(locale, i18nNamespaces);

  return <>
    <HomeHeader simple={true} {...{ locale }} />
    <main className={[]}>
      <h1 style={{...(isBaseLng?{}:{ textTransform: 'capitalize' })}}>{t('terms-of-use', { ns: 'routes' })}</h1>
      <div style={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: t('terms-of-use-text-html') }}></div>
    </main>
    <Footer {...{ locale, pageHref }} />
  </>
}