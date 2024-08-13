import './globals.css';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import { i18nRouter } from './roots-router';
import initTranslations from './i18nController';

const inter = Inter({ subsets: ['latin'] });
const i18nNamespaces = ['home', 'header', 'footer', 'routes'];

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

//TODO Adicionar suporte ao gtag
/*
<script>
      let url = window.location.toString();
      if (!url.includes('stackblitz') && !url.includes('webcontainer')) {
        console.log('NOT DEV');
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'G-D3EGFTWKZX');
      } else {
        console.log('stackblitz');
      }
      console.log(window);
    </script>
*/

export default async function Layout({ children, params, locale }) {
  const { t, isBaseLng } = await initTranslations(locale, i18nNamespaces);
  process.env.NODE_ENV !== 'production' && console.log("Props do layout base:", params, locale)
  return (
    <html lang={locale}>
      <body /*className={inter.className}*/>
        {children}
      </body>
    </html>
  );
}