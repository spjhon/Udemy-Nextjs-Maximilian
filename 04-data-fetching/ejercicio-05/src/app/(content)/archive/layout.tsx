import React from 'react';

interface ArchiveLayoutProps {
  archive: React.ReactNode; // Podría ser un componente o cualquier contenido React
  latest: React.ReactNode;   // Podría ser un componente o cualquier contenido React
}


//Este es el layout de un componente que recibe dos rutas paralelas y se renderizan en esta parte como se puede observar
const ArchiveLayout: React.FC<ArchiveLayoutProps> = ({ archive, latest }) => {
  return (
    <div>
      <h1>News Archive</h1>
      <section id="archive-filter">{archive}</section>
      <section id="archive-latest">{latest}</section>
    </div>
  );
};

export default ArchiveLayout;