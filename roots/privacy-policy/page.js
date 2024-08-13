import initTranslations from '../i18nController';
import { i18nRouter } from '../roots-router'
import HomeHeader from '@/components/HomeHeader';
import Footer from '@/components/Footer';

const i18nNamespaces = ['privacy-policy', 'footer', 'routes'];

/** @type {import("next").Metadata} */
export async function generateMetadata({ pageHref }) {
  const locale = i18nRouter.getLocaleFromHref(pageHref)
  const { t } = await initTranslations(locale, i18nNamespaces);

  return {
    title: t('privacy-policy', { ns: 'routes' }),
    description: t('privacy-policy', { ns: 'routes' }) + ' - GetCounts.Live!',
  }
}

export default async function PrivacyPolicy({ pageHref }) {
  const locale = i18nRouter.getLocaleFromHref(pageHref)
  const { t,isBaseLng } = await initTranslations(locale, i18nNamespaces);

  return <>
    <HomeHeader simple={true} {...{ locale }} />
    <main className={[]}>
      <h1 style={{...(isBaseLng?{}:{ textTransform: 'capitalize' })}}>{t('privacy-policy', { ns: 'routes' })}</h1>
      <div style={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: t('privacy-policy-text-html') }}></div>
    </main>
    <Footer {...{ locale, pageHref }} />
  </>
}