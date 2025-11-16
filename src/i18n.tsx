import React, { createContext, useContext, useState, useEffect } from "react";

export type SupportedLanguageCode =
  | "en"
  | "hi"
  | "te"
  | "ta"
  | "kn"
  | "ml"
  | "mr"
  | "bn"
  | "gu"
  | "pa"
  | "or";

export const LANGUAGES: { code: SupportedLanguageCode; label: string }[] = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी (Hindi)" },
  { code: "te", label: "తెలుగు (Telugu)" },
  { code: "ta", label: "தமிழ் (Tamil)" },
  { code: "kn", label: "ಕನ್ನಡ (Kannada)" },
  { code: "ml", label: "മലയാളം (Malayalam)" },
  { code: "mr", label: "मराठी (Marathi)" },
  { code: "bn", label: "বাংলা (Bangla)" },
  { code: "gu", label: "ગુજરાતી (Gujarati)" },
  { code: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
  { code: "or", label: "ଓଡ଼ିଆ (Odia)" },
];

type TranslationDictionary = Record<string, string>;

const translations: Record<SupportedLanguageCode, TranslationDictionary> = {
  en: {
    "nav.home": "Home",
    "nav.about": "About us",
    "nav.chat": "AI Chat",
    "nav.history": "History",

    "home.title": "DeepAgro Farm AI",
    "home.subtitle": "Smart farm assistant for Indian farmers.",
    "home.getStarted": "Get started",

    "chat.title": "AI crop assistant",
    "chat.inputPlaceholder": "Ask about crops, pests, or fertilizer...",
    "chat.send": "Send",
    "chat.emptyState": "Ask your first question to get started.",

    "history.title": "Chat history",
    "history.clearAll": "Clear all",
    "history.delete": "Delete",
    "history.empty": "No previous chats yet.",

    "weather.title": "Weather at your farm",
    "weather.detecting": "Detecting your location…",
    "weather.permissionDenied":
      "Location access denied. Please allow location or enter your city manually.",
    "weather.cityPlaceholder": "Enter city name",
    "weather.fetch": "Get weather",
    "weather.temp": "Temperature",
    "weather.humidity": "Humidity",
    "weather.feelsLike": "Feels like",
  },

  hi: {
    "nav.home": "होम",
    "nav.about": "हमारे बारे में",
    "nav.chat": "एआई चैट",
    "nav.history": "इतिहास",

    "home.title": "डीपएग्रो फार्म एआई",
    "home.subtitle": "भारतीय किसानों के लिए स्मार्ट फार्म सहायक।",
    "home.getStarted": "शुरू करें",

    "chat.title": "एआई फसल सहायक",
    "chat.inputPlaceholder": "फसल, कीट या उर्वरक के बारे में पूछें...",
    "chat.send": "भेजें",
    "chat.emptyState": "शुरू करने के लिए अपना पहला सवाल पूछें।",

    "history.title": "चैट इतिहास",
    "history.clearAll": "सब साफ करें",
    "history.delete": "हटाएं",
    "history.empty": "अभी तक कोई पिछली चैट नहीं है।",

    "weather.title": "आपके खेत का मौसम",
    "weather.detecting": "आपका स्थान पता किया जा रहा है…",
    "weather.permissionDenied":
      "लोकेशन एक्सेस अस्वीकार कर दिया गया। कृपया अनुमति दें या शहर का नाम लिखें।",
    "weather.cityPlaceholder": "शहर का नाम लिखें",
    "weather.fetch": "मौसम देखें",
    "weather.temp": "तापमान",
    "weather.humidity": "नमी",
    "weather.feelsLike": "महसूस तापमान",
  },

  // Minimal stubs – you can expand later
  te: {
    "nav.home": "హోమ్",
    "nav.about": "మన గురించి",
    "nav.chat": "ఎఐ చాట్",
    "nav.history": "చరిత్ర",
    "home.title": "డీప్ అగ్రో ఫార్మ్ ఎఐ",
    "home.subtitle": "భారతీయ రైతుల కోసం స్మార్ట్ ఫార్మ్ సహాయకుడు.",
    "home.getStarted": "ప్రారంభించండి",
  },
  ta: {
    "nav.home": "முகப்பு",
    "nav.about": "எங்களை பற்றி",
    "nav.chat": "ஏஐ உரையாடல்",
    "nav.history": "வரலாறு",
    "home.title": "டீப் ஆக்ரோ ஃபார்ம் ஏஐ",
    "home.subtitle": "இந்திய விவசாயிகளுக்கான ஸ்மார்ட் உதவியாளர்.",
    "home.getStarted": "தொடங்கவும்",
  },
  kn: {
    "nav.home": "ಮುಖಪುಟ",
    "nav.about": "ನಮ್ಮ ಬಗ್ಗೆ",
    "nav.chat": "ಎಐ ಚಾಟ್",
    "nav.history": "ಇತಿಹಾಸ",
    "home.title": "ಡೀಪ್ ಅಗ್ರೋ ಫಾರ್ಮ್ ಎಐ",
    "home.subtitle": "ಭಾರತೀಯ ರೈತರಿಗೆ ಸ್ಮಾರ್ಟ್ ಸಹಾಯಕ.",
    "home.getStarted": "ಪ್ರಾರಂಭಿಸಿ",
  },
  ml: {
    "nav.home": "ഹോം",
    "nav.about": "ഞങ്ങളേക്കുറിച്ച്",
    "nav.chat": "എഐ ചാറ്റ്",
    "nav.history": "ഹിസ്റ്ററി",
    "home.title": "ഡീപ് അഗ്രോ ഫാം എഐ",
    "home.subtitle": "ഇന്ത്യൻ കര്‍ഷകര്‍ക്കുള്ള സ്മാര്‍ട്ട് അസിസ്റ്റന്റ്.",
    "home.getStarted": "ആരംഭിക്കുക",
  },
  mr: {
    "nav.home": "मुख्यपृष्ठ",
    "nav.about": "आमच्याबद्दल",
    "nav.chat": "एआय चॅट",
    "nav.history": "इतिहास",
    "home.title": "डीपअ‍ॅग्रो फार्म एआय",
    "home.subtitle": "भारतीय शेतकऱ्यांसाठी स्मार्ट सहाय्यक.",
    "home.getStarted": "सुरू करा",
  },
  bn: {
    "nav.home": "হোম",
    "nav.about": "আমাদের সম্পর্কে",
    "nav.chat": "এআই চ্যাট",
    "nav.history": "ইতিহাস",
    "home.title": "ডিপঅ্যাগ্রো ফার্ম এআই",
    "home.subtitle": "ভারতীয় কৃষকদের জন্য স্মার্ট সহকারী।",
    "home.getStarted": "শুরু করুন",
  },
  gu: {
    "nav.home": "હોમ",
    "nav.about": "અમારા વિશે",
    "nav.chat": "એઆઇ ચેટ",
    "nav.history": "ઇતિહાસ",
    "home.title": "ડીપએગ્રો ફાર્મ એઆઇ",
    "home.subtitle": "ભારતીય ખેડુતો માટે સ્માર્ટ સહાયક.",
    "home.getStarted": "શરૂ કરો",
  },
  pa: {
    "nav.home": "ਹੋਮ",
    "nav.about": "ਸਾਡੇ ਬਾਰੇ",
    "nav.chat": "ਏਆਈ ਚੈਟ",
    "nav.history": "ਇਤਿਹਾਸ",
    "home.title": "ਡੀਪਐਗਰੋ ਫਾਰਮ ਏਆਈ",
    "home.subtitle": "ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਲਈ ਸਮਾਰਟ ਸਹਾਇਕ।",
    "home.getStarted": "ਸ਼ੁਰੂ ਕਰੋ",
  },
  or: {
    "nav.home": "ହୋମ",
    "nav.about": "ଆମ ବିଷୟରେ",
    "nav.chat": "ଏଆଇ ଚାଟ୍",
    "nav.history": "ଇତିହାସ",
    "home.title": "ଡିପଏଗ୍ରୋ ଫାର୍ମ ଏଆଇ",
    "home.subtitle": "ଭାରତୀୟ ଚାଷୀମାନଙ୍କ ପାଇଁ ସ୍ମାର୍ଟ ସହାୟକ।",
    "home.getStarted": "ଆରମ୍ଭ କରନ୍ତୁ",
  },
};

type I18nContextType = {
  language: SupportedLanguageCode;
  setLanguage: (lang: SupportedLanguageCode) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);
const STORAGE_KEY = "deepagro_language";

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<SupportedLanguageCode>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as SupportedLanguageCode | null;
    if (stored && LANGUAGES.some((l) => l.code === stored)) {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (lang: SupportedLanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  const t = (key: string) => {
    const dict = translations[language] || translations.en;
    return dict[key] ?? translations.en[key] ?? key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};
