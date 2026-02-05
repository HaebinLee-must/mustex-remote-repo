import React from 'react';
import { Button as ShadcnButton, ButtonProps as ShadcnButtonProps } from '@/components_2/ui/button';

interface ButtonProps extends ShadcnButtonProps {
    variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
    // Mapping old variant names for compatibility
    customVariant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    isLoading?: boolean;
    fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
    children,
    variant,
    customVariant,
    isLoading,
    fullWidth,
    className = '',
    ...props
}, ref) => {
    // Map customVariant to Shadcn variants
    const getVariant = () => {
        if (variant) return variant;
        // Map the old prop names to the new variant names
        const variantMap: Record<string, any> = {
            'primary': 'default',
            'danger': 'destructive',
            'secondary': 'secondary',
            'outline': 'outline',
            'ghost': 'ghost'
        };

        // Check if the variant prop itself is using the old naming convention
        const v = (props as any).variant;
        if (v && variantMap[v]) {
            return variantMap[v];
        }

        if (customVariant && variantMap[customVariant]) {
            return variantMap[customVariant];
        }

        return 'default';
    };

    return (
        <ShadcnButton
            ref={ref}
            variant={getVariant()}
            isLoading={isLoading}
            className={`${fullWidth ? 'w-full' : ''} ${className}`}
            {...props}
        >
            {children}
        </ShadcnButton>
    );
});

Button.displayName = 'Button';

export default Button;
