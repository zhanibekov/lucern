export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryName: string;
  culture: string;
  format: string;
  price: number;
  priceUnit: string;
  priceLabel?: string;
  weight: string;
  moisture: string;
  protein: string;
  harvest: string;
  origin: string;
  inStock: boolean;
  stockAmount: string;
  description: string;
  fullDescription?: string;
  image: string;
  gallery?: string[];
  suitableFor: string[];
  varietyName?: string;
  purpose?: string;
  varietyFeatures?: string;
  growingConditions?: string;
  recommendedRegions?: string;
  sowingMethod?: string;
  seedingRate?: string;
  storageTerm?: string;
  cleaningInfo?: string;
  documentsInfo?: string;
  wholesaleTerms?: string;
  deliveryOptions?: string[];
  documents?: string[];
  specs?: Array<{
    label: string;
    value: string;
  }>;
  isPopular?: boolean;
}

export interface CatalogCategory {
  id: string;
  label: string;
  description: string;
  examples: string[];
}

export interface OrderFormData {
  name: string;
  phone: string;
  city: string;
  volume: string;
  volumeUnit: 'кг' | 'мешков' | 'биг-бэгов' | 'тонн' | 'соток' | 'га';
  productType: string;
  comment: string;
  consent: boolean;
}

export interface StoredOrder extends OrderFormData {
  id: string;
  createdAt: string;
  status: 'новый' | 'в обработке' | 'выполнен';
  estimatedCost?: number;
}
