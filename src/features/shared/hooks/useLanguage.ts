import { useState } from 'react';
import { translations, Language } from '../../../constants/translations';

export const useLanguage = (initialLang: Language = 'en') => {
    const [lang, setLang] = useState<Language>(initialLang);

    const t = (key: string) => {
        const group = translations[lang as keyof typeof translations];
        return (group as any)[key] || key;
    };

    return { lang, setLang, t };
};
