export interface IPackageJsonInfo {
    path: string;
    data: IPackageJson
}

export interface IPackageJson {
    name: string,
    version?: string,
    description?: string,
    main?: string,
    scripts?: { [key: string]: string },
    dependencies?: { [key: string]: string },
    devDependencies?: { [key: string]: string },
    [key: string]: any
}

export function findNearestPackageJson(): Promise<IPackageJson>;

export function findNearestPackageJsonSync(): IPackageJson;
