import initTranslations from '../i18nController';
import { i18nRouter } from '../roots-router'
import HomeHeader from '@/components/HomeHeader';
import Footer from '@/components/Footer';
import { capitalizeIfI18N } from '../../utils/string'
import { getPagemap } from '@/app/sitemap';

const i18nNamespaces = ['privacy-policy', 'footer', 'routes'];

const isProd = process.env.NODE_ENV === 'production'
const isDevBuild = process.env.NEXT_PUBLIC_DEV_BUILD === 'true'

/** @type {import("next").Metadata} */
export async function generateMetadata({ pageHref }) {
  const locale = i18nRouter.getLocaleFromHref(pageHref)
  const { t, isBaseLng } = await initTranslations(locale, i18nNamespaces);

  (!isProd || isDevBuild) && console.log("PAGEMAP", getPagemap(pageHref))

  return {
    title: capitalizeIfI18N(t('privacy-policy', { ns: 'routes' }), isBaseLng),
    description: t('privacy-policy', { ns: 'routes' }) + ' - GetCounts.Live!',
    ...(!getPagemap(pageHref) ? {} : {
      alternates: {
        canonical: getPagemap(pageHref).url,
        languages: getPagemap(pageHref).alternates.languages
      }
    }),
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