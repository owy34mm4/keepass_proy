'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h1>Algo salió mal</h1>
      <button onClick={() => reset()}>Intentar de nuevo</button>
    </div>
  );
}