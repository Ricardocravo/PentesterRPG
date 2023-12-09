import { ImportDeclaration, ExportDeclaration } from "ts-morph";
export declare const getModuleSourceFile: (decl: ImportDeclaration | ExportDeclaration) => import("@ts-morph/common").StandardizedFilePath;
