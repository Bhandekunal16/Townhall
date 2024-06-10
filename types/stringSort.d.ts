export = SortService;
declare class SortService {
    write(data: any, key: any): Promise<{
        value: any;
        status: boolean;
        res?: undefined;
        msg?: undefined;
    } | {
        res: any;
        status: boolean;
        msg: string;
        value?: undefined;
    }>;
}
