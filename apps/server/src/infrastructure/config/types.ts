export interface DBConfig {
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
}

export interface AppConfig {
    nodeEnv: string;
    port: number;
    db: DBConfig;
}
