export declare function isDev(): boolean;
declare const _default: () => IConfig;
export default _default;
export interface IConfig {
    jwt?: {
        secret: string;
    };
    uploadPath?: string;
    database?: {
        type?: string;
        host?: string;
        port?: number | string;
        username?: string;
        password?: string;
        database?: string;
        autoLoadModels: boolean;
        synchronize?: boolean;
        logging?: any;
    };
    redis?: {
        config: {
            url: string;
        };
    };
    bullRedis?: {
        host: string;
        port: string;
        password: string;
    };
    isDemoEnvironment?: boolean;
    apiUrl?: string;
    appSecret?: string;
    appId?: string;
}
