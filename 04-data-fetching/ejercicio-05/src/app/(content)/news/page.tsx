"use client";

//
import { useEffect, useState } from 'react';
import NewsList from '@/components/news-list';

interface NewsItem {
  id: string;
  slug: string;
  title: string;
  image: string;
  date: string;
  content: string;
}


//Este es un ejemplo de un componente que hace fetching desde el lado del cliente, se tienen varios states
//para el manejo de loading, en caso de error y algunos fallbacks
export default function NewsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [news, setNews] = useState<NewsItem[] | null>(null);

  useEffect(() => {
    //siempre tener en cuenta que el useeffect no puede ser asyn pero sus funciones internas si
    async function fetchNews() {
      //esta es una funcion fetching estandard
      setIsLoading(true);

      /**Este es un try que verifica si la respuesta llego bien o no y responder con un error en caso de que salga error */
      try {
        const response = await fetch('http://localhost:8080/news');

        if (!response.ok) {
          throw new Error("Failed to fetch news.");
        }

        const newsData: NewsItem[] = await response.json();
        setNews(newsData);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    //Aqui se ejecuta la funcon de fecht con el try y todo
    fetchNews();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>News Page</h1>
      {/**
       * Este código dice: “Si news es verdadero (o no es null, undefined, 0, false, "", etc.), 
       * entonces renderiza <NewsList news={news} />". Si news es falsy (o sea, alguno de los valores mencionados 
       * como null, undefined, false, etc.), entonces no se renderiza nada.
       */}
      {news && <NewsList news={news} />}
    </>
  );
}
