import YTSubscriberCounter from '@/components/YTSubscriberCounter';
import initTranslations from '../../i18nController';
import { i18nRouter } from '../../roots-router'
import YTHeader from '@/components/YTHeader';
import Footer from '@/components/Footer';

const i18nNamespaces = [
  'youtube/live-subscriber-counter', 'youtube/common',
  'common', 'footer', 'routes', 'header'
];

/** @type {import("next").Metadata} */
export async function generateMetadata({ pageHref }) {
  const locale = i18nRouter.getLocaleFromHref(pageHref)
  const { t } = await initTranslations(locale, i18nNamespaces);

  /* TODO adicionar metadados do youtube live subscriber counter para redes sociais
  <!-- Tags Open Graph para redes sociais (opcional) -->
    <meta
      property="og:title"
      content="Youtube Live Subscriber Counter (in Real time) - GetCounts.Live!"
    />
    <meta
      property="og:description"
      content="Get live subscriber counts (counter in real time) of a Youtube video, playlist or channel! Check it now on GetCounts.Live."
    />
    <meta
      property="og:image"
      content="https://getcounts.live/android-chrome-512x512.png"
    />
    <meta property="og:url" content="https://getcounts.live/youtube/subscribers" />

    <!-- Tags Twitter Card para Twitter (opcional) -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:title"
      content="Youtube Live Subscriber Counter (in Real time) - GetCounts.Live!"
    />
    <meta
      name="twitter:description"
      content="Get live subscriber counts (counter in real time) of a Youtube video, playlist or channel! Check it now on GetCounts.Live."
    />
    TODO parece que esse o next automatiza
    <meta
      name="twitter:image"
      content="https://getcounts.live/android-chrome-512x512.png"
    />

  */

  return {
    title: t('yt-subscriber-counter-title') + ' - GetCounts.Live!',
    description: t('yt-subscriber-counter-description'),
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