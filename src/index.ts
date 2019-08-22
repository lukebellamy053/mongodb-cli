import { exec } from 'child_process'
import { Config } from './interfaces/config';

/**
 * A class to handle the MongoDB operations
 */
export default class MongoHandler {


    /**
     * Create the Handler with the provided config
     * @param config - The configuration to use
     */
    constructor(private config: Config) {
       
    }


    /**
     * Get the command line arguments for the request
     */
    private cmdLineArguments(): Array<string> {

        const params: Array<string> = [];

        if(this.config.ssl) {
            params.push('--ssl');
        }

        if(this.config.host) {
            params.push('--host')
            const host = this.config.host;
            if(typeof host === 'string') {
                params.push(host);
            } else {
                params.push(`${host.repl_set}/${host.nodes.join(',')}`)
            }
        }

        if(this.config.database) {
            params.push('--db');
            params.push(this.config.database);
        }

        if(this.config.auth) {
            const auth = this.config.auth;
            params.push('-u', auth.user,'-p', auth.password)
            if(auth.auth_db) {
                params.push('--authenticationDatabase', auth.auth_db);
            }
        }

        if(this.config.output_dir) {
            params.push('--out',this.config.output_dir);
        }

        if(this.config.input_dir) {
            params.push('--dir', this.config.input_dir);
        }

        return params;
    }


    /**
     * Dump the database
     */
    public dumpDatabase(): Promise<number | void> {
        if(!this.config.output_dir){
            throw 'Missing output_dir configuration';
        }
        console.log(`Databases saved to ${this.config.output_dir}`);
        return this.execute('mongodump');
    }

    /**
     * Restore the database
     */
    public restoreDatabase(): Promise<number | void> {
        if (!this.config.input_dir) {
            throw 'Missing input_dir configuration';
        }
        return this.execute('mongorestore')
    }

    /**
     * Execute the command
     * @param command
     */
    private execute(command: 'mongodump' | 'mongorestore'): Promise<number | void> {
        // Create the full command
        const running_command = `${command} ${this.cmdLineArguments().join(' ')}`;
        console.log(running_command);
        // Create the process and return it
        return processHandler(running_command);
    }

}

/**
 * Spawn a child process
 * @param command - The command to execute
 */
function processHandler(command: string): Promise<number | void> {
    return new Promise((resolve, reject) => {
        const child_process = exec(command);
        // Pipe the stdout to the process stdout
        child_process.stdout ? child_process.stdout.pipe(process.stdout) : null;
        // Pipe the stderr to the process stderr
        child_process.stderr ? child_process.stderr.pipe(process.stderr) : null;
        // Listen for the end of the process
        child_process.on('close', (code: number) => {
            if (code == 0) {
                resolve();
            } else {
                reject(code);
            }
        });
    });
}