import { getI18NRoutes } from '../../i18nController'

export async function generateRouteNames() {
  const i18nRoutes = await getI18NRoutes('yt-subscriber-counter-slug')
  console.log("ROTAS I18N", "'yt-subscriber-counter-slug'", i18nRoutes)
  return i18nRoutes;
}