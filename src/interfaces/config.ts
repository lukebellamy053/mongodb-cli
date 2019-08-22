export interface Config {

    ssl?: boolean;
    auth?: {user: string, password: string, auth_db?: string}
    host?: string | {repl_set: string, nodes: Array<string>};
    database?: string;
    output_dir?: string;
    input_dir?: string;
}