import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../../constants/translations';
import { useLanguage } from './hooks/useLanguage';

interface UIContextType {
    currentView: string;
    setCurrentView: (view: string) => void;
    lang: Language;
    setLang: (lang: Language) => void;
    t: (key: string) => string;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentView, setCurrentView] = useState('landing');
    const { lang, setLang, t } = useLanguage('en');

    return (
        <UIContext.Provider value={{ currentView, setCurrentView, lang, setLang, t }}>
            {children}
        </UIContext.Provider>
    );
};

export const useUI = () => {
    const context = useContext(UIContext);
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
};
