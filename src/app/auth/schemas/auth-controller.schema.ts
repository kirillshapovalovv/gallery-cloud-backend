import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const jwtTokensResponseSchema: SchemaObject = {
  type: 'object',
  properties: {
    access_token: { type: 'string' },
    refresh_token: { type: 'string' },
  },
};

export const accessTokenResponseSchema: SchemaObject = {
  type: 'object',
  properties: {
    access_token: { type: 'string' },
  },
};
