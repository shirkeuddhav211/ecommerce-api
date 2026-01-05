import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

export const winstonLogger = WinstonModule.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  transports: [
    // 📄 All logs
    new winston.transports.File({
      filename: 'logs/app.log',
    }),

    // ❌ Error logs only
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),

    // 🖥 Console logs (dev)
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
  ],
});
