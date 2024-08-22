"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const hbs = require("hbs");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    hbs.registerHelper('formatDate', function (date) {
        const d = new Date(date);
        const day = ('0' + d.getDate()).slice(-2);
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    });
    hbs.registerHelper('limit', function (arr, limit) {
        if (!Array.isArray(arr)) {
            return [];
        }
        return arr.slice(0, limit);
    });
    hbs.registerHelper('range', function (start, end) {
        const range = [];
        for (let i = start; i <= end; i++) {
            range.push(i);
        }
        return range;
    });
    hbs.registerHelper('subtract', function (a, b) {
        return a - b;
    });
    hbs.registerHelper('add', function (a, b) {
        return a + b;
    });
    hbs.registerHelper('gt', function (a, b) {
        return a > b;
    });
    hbs.registerHelper('lt', function (a, b) {
        return a < b;
    });
    hbs.registerHelper('eq', function (a, b) {
        return a === b;
    });
    hbs.registerHelper('isCurrentPage', function (page, currentPage, options) {
        return page === currentPage ? options.fn(this) : options.inverse(this);
    });
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map