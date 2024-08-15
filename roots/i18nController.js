import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import i18nConfig from '@/i18nConfig';
import slugify from 'slugify'

export default async function initTranslations(
  locale,
  namespaces,
  i18nInstance,
  resources
) {
  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language, namespace) =>
          import(`@/locales/${process.env.NEXT_PUBLIC_WEBLATE_PROJECT_SLUG}/${namespace}/${language}.json`)
      )
    );
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales
  });

  const isBaseLng = i18nConfig.ownLocales && i18nConfig.ownLocales.includes(i18nInstance.language)
  return {
    isBaseLng,
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: (key, options = {}) => isBaseLng ? i18nInstance.t(key, options) : i18nInstance.t([key + '-i18n', key], options)
  }
};


export async function getI18NRoutes(route) {
  let routePerLocale = []
  for (const locale of i18nConfig.locales) {
    let erroSlug = '';
    const i18nRoutes = await import(`../locales/${process.env.NEXT_PUBLIC_WEBLATE_PROJECT_SLUG}/routes/${locale}.json`)
    let i18nRoute = i18nRoutes[route + '-i18n'];
    if (!i18nRoute || (i18nConfig.ownLocales && i18nConfig.ownLocales.includes(locale)))
      i18nRoute = i18nRoutes[route];
    if (!i18nRoute) {
      erroSlug = `:erro\\/\/:erro\\/\/:erro`
      console.error(`Slug i18n [${locale}] da rota '${route}' não encontrado.`)
    }
    let path = slugify(i18nRoute, { locale, lower: true }) || i18nRoute.replace(/\s+/g, '-');
    path = erroSlug || (process.env.NODE_ENV !== 'production') ? encodeURI(path) : path;
    routePerLocale.push({ locale, path })
  }
  return routePerLocale;
}