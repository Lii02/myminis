import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default defineConfig([
	globalIgnores(['dist/*']),
	{ files: ['**/*.{js,mjs,cjs,ts}'] },
	{ files: ['**/*.{js,mjs,cjs,ts}'], languageOptions: { globals: globals.node } },
	{ files: ['**/*.{js,mjs,cjs,ts}'], plugins: { js }, extends: ['js/recommended'] },
	tseslint.configs.recommended,
	eslintPluginPrettier,
	{ rules: { '@typescript-eslint/no-explicit-any': 'off' } },
]);
