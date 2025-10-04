export const validateUrl = (url: string): boolean => {
  if (!url) return true;

  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

export const sanitizeText = (text: string): string => {
  return text
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, 500);
};

export const sanitizeScore = (score: string): string => {
  return score
    .replace(/[^0-9-]/g, '')
    .slice(0, 10);
};

export const validateMatchDate = (date: string): boolean => {
  const matchDate = new Date(date);
  const now = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(now.getFullYear() - 1);
  const oneMonthAhead = new Date();
  oneMonthAhead.setMonth(now.getMonth() + 1);

  return matchDate >= oneYearAgo && matchDate <= oneMonthAhead;
};

export const validateGoalMinute = (minute: number): boolean => {
  return minute > 0 && minute <= 120;
};
