import { Post } from './post';
import { Address } from './address';

export interface User {
  readonly id: number;
  name?: string;
  email?: string;
  address?: Address;
  posts?: Post[];
}
