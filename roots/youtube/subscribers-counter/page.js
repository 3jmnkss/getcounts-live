import YTSubscriberCounter from '@/components/YTSubscriberCounter';
import initTranslations from '../../i18nController';
import { i18nRouter } from '../../roots-router'
import YTHeader from '@/components/YTHeader';
import Footer from '@/components/Footer';
import { getPagemap } from '@/app/sitemap';

const i18nNamespaces = [
  'youtube/live-subscriber-counter', 'youtube/common',
  'common', 'footer', 'routes', 'header'
];

const isProd = process.env.NODE_ENV === 'production'
const isDevBuild = process.env.NEXT_PUBLIC_DEV_BUILD === 'true'

/** @type {import("next").Metadata} */
export async function generateMetadata({ pageHref }) {
  const locale = i18nRouter.getLocaleFromHref(pageHref)
  const { t } = await initTranslations(locale, i18nNamespaces);

  (!isProd || isDevBuild) && console.log("PAGEMAP", getPagemap(pageHref))

  return {
    title: t('yt-subscriber-counter-title') + ' - GetCounts.Live!',
    description: t('yt-subscriber-counter-description'),
    ...(!getPagemap(pageHref) ? {} : {
      alternates: {
        canonical: getPagemap(pageHref).url,
        languages: getPagemap(pageHref).alternates.languages
      }
    }),
  }
}

export default async function ({ pageHref }) {
  const locale = i18nRouter.getLocaleFromHref(pageHref)
  const { t, isBaseLng } = await initTranslations(locale, i18nNamespaces);

  return <>
    <YTHeader title={t('yt-subscriber-counter', { ns: 'routes' })} {...{ locale, t, i18nRouter, isBaseLng }} />
    <main style={{ padding: 0 }}>
      <YTSubscriberCounter t_map={{
        'subscribers-at': t('subscribers-at', { ns: 'common' }),
        'channel-not-found': t('channel-not-found', { ns: 'common' }),
        'yt-search-channel-placeholder': t('yt-search-channel-placeholder', { ns: 'youtube/common' })
      }} />
      <div
        style={{
          textAlign: "left",
          margin: "10px 10px 0px 10px",
          backgroundColor: "#f1eeee",
          padding: 10,
          borderRadius: 20,
          fontSize: "10pt"
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: t('yt-subscriber-counter-info-text-html') }} />
      </div>
    </main>
    <div style={{ height: 15 }}></div>
    <Footer {...{ locale, pageHref, addMsg: t('copyright-yt', { ns: 'footer' }) }} />
  </>
}