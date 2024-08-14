import YTViewCounter from '@/components/YTViewCounter';
import initTranslations from '../../i18nController';
import { i18nRouter } from '../../roots-router'
import YTHeader from '@/components/YTHeader';
import Footer from '@/components/Footer';

const i18nNamespaces = [
  'youtube/live-view-counter', 'youtube/common',
  'common', 'footer', 'routes', 'header'
];

/** @type {import("next").Metadata} */
export async function generateMetadata({ pageHref }) {
  const locale = i18nRouter.getLocaleFromHref(pageHref)
  const { t } = await initTranslations(locale, i18nNamespaces);

  /* TODO adicionar metadados do youtube live view counter para redes sociais
  <!-- Tags Open Graph para redes sociais (opcional) -->
    <meta
      property="og:title"
      content="Youtube Live View Counter (in Real time) - GetCounts.Live!"
    />
    <meta
      property="og:description"
      content="Get live view counts (counter in real time) of a Youtube video, playlist or channel! Check it now on GetCounts.Live."
    />
    <meta
      property="og:image"
      content="https://getcounts.live/android-chrome-512x512.png"
    />
    <meta property="og:url" content="https://getcounts.live/youtube/views" />

    <!-- Tags Twitter Card para Twitter (opcional) -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:title"
      content="Youtube Live View Counter (in Real time) - GetCounts.Live!"
    />
    <meta
      name="twitter:description"
      content="Get live view counts (counter in real time) of a Youtube video, playlist or channel! Check it now on GetCounts.Live."
    />
    TODO parece que esse o next automatiza
    <meta
      name="twitter:image"
      content="https://getcounts.live/android-chrome-512x512.png"
    />

  */

  return {
    title: t('yt-view-counter-title') + ' - GetCounts.Live!',
    description: t('yt-view-counter-description'),
  }
}

export default async function ({ pageHref }) {
  const locale = i18nRouter.getLocaleFromHref(pageHref)
  const { t, isBaseLng } = await initTranslations(locale, i18nNamespaces);

  return <>
    <YTHeader title={t('yt-view-counter', { ns: 'routes' })} {...{ locale, t, i18nRouter, isBaseLng }} />
    <main style={{ padding: 0 }}>
      <YTViewCounter t_map={{
        'views-at': t('views-at', { ns: 'common' }),
        'video-not-found': t('video-not-found', { ns: 'common' }),
        'yt-search-video-placeholder': t('yt-search-video-placeholder', { ns: 'youtube/common' })
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
        <div dangerouslySetInnerHTML={{ __html: t('yt-view-counter-info-text-html') }} />
      </div>
    </main>
    <div style={{ height: 15 }}></div>
    <Footer {...{ locale, pageHref, addMsg: t('copyright-yt', { ns: 'footer' }) }} />
  </>
}