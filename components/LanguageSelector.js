import { i18nRouter } from '@/roots/roots-router'
import i18nConfig from '@/i18nConfig';
import Link from 'next/link';
import { capitalizeIfI18N } from '@/utils/string';

const isProd = process.env.NODE_ENV === 'production'
const isDevBuild = process.env.NEXT_PUBLIC_DEV_BUILD === 'true'

export default function LanguageSelector({ pageHref, locale: pageLocale }) {
  if (!isProd || isDevBuild) {
    console.log("DEBUG", pageHref, pageLocale)
  }

  let languageNames = new Intl.DisplayNames([pageLocale], { type: "language" });

  return (
    <div style={{ width: 'fit-content', margin: 'auto', textAlign: 'left' }}>
      <ul>
        {i18nConfig?.locales?.map(locale => {
          let languageNamesLC = new Intl.DisplayNames([locale], { type: "language" });
          return <li key={locale}>
            <Link
              prefetch={false}
              // style={{ ...(isBaseLng ? {} : { textTransform: 'capitalize' }) }}
              href={(() => { //TODO criar funçao que retorna links do i18nRouter com prefixos
                let href = i18nRouter.getHref("/", { locale });
                if (href === '/')
                  return href;
                return href + '/';
              })()}
            >
              {`${capitalizeIfI18N(languageNamesLC.of(locale))} (${capitalizeIfI18N(languageNames.of(locale))})`}
              {/* {languageNamesEN.of(locale)} */}
            </Link>
          </li>

        })}
      </ul>
    </div>
  );
}