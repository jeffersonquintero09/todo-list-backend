import 'dotenv/config'

const config = {
    server: {
        host: process.env.HOST || '127.0.0.1',
        port: Number(process.env.PORT) || 3000,
    },
    mongo: {
        host: process.env.MONGO_HOST || 'localhost',
        port: Number(process.env.MONGO_PORT) || 27017,
        db: process.env.MONGO_DB || 'mongodb',
        user: process.env.MONGO_USER || 'user',
        pass: process.env.MONGO_PASS || 'pass',
        url: function() {
            return this.user
                ? `mongodb://${this.user}:${this.pass}@${this.host}:${this.port}/${this.db}?authSource=admin`
                : `mongodb://${this.host}:${this.port}/${this.db}`;
        }
    }
}

export default config