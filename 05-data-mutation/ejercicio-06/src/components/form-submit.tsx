"use client";

import { useFormStatus } from 'react-dom';

export default function FormSubmit() {
  const status = useFormStatus();

  if (status.pending) {
    return <label>Creating post...</label>;
  }

  return (
    <>
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </>
  );
}
