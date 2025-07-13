export interface UploadedReview {
  review: string;
  genre?: string;
  year?: number;
  sentiment?: number;
}

export interface ProcessedReview extends UploadedReview {
  id: number;
  isSarcastic: boolean;
  sentimentScore: number;
  confidence: number;
  adjustedSentiment: number;
}

export const parseCSV = (csvText: string): UploadedReview[] => {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) {
    throw new Error('CSV must have at least a header row and one data row');
  }

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/"/g, ''));
  const reviews: UploadedReview[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length < headers.length) continue;

    const review: UploadedReview = {
      review: '',
      genre: 'unknown',
      year: new Date().getFullYear(),
      sentiment: 0
    };

    headers.forEach((header, index) => {
      const value = values[index]?.trim().replace(/"/g, '') || '';
      
      if (header.includes('review') || header.includes('text') || header.includes('comment')) {
        review.review = value;
      } else if (header.includes('genre') || header.includes('category')) {
        review.genre = value.toLowerCase() || 'unknown';
      } else if (header.includes('year') || header.includes('date')) {
        const yearMatch = value.match(/\d{4}/);
        review.year = yearMatch ? parseInt(yearMatch[0]) : new Date().getFullYear();
      } else if (header.includes('sentiment') || header.includes('rating') || header.includes('score')) {
        review.sentiment = parseFloat(value) || 0;
      }
    });

    if (review.review && review.review.length > 10) {
      reviews.push(review);
    }
  }

  return reviews;
};

const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
};