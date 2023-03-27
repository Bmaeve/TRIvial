import { Mesh } from '@loaders.gl/schema';
/**
 * Type for header of the .las file
 */
export type LASHeader = {
    pointsOffset: number;
    pointsFormatId: number;
    pointsStructSize: number;
    pointsCount: number;
    scale: [number, number, number];
    offset: [number, number, number];
    maxs?: number[];
    mins?: number[];
    totalToRead: number;
    totalRead: number;
    versionAsString?: string;
    isCompressed?: boolean;
};
/**
 * loaders.gl Mesh with Draco specific data
 */
export type LASMesh = Mesh & {
    loader: 'las';
    loaderData: LASHeader;
    topology: 'point-list';
    mode: 0;
};
//# sourceMappingURL=las-types.d.ts.map