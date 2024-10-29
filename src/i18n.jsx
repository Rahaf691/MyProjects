import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from './locales/en/en.json'
import ar from './locales/ar/ar.json'

const savedLang = localStorage.getItem('language') || 'en'

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: en
        },
        ar: {
            translation: ar
        }
    },
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false // تأمين النصوص مشان اذا بدي اكتب عنصر او تاغ ما يتأمن مرتين لان الريأكت بأمنو بشكل طبيعي 
    }
})


export default i18n