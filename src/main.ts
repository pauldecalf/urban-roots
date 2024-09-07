import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // Enregistrez le répertoire des partiels
  hbs.registerPartials(join(__dirname, '..', 'views', 'composants'));
  app.setViewEngine('hbs');

  hbs.registerHelper('formatDate', function(date: Date) {
    const d = new Date(date);
    const day = ('0' + d.getDate()).slice(-2);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  });

// Helper Handlebars personnalisé pour vérifier si une chaîne contient un sous-texte
  hbs.registerHelper('contains', function (haystack: string | any[], needle: any, options: { fn: (arg0: any) => any; inverse: (arg0: any) => any; }) {
    if (haystack && haystack.includes(needle)) {
      return options.fn(this);  // Si la condition est vraie
    } else {
      return options.inverse(this);  // Si la condition est fausse
    }
  });


  hbs.registerHelper('limit', function(arr, limit) {
    if (!Array.isArray(arr)) {
      return [];
    }
    return arr.slice(0, limit);
  });

  hbs.registerHelper('range', function(start, end) {
    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  });

  hbs.registerHelper('subtract', function(a, b) {
    return a - b;
  });

  hbs.registerHelper('add', function(a, b) {
    return a + b;
  });

  hbs.registerHelper('gt', function(a, b) {
    return a > b;
  });

  hbs.registerHelper('lt', function(a, b) {
    return a < b;
  });

  hbs.registerHelper('eq', function(a, b) {
    return a === b;
  });

  hbs.registerHelper('isCurrentPage', function(page, currentPage, options) {
    return page === currentPage ? options.fn(this) : options.inverse(this);
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
