import { Listr } from 'listr2'
import {execa} from '@marchyang/execa'
import path from 'path';
interface Ctx {
    /* some variables for internal use */
}

const tasks = new Listr<Ctx>(
    [
        {
            title: 'Install dependent packages',
            task:() => {
                return execa('npm',['install', 
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
            task:() => {
                return execa('cp',[path.resolve(__dirname,'./.eslintrc.js'), process.cwd()])
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