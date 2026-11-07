import { expect } from 'vitest';

expect.extend({
  toBeInTheDocument(received: any) {
    const pass = Boolean(received);
    return {
      pass,
      message: () => `expected element ${pass ? 'not ' : ''}to be in document`,
    };
  },
});
