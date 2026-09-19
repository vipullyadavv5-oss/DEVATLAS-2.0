/**
 * CORS CONFIGURATION
 * -----------------------------------------------------------------------------
 * File: backend/src/config/cors.ts
 * Purpose: Configures Cross-Origin Resource Sharing for the Express app.
 *
 * Security Rules:
 * - Never use origin: "*" for authenticated requests.
 * - Allowed origin is driven by FRONTEND_URL environment variable.
 * - credentials: true is required for HTTP-only session cookies to be sent.
 */

import { CorsOptions } from 'cors';
import { config } from './env';

/**
 * CORS options used by the cors() middleware.
 * Allows the frontend origin with credential support.
 */
export const corsOptions: CorsOptions = {
  // Only allow requests from the configured frontend origin
  origin: (origin, callback) => {
    // Allow requests with no origin (server-to-server, curl, Postman, health checks)
    if (!origin) {
      return callback(null, true);
    }

    // Allow the configured frontend URL
    if (origin === config.frontendUrl) {
      return callback(null, true);
    }

    // In development, also allow common localhost variants
    if (config.isDev) {
      const devOrigins = [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:5173',
      ];
      if (devOrigins.includes(origin)) {
        return callback(null, true);
      }
    }

    // Reject all other origins
    callback(new Error(`CORS: Origin '${origin}' is not allowed.`));
  },

  // Required for session cookies to be sent with cross-origin requests
  credentials: true,

  // Only allow the HTTP methods the API actually uses
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

  // Allow standard headers + Authorization for future token-based flows
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],

  // Expose no custom headers to the browser by default
  exposedHeaders: [],

  // Cache preflight response for 10 minutes
  maxAge: 600,
};
