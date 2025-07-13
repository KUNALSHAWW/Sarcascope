import React, { useState, useRef } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, Download } from 'lucide-react';

interface CSVUploadProps {
  onFileProcessed: (results: any) => void;
}

export const CSVUpload: React.FC<CSVUploadProps> = ({ onFileProcessed }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find(file => file.name.endsWith('.csv'));
    
    if (csvFile) {
      processFile(csvFile);
    } else {
      setUploadStatus('error');
      setErrorMessage('Please upload a CSV file');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = async (file: File) => {
    setIsProcessing(true);
    setUploadStatus('idle');
    setErrorMessage('');

    try {
      const text = await file.text();
      
      // Import the utilities dynamically to avoid issues
      const { parseCSV } = await import('../utils/csvParser');
      const { SarcasmDetectorSimulator } = await import('../utils/sarcasmDetector');
      
      const reviews = parseCSV(text);
      
      if (reviews.length === 0) {
        throw new Error('No valid reviews found in the CSV file');
      }

      const detector = new SarcasmDetectorSimulator();
      const processedReviews = detector.processReviews(reviews);
      
      // Generate analysis results
      const results = {
        processedReviews,
        totalReviews: processedReviews.length,
        sarcasticReviews: processedReviews.filter(r => r.isSarcastic).length,
        avgSentiment: processedReviews.reduce((sum, r) => sum + r.adjustedSentiment, 0) / processedReviews.length,
        avgConfidence: processedReviews.reduce((sum, r) => sum + r.confidence, 0) / processedReviews.length,
        genreBreakdown: generateGenreBreakdown(processedReviews),
        timelineData: generateTimelineData(processedReviews),
        topSarcastic: processedReviews
          .filter(r => r.isSarcastic)
          .sort((a, b) => b.confidence - a.confidence)
          .slice(0, 10)
      };

      onFileProcessed(results);
      setUploadStatus('success');
    } catch (error) {
      setUploadStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to process file');
    } finally {
      setIsProcessing(false);
    }
  };

  const generateGenreBreakdown = (reviews: any[]) => {
    const genreMap = new Map();
    
    reviews.forEach(review => {
      const genre = review.genre || 'unknown';
      if (!genreMap.has(genre)) {
        genreMap.set(genre, {
          genre,
          reviews: [],
          totalSentiment: 0,
          totalSarcastic: 0,
          totalConfidence: 0
        });
      }
      
      const genreData = genreMap.get(genre);
      genreData.reviews.push(review);
      genreData.totalSentiment += review.adjustedSentiment;
      genreData.totalSarcastic += review.isSarcastic ? 1 : 0;
      genreData.totalConfidence += review.confidence;
    });

    return Array.from(genreMap.values()).map(data => ({
      genre: data.genre,
      avgSentiment: data.totalSentiment / data.reviews.length,
      sarcasmRate: data.totalSarcastic / data.reviews.length,
      reviewCount: data.reviews.length,
      avgConfidence: data.totalConfidence / data.reviews.length,
      sentimentStd: calculateStandardDeviation(data.reviews.map((r: any) => r.adjustedSentiment)),
      sentimentRange: 0 // Simplified for this demo
    }));
  };

  const generateTimelineData = (reviews: any[]) => {
    const yearMap = new Map();
    
    reviews.forEach(review => {
      const year = review.year || new Date().getFullYear();
      if (!yearMap.has(year)) {
        yearMap.set(year, {
          year,
          reviews: [],
          totalSentiment: 0,
          totalSarcastic: 0,
          totalConfidence: 0
        });
      }
      
      const yearData = yearMap.get(year);
      yearData.reviews.push(review);
      yearData.totalSentiment += review.adjustedSentiment;
      yearData.totalSarcastic += review.isSarcastic ? 1 : 0;
      yearData.totalConfidence += review.confidence;
    });

    return Array.from(yearMap.values())
      .map(data => ({
        year: data.year,
        avgSentiment: data.totalSentiment / data.reviews.length,
        sarcasmRate: data.totalSarcastic / data.reviews.length,
        reviewCount: data.reviews.length,
        avgConfidence: data.totalConfidence / data.reviews.length
      }))
      .sort((a, b) => a.year - b.year);
  };

  const calculateStandardDeviation = (values: number[]) => {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
    const avgSquaredDiff = squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
    return Math.sqrt(avgSquaredDiff);
  };

  const downloadSampleCSV = () => {
    const sampleData = `review,genre,year
"This movie was absolutely fantastic! The acting was brilliant and the plot was so original.",action,2020
"Oh wow, another superhero movie. How original and exciting...",action,2021
"A beautiful romantic story that touched my heart deeply.",romance,2019
"Sure, because we really needed another sequel to this franchise.",comedy,2022
"Terrifying horror movie that kept me on the edge of my seat!",horror,2020`;

    const blob = new Blob([sampleData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_reviews.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Upload className="w-6 h-6 text-primary-500" />
          <h3 className="text-xl font-bold text-slate-900">Upload Your CSV File</h3>
        </div>
        <button
          onClick={downloadSampleCSV}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
        >
          <Download className="w-4 h-4" />
          Sample CSV
        </button>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragging
            ? 'border-primary-400 bg-primary-50'
            : uploadStatus === 'success'
            ? 'border-green-400 bg-green-50'
            : uploadStatus === 'error'
            ? 'border-red-400 bg-red-50'
            : 'border-slate-300 hover:border-slate-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          className="hidden"
        />

        {isProcessing ? (
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="text-slate-600">Processing your CSV file...</p>
          </div>
        ) : uploadStatus === 'success' ? (
          <div className="flex flex-col items-center gap-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
            <p className="text-green-700 font-medium">File processed successfully!</p>
            <p className="text-slate-600 text-sm">Scroll down to see your analysis results</p>
          </div>
        ) : uploadStatus === 'error' ? (
          <div className="flex flex-col items-center gap-4">
            <AlertCircle className="w-12 h-12 text-red-600" />
            <p className="text-red-700 font-medium">Error processing file</p>
            <p className="text-slate-600 text-sm">{errorMessage}</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <FileText className="w-12 h-12 text-slate-400" />
            <div>
              <p className="text-slate-700 font-medium mb-2">
                Drag and drop your CSV file here, or{' '}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  browse to upload
                </button>
              </p>
              <p className="text-slate-500 text-sm">
                CSV should contain columns: review, genre (optional), year (optional)
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-slate-50 rounded-lg">
        <h4 className="font-semibold text-slate-900 mb-2">Expected CSV Format:</h4>
        <div className="text-sm text-slate-600 space-y-1">
          <p>• <strong>review</strong>: The movie review text (required)</p>
          <p>• <strong>genre</strong>: Movie genre like "action", "comedy", etc. (optional)</p>
          <p>• <strong>year</strong>: Release year or review year (optional)</p>
        </div>
      </div>
    </div>
  );
};