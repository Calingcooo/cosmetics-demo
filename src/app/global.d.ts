declare module '*.css';

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        HITPAY_SANDBOX_API_KEY: string;
        HITPAY_LIVE_API_KEY?: string;
        NEXTAUTH_URL: string;
      }
    }
  }
  
  export {};