namespace NodeJS {
  interface ProcessEnv {
    // Application
    NODE_ENV: 'development' | 'production' | 'test';
    PORT: string;
    FRONTEND_URL: string;

    // Database
    MONGODB_URI: string;

    // JWT
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    JWT_COOKIE_EXPIRES_IN: string;

    // Email
    SMTP_HOST: string;
    SMTP_PORT: string;
    SMTP_USERNAME: string;
    SMTP_PASSWORD: string;
    SMTP_FROM: string;

    // MSG91
    MSG91_AUTH_KEY: string;
    MSG91_SENDER_ID: string;
    EMERGENCY_CONTACTS: string;
  }
}
