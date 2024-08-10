'use client';

import { useRouter } from 'next/navigation';
import {rootsRouter} from '@/roots/roots-router'
import i18nConfig from '@/i18nConfig';

export default function LanguageChanger({pageHref, currentLocale}) {
  const router = useRouter();
  console.log("DEBUG",pageHref, currentLocale)
  const handleChange = e => {
    const newLocale = e.target.value;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    console.log("indo para", rootsRouter.getRouteFromHref(pageHref), rootsRouter.getHref(rootsRouter.getRouteFromHref(pageHref)?.name, { locale: newLocale }))
    router.push(rootsRouter.getHref(rootsRouter.getRouteFromHref(pageHref)?.name, { locale: newLocale }));

    router.refresh();
  };

  return (
    <select onChange={handleChange} value={currentLocale}>
      {i18nConfig?.locales?.map(l=><option key={l} value={l}>{l}</option>)}
    </select>
  );
}