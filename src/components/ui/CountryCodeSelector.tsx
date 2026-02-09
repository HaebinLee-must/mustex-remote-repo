import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/design-system/cn';
import { Check, ChevronDown, Search } from 'lucide-react';
import { COUNTRIES, Country } from '@/constants/countries';

interface CountryCodeSelectorProps {
    selectedCode: string;
    onSelectCode: (code: string) => void;
}

const CountryCodeSelector: React.FC<CountryCodeSelectorProps> = ({ selectedCode, onSelectCode }) => {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [filteredCountries, setFilteredCountries] = useState<Country[]>(COUNTRIES);

    useEffect(() => {
        setFilteredCountries(
            COUNTRIES.filter((country: Country) =>
                country.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                country.code.includes(searchValue)
            )
        );
    }, [searchValue]);

    const currentCountry = COUNTRIES.find((country: Country) => country.code === selectedCode);

    const handleSelectCountry = (code: string) => {
        onSelectCode(code);
        setOpen(false);
        setSearchValue('');
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[120px] justify-between h-14 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all rounded-xl font-bold"
                >
                    {currentCountry ? (
                        <div className="flex items-center">
                            <span className="mr-2 text-lg">{currentCountry.flag}</span>
                            <span className="font-bold">{currentCountry.code}</span>
                        </div>
                    ) : (
                        <span className="text-gray-500">+??</span>
                    )}
                    <ChevronDown className={cn("ml-2 h-4 w-4 shrink-0 transition-transform opacity-50", open && "rotate-180")} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[320px] p-0 border-white/10 bg-black text-white shadow-2xl backdrop-blur-xl rounded-2xl overflow-hidden">
                <div className="flex items-center border-b border-white/10 px-3">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <input
                        type="text"
                        placeholder="Search country..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="flex h-14 w-full bg-transparent py-3 text-sm outline-none placeholder:text-gray-500"
                    />
                </div>
                <div className="max-h-[300px] overflow-y-auto p-1">
                    {filteredCountries.length === 0 ? (
                        <div className="py-6 text-center text-sm text-gray-500 font-medium">No country found.</div>
                    ) : (
                        filteredCountries.map((country: Country) => (
                            <button
                                key={country.code}
                                type="button"
                                onClick={() => handleSelectCountry(country.code)}
                                className="flex items-center w-full p-3 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
                            >
                                <div className="flex-1 flex items-center">
                                    <span className="mr-3 text-xl">{country.flag}</span>
                                    <span className="font-semibold text-sm">{country.name}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-gray-500">{country.code}</span>
                                    <Check
                                        className={cn(
                                            "h-4 w-4 text-primary transition-all",
                                            selectedCode === country.code ? "opacity-100 scale-100" : "opacity-0 scale-50"
                                        )}
                                    />
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default CountryCodeSelector;
