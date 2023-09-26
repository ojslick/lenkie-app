import { setupServer } from 'msw/node';
import { searchHandlers } from './handlers/search';
import { artistHandlers } from './handlers/artist';

export const server = setupServer(...searchHandlers, ...artistHandlers);
