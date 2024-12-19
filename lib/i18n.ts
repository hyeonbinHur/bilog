import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en_US: {
      translation: {
        welcome: "Welcome hb",
      },
    },
    ko: {
      translation: {
        welcome: "환영합니다",
      },
    },
  },
  lng: "en_US", // 초기 언어 설정
  fallbackLng: "en_US", // 언어가 없을 경우 기본 언어
  interpolation: {
    escapeValue: false, // React는 자동으로 안전하게 처리하므로 false로 설정
  },
});

export default i18n;
