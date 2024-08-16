import './globals.css';
import { Inter } from 'next/font/google';
import initTranslations from './i18nController';
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ['latin'] });
const i18nNamespaces = ['home', 'header', 'footer', 'routes'];
const isProd = process.env.NODE_ENV === 'production'
const isDevBuild = process.env.NEXT_PUBLIC_DEV_BUILD === 'true'

console.log("\nAtivando Analytics:", isProd && !isDevBuild)

/** @type {import("next").Metadata} */
export async function generateMetadata({ locale }) {
  const { t } = await initTranslations(locale, i18nNamespaces);

  return {
    title: t('home-title'),
    description: t('home-description'),
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


//TODO IMPLEMENTAR PAGINA 404 ADEQAUADA
export default async function Layout({ children, params, locale }) {
  const { t, isBaseLng } = await initTranslations(locale, i18nNamespaces);
  process.env.NODE_ENV !== 'production' && console.log("Props do layout base:", params, locale)
  return (
    <html lang={locale}>
      <body /*className={inter.className}*/>
        {children}
      </body>
      {isProd && !isDevBuild && <GoogleAnalytics gaId="G-D3EGFTWKZX" />}
    </html>
  );
}