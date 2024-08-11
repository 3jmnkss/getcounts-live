import Image from 'next/image';
import { i18nRouter } from './roots-router'
import initTranslations from './i18nController';
import TranslationsProvider from '@/components/TranslationsProvider';

const isProd = process.env.NODE_ENV === 'production'
const i18nNamespaces = ['home', 'header', 'footer'];

export default async function Home({ pageHref }) {
  const pageLocale = i18nRouter.getLocaleFromHref(pageHref)
  const { t, resources } = await initTranslations(pageLocale, i18nNamespaces);

  // if (process.env.NODE_ENV !== 'production'){
  //   console.log("Props da page base:", pageHref)
  //   console.log("LOCALE",pageLocale)
  // }

  return <>
    <header>
      <a href="/" style={{ textDecoration: "none" }}>
        <h1
          style={{
            marginTop: 20,
            fontWeight: "bold",
            fontSize: "xx-large",
            marginBottom: 0
          }}
        >
          📊GetCounts.Live!
        </h1>
      </a>
      <h2 style={{ margin: 0, fontSize: "11pt" }}>{t('home-subtitle', { ns: 'header' })}</h2>
      <p style={{ marginBottom: 20, fontStyle: "italic", marginTop: 0 }}>
        {t('realtime-call', { ns: 'header' })}{!isProd ? ` {${pageLocale}}` : ''}
      </p>
    </header>
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
            <img
              src="/assets/youtube.svg"
              alt="Youtube Logo"
              style={{ width: 32, marginTop: 1 }}
            />
            <a
              style={{ textDecoration: "none", color: "white", marginLeft: 5 }}
              href="youtube/views/"
            >
              <h2 style={{ margin: 0, fontWeight: "lighter", fontSize: "initial" }}>
                Youtube Live View Counter
              </h2>
            </a>
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
    <footer
      style={{
        fontSize: "0.75rem",
        lineHeight: "1rem",
        padding: "0px 50px",
        paddingBottom: 10
      }}
    >
      <a href="privacy-policy.html">Privacy Policy</a> |
      <a href="terms-of-use.html">Terms Of Use</a> <br />
      {t('msg-no-data-collected', { ns: 'footer' })}
      <p>© 2024 GetCounts.Live! {t('copyright', { ns: 'footer' })}</p>
    </footer>
  </>
}