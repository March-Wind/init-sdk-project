import { Listr } from 'listr2'
import { execaSync, execa } from '@marchyang/execa'
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
interface Ctx {
    /* some variables for internal use */
}

const tasks = new Listr<Ctx>(
    [
        {
            title: 'npm init',
            task: (ctx, task) => {
                const instance = execaSync('npm', ['init'],
                { 
                    stdio: 'inherit', 
                    shell: true,
                })
            },
            options: { persistentOutput: true }
        },
        {
            title: 'Install packages',
            task: (ctx,task) => {
                return task.newListr([
                    {
                        title: 'install devDependencies package',
                        task: () => {
                            return execa('npm', ['i', '-D',
                                '@rollup/plugin-image',
                                'rollup-plugin-commonjs',
                                'rollup-plugin-node-externals',
                                'rollup-plugin-node-resolve',
                                '@types/node',
                                '@types/react',
                                'less',
                                'postcss',
                                'rollup',
                                'rollup-plugin-postcss',
                                'rollup-plugin-typescript',
                                'ts-node',
                                'tslib',
                                'typescript'
                            ]);
                        }
                    },
                    {
                        title: 'install dependencies package',
                        task: () => {
                            return execa('npm', ['i', 
                                'react'
                            ]);
                        }
                    }
                ])
                
            }
        },
        {
            title: 'Set script and main ',
            task: () => {
                const packagePath = path.resolve(process.cwd(), './package.json');

                const configString = fs.readFileSync(packagePath, { encoding: 'utf8' });
                let configObj:any = {};
                try {
                    configObj = JSON.parse(configString);
                } catch (error) {
                    throw new Error('package.json 解析错误！')
                }
                configObj.scripts = {
                    "build": "tsc && rollup -c",
                    "ts:run": "TS_NODE_PROJECT=./tsconfig.json node --loader ts-node/esm ./src/index.ts",
                    "ts:debugger": "TS_NODE_PROJECT=./tsconfig.json node --inspect-brk  --loader ts-node/esm  ./src/index.ts",
                    "prepublish": "npm run build "
                }
                configObj.main = "./lib/index.js";
                configObj.files = [
                    "lib/*",
                    "*.md",
                    "package.json"
                  ]
                fs.writeFileSync(packagePath, JSON.stringify(configObj, null, 4), { encoding: 'utf-8' });
            }
        },
        {
            title: 'copy file',
            task: (ctx, task) => {
                return task.newListr([
                    {
                        title: 'set tsconfig',
                        task: () => execa('cp',  [path.resolve(__dirname, './tsconfig.json'), process.cwd()])
                    },
                    {
                        title: 'set rollup config',
                        task: () => execa('cp',  [path.resolve(__dirname, './rollup.config.js'), process.cwd()])
                    },
                    {
                        title: 'set .gitignore',
                        task: () => {
                            fs.writeFileSync(path.resolve(process.cwd(), './.gitignore'), 
                            `/node_modules
                            /lib
                            .DS_Store`)
                        }
                    },
                    {
                        title: 'set .npmignore',
                        task: () => execa('cp',  [path.resolve(__dirname, './.npmignore'), process.cwd()])
                    }
                ])
                 
            }
        },
        {
            title: 'New src directory',
            task: () => {
                fs.mkdirSync('src')
                execaSync('cp',[path.resolve(__dirname, './template/index.ts'), path.resolve(process.cwd(),'src')])
            }
        }
    ],
    {
        /* options */
    }
)


try {
    tasks.run()
} catch (e) {
    console.error(e)
}