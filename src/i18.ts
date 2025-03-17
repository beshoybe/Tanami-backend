import i18next from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en", // Default language
    preload: ["en", "ar"], // Preload supported languages
    backend: {
      loadPath: "./src/locales/{{lng}}.json", // Path to translation files
    },
    detection: {
      order: ["header"], // Detect language from headers
      lookupHeader: "accept-language", // Read Accept-Language header
    },
    debug: false, // Enable logging for debugging
  });

export default i18next;
