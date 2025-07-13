// Sarcascope Analysis Data - Based on the Python analysis results

export interface TimelineData {
  year: number;
  avgSentiment: number;
  avgConfidence: number;
  sarcasmRate: number;
  reviewCount: number;
}

export interface GenreData {
  genre: string;
  avgSentiment: number;
  sentimentStd: number;
  reviewCount: number;
  avgConfidence: number;
  sarcasmRate: number;
  sentimentRange: number;
}

export interface SarcasticReview {
  id: number;
  review: string;
  genre: string;
  year: number;
  sentimentScore: number;
  confidence: number;
}

export const overallMetrics = {
  totalReviews: 5000,
  sarcasticReviews: 2703,
  sarcasmRate: 54.1,
  avgSentiment: 0.021,
  avgConfidence: 0.321,
  traditionalError: 0.634,
  sarcasmAwareError: 1.019,
  improvement: -60.6
};

export const genreData: GenreData[] = [
  {
    genre: 'action',
    avgSentiment: 0.048,
    sentimentStd: 0.515,
    reviewCount: 777,
    avgConfidence: 0.379,
    sarcasmRate: 0.582,
    sentimentRange: 1.029
  },
  {
    genre: 'comedy',
    avgSentiment: 0.028,
    sentimentStd: 0.426,
    reviewCount: 1218,
    avgConfidence: 0.286,
    sarcasmRate: 0.552,
    sentimentRange: 0.853
  },
  {
    genre: 'drama',
    avgSentiment: 0.026,
    sentimentStd: 0.413,
    reviewCount: 434,
    avgConfidence: 0.278,
    sarcasmRate: 0.583,
    sentimentRange: 0.825
  },
  {
    genre: 'fantasy',
    avgSentiment: 0.007,
    sentimentStd: 0.530,
    reviewCount: 45,
    avgConfidence: 0.392,
    sarcasmRate: 0.511,
    sentimentRange: 1.060
  },
  {
    genre: 'horror',
    avgSentiment: 0.114,
    sentimentStd: 0.596,
    reviewCount: 272,
    avgConfidence: 0.490,
    sarcasmRate: 0.658,
    sentimentRange: 1.192
  },
  {
    genre: 'romance',
    avgSentiment: 0.023,
    sentimentStd: 0.357,
    reviewCount: 817,
    avgConfidence: 0.223,
    sarcasmRate: 0.537,
    sentimentRange: 0.713
  },
  {
    genre: 'sci-fi',
    avgSentiment: -0.044,
    sentimentStd: 0.425,
    reviewCount: 123,
    avgConfidence: 0.288,
    sarcasmRate: 0.610,
    sentimentRange: 0.850
  },
  {
    genre: 'thriller',
    avgSentiment: 0.035,
    sentimentStd: 0.525,
    reviewCount: 461,
    avgConfidence: 0.397,
    sarcasmRate: 0.527,
    sentimentRange: 1.051
  },
  {
    genre: 'unknown',
    avgSentiment: -0.045,
    sentimentStd: 0.473,
    reviewCount: 853,
    avgConfidence: 0.337,
    sarcasmRate: 0.430,
    sentimentRange: 0.945
  }
];

export const timelineData: TimelineData[] = [
  { year: 1979, avgSentiment: 0.019, avgConfidence: 0.326, sarcasmRate: 0.526, reviewCount: 4234 },
  { year: 1980, avgSentiment: -0.008, avgConfidence: 0.359, sarcasmRate: 0.600, reviewCount: 25 },
  { year: 1981, avgSentiment: -0.027, avgConfidence: 0.352, sarcasmRate: 0.455, reviewCount: 11 },
  { year: 1982, avgSentiment: 0.007, avgConfidence: 0.282, sarcasmRate: 0.833, reviewCount: 12 },
  { year: 1983, avgSentiment: 0.025, avgConfidence: 0.204, sarcasmRate: 0.636, reviewCount: 11 },
  { year: 1984, avgSentiment: -0.148, avgConfidence: 0.275, sarcasmRate: 0.615, reviewCount: 13 },
  { year: 1985, avgSentiment: 0.263, avgConfidence: 0.543, sarcasmRate: 0.750, reviewCount: 8 },
  { year: 1986, avgSentiment: 0.117, avgConfidence: 0.244, sarcasmRate: 0.909, reviewCount: 11 },
  { year: 1987, avgSentiment: -0.038, avgConfidence: 0.131, sarcasmRate: 0.375, reviewCount: 8 },
  { year: 1988, avgSentiment: 0.334, avgConfidence: 0.363, sarcasmRate: 0.375, reviewCount: 8 },
  { year: 1989, avgSentiment: 0.216, avgConfidence: 0.290, sarcasmRate: 0.583, reviewCount: 12 },
  { year: 1990, avgSentiment: 0.045, avgConfidence: 0.320, sarcasmRate: 0.750, reviewCount: 12 },
  { year: 1991, avgSentiment: 0.331, avgConfidence: 0.331, sarcasmRate: 0.667, reviewCount: 3 },
  { year: 1992, avgSentiment: 0.022, avgConfidence: 0.527, sarcasmRate: 0.333, reviewCount: 6 },
  { year: 1993, avgSentiment: 0.160, avgConfidence: 0.546, sarcasmRate: 0.500, reviewCount: 8 },
  { year: 1994, avgSentiment: 0.105, avgConfidence: 0.173, sarcasmRate: 0.444, reviewCount: 9 },
  { year: 1995, avgSentiment: -0.115, avgConfidence: 0.235, sarcasmRate: 0.625, reviewCount: 16 },
  { year: 1996, avgSentiment: -0.055, avgConfidence: 0.092, sarcasmRate: 0.500, reviewCount: 6 },
  { year: 1997, avgSentiment: -0.002, avgConfidence: 0.320, sarcasmRate: 0.545, reviewCount: 11 },
  { year: 1998, avgSentiment: 0.071, avgConfidence: 0.182, sarcasmRate: 0.750, reviewCount: 8 },
  { year: 1999, avgSentiment: -0.019, avgConfidence: 0.310, sarcasmRate: 0.522, reviewCount: 23 },
  { year: 2000, avgSentiment: 0.045, avgConfidence: 0.364, sarcasmRate: 0.524, reviewCount: 21 },
  { year: 2001, avgSentiment: 0.048, avgConfidence: 0.220, sarcasmRate: 0.714, reviewCount: 28 },
  { year: 2002, avgSentiment: 0.072, avgConfidence: 0.249, sarcasmRate: 0.600, reviewCount: 20 },
  { year: 2003, avgSentiment: -0.085, avgConfidence: 0.319, sarcasmRate: 0.500, reviewCount: 18 },
  { year: 2004, avgSentiment: -0.052, avgConfidence: 0.176, sarcasmRate: 0.500, reviewCount: 14 },
  { year: 2005, avgSentiment: 0.093, avgConfidence: 0.287, sarcasmRate: 0.750, reviewCount: 24 },
  { year: 2006, avgSentiment: 0.214, avgConfidence: 0.404, sarcasmRate: 0.615, reviewCount: 13 },
  { year: 2007, avgSentiment: -0.014, avgConfidence: 0.272, sarcasmRate: 0.471, reviewCount: 17 },
  { year: 2008, avgSentiment: 0.008, avgConfidence: 0.292, sarcasmRate: 0.667, reviewCount: 12 },
  { year: 2009, avgSentiment: 0.427, avgConfidence: 0.459, sarcasmRate: 0.750, reviewCount: 4 },
  { year: 2010, avgSentiment: -0.386, avgConfidence: 0.396, sarcasmRate: 0.000, reviewCount: 2 },
  { year: 2011, avgSentiment: 0.036, avgConfidence: 0.036, sarcasmRate: 0.000, reviewCount: 1 },
  { year: 2020, avgSentiment: -0.126, avgConfidence: 0.126, sarcasmRate: 1.000, reviewCount: 1 },
  { year: 2024, avgSentiment: 0.939, avgConfidence: 0.939, sarcasmRate: 1.000, reviewCount: 1 }
];

export const topSarcasticReviews: SarcasticReview[] = [
  {
    id: 1,
    review: "Oh wow, what a brilliant masterpiece! Absolutely fantastic acting and a plot that makes perfect sense. Totally worth my time...",
    genre: "action",
    year: 2001,
    sentimentScore: -0.85,
    confidence: 0.92
  },
  {
    id: 2,
    review: "Sure, because we really needed another sequel. The writers clearly put so much effort into this original storyline.",
    genre: "comedy",
    year: 2005,
    sentimentScore: -0.78,
    confidence: 0.89
  },
  {
    id: 3,
    review: "What a surprise! Another predictable ending. Who would have thought the hero would save the day?",
    genre: "thriller",
    year: 1999,
    sentimentScore: -0.72,
    confidence: 0.87
  },
  {
    id: 4,
    review: "Clearly the best movie ever made. The dialogue was so natural and the special effects were groundbreaking... for 1980.",
    genre: "sci-fi",
    year: 2003,
    sentimentScore: -0.69,
    confidence: 0.85
  },
  {
    id: 5,
    review: "Oh great, another romantic comedy where the couple gets together in the end. How original!",
    genre: "romance",
    year: 2002,
    sentimentScore: -0.67,
    confidence: 0.83
  },
  {
    id: 6,
    review: "Absolutely terrifying! I was so scared I fell asleep halfway through. The suspense was overwhelming.",
    genre: "horror",
    year: 2000,
    sentimentScore: -0.65,
    confidence: 0.81
  },
  {
    id: 7,
    review: "What a deep and meaningful drama. The character development was so profound I couldn't tell the characters apart.",
    genre: "drama",
    year: 1998,
    sentimentScore: -0.63,
    confidence: 0.79
  },
  {
    id: 8,
    review: "Fantastic! Another movie where the good guys win. The plot twists were so unexpected... not.",
    genre: "fantasy",
    year: 2004,
    sentimentScore: -0.61,
    confidence: 0.77
  },
  {
    id: 9,
    review: "Sure thing, this movie definitely deserved all those awards. The acting was so convincing I believed they were real people.",
    genre: "drama",
    year: 1997,
    sentimentScore: -0.59,
    confidence: 0.75
  },
  {
    id: 10,
    review: "Oh absolutely, we needed more explosions and less plot. Because that's what makes a great action movie, right?",
    genre: "action",
    year: 2006,
    sentimentScore: -0.57,
    confidence: 0.73
  }
];