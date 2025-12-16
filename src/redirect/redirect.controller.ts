import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { RedirectService } from './redirect.service';
import { Response } from 'express';

@Controller()
export class RedirectController {
  constructor(private readonly redirectService: RedirectService) {}

  @Get('/redirect/:shortUrl')
  async redirectByShortCode(
    @Param('shortUrl') shortUrl: string,
    @Res() res: Response,
  ) {
    try {
      const longUrl = await this.redirectService.findByShortCode(shortUrl);

      if (!longUrl) {
        throw new NotFoundException(
          'El código de URL no es válido o ha expirado.',
        );
      }

      return res.redirect(longUrl);
    } catch (error) {
      console.error(error);
      return res.status(404).redirect('/');
    }
  }

  @Get('/top')
  async getTopUrls() {
    return await this.redirectService.findTopUrls();
  }
}
