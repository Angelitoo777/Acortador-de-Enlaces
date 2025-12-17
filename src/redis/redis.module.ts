import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './redis.constants';
import { RedisService } from './redis.service';

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
    RedisService,
  ],
  exports: [REDIS_CLIENT, RedisModule, RedisService],
})
export class RedisModule {}
