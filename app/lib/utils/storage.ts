export class StorageService {
    static setItem<T>(key: string, value: T): void {
        if (typeof window === 'undefined') return;
        
        const valueToStore = typeof value === 'string' 
            ? value 
            : JSON.stringify(value);
        
        localStorage.setItem(key, valueToStore);
    }

    static getItem<T>(key: string, defaultValue: T | null = null): T | null {
        if (typeof window === 'undefined') return defaultValue;
        
        const item = localStorage.getItem(key);
        if (!item) return defaultValue;

        try {
            return JSON.parse(item) as T;
        } catch {
            return item as T;
        }
    }

    static removeItem(key: string): void {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(key);
    }

    static clear(): void {
        if (typeof window === 'undefined') return;
        localStorage.clear();
    }
}

// Keys para seu sistema
export const STORAGE_KEYS = {
    AUTH: 'auth',
    USER: 'user',
    TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    DOADOR: 'doador',
    BENEFICIARIO: 'beneficiario',
    DOACOES: 'doacoes',
    RESERVAS: 'reservas',
} as const; 