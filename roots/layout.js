import './globals.css';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ['latin'] });

const isProd = process.env.NODE_ENV === 'production'
const isDevBuild = process.env.NEXT_PUBLIC_DEV_BUILD === 'true'

console.log("\nAtivando Analytics:", isProd && !isDevBuild)

//TODO implementar pagina de seleção de idioma linkando todo o site para os crwalers

//TODO IMPLEMENTAR PAGINA 404 ADEQAUADA
export default async function Layout({ children, params, locale }) {
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