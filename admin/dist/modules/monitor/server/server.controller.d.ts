import { DataObj } from 'src/common/class/data-obj.class';
import { ServerService } from './server.service';
export declare class ServerController {
    private readonly serverService;
    constructor(serverService: ServerService);
    data(): Promise<DataObj<{
        cpu: {
            cpuNum: number;
            used: string;
            sys: string;
            free: string;
        };
        mem: {
            total: string;
            used: string;
            free: string;
            usage: string;
        };
        sys: {
            computerName: string;
            osName: string;
            computerIp: string;
            osArch: string;
        };
        sysFiles: {
            dirName: string;
            sysTypeName: string;
            typeName: string;
            total: string;
            free: string;
            used: string;
            usage: string;
        }[];
    }>>;
}
