import { getI18NRoutes } from '../i18nController'

export async function generateRouteNames() {
  const routes = await getI18NRoutes('terms-of-use')
  console.log("ROTAS I18N", "'terms-of-use'", routes)
  return routes;
}