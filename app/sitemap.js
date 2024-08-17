import { i18nRouter } from '@/roots/roots-router'

const baseUrl = process.env.NEXT_PUBLIC_PROJECT_URL

const preConfig = {
    '/': {
        changeFrequency: 'weekly',
        priority: 1,
    },
    '/privacy-policy': {
        changeFrequency: 'monthly',
        priority: 0.5,
    },
    '/terms-of-use': {
        changeFrequency: 'monthly',
        priority: 0.5,
    }
}
//TODO adicionar teste de googlebot se está retornando 200 para cada rota com conteúdo
//TODO adicionar pipeline de verificaçao do site completo como se fosse googlebot crwaler em busaca de 301 e 404
export default function sitemap() {
    const { schema } = i18nRouter;
    console.log("\nGerando sitemap.xml para a url:", baseUrl, "...")
    console.log(`Locale padrão: [${schema.defaultLocale}]...`)
    const sitemap = schema.routes[schema.defaultLocale].map(route => {
        const defaultUrl = baseUrl + route.href + (route.href === '/' ? '' : '/');
        return {
            url: defaultUrl,
            priority: 0.8,
            changeFrequency: 'daily',
            lastModified: new Date(),
            ...(preConfig[route.href] || {}),
            alternates: {
                languages: (() => {
                    let languages = { 'x-default': defaultUrl }
                    schema.locales.forEach(locale =>
                        schema.routes[locale]
                            .filter(i18nRoute => i18nRoute.name === route.name)
                            .forEach((i18nRoute, i) => {
                                if (i) return;
                                languages[locale] = baseUrl + i18nRoute.href + (i18nRoute.href === '/' ? '' : '/');
                            })
                    );
                    return languages;
                })()
            }
        }
    })
    return sitemap;
}

export function getPagemap(pageHref) {
    const sitemapArray = sitemap();
    sitemapArray.forEach((page) => {
        console.log(pageHref, page.url.split(baseUrl))
    })
    const pagemap = sitemapArray.filter((page) =>
        (page.url.split(baseUrl)[1] === pageHref) ||
        (page.url.split(baseUrl)[1] === (pageHref + '/')))
        .at(0)
    // console.log(sitemapArray)
    // console.log("PAGEMAP", pagemap)

    return pagemap;
}