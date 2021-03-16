import React from 'react';

export interface OptionCardProps {
  title: string;
  children?: React.ReactNode | React.ReactNode[];
  subtitle?: string;
  description?: string;
  tags?: string[];
  clickCard?(): void;
  deleteCard?(): void;
  editCard?(): void;
  isSelected?: boolean;
  multiple?: boolean;
}
