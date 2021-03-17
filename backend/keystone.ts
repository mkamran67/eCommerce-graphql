import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';

const databseURL = process.env.DATABASE_URL || 'enter mongo url';

// JWT - Cookies
const sessionConfig = {
  maxAge: 60 * 60 * 24 * 30, // JWT Expiration time
  secret: process.env.COOKIE_SECRET,
};

export default config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databseURL,
    // TODO: Seed data here
  },
  lists: createSchema({
    // Schema items go in here
  }),
  ui: {
    // TODO: Change for roles
    isAccessAllowed: () => true,
  },
  // TODO : Add session values here
});
