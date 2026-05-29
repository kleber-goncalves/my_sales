import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        // .eslintignore (coloque as pastas a ignorar aqui)
        ignores: ["build/", "dist/", "node_modules/"],
    },

    {   // avisa sobre os consoles no projeto
        rules: {
            "no-console": "warn",
        },
    },
);
