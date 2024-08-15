'use client';

import { useRouter } from 'next/navigation';
import { i18nRouter } from '@/roots/roots-router'
import i18nConfig from '@/i18nConfig';

const isProd = process.env.NODE_ENV === 'production'

export default function LanguageChanger({ pageHref, locale }) {
  const router = useRouter();

  if (!isProd) {
    console.log("DEBUG", pageHref, locale)
  }

  const handleChange = e => {
    const newLocale = e.target.value;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    if (!isProd) {
      i18nRouter.schema.routes.en.forEach(r => {
        console.log("ROTA en", r)
        console.log("ROTA pt", i18nRouter.schema.routes.pt.find(ri => ri.name === r.name))
        console.log("ROTA hi", i18nRouter.schema.routes.hi.find(ri => ri.name === r.name))
      })
      console.log("indo para", newLocale,
        i18nRouter.getRouteFromHref(pageHref),
        i18nRouter.getHref(i18nRouter.getRouteFromHref(pageHref)?.name, { locale: newLocale }),
        encodeURI(i18nRouter.getHref(i18nRouter.getRouteFromHref(pageHref)?.name, { locale: newLocale }))
      )
    }

    router.push(
      i18nRouter.getHref(
        i18nRouter.getRouteFromHref(pageHref)?.name, { locale: newLocale }
      )
    );
    router.refresh();
  };

  return (
    <select onChange={handleChange} value={locale}>
      {i18nConfig?.locales?.map(l => <option key={l} value={l}>{l}</option>)}
    </select>
  );
}