import { Lucia } from 'lucia';
import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite'

import db from './db';
import { cookies } from 'next/headers';

//aqui lo que se esta haciendo es asignar el adaptador de squlite a la base de datos y adiconar configuraciones
//que se pueden por supuesto estudiar en los docs
const adapter = new BetterSqlite3Adapter(db, {
  user: 'users',
  session: 'sessions'
});


//esta es la forma en como se crea una instancia de lucia auth
const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production'
    }
  }
});

//Esta es una funcion que asigna un cookie
export async function createAuthSession(userId: number | bigint) {

  /**Devuelve una sesión con un id único y otra información relevante (como la fecha de expiración, si se configuró).
La sesión creada contiene toda la información necesaria para autenticar al usuario durante su interacción con la aplicación. */
  const session = await lucia.createSession(userId.toString(), {});

  /**Devuelve un objeto sessionCookie que contiene:
name: Nombre de la cookie (p. ej., session).
value: Valor codificado de la cookie que incluye información de la sesión.
attributes: Propiedades de la cookie, como:
secure: Asegura que la cookie solo se transmita a través de HTTPS.
httpOnly: Restringe el acceso a la cookie solo al servidor.
Otros atributos configurados en sessionCookie.attributes. */
  const sessionCookie = lucia.createSessionCookie(session.id);

  /**cookies(): Devuelve un manejador para trabajar con cookies. Este manejador es provisto por Next.js para gestionar cookies
   * en el servidor.
set: Método utilizado para asignar una cookie al cliente.
Argumentos:
sessionCookie.name: El nombre de la cookie (p. ej., "session").
sessionCookie.value: El valor codificado de la cookie, que representa el id de la sesión.
sessionCookie.attributes: Propiedades de la cookie, como su seguridad y restricciones.
Este paso asegura que la cookie de sesión esté disponible en el cliente y se envíe en solicitudes posteriores, 
permitiendo que el servidor identifique al usuario. */
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}




export async function verifyAuth() {

  /**Propósito: Accede a las cookies en el contexto actual del servidor y extrae la cookie de sesión específica asociada 
   * con lucia-auth.
cookies() es una API de Next.js para manejar cookies de manera eficiente en entornos server-side.
lucia.sessionCookieName es el nombre predefinido de la cookie que contiene la identificación de la sesión. */
  const sessionCookie = (await cookies()).get(lucia.sessionCookieName);

  /**Si la cookie de sesión no está presente, la función retorna un objeto con user y session como null, 
   * indicando que no hay una sesión activa. */
  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    };
  }

  /**Aquí se extrae el valor de la cookie de sesión (sessionId).
Si el valor está vacío o no es válido, también retorna un objeto indicando que no hay una sesión válida. */
  const sessionId = sessionCookie.value;
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  /**Propósito: lucia.validateSession(sessionId) verifica si el sessionId corresponde a una sesión válida en el backend.
El resultado (result) contiene:
result.user: Información del usuario autenticado.
result.session: Información sobre la sesión, incluyendo si es "fresh" (recién creada y válida). */
  const result = await lucia.validateSession(sessionId);

  try {
    /**Si la sesión es válida y está marcada como fresh:
Se crea una nueva cookie de sesión actualizada usando lucia.createSessionCookie.
La cookie se establece de nuevo en el cliente con sus atributos correspondientes, asegurando que la sesión se mantenga fresca. */
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }

    /**Si la sesión no es válida (result.session es null):
Se crea una cookie de sesión en blanco con lucia.createBlankSessionCookie.
Esto asegura que cualquier cookie de sesión antigua o inválida sea reemplazada. */
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {}

  return result;
}