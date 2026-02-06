export interface Country {
    name: string;
    code: string;
    flag: string;
    phone_length: number[]; // e.g., [10, 11] for 10 or 11 digits
}

export const COUNTRIES: Country[] = [
    { name: 'South Korea', code: '+82', flag: '🇰🇷', phone_length: [10, 11] },
    { name: 'Mongolia', code: '+976', flag: '🇲🇳', phone_length: [8] },
    { name: 'United States', code: '+1', flag: '🇺🇸', phone_length: [10] },
    { name: 'Japan', code: '+81', flag: '🇯🇵', phone_length: [10] },
    { name: 'China', code: '+86', flag: '🇨🇳', phone_length: [11] },
    { name: 'Canada', code: '+1', flag: '🇨🇦', phone_length: [10] },
    { name: 'United Kingdom', code: '+44', flag: '🇬🇧', phone_length: [10] },
    { name: 'Germany', code: '+49', flag: '🇩🇪', phone_length: [10, 11] },
    { name: 'Australia', code: '+61', flag: '🇦🇺', phone_length: [9] },
    { name: 'India', code: '+91', flag: '🇮🇳', phone_length: [10] },
    { name: 'France', code: '+33', flag: '🇫🇷', phone_length: [9] },
    { name: 'Vietnam', code: '+84', flag: '🇻🇳', phone_length: [9, 10] },
];

export const DEFAULT_COUNTRY_CODE = '+82';