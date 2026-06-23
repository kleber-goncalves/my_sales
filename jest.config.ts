/** @jest-config-loader ts-node */
import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ["<rootDir>/src/modules/**/services/*.ts"],
    coverageProvider: "v8",
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov"],

    // CORRIGIDO: Mapeamos o alias @/ diretamente aqui.
    // Isso remove a necessidade de ler o tsconfig.json e evita erros de sintaxe!
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },

    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/*.spec.ts"],
};

export default config;
