import Link from "next/link"
import initTranslations from "@/roots/i18nController";
import { i18nRouter } from '../roots/roots-router'
import LanguageChanger from "./LanguageChanger";

// const isProd = process.env.NODE_ENV === 'production'
const i18nNamespaces = ['footer', 'routes'];

export default async function Footer({ locale, pageHref, addMsg }) {
    const { t, isBaseLng } = await initTranslations(locale, i18nNamespaces);

    return <footer
        style={{
            fontSize: "0.75rem",
            lineHeight: "1rem",
            padding: "0px 20px",
            paddingBottom: 10
        }}
    >
        <hr style={{ marginBottom: 15 }} />
        <Link
            prefetch={false}
            //TODO padronizar capitalize entre usos de CSS e JS
            style={{ ...(isBaseLng ? {} : { textTransform: 'capitalize' }) }}
            href={i18nRouter.getHref('/privacy-policy', { locale }) + '/'}
        >
            {t('privacy-policy', { ns: 'routes' })}
        </Link>
        {' | '}
        <Link
            prefetch={false}
            style={{ ...(isBaseLng ? {} : { textTransform: 'capitalize' }) }}
            href={i18nRouter.getHref('/terms-of-use', { locale }) + '/'}
        >
            {t('terms-of-use', { ns: 'routes' })}
        </Link>
        {' | '}
        <Link
            prefetch={false}
            style={{ ...(isBaseLng ? {} : { textTransform: 'capitalize' }) }}
            href={i18nRouter.getHref('/language-selector', { locale }) + '/'}
        >
            {t('language-selector', { ns: 'routes' })}
        </Link>
        <br />
        {t('msg-no-data-collected')}
        {addMsg ? <div><br />{addMsg}</div> : ''}
        <div style={{ display: "block ruby" }}>
            <p>© 2024 GetCounts.Live! {t('copyright')}</p>
            <span style={{ marginLeft: 10 }}>
                <LanguageChanger {...{ pageHref, locale }} />
            </span>
        </div>
    </footer>
}