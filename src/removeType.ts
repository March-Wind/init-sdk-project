#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
const packagePath = path.resolve(process.cwd(), 'package.json');
const configString = fs.readFileSync(packagePath, { encoding: 'utf8' });
const configObj = JSON.parse(configString);
delete configObj.type;
fs.writeFileSync(packagePath, JSON.stringify(configObj, null, 4), { encoding: 'utf-8' });