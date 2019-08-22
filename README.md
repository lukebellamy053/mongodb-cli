# MongoDB Atlas Backup [![npm version](https://badge.fury.io/js/mongodb-cli.svg)](https://badge.fury.io/js/mongodb-cli)
[![CircleCI](https://circleci.com/gh/lukebellamy053/mongodb-cli.svg?style=svg)](https://circleci.com/gh/lukebellamy053/mongodb-cli)

#### The easy way to restore and dump from mongodb databases

## Install
```sh
npm install --save mongodb-cli
```

## Setup & Use
```js
import MongoHandler from 'mongodb-cli'

// Create an instance of the database connection
const process = new MongoHandler({
    ssl?: boolean; // Should the connection use SSL?
    auth?: {user: string, password: string, auth_db?: string} // The authentication information
    host?: string | {repl_set: string, nodes: Array<string>}; // A host DSN or connection object
    database?: string; // The database to backup / restore
    output_dir?: string; // Where should the backup be saved to
    input_dir?: string; // The directory to restore from
})

// Dump your cluster
await backup.dumpDatabase()

// Restore data to your cluster
await backup.restoreDatabase()
```
## Information
This project is forked from kysely/mongodb-atlas-backup however the underlying code has been changed to use typescript and to allow for more flexibility with the configurations. 
