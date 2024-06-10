export = Authorized;
declare class Authorized {
  main(params: string): Promise<{
    data: any;
    statusCode: number;
    status: boolean;
    msg: any;
  }>;
  postal(params: string): Promise<
    | {
        data: any;
        statusCode: number;
        status: boolean;
        msg: any;
      }
    | {
        response: any;
        statusCode: number;
        status: boolean;
        msg: any;
      }
  >;
  createExcelFile(dataArray: any[], filePath: string): Promise<void>;
  readExcelToArray(filePath: string, output: any): Promise<any>;
  getPackageInfo(packageName: string): Promise<any>;
  NpmSearch(name: string): Promise<any>;
  NpmView(userName: string, packageName: string): Promise<any>;
  NpmViewV2(name: string): Promise<any>;
}
