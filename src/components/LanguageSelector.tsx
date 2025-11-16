import { LANGUAGES, useI18n } from "../i18n";

export const LanguageSelector = () => {
  const { language, setLanguage } = useI18n();

  return (
    <select
      className="border rounded-md px-2 py-1 text-sm bg-white/80"
      value={language}
      onChange={(e) => setLanguage(e.target.value as any)}
    >
      {LANGUAGES.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};
