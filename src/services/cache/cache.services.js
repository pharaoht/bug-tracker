const redis = require('redis');

require('dotenv').config();

const ENVIRONMENT = process.env.NODE_ENV;
const DOMAIN = process.env.REDIS_URL;
const LOCALDOMAIN = 'redis://localhost:6379';

class RedisCacheService {

    constructor(){
        //singleton Design pattern to prevent multi-instances
        if(!RedisCacheService.instance){

            console.log('*** creating redis client ***');

            this.redisClient = redis.createClient({
                url: ENVIRONMENT === 'production' ? DOMAIN : LOCALDOMAIN,
                socket: {
                    reconnectStrategy: function(retries) {
                        
                        if (retries > 5) {
                        
                            console.log('Too many attempts to reconnect. Redis connection was terminated');
                        
                            return new Error('Too many retries.');
        
                        } 
                        else return retries * 500;
                    }
                }
            });
        
            this.redisClient.on('error', (err) => console.error('Redis client error:', err));

            this.redisClient.on('end', () => console.error('Redis connection closed. Exiting.'));
        
            this.redisClient.connect().then(console.log('*** redis instance created ***')).catch(console.error);

            RedisCacheService.instance = this;
        }

        return RedisCacheService.instance;
    }

    async get(key){

        try {

            const value = await this.redisClient.get(key);

            return value ? JSON.parse(value) : null;
        }
        catch(error){

            console.error('Error while getting key in redis:', error)
        }
    };

    async set(key, value){

        try {

            await this.redisClient.set(key, JSON.stringify(value))
        }
        catch(error){

            console.error('Error while setting key/value in redis:', error)
        };
    };

    async clearAllCluster() {

        try {
    
            await this.redisClient.flushAll();

            console.log('All keys in the cluster have been cleared');

        } catch (error) {
    
            console.error('Error clearing all keys in the cluster:', err);

            throw err;
        }
    }

    async clearOneCluster(key) {

        try {

            await this.redisClient.del(key);

            console.log(`Key ${key} has been cleared`);

        } catch (err) {

            console.error(`Error clearing key ${key} from Redis:`, err);

            throw err;
        }
    }
};

const instance = new RedisCacheService();
    
Object.freeze(instance);

module.exports = instance;