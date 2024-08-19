import { getI18NRoutes } from '../i18nController'

export async function generateRouteNames() {
  const i18nRoutes = await getI18NRoutes('language-selector')
  console.log("ROTAS I18N", "'language-selector'", i18nRoutes)
  return i18nRoutes;
}