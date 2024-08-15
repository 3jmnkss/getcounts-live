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

export default async function sitemap() {
    const { schema } = i18nRouter;
    console.log("\nGerando sitemap.xml para a url:", baseUrl, "...")
    console.log(`Locale padrão: [${schema.defaultLocale}]...`)
    const sitemap = schema.routes[schema.defaultLocale].map(route => {
        const defaultUrl = baseUrl + route.href;
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
                                languages[locale] = baseUrl + i18nRoute.href;
                            })
                    );
                    return languages;
                })()
            }
        }
    })
    return sitemap;
}