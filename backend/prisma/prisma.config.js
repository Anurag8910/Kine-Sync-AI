import { definePrismaConfig } from '@prisma/internals';

export default definePrismaConfig({
  schema: './schema.prisma',
  datasource: {
    db: {
      provider: 'postgresql',
      url: process.env.DATABASE_URL,
    },
  },
});
