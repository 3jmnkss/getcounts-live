import Link from "next/link"
import Image from "next/image";
import ytLogo from '../assets/youtube.svg';

const isProd = process.env.NODE_ENV === 'production'

export default async function YTHeader({ locale, t, i18nRouter, isBaseLng, title }) {
    return <header>
        <span>
            <h1
                style={{
                    fontWeight: 300,
                    marginTop: 20,
                    fontSize: "x-large",
                    marginBottom: 0,
                    marginLeft: 5,
                    marginRight: 5,
                    verticalAlign: "text-bottom",
                    ...(isBaseLng ? {} : { textTransform: 'capitalize' })
                }}
            >
                <Image
                    priority
                    src={ytLogo}
                    width={32}
                    alt="Youtube Logo"
                    style={{ marginRight: 5, marginBottom: 3, verticalAlign: 'bottom' }}
                />
                {title}
            </h1>
        </span>
        <Link
            prefetch={false}
            style={{ textDecoration: 'none' }}
            href={(() => {
                let href = i18nRouter.getHref("/", { locale });
                if (href === '/')
                    return href;
                return href + '/';
            })()}>
            <p style={{ margin: 0, fontSize: "11pt", fontWeight: 300 }}>
                {t('home-call', { ns: 'header' })}
            </p>
        </Link>
        <p style={{ marginBottom: 20, fontStyle: "italic", marginTop: 0, fontWeight: 300 }}>
            {t('realtime-call', { ns: 'header' })}{!isProd ? ` {${locale}}` : ''}
        </p>
    </header>
}