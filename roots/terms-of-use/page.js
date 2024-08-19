import Footer from '@/components/Footer';
import { i18nRouter } from '../roots-router'
import HomeHeader from '@/components/HomeHeader';
import initTranslations from '../i18nController';
import { capitalizeIfI18N } from '../../utils/string'
import { getPagemap } from '@/app/sitemap';

const i18nNamespaces = ['terms-of-use', 'footer', 'routes'];

const isProd = process.env.NODE_ENV === 'production'
const isDevBuild = process.env.NEXT_PUBLIC_DEV_BUILD === 'true'

/** @type {import("next").Metadata} */
export async function generateMetadata({ pageHref }) {
  const locale = i18nRouter.getLocaleFromHref(pageHref)
  const { t, isBaseLng } = await initTranslations(locale, i18nNamespaces);

  (!isProd || isDevBuild) && console.log("PAGEMAP", getPagemap(pageHref))

  return {
    title: capitalizeIfI18N(t('terms-of-use', { ns: 'routes' }), isBaseLng),
    description: t('terms-of-use', { ns: 'routes' }) + ' - GetCounts.Live!',
    ...(!getPagemap(pageHref) ? {} : {
      alternates: {
        languages: getPagemap(pageHref).alternates.languages
      }
    }),
  }
}

export default async function TermsOfUse({ pageHref }) {
  const locale = i18nRouter.getLocaleFromHref(pageHref)
  const { t, isBaseLng } = await initTranslations(locale, i18nNamespaces);

  return <>
    <HomeHeader simple={true} {...{ locale }} />
    <main className={[]}>
      <h2 style={{...(isBaseLng?{}:{ textTransform: 'capitalize' })}}>{t('terms-of-use', { ns: 'routes' })}</h2>
      <div style={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: t('terms-of-use-text-html') }}></div>
    </main>
    <Footer {...{ locale, pageHref }} />
  </>
}