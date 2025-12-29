export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  gallery?: string[];
  year?: string;
  description?: string;
  headline?: string;
  fullDescription?: string;
  technologies?: string[];
  liveUrl?: string;
  duration?: number;
}

export interface AIResponse {
  brief: string;
  technologies: string[];
  vibe: string;
}