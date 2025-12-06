export interface ProcessedImage {
  id: string;
  originalUrl: string;
  processedUrl: string | null;
  prompt: string;
  status: 'idle' | 'processing' | 'completed' | 'failed';
  timestamp: number;
}

export interface NavItem {
  label: string;
  href: string;
}

export enum ProcessingMode {
  EDIT = 'EDIT',
  ANALYZE = 'ANALYZE',
  REMOVE_BG = 'REMOVE_BG'
}
