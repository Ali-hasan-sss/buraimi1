import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value;
    const locale = cookieLocale === 'ar' || cookieLocale === 'en' ? cookieLocale : 'ar';

    return {
        locale,
        messages: (await import(`@/locale/${locale}.json`)).default
    };
});