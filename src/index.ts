import { Listr } from 'listr2'
import { execa } from '@marchyang/execa'
import path from 'path';
import fs from 'fs';

const vscode = {
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript"
    ],
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "editor.tabSize": 4,
    "eslint.options": {
        "configFile": ".eslintrc.js"
    }
}
interface Ctx {
    /* some variables for internal use */
}

const tasks = new Listr<Ctx>(
    [
        {
            title: 'Install dependent packages',
            task: () => {
                return execa('npm', ['install',
                    'eslint',
                    'babel-eslint',
                    '@typescript-eslint/eslint-plugin',
                    '@typescript-eslint/parser',
                    'eslint-plugin-react',
                    'eslint-plugin-react-hooks',
                    'jsx-control-statements'
                ])
            }
        },
        {
            title: 'copy .eslintrc file',
            task: () => {
                return execa('cp', [path.resolve(__dirname, './.eslintrc.js'), process.cwd()])
            }
        },
        {
            title: 'set vscode config',
            task: () => {

                return new Promise((resolve, reject) => {
                    const vscodeConfig = path.resolve(process.cwd(), '.vscode/settings.json');
                    let fileStat = null;
                    try{
                        fileStat = fs.statSync(vscodeConfig);
                    }catch(error){
                      
                    }
                    let configObj = {};
                    if (fileStat && fileStat.isFile()) {
                        const configString = fs.readFileSync(vscodeConfig, { encoding: 'utf8' });
                        try {
                            configObj = JSON.parse(configString);
                        } catch (error) {
                            reject('.vscode/settings.json 解析错误！')
                        }
                        configObj = {
                            ...vscode,
                            ...configObj,
                        }
                    }
                    fs.writeFileSync(vscodeConfig, JSON.stringify(configObj, null, 4), { encoding: 'utf-8' });
                    resolve(undefined)
                })
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