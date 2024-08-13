import { getI18NRoutes } from '../i18nController'

export async function generateRouteNames() {
  const i18nRoutes = await getI18NRoutes('privacy-policy')
  console.log("ROTAS I18N", "'privacy-policy'", i18nRoutes)
  return i18nRoutes;
}