# Sarcascope
**Sarcascope** is an intelligent sentiment analysis dashboard that goes beyond traditional sentiment analysis by detecting and accounting for sarcasm in IMDB movie reviews. Unlike conventional sentiment analyzers that might misinterpret sarcastic reviews, Sarcascope identifies sarcastic content and adjusts sentiment scores accordingly, providing more accurate insights into genuine user opinions.
# 🎭 Sarcascope
### Sarcasm-Aware Sentiment Analysis Dashboard for IMDB Reviews

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![HuggingFace](https://img.shields.io/badge/🤗-Transformers-yellow.svg)
![VADER](https://img.shields.io/badge/VADER-Sentiment-green.svg)
![React](https://img.shields.io/badge/React-18+-61DAFB.svg)
![License](https://img.shields.io/badge/License-MIT-red.svg)

---

## 🔍 Overview

**Sarcascope** is an intelligent sentiment analysis dashboard that goes beyond traditional sentiment analysis by detecting and accounting for sarcasm in IMDB movie reviews. Unlike conventional sentiment analyzers that might misinterpret sarcastic reviews, Sarcascope identifies sarcastic content and adjusts sentiment scores accordingly, providing more accurate insights into genuine user opinions.

### 🎯 Main Goals
- **Sarcasm-Aware Sentiment Analysis**: Detect sarcastic reviews and adjust sentiment scores for more accurate analysis
- **Genre-Wise Breakdown**: Analyze sentiment and sarcasm patterns across different movie genres
- **Historical Timeline Analysis**: Track sentiment and sarcasm trends over time
- **Interactive Dashboard**: Visualize insights through charts, tables, and downloadable reports

### 🛠️ Technologies Used
- **Core**: Python, HuggingFace Transformers, VADER, pandas, matplotlib, seaborn, plotly
- **Models**: RoBERTa (cardiffnlp/twitter-roberta-base-sentiment-latest), BERT, VADER
- **Execution**: Jupyter Notebook and Python script for local analysis

---

## 🧠 Model Logic & Pipeline

Our sarcasm-aware sentiment analysis uses a sophisticated two-stage pipeline that combines multiple detection methods for maximum accuracy.

### 🎪 2.1 Sarcasm Detection

**Pattern Matching**: 
- Identifies sarcasm-indicating phrases like "oh wow", "totally", "absolutely brilliant"
- Detects excessive punctuation patterns (!!!, ???, mixed punctuation)
- Recognizes contradictory expressions and hyperbolic language

**Sentiment Contradiction**:
- Uses VADER sentiment analyzer to detect polarity inconsistencies
- Identifies cases where positive words are used in negative contexts
- Flags reviews with contradictory emotional indicators

**BERT-based Classification**:
- Employs `cardiffnlp/twitter-roberta-base-sentiment-latest` for contextual understanding
- Analyzes semantic relationships and contextual cues
- Provides confidence scores for sarcasm detection

### 📊 2.2 Sentiment Scoring (Adjusted)

**Sarcasm-Aware Adjustment**:
- When sarcasm is detected, the system flips or adjusts the raw sentiment score
- Applies weighted corrections based on sarcasm confidence levels
- Maintains original sentiment for non-sarcastic content

**Hybrid Approach**:
- Combines VADER's lexicon-based analysis with RoBERTa's transformer-based understanding
- Post-processes results using domain-specific rules for movie reviews
- Provides both raw and adjusted sentiment scores for comparison

---

## 📈 Dashboard Features

| Feature | Description |
|---------|-------------|
| **📂 CSV Upload** | Upload IMDB review datasets with review, genre, and date columns |
| **🥧 Sarcasm Detection Pie Chart** | Visual breakdown of sarcastic vs. non-sarcastic reviews |
| **📈 Sentiment Timeline Chart** | Historical sentiment trends over time |
| **🎭 Sarcasm Rate Timeline** | Tracking sarcasm frequency across different periods |
| **🎬 Genre-wise Analysis** | Sentiment and sarcasm statistics by movie genre |
| **🏆 Top 10 Sarcastic Reviews** | Table showcasing the most sarcastic reviews detected |
| **💾 CSV Download** | Export processed results with sarcasm and sentiment scores |
| **📊 Interactive Visualizations** | Plotly-powered charts for detailed exploration |

---

## 📋 Performance Metrics

```
==================================================
PERFORMANCE METRICS AND INSIGHTS
Total reviews analyzed: 5000
Sarcastic reviews detected: 2703 (54.1%)
Average sentiment score: 0.021
Average confidence: 0.321

GENRE INSIGHTS:
Action: Sentiment=0.048, Sarcasm Rate=58.2%, Reviews=777
Comedy: Sentiment=0.028, Sarcasm Rate=55.2%, Reviews=1218
Drama: Sentiment=0.026, Sarcasm Rate=58.3%, Reviews=434
Fantasy: Sentiment=0.007, Sarcasm Rate=51.1%, Reviews=45
Horror: Sentiment=0.114, Sarcasm Rate=65.8%, Reviews=272
Romance: Sentiment=0.023, Sarcasm Rate=53.7%, Reviews=817
Sci-fi: Sentiment=-0.044, Sarcasm Rate=61.0%, Reviews=123
Thriller: Sentiment=0.035, Sarcasm Rate=52.7%, Reviews=461
Unknown: Sentiment=-0.045, Sarcasm Rate=43.0%, Reviews=853

TIMELINE INSIGHTS:
Most positive year: 2024.0
Most negative year: 2055.0
Highest sarcasm rate: 1901.0

MODEL VALIDATION:
Traditional sentiment error: 0.634
Sarcasm-aware sentiment error: 1.019
Improvement: -60.6%
```

---

## 📁 Sample Results

The following files are generated after running the analysis:

- **📄 `imdb_sarcasm_aware_results.csv`**: Complete dataset with sarcasm detection flags, adjusted sentiment scores, and confidence levels
- **📄 `imdb_timeline_analysis.csv`**: Year-by-year sentiment and sarcasm trends
- **📄 `imdb_genre_analysis.csv`**: Genre-specific averages and statistics
- **📸 Visual Analysis Results**: Two comprehensive visualizations showing dashboard insights and analysis results
- **🧠 `Sarcascope.py`**: Complete Python script with all processing logic
- **📓 `Sarcascope.ipynb`**: Jupyter notebook version for interactive analysis

---

## 🗂️ Folder Structure

```bash
sarcascope/
├── Sarcascope.py                  # Main analysis script
├── Sarcascope.ipynb               # Jupyter notebook version
├── imdb_sarcasm_aware_results.csv # Processed results
├── imdb_timeline_analysis.csv     # Timeline insights
├── imdb_genre_analysis.csv        # Genre-based analysis
├── [visualization_1]              # Analysis results visualization
├── [visualization_2]              # Dashboard insights visualization
├── requirements.txt               # Python dependencies
└── README.md                      # This file
```

---

## 🚀 How to Run Locally

### Prerequisites
- Python 3.8+
- Jupyter Notebook or Google Colab
- Internet connection for downloading models

### Quick Start

1. **Open the Pipeline**
   ```bash
   # Option 1: Python Script
   python Sarcascope.py
   
   # Option 2: Jupyter Notebook (Recommended)
   jupyter notebook Sarcascope.ipynb
   
   # Option 3: Google Colab
   # Upload Sarcascope.ipynb to Colab and run
   ```

2. **Prepare Your Data**
   - Upload a CSV file with columns: `review`, `genre`, `date`
   - Ensure reviews are in English text format

3. **Run the Analysis**
   - Execute all cells in the notebook
   - The pipeline will automatically download required models
   - Results will be saved as CSV and PNG files

4. **Explore Results**
   - View generated visualizations
   - Download processed CSV files
   - Integrate results into your own applications

### Installation (if running as script)
```bash
pip install transformers torch pandas matplotlib seaborn plotly nltk scikit-learn
python Sarcascope.py
```

---

## 💻 Tech Stack

### Core Technologies
- **🐍 Python**: Primary programming language
- **🤗 HuggingFace Transformers**: State-of-the-art NLP models (RoBERTa, BERT)
- **📊 VADER**: Lexicon-based sentiment analysis
- **🐼 Pandas**: Data manipulation and analysis
- **📈 Visualization**: Matplotlib, Seaborn, Plotly for interactive charts
- **📓 Jupyter**: Interactive development and analysis environment

---

## 🏆 Credits

### Datasets & Models
- **IMDB Dataset**: Stanford AI Lab Large Movie Review Dataset
- **RoBERTa Model**: `cardiffnlp/twitter-roberta-base-sentiment-latest`
- **VADER**: Valence Aware Dictionary and sEntiment Reasoner (Hutto & Gilbert, 2014)

### Inspiration
- **UI Design**: Material-UI dashboards and modern data visualization principles
- **Model Architecture**: HuggingFace transformers and sentiment analysis best practices
- **Visualization**: Plotly community examples and interactive dashboard patterns

---

## 🤝 Contributing

We welcome contributions! Please feel free to:
- Report bugs and issues
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">

**🎭 Built with ❤️ for better sentiment understanding**

*Sarcascope - Because sometimes "great movie" doesn't mean great movie*

</div>
