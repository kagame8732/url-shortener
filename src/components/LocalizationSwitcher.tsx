import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import EngLog from '../assets/flags/eng.svg';
import GerLog from '../assets/flags/ger.svg';
import { setLanguage } from '../store/reducers/languageSlice';
import i18n from '../i18n';

const LocalizationSwitcher = () => {
    const languages = [
        { name: 'En', code: 'en', flag: EngLog },
        { name: 'Ger', code: 'ger', flag: GerLog },
    ];

    const defaultFlag = {
        name: 'En',
        code: 'en',
        flag: EngLog,
    };

    const dispatch = useDispatch();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(defaultFlag);

    useEffect(() => {
        const savedLanguage = localStorage.getItem('currentLng');
        if (savedLanguage) {
            try {
                const parsedLanguage = JSON.parse(savedLanguage);
                setCurrentLanguage(parsedLanguage);
                dispatch(setLanguage(parsedLanguage));
                i18n.changeLanguage(parsedLanguage.code);
            } catch (error) {
                console.error('Error parsing language from localStorage:', error);
            }
        }
    }, [dispatch]);

    const handleLanguageSelect = (ln: { name: string; code: string; flag: string }) => {
        setIsDropdownOpen(false);
        setCurrentLanguage(ln);
        dispatch(setLanguage(ln));
        i18n.changeLanguage(ln.code);
        localStorage.setItem('currentLng', JSON.stringify(ln));
    };

    return (
        <div className="relative flex flex-col justify-center items-center">
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-[50px] h-[50px] border border-gray-200 rounded-[50%] flex flex-row justify-center items-center gap-2"
            >
                <img src={currentLanguage.flag} alt="flag" className="w-[20px]" />
            </button>
            {isDropdownOpen && (
                <ul className="absolute bg-[#ececec] top-[52px] flex flex-col w-[90px] px-3 bg-green-gradient1 sidebar z-[1]">
                    {languages.map((ln) => (
                        <button
                            onClick={() => handleLanguageSelect(ln)}
                            key={ln.code}
                            className="flex flex-row justify-start items-center gap-2"
                        >
                            <img src={ln.flag} alt="" className="w-[20px]" />
                            <span>{ln.name}</span>
                        </button>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LocalizationSwitcher;