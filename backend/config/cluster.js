//@Author ismael alves
import { startup, shutdown } from './server'
import cluster from 'cluster'
import { cpus } from 'os'

class Clusters{

    cpus
    
    constructor(){
        this.cpus = cpus();
        this.init()
    }

    init(){
        if(cluster.isMaster){
            this.cpus.forEach(() => cluster.fork())
            cluster.on('exit', ()=>{
                cluster.fork()
            })
        }else{
            startup().catch(()=>shutdown())
        }
    }
}

export default new Clusters()