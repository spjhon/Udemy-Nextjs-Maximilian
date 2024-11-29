'use client';

import { FC } from 'react';

interface ErrorPage {
  error: Error;
}

const Error: FC<ErrorPage> = ({ error }) => {
  return (
    <div id="error">
      <h2>An error occurred!</h2>
      <p>{error.message}</p>
    </div>
  );
};

export default Error;