export interface Contact {
  id: string;
  name: string;
  number: string;
  isFavorite: boolean;
}

export interface Notification {
  message: string;
  type: 'success' | 'error';
}

export type FilterType = 'all' | 'favorites';