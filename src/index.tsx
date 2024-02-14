import ReactDOM from 'react-dom/client';
import "styles/main.scss";
import App from './App';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import common_ar from "translations/ar/common.json";
import common_en from "translations/en/common.json";
import { getLanguagePreference } from 'helpers/global';
import { ApolloProvider } from '@apollo/client';
import client from "api/api";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'store/store';
const selectedLanguage = getLanguagePreference();
i18next.init({
  interpolation: { escapeValue: false },
  lng: selectedLanguage,
  resources: {
    en: {
      common: common_en
    },
    ar: {
      common: common_ar
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <I18nextProvider i18n={i18next}>
    {/* component makes the Redux store available to any nested components that need to access the Redux store */}
    <Provider store={store}>
      {/* persist our data on refresh */}
      <PersistGate persistor={persistor}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  </I18nextProvider>
);