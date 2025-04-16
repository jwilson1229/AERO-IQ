import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/react/dont-cleanup-after-each';

// Runs a cleanup after each test case
afterEach(() => {
  cleanup();
});
