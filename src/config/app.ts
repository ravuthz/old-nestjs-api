import { registerAs } from "@nestjs/config";

export default registerAs('app', () =>  ({
    port: process.env.PORT || 9000,
    environment: process.env.NODE_ENV || 'development',
    isProduction() {
        return this.get('app.environment') === 'production';
    }
}));