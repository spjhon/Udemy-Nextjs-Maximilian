

// Definimos la interfaz NewsItem que refleja la estructura de DUMMY_NEWS
export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  image: string;
  date: string; // O podrías usar Date si prefieres trabajar con objetos Date
  content: string;
}




export async function getAllNews(): Promise<NewsItem[]> {
  // Realiza una solicitud fetch para obtener todos los artículos de noticias
  const response = await fetch('http://localhost:8080/news');

  // Simula un retraso de 2 segundos
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Verifica si la respuesta es correcta y convierte a JSON
  if (!response.ok) {
    throw new Error('Error fetching news data');
  }
  const news = await response.json();

  return news;
}




export async function getLatestNews(): Promise<NewsItem[]> {

// Realiza una solicitud fetch para obtener todos los artículos
const response = await fetch('http://localhost:8080/news');

// Simula un retraso de 2 segundos
await new Promise((resolve) => setTimeout(resolve, 2000));

// Verifica si la respuesta es correcta y convierte a JSON
if (!response.ok) {
  throw new Error('Error fetching news data');
}


const allNews: NewsItem[] = await response.json();

  return allNews.slice(0, 3);
}



/*
export async function getNewsItem(slug: string): Promise<NewsItem | null> {
  // Realiza una solicitud fetch para obtener todos los artículos
  const response = await fetch('http://localhost:8080/news');

  // Simula un retraso de 2 segundos
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Verifica si la respuesta es correcta y convierte a JSON
  if (!response.ok) {
    throw new Error('Error fetching news data');
  }


  const allNews: NewsItem[] = await response.json();

  // Filtra el artículo que coincide con el `slug`
  const newsItem = allNews.find(item  => item.slug === slug);

  return newsItem || null; // Devuelve null si no se encuentra el artículo
}

*/



export async function getAvailableNewsYears(): Promise<number[]> {

  // Realiza una solicitud fetch para obtener todos los artículos
  const response = await fetch('http://localhost:8080/news');

  // Simula un retraso de 2 segundos
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Verifica si la respuesta es correcta y convierte a JSON
  if (!response.ok) {
    throw new Error('Error fetching news data');
  }


  const allNews = await response.json();
  
  return allNews.reduce((years: number[], news: NewsItem) => {
    const year = new Date(news.date).getFullYear();
    if (!years.includes(year)) {
      years.push(year);
    }
    return years;
  }, []).sort((a: number, b: number) => b - a);
}







export async function getAvailableNewsMonths(year: string): Promise<number[]> {

// Realiza una solicitud fetch para obtener todos los artículos
const response = await fetch('http://localhost:8080/news');

// Simula un retraso de 2 segundos
await new Promise((resolve) => setTimeout(resolve, 2000));

// Verifica si la respuesta es correcta y convierte a JSON
if (!response.ok) {
  throw new Error('Error fetching news data');
}

const allNews: NewsItem[] = await response.json();

  return allNews.reduce((months: number[], news: NewsItem) => {
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






export async function getNewsForYear(year: string): Promise<NewsItem[]> {

// Realiza una solicitud fetch para obtener todos los artículos
const response = await fetch('http://localhost:8080/news');

// Simula un retraso de 2 segundos
await new Promise((resolve) => setTimeout(resolve, 2000));

// Verifica si la respuesta es correcta y convierte a JSON
if (!response.ok) {
  throw new Error('Error fetching news data');
}


const allNews: NewsItem[] = await response.json();

  return allNews.filter(
    (news: NewsItem) => new Date(news.date).getFullYear() === parseInt(year)
  );
}









export async function getNewsForYearAndMonth(year: string, month: string) {

// Realiza una solicitud fetch para obtener todos los artículos
const response = await fetch('http://localhost:8080/news');

// Simula un retraso de 2 segundos
await new Promise((resolve) => setTimeout(resolve, 2000));

// Verifica si la respuesta es correcta y convierte a JSON
if (!response.ok) {
  throw new Error('Error fetching news data');
}


const allNews: NewsItem[] = await response.json();


  return allNews.filter((news: NewsItem) => {
    const newsYear = new Date(news.date).getFullYear();
    const newsMonth = new Date(news.date).getMonth() + 1;
    return newsYear === parseInt(year) && newsMonth === parseInt(month);
  });
}