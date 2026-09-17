import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  pulse?: boolean;
  className?: string;
}

export default function Badge({
  children,
  variant = 'primary',
  pulse = false,
  className = '',
}: BadgeProps) {
  const variantClass = variant === 'primary' ? styles.badgePrimary : styles.badgeSecondary;
  const pulseClass = pulse ? styles.badgePulse : '';

  return (
    <span
      className={`${styles.badge} ${variantClass} ${pulseClass} ${className}`}
    >
      {children}
    </span>
  );
}
