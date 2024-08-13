import Link from 'next/link';
import Image from 'next/image';
import { i18nRouter } from './roots-router';
import initTranslations from './i18nController';
import ytLogo from '../assets/youtube.svg';
import HomeHeader from '../components/HomeHeader';
import Footer from '../components/Footer';

const isProd = process.env.NODE_ENV === 'production'

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
    <main>
      <div id="counters" style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            width: "fit-content",
            alignSelf: "center",
            padding: 7,
            backgroundColor: "darkred",
            borderRadius: 14
          }}
        >
          <div style={{ display: "flex", padding: "0px 7px" }}>
            <Image
              src={ytLogo}
              width={32}
              alt="Youtube Logo"
            />
            <Link
              style={{ textDecoration: "none", color: "white", marginLeft: 5 }}
              href={i18nRouter.getHref('/youtube/views', { locale })}
            >
              <h2 style={{ margin: 0, fontWeight: "lighter", fontSize: "initial", ...(isBaseLng?{}:{ textTransform: 'capitalize' })}}>
                {t('yt-view-counter', { ns: 'routes' })}
              </h2>
            </Link>
          </div>
        </div>
      </div>
      <div
        style={{
          textAlign: "left",
          margin: "50px 10px 0px 10px",
          backgroundColor: "#f1eeee",
          padding: 10,
          borderRadius: 20
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
    <Footer {...{ locale, pageHref }}/>
  </>
}