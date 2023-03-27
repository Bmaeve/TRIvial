import type { LASHeader } from './las-types';
type LASData = {
    buffer: ArrayBuffer;
    count: number;
    hasMoreData: boolean;
};
declare class LASLoader {
    arraybuffer: ArrayBuffer;
    readOffset: number;
    header: LASHeader;
    constructor(arraybuffer: ArrayBuffer);
    /**
     * @returns boolean
     */
    open(): boolean;
    /**
     * Parsing of incoming binary
     * @returns LASHeader
     */
    getHeader(): LASHeader;
    /**
     * Reading data
     * @param count
     * @param skip
     * @returns new ArrayBuffer, count, hasMoreData
     */
    readData(count: number, skip: number): {
        buffer: ArrayBuffer;
        count: number;
        hasMoreData: boolean;
    };
    /**
     * Method which brings data to null to close the file
     * @returns
     */
    close(): boolean;
}
/**
 * LAZ Loader
 * Uses NaCL module to load LAZ files
 */
declare class LAZLoader {
    arraybuffer: ArrayBuffer;
    instance: any;
    header: LASHeader | null;
    constructor(arraybuffer: ArrayBuffer);
    /**
     * Opens the file
     * @returns boolean
     */
    open(): boolean;
    getHeader(): LASHeader;
    /**
     * @param count
     * @param offset
     * @param skip
     * @returns Data
     */
    readData(count: number, offset: number, skip: number): LASData;
    /**
     * Deletes the instance
     * @returns boolean
     */
    close(): boolean;
}
/**
 * Helper class: Decodes LAS records into points
 */
declare class LASDecoder {
    arrayb: ArrayBuffer;
    decoder: (dv: DataView) => {};
    pointsCount: number;
    pointSize: number;
    scale: [number, number, number];
    offset?: [number, number, number];
    mins?: number[];
    maxs?: number[];
    constructor(buffer: ArrayBuffer, len: number, header: LASHeader);
    /**
     * Decodes data depends on this point size
     * @param index
     * @returns New object
     */
    getPoint(index: number): {};
}
/**
 * A single consistent interface for loading LAS/LAZ files
 */
export declare class LASFile {
    arraybuffer: ArrayBuffer;
    formatId: number;
    loader: LASLoader | LAZLoader;
    isCompressed: boolean;
    isOpen: boolean;
    version: number;
    versionAsString: string;
    constructor(arraybuffer: ArrayBuffer);
    /**
     * Determines format in parameters of LASHeaer
     */
    determineFormat(): void;
    /**
     * Determines version
     * @returns version
     */
    determineVersion(): number;
    /**
     * Reads if the file is open
     * @returns boolean
     */
    open(): void;
    /**
     * Gets the header
     * @returns Header
     */
    getHeader(): LASHeader;
    /**
     * @param count
     * @param start
     * @param skip
     * @returns Data
     */
    readData(count: number, start: number, skip: number): LASData;
    /**
     * Closes the file
     */
    close(): void;
    /**
     */
    getUnpacker(): typeof LASDecoder;
}
export declare const LASModuleWasLoaded = false;
export {};
//# sourceMappingURL=laslaz-decoder.d.ts.map