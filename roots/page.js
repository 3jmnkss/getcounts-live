import Link from 'next/link';
import Image from 'next/image';
import { i18nRouter } from './roots-router';
import initTranslations from './i18nController';
import ytLogo from '../assets/youtube.svg';
import HomeHeader from '../components/HomeHeader';
import Footer from '../components/Footer';
import { getPagemap } from '../app/sitemap'

const i18nNamespaces = ['home', 'header', 'footer', 'routes'];
const isProd = process.env.NODE_ENV === 'production'
const isDevBuild = process.env.NEXT_PUBLIC_DEV_BUILD === 'true'

/** @type {import("next").Metadata} */
export async function generateMetadata({ pageHref }) {
  const locale = i18nRouter.getLocaleFromHref(pageHref)
  const { t } = await initTranslations(locale, i18nNamespaces);

  (!isProd || isDevBuild) && console.log("PAGEMAP", getPagemap(pageHref))

  return {
    title: t('home-title'),
    description: t('home-description'),
    ...(!getPagemap(pageHref) ? {} : {
      alternates: {
        languages: getPagemap(pageHref).alternates.languages
      }
    }),
  }

  //TODO Configurar meta tags sociais
  /*
  <!-- Tags Open Graph para redes sociais (opcional) -->
    <meta property="og:title" content="Live Real-Time Counts" />
    <meta
      property="og:description"
      content="Real time live counts of Views, Likes, Subscribers and Followers from several platforms: Youtube and more! Check it now at GetCounts.Live!"
    />
    <meta
      property="og:image"
      content="https://getcounts.live/android-chrome-512x512.png"
    />
    <meta property="og:url" content="https://getcounts.live" />

    <!-- Tags Twitter Card para Twitter (opcional) -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Live Real-Time Counts" />
    <meta
      name="twitter:description"
      content="Real time live counts of Views, Likes, Subscribers and Followers from several platforms: Youtube and more! Check it now at GetCounts.Live!"
    />
    <meta
      name="twitter:image"
      content="https://getcounts.live/android-chrome-512x512.png"
    />
*/
};

export default async function Home({ pageHref }) {
  const i18nNamespaces = ['home', 'header', 'routes'];
  const locale = i18nRouter.getLocaleFromHref(pageHref)
  const { t, isBaseLng } = await initTranslations(locale, i18nNamespaces);

  // if (process.env.NODE_ENV !== 'production'){
  //   console.log("Props da page base:", pageHref)
  //   console.log("LOCALE",pageLocale)
  // }

  return <>
    <HomeHeader {...{ locale }} />
    <main style={{ marginTop: 25 }}>
      <div
        id="counters"
        style={{
          maxWidth: 850,
          margin: "auto",
          display: "flex",
          flexWrap: 'wrap',
          flexDirection: "row",
          alignContent: "baseline",
          justifyContent: "space-evenly"
        }}
      >
        <div
          style={{
            padding: 7,
            borderRadius: 14,
            marginBottom: 20,
            alignSelf: "center",
            width: "fit-content",
            backgroundColor: "darkred",
          }}
        >
          <div style={{ display: "flex", padding: "0px 7px" }}>
            <Image
              priority
              width={32}
              src={ytLogo}
              alt="Youtube Logo"
            />
            <Link
              prefetch={false}
              style={{ textDecoration: "none", color: "white", marginLeft: 5 }}
              href={i18nRouter.getHref('/youtube/views-counter', { locale }) + '/'}
            >
              <h2 style={{
                margin: 0, fontWeight: "lighter",
                fontSize: "initial", ...(isBaseLng ? {} : { textTransform: 'capitalize' })
              }}>
                {t('yt-view-counter', { ns: 'routes' })}
              </h2>
            </Link>
          </div>
        </div>
        <div
          style={{
            padding: 7,
            borderRadius: 14,
            marginBottom: 20,
            alignSelf: "center",
            width: "fit-content",
            backgroundColor: "darkred",
          }}
        >
          <div style={{ display: "flex", padding: "0px 7px" }}>
            <Image
              priority
              width={32}
              src={ytLogo}
              alt="Youtube Logo"
            />
            <Link
              prefetch={false}
              style={{ textDecoration: "none", color: "white", marginLeft: 5 }}
              href={i18nRouter.getHref('/youtube/subscribers-counter', { locale }) + '/'}
            >
              <h2 style={{
                margin: 0, fontWeight: "lighter",
                fontSize: "initial", ...(isBaseLng ? {} : { textTransform: 'capitalize' })
              }}>
                {t('yt-subscriber-counter', { ns: 'routes' })}
              </h2>
            </Link>
          </div>
        </div>
      </div>
      <div
        style={{
          padding: 10,
          borderRadius: 20,
          textAlign: "left",
          backgroundColor: "#f1eeee",
          margin: "20px 10px 0px 10px",
        }}
      >
        <h2
          style={{ fontSize: "15pt" }}
          id="real-time-live-count-view-like-subscriber-follower-social-networks"
        >
          {t('home-info-h2')}
        </h2>
        <div dangerouslySetInnerHTML={{ __html: t('home-info-text-html') }} />
      </div>
    </main>
    <Footer {...{ locale, pageHref }} />
  </>
}