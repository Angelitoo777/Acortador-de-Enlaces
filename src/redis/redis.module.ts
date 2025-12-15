import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './redis.constants';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: () => {
        const client = new Redis();

        client.on('error', (err) => {
          console.error('Redis error:', err);
        });

        client.on('connect', () => {
          console.log('Connected to Redis');
        });

        return client;
      },
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
