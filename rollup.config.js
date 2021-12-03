import rollupTypescript from 'rollup-plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
// import globals from 'rollup-plugin-node-globals'; // 加global前缀
// import builtins from 'rollup-plugin-node-builtins';
import nodeExternals from 'rollup-plugin-node-externals';
export default {
    input: 'src/index.ts',
    external:['react'],
    output: {
        file: 'lib/index.js',
        format: 'cjs',
        globals: {
            react: 'React'
        },
        banner: '#!/usr/bin/env node'
    },
    plugins: [
        nodeExternals(),
        rollupTypescript(),
        image(),
        postcss(),
        nodeResolve({ preferBuiltins: false }), // or `true`
        commonjs(),
        // globals(),
        // builtins(),
    ],
};
