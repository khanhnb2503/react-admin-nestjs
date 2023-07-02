import { Params } from 'nestjs-pino';
import * as pino from 'pino';

export function loggerConfig(env: string, auto: boolean): Params {
  return {
    pinoHttp: {
      level: env !== 'production' ? 'debug' : 'info',
      serializers: {
        err: pino.stdSerializers.err,
        req: (req) => {
          req.body = req.raw.body;
          return req;
        },
      },
      autoLogging: auto,
      transport: env !== 'production' ? { target: 'pino-pretty' } : undefined,
    },
  };
}
