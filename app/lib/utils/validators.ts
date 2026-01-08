interface ValidationErrors {
    [key: string]: string;
}

interface ValidationResult {
    isValid: boolean;
    errors: ValidationErrors;
}

export class Validators {
    static isEmail(email: string): boolean {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static isPhone(phone: string): boolean {
        const re = /^\(\d{2}\) \d{5}-\d{4}$/;
        return re.test(phone);
    }

    static isPasswordStrong(password: string): boolean {
        return password.length >= 6;
    }

    static formatPhone(phone: string): string {
        // Remove tudo que não é número
        const numbers = phone.replace(/\D/g, '');
        
        // Formata: (99) 99999-9999
        if (numbers.length === 11) {
            return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
        
        return phone;
    }

    static validateFormData(data: Record<string, unknown>): ValidationResult {
        const errors: ValidationErrors = {};

        // Validar campos obrigatórios
        Object.entries(data).forEach(([key, value]) => {
            if (typeof value === 'string' && !value.trim()) {
                errors[key] = `${this.capitalizeFirstLetter(key)} é obrigatório`;
            }
        });

        // Validações específicas
        if (typeof data.email === 'string' && !this.isEmail(data.email)) {
            errors.email = 'Email inválido';
        }

        if (typeof data.senha === 'string' && !this.isPasswordStrong(data.senha)) {
            errors.senha = 'Senha deve ter no mínimo 6 caracteres';
        }

        if (typeof data.telefone === 'string' && !this.isPhone(data.telefone)) {
            errors.telefone = 'Telefone inválido. Use o formato: (11) 12345-6789';
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }

    private static capitalizeFirstLetter(string: string): string {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}