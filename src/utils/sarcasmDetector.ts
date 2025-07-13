import { UploadedReview, ProcessedReview } from './csvParser';

export class SarcasmDetectorSimulator {
  private sarcasmIndicators = [
    // Punctuation patterns
    /\.{3,}/g,  // Multiple dots
    /!{2,}/g,   // Multiple exclamation marks
    /\?{2,}/g,  // Multiple question marks

    // Sarcastic phrases
    /\b(oh wow|oh great|how wonderful|fantastic|brilliant|amazing|perfect)\b/gi,
    /\b(sure thing|of course|obviously|clearly|totally|absolutely)\b/gi,
    /\b(what a surprise|shocking|who would have thought)\b/gi,

    // Contradictory patterns
    /\b(not bad|not terrible|not awful)\b/gi,
    /\b(could be worse|at least)\b/gi,

    // Extreme comparisons
    /\b(worst|terrible|awful|horrible|disgusting).*(ever|in history|of all time)\b/gi,
    /\b(best|greatest|most amazing).*(not|never|hardly)\b/gi
  ];

  private positiveWords = [
    'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'brilliant',
    'outstanding', 'superb', 'magnificent', 'marvelous', 'terrific', 'awesome',
    'incredible', 'phenomenal', 'spectacular', 'remarkable', 'exceptional'
  ];

  private negativeWords = [
    'bad', 'terrible', 'awful', 'horrible', 'disgusting', 'pathetic', 'dreadful',
    'atrocious', 'abysmal', 'appalling', 'deplorable', 'horrendous', 'ghastly',
    'revolting', 'repulsive', 'vile', 'wretched', 'miserable'
  ];

  detectSarcasmPatterns(text: string): number {
    let sarcasmScore = 0;
    const textLower = text.toLowerCase();

    for (const pattern of this.sarcasmIndicators) {
      const matches = textLower.match(pattern);
      if (matches) {
        sarcasmScore += matches.length;
      }
    }

    return Math.min(sarcasmScore / 3, 1.0);
  }

  detectSentimentContradiction(text: string): number {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    if (sentences.length < 2) return 0;

    const sentiments = sentences.map(sentence => {
      const words = sentence.toLowerCase().split(/\s+/);
      let sentiment = 0;
      
      words.forEach(word => {
        if (this.positiveWords.includes(word)) sentiment += 1;
        if (this.negativeWords.includes(word)) sentiment -= 1;
      });
      
      return sentiment;
    });

    // Calculate variance in sentiment scores
    const mean = sentiments.reduce((a, b) => a + b, 0) / sentiments.length;
    const variance = sentiments.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / sentiments.length;
    
    return Math.min(variance / 4, 1.0);
  }

  calculateBaseSentiment(text: string): number {
    const words = text.toLowerCase().split(/\s+/);
    let sentiment = 0;
    let wordCount = 0;

    words.forEach(word => {
      if (this.positiveWords.includes(word)) {
        sentiment += 1;
        wordCount++;
      }
      if (this.negativeWords.includes(word)) {
        sentiment -= 1;
        wordCount++;
      }
    });

    if (wordCount === 0) return 0;
    return sentiment / wordCount;
  }

  predictSarcasm(text: string): { isSarcastic: boolean; confidence: number } {
    const patternScore = this.detectSarcasmPatterns(text);
    const contradictionScore = this.detectSentimentContradiction(text);
    
    // Simulate BERT-like scoring
    const textLength = text.length;
    const exclamationCount = (text.match(/!/g) || []).length;
    const questionCount = (text.match(/\?/g) || []).length;
    const capsRatio = (text.match(/[A-Z]/g) || []).length / textLength;
    
    const bertScore = Math.min(
      (exclamationCount * 0.1 + questionCount * 0.1 + capsRatio * 0.5) * 
      (textLength > 100 ? 1.2 : 0.8), 
      1.0
    );

    // Weighted combination
    const finalScore = (0.4 * patternScore + 0.3 * contradictionScore + 0.3 * bertScore);
    const isSarcastic = finalScore > 0.3;
    
    return {
      isSarcastic,
      confidence: Math.min(finalScore + Math.random() * 0.2, 1.0)
    };
  }

  analyzeSentiment(text: string, isSarcastic: boolean): { 
    sentimentScore: number; 
    adjustedSentiment: number; 
    confidence: number 
  } {
    const baseSentiment = this.calculateBaseSentiment(text);
    
    // Add some randomness to simulate model uncertainty
    const noise = (Math.random() - 0.5) * 0.2;
    const sentimentScore = Math.max(-1, Math.min(1, baseSentiment + noise));
    
    // Adjust for sarcasm
    const adjustedSentiment = isSarcastic ? -sentimentScore : sentimentScore;
    
    // Calculate confidence based on text features
    const confidence = Math.min(
      0.5 + (text.length / 500) * 0.3 + Math.abs(sentimentScore) * 0.2,
      1.0
    );

    return {
      sentimentScore,
      adjustedSentiment,
      confidence
    };
  }

  processReviews(reviews: UploadedReview[]): ProcessedReview[] {
    return reviews.map((review, index) => {
      const sarcasmResult = this.predictSarcasm(review.review);
      const sentimentResult = this.analyzeSentiment(review.review, sarcasmResult.isSarcastic);

      return {
        ...review,
        id: index + 1,
        isSarcastic: sarcasmResult.isSarcastic,
        sentimentScore: sentimentResult.sentimentScore,
        confidence: Math.max(sarcasmResult.confidence, sentimentResult.confidence),
        adjustedSentiment: sentimentResult.adjustedSentiment
      };
    });
  }
}