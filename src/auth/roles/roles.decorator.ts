import { SetMetadata } from '@nestjs/common';

// For authorize route by User || Admin Credentials
export const Roles = (...args: string[]) => SetMetadata('roles', args);
