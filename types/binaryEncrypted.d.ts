export = BinaryLocker;
declare class BinaryLocker {
    folderPath: string;
    convertToBinary(data: any): string;
    padLeft(str: any, length: any): string;
    createBinaryFile(data: any, name: any, header: any): string;
}
