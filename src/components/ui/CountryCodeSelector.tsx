import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { cn } from '@/design-system/cn';
import { Check, ChevronDown } from 'lucide-react';
import { COUNTRIES, Country } from '@/constants/countries'; // Import Country interface

interface CountryCodeSelectorProps {
    selectedCode: string;
    onSelectCode: (code: string) => void;
}

const CountryCodeSelector: React.FC<CountryCodeSelectorProps> = ({ selectedCode, onSelectCode }) => {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [filteredCountries, setFilteredCountries] = useState<Country[]>(COUNTRIES); // Explicitly type

    useEffect(() => {
        setFilteredCountries(
            COUNTRIES.filter((country: Country) => // Explicitly type
                country.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                country.code.includes(searchValue)
            )
        );
    }, [searchValue]);

    const currentCountry = COUNTRIES.find((country: Country) => country.code === selectedCode); // Explicitly type

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
                <Command className="bg-transparent">
                    <CommandInput
                        placeholder="Search country..."
                        className="h-14 bg-white/5 border-b border-white/10 text-white placeholder:text-gray-500 focus:ring-0"
                        value={searchValue}
                        onValueChange={setSearchValue}
                    />
                    <CommandEmpty className="py-6 text-center text-sm text-gray-500 font-medium">No country found.</CommandEmpty>
                    <CommandGroup>
                        {filteredCountries.map((country: Country) => (
                            <CommandItem
                                key={country.code}
                                onSelect={() => {
                                    onSelectCode(country.code);
                                    setOpen(false);
                                    setSearchValue('');
                                }}
                                className="flex items-center p-3 cursor-pointer hover:bg-white/10 aria-selected:bg-white/10 transition-colors"
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
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default CountryCodeSelector;
