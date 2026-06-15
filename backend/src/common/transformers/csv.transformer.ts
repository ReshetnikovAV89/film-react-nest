import { ValueTransformer } from 'typeorm';

export const csvTransformer: ValueTransformer = {
  to(value?: string[] | string): string {
    if (Array.isArray(value)) {
      return value.join(',');
    }

    return value ?? '';
  },

  from(value?: string | null): string[] {
    if (!value) {
      return [];
    }

    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  },
};
