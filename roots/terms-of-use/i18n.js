import { getRouteI18N } from '../i18nController'

console.log("GERANDO ROTAS EM PRODUÇÃO?", process.env.NODE_ENV === 'production')

export async function generateRouteNames() {
  const routes = await getRouteI18N('terms-of-use-slug')
  console.log("ROTAS I18N", "'terms-of-use-slug'", routes)
  return routes;
}