export = Authorized;
declare class Authorized {
  main(params: string): Promise<any>;
  postal(params: string): Promise<any>;
  createExcelFile(dataArray: any[], filePath: string): Promise<void>;
  readExcelToArray(filePath: string, output: any): Promise<any>;
  getPackageInfo(packageName: string): Promise<any>;
  NpmSearch(name: string): Promise<any>;
  NpmView(userName: string, packageName: string): Promise<any>;
  NpmViewV2(name: string): Promise<any>;
}
