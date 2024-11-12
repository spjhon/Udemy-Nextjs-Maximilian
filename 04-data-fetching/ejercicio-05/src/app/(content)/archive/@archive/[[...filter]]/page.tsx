import Link from 'next/link';

import NewsList from '@/components/news-list';
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from '@/lib/news';


type FilteredNewsParams = {
  params: {
    filter?: string[];
  };
};

/**Este es un componente que es un catch all, lo que hace es coger el filter que es un ARRAY de slugs que se accessan por medio de params y
 * que se puede controlar desde este componente todas las combinaciones de rutas anidadas y al mismo tiempo que se mantengan estas rutas dinamicas
 * y que se generen de acuerdo a los datos que vayan llegando, EXTRAÑAMENTE next js pide que los params entren como si fuera async y se necesita
 * agregarle un await
 */
export default async function FilteredNewsPage({ params }: FilteredNewsParams) {

  const paramsVariable = await params
  const filter = paramsVariable.filter;

  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];
  

  let news;
  let links = getAvailableNewsYears(); //este esta funcionando bien

  /**Si selectedYear está definido y selectedMonth no está definido, entonces se imprime selectedYear 
   * en la consola. Luego, news se establece con el resultado de getNewsForYear(selectedYear), y se imprime 
   * news en la consola. Finalmente, links se actualiza con el resultado de getAvailableNewsMonths(selectedYear). */
  if (selectedYear && !selectedMonth) {
    console.log(selectedYear)
    news = getNewsForYear(selectedYear);
    console.log(news)
    links = getAvailableNewsMonths(selectedYear);
  }


  /**Si selectedYear y selectedMonth están definidos, entonces news se establece con 
   * el resultado de getNewsForYearAndMonth(selectedYear, selectedMonth). Además, links se vacía 
   * asignándole un arreglo vacío ([]). */
  if (selectedYear && selectedMonth) {
    news = getNewsForYearAndMonth(selectedYear, selectedMonth);
    links = [];
  }


  /**Si news está definido y tiene una longitud mayor que 0 (es decir, si contiene elementos), 
   * entonces newsContent se establece como el componente <NewsList news={news} />. De lo contrario, 
   * newsContent se establece en un párrafo que dice "No news found for the selected period.". */
  let newsContent = <p>No news found for the selected period.</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }


  /**Si el selectedYear está definido y las noticias disponibles por años (getAvailableNewsYears()) no 
   * incluyen el valor de selectedYear convertido a número, o si tanto selectedYear como selectedMonth 
   * están definidos pero las noticias disponibles para los meses de ese año específico (getAvailableNewsMonths(selectedYear)) 
   * no incluyen el valor de selectedMonth convertido a número, entonces se lanza un error con el mensaje "Invalid filter.". */
  if (
    (selectedYear && !getAvailableNewsYears().includes(+selectedYear)) ||
    (selectedYear && selectedMonth &&
      !getAvailableNewsMonths(selectedYear).includes(+selectedMonth))
  ) {
    throw new Error('Invalid filter.');
  }

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link) => {
              const href = selectedYear
                ? `/archive/${selectedYear}/${link}`
                : `/archive/${link}`;

              return (
                <li key={link}>
                  <Link href={href}>{link}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {newsContent}
    </>
  );
}
