import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    email: string;
    kycStatus: 'unverified' | 'basic' | 'advanced';
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (userData: Partial<User> & { email: string }) => void;
    signup: (userData: Partial<User> & { email: string }) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: Partial<User> & { email: string }) => {
        setIsAuthenticated(true);
        setUser({
            kycStatus: 'unverified',
            ...userData
        } as User);
    };

    const signup = (userData: Partial<User> & { email: string }) => {
        setIsAuthenticated(true);
        setUser({
            kycStatus: 'unverified',
            ...userData
        } as User);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
