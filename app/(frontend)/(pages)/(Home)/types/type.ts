export interface LatestMenuItem {
  id: string;
  title: string;
  description: string | null;
  price: number;
  category: {
    id: string;
    name: string;
  };
  image: {
    url: string;
    publicId: string;
  } | null;
  averageRating: number;
  totalReviews: number;
}

export interface FeaturedPackage {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  publicId: string | null;
  finalPrice: number;
}

export interface FeaturedHamperCategory {
  id: string;
  name: string;
  image: string | null;
  publicId: string | null;
}

export interface FeaturedEventCategory {
  id: string;
  name: string;
  image: string | null;
  publicId: string | null;
}