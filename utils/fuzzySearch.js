// Fuzzy search utility for quiz titles
// Create this in a new file like utils/fuzzySearch.js

export const fuzzySearch = (items, query, key = 'topic') => {
    if (!query || query.trim() === '') {
      return items;
    }
    
    const lowerQuery = query.toLowerCase();
    
    return items.filter(item => {
      const text = item[key].toLowerCase();
      
      // Simple fuzzy matching - check if all characters in query appear in the right order
      let queryIndex = 0;
      let textIndex = 0;
      
      while (queryIndex < lowerQuery.length && textIndex < text.length) {
        if (lowerQuery[queryIndex] === text[textIndex]) {
          queryIndex++;
        }
        textIndex++;
      }
      
      // If we went through the entire query, it's a match
      return queryIndex === lowerQuery.length;
    });
  };
  
  // Add a scoring function for better results
  export const fuzzySearchWithScoring = (items, query, key = 'topic') => {
    if (!query || query.trim() === '') {
      return items;
    }
    
    const lowerQuery = query.toLowerCase();
    
    // Calculate match score for each item
    const scoredItems = items.map(item => {
      const text = item[key].toLowerCase();
      let score = 0;
      
      // Exact substring match gets highest score
      if (text.includes(lowerQuery)) {
        score += 100;
        
        // Even higher score for exact match
        if (text === lowerQuery) {
          score += 50;
        }
        
        // Higher score for match at the beginning
        if (text.startsWith(lowerQuery)) {
          score += 30;
        }
      } else {
        // Fuzzy match - check if all characters appear in order
        let queryIndex = 0;
        let textIndex = 0;
        let consecutiveMatches = 0;
        let maxConsecutive = 0;
        
        while (queryIndex < lowerQuery.length && textIndex < text.length) {
          if (lowerQuery[queryIndex] === text[textIndex]) {
            queryIndex++;
            consecutiveMatches++;
            maxConsecutive = Math.max(maxConsecutive, consecutiveMatches);
          } else {
            consecutiveMatches = 0;
          }
          textIndex++;
        }
        
        // If we matched all query characters
        if (queryIndex === lowerQuery.length) {
          // Base score for matching all characters
          score += 50;
          // Bonus for consecutive matches
          score += maxConsecutive * 5;
          // Penalty for longer strings (prefer shorter matches)
          score -= (text.length - lowerQuery.length) * 0.1;
        }
      }
      
      return { ...item, score };
    });
    
    // Filter out non-matches and sort by score
    return scoredItems
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);
  };