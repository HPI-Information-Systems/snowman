import React from 'react';

export interface Option {
  title: string;
  subtitle?: string;
  description?: string;
  content?: string | React.ReactNode;
  tags?: string[];
  id: number;
}
