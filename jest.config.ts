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
        "^@shared/(.*)$": "<rootDir>/src/shared/$1",
        "^@modules/(.*)$": "<rootDir>/src/modules/$1",
        "^@/(.*)$": "<rootDir>/src/$1",
    },

    // ADICIONE ESTA LINHA: Carrega o mock da uuid antes de qualquer spec rodar
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/*.spec.ts"],
};

export default config;
