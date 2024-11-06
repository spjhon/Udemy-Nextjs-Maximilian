import { DUMMY_NEWS } from '@/dummy-news';

// Definimos la interfaz NewsItem que refleja la estructura de DUMMY_NEWS
export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  image: string;
  date: string; // O podrías usar Date si prefieres trabajar con objetos Date
  content: string;
}

export function getAllNews(): NewsItem[] {
  return DUMMY_NEWS;
}

export function getLatestNews(): NewsItem[] {
  return DUMMY_NEWS.slice(0, 3);
}

export function getAvailableNewsYears(): number[] {
  return DUMMY_NEWS.reduce((years: number[], news: NewsItem) => {
    const year = new Date(news.date).getFullYear();
    if (!years.includes(year)) {
      years.push(year);
    }
    return years;
  }, []).sort((a, b) => b - a);
}

export function getAvailableNewsMonths(year: string): number[] {
  return DUMMY_NEWS.reduce((months: number[], news: NewsItem) => {
    const newsYear = new Date(news.date).getFullYear();
    if (newsYear === parseInt(year)) {
      const month = new Date(news.date).getMonth();
      if (!months.includes(month + 1)) {
        months.push(month + 1);
      }
    }
    return months;
  }, []).sort((a, b) => b - a);
}

export function getNewsForYear(year: string): NewsItem[] {
  return DUMMY_NEWS.filter(
    (news: NewsItem) => new Date(news.date).getFullYear() === parseInt(year)
  );
}

export function getNewsForYearAndMonth(year: string, month: string): NewsItem[] {
  return DUMMY_NEWS.filter((news: NewsItem) => {
    const newsYear = new Date(news.date).getFullYear();
    const newsMonth = new Date(news.date).getMonth() + 1;
    return newsYear === parseInt(year) && newsMonth === parseInt(month);
  });
}