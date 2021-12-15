import { Pool } from 'pg'

let db: any;
if(!db){
  db = new Pool({
        user:'marret',
        password: 'marret123456+-+',
        host: 'sistemabmdigital.com',
        port: 5432,
        database: 'pos'
    })
} 
export { db };