export declare class ServerService {
    getCpu(): Promise<{
        cpuNum: number;
        used: string;
        sys: string;
        free: string;
    }>;
    getMem(): Promise<{
        total: string;
        used: string;
        free: string;
        usage: string;
    }>;
    getSys(): Promise<{
        computerName: string;
        osName: string;
        computerIp: string;
        osArch: string;
    }>;
    getSysFiles(): Promise<{
        dirName: string;
        sysTypeName: string;
        typeName: string;
        total: string;
        free: string;
        used: string;
        usage: string;
    }[]>;
}
