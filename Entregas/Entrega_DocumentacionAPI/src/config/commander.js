import {program} from 'commander'

program.option('-p, --port <port>','puerto', '8080').parse();

export default program;