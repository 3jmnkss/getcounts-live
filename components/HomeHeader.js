import Link from "next/link"
import initTranslations from "@/roots/i18nController";
import { i18nRouter } from '@/roots/roots-router'

const isProd = process.env.NODE_ENV === 'production'
const i18nNamespaces = ['header'];

export default async function HomeHeader({ locale, simple }) {
    const { t } = await initTranslations(locale, i18nNamespaces);

    
    //TODO criar encapsulador de Link com prefecth false
    return <header>
        <Link
            prefetch={false}
            style={{ textDecoration: "none" }}
            href={(() => { //TODO criar funçao que retorna links do i18nRouter com prefixos
                let href = i18nRouter.getHref("/", { locale });
                if (href === '/')
                    return href;
                return href + '/';
            })()}>
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
        </Link>
        <h2 style={{ margin: 0, fontSize: "11pt" }}>{t('home-subtitle', { ns: 'header' })}</h2>
        {!simple && <p style={{ marginBottom: 20, fontStyle: "italic", marginTop: 0 }}>
            {t('realtime-call', { ns: 'header' })}{!isProd ? ` {${locale}}` : ''}
        </p>}
    </header>
}