'use client';

import { FC } from 'react';

interface FilterErrorProps {
  error: Error;
}

const FilterError: FC<FilterErrorProps> = ({ error }) => {
  return (
    <div id="error">
      <h2>An error occurred!</h2>
      <p>{error.message}</p>
    </div>
  );
};

export default FilterError;