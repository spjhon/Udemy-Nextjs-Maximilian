import { verifyAuth } from '@/lib/auth';
import { getTrainings } from '@/lib/training';
import { redirect } from 'next/navigation';


interface Types {
  id: number;
  title: string;
  image: string;
  description: string;
}


export default async function TrainingPage() {

  /**Con esto se esta llamando la funcion que verifica la autenticidad y si es asi pues se ejecuta la ruta */
  const result = await verifyAuth();

  /**Si no existe resultado inmediatamente se hace RREDIRECCIONAMIENTO */
  if (!result.user) {
    return redirect('/');
  }

  
  const trainingSessions: Types[] = getTrainings();

  return (
    <main>
      <h1>Find your favorite activity</h1>
      <ul id="training-sessions">
        {trainingSessions.map((training) => (
          <li key={training.id}>
            <img src={`/trainings/${training.image}`} alt={training.title} />
            <div>
              <h2>{training.title}</h2>
              <p>{training.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
