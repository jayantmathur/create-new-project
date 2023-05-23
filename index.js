#!/usr/bin/env node

/**
 * create-new-project
 * Custom CLI to create a new project repository
 *
 * @author Jayant Mathur <nourl@url.com>
 */

import chalk from 'chalk';
import inquirer from 'inquirer';
import axios from 'axios';
import merge from 'deepmerge';
import { clear } from 'console';
import { execSync, execFileSync, exec } from 'child_process';
import { existsSync, mkdirSync, rm, readFileSync, writeFileSync } from 'fs';
import fse from 'fs-extra';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import packageJson from './package.json' assert { type: 'json' };
import cli from './utils/cli.js';

//
//
//
//
// Declarations
//
//
//
//

const __dirname = dirname(fileURLToPath(import.meta.url));

const sleep = (ms = 2000) => new Promise(resolve => setTimeout(resolve, ms));

const copy = async (src, dest) => {
	try {
		fse.copySync(src, dest, { overwrite: true | false });
	} catch (err) {
		console.error(err);
	}
};

const appendJson = async (filename, data) => {
	const file = readFileSync(filename);

	//check if file is empty
	if (file.length == 0) writeFileSync(filename, JSON.stringify(data));
	else {
		const result = merge.all([JSON.parse(file.toString()), data]);
		writeFileSync(filename, JSON.stringify(result));
	}
};

const createNewProject = async project => {
	// mkdirSync(`${project.name}`);

	// execSync(`yarn init -y`, { cwd: `${project.name}` });
	// execSync(`yarn add -DW turbo`, { cwd: `${project.name}` });

	execSync(`yarn create turbo ${project.name}`, {
		stdio: 'inherit'
	});

	await appendJson(`${project.name}/turbo.json`, {
		pipeline: {
			push: {
				cache: false
			}
		}
	});

	rm(
		`${project.name}/packages`,
		{ recursive: true, force: true },
		async () => {
			rm(
				`${project.name}/apps`,
				{ recursive: true, force: true },
				async () => {
					rm(
						`${project.name}/.git`,
						{ recursive: true, force: true },
						() => {}
					);

					await appendJson(`${project.name}/package.json`, {
						private: true,
						// workspaces: ['apps/*', 'docs/*'],
						workspaces: ['docs/*'],
						scripts: {
							push: 'yarn format & yarn save & yarn version',
							postpush: 'turbo run --no-daemon push',
							build: 'turbo run --no-daemon build',
							dev: 'turbo run --no-daemon dev',
							format: 'prettier --write "**/*.{ts,tsx,md,qmd,tex,json,ipynb}" --loglevel silent',
							save: './packages/symlink/index.bat',
							padd: 'node ./packages/padd',
							'import-resource':
								'node ./packages/import-resource',
							update: 'scoop update * & yarn upgrade & yarn install'
						}
					});

					execSync(
						`yarn add -DW prettier prettier-plugin-latex @svgr/cli @svgr/plugin-jsx icon-gen`,
						{
							cwd: `${project.name}`,
							stdio: 'ignore'
						}
					);

					console.log('Created new project\n');

					await copy(`${__dirname}/common`, `${project.name}`);
					console.log('Copied over core packages\n');

					await sleep(1000);
				}
			);
		}
	);
};

const createApp = async (project, type) => {
	// const api = await axios.get('https://api.api-ninjas.com/v1/randomword', {
	// 	headers: {
	// 		'X-Api-Key': 'N85w2VKcIHGeWBKG2s2c/g==K2lmmrY2G2E508CO'
	// 	}
	// });

	const api = await axios.get(
		'https://random-word-api.herokuapp.com/word?length=4'
	);

	const appName = api.data[0];

	// let api = await axios.get(
	// 	`https://latinwordnet.exeter.ac.uk/api/index/r/?limit=1`
	// );
	// const count = api.data.count;

	// api = await axios.get(
	// 	`https://latinwordnet.exeter.ac.uk/api/index/r/?limit=1&offset=${Math.ceil(
	// 		Math.random() * count
	// 	)}`
	// );

	// const name = api.data.results[0].lemma;

	// const appName = name
	// 	?.toLowerCase()
	// 	?.replaceAll('\r', '')
	// 	?.replaceAll('\n', '')
	// 	?.replaceAll(' ', '')
	// 	?.slice(0, 4);

	const port = Math.floor(Math.random() * (9999 - 1000) + 1000);

	if (type === 'app') {
		if (!existsSync(`${project.name}/apps`))
			mkdirSync(`${project.name}/apps`);

		execSync(
			`yarn create next-app ${project.name}/apps/${appName} --typescript --eslint --tailwind --no-src-dir --app --import-alias "@/*"`,
			{
				// stdio: 'inherit'
			}
		);

		await copy(
			`${__dirname}/repos/apps/repo`,
			`${project.name}/apps/${appName}`
		);

		await appendJson(
			`${project.name}/apps/${appName}/public/manifest.json`,
			{
				name: `${project.name} app: ${appName}`,
				short_name: appName
			}
		);

		await copy(
			`${__dirname}/resources/web`,
			`${project.name}/resources/web`
		);
		console.log('Copied over sample web app resources\n');

		await appendJson(`${project.name}/turbo.json`, {
			pipeline: {
				deploy: {
					cache: false
				}
			}
		});

		execSync(`yarn add -DW typesync`, {
			cwd: `${project.name}`
		});

		await appendJson(`${project.name}/package.json`, {
			scripts: {
				deploy: 'turbo run --no-daemon deploy',
				preinstall: 'yarn typesync & echo Done!',
				'create-index': 'node ./packages/create-index',
				svgr: './packages/runsvgr'
			}
		});

		await appendJson(`${project.name}/apps/${appName}/package.json`, {
			name: appName,
			scripts: {
				predev: 'ipconfig | findstr /i ipv4',
				dev: `next dev --port ${port} --turbo`,
				push: 'yarn version',
				deploy: 'echo Vercel package not installed for app deployment! Install Vercel first...'
			}
		});

		console.log(
			`${chalk.green.bold('Added web app: ')}${chalk.bold(appName)}\n`
		);
	}

	if (type === 'doc') {
		if (!existsSync(`${project.name}/docs`))
			mkdirSync(`${project.name}/docs`);

		await copy(
			`${__dirname}/repos/docs`,
			`${project.name}/docs/${appName}`
		);

		await appendJson(`${project.name}/docs/${appName}/package.json`, {
			name: appName,
			scripts: {
				predev: 'ipconfig | findstr /i ipv4',
				dev: `quarto preview index.qmd --port ${port}`,
				build: `quarto render index.qmd`,
				activate:
					'conda activate base && jupyter notebook --port 8000 --no-browser',
				push: 'yarn version'
			}
		});
		console.log(
			`${chalk.green.bold('Added doc: ')}${chalk.bold(appName)}\n`
		);
		await copy(
			`${__dirname}/resources/docs`,
			`${project.name}/resources/docs`
		);
		console.log('Copied over sample doc resources\n');

		execSync(
			`quarto install extension quarto-ext/latex-environment --no-prompt --quiet`,
			{
				cwd: `${project.name}/docs/${appName}`,
				stdio: 'inherit'
			}
		);

		console.log("Installed quarto's latex-environment extension");

		await copy(
			`${__dirname}/resources/docs/quarto/main`,
			`${project.name}/docs/${appName}/_extensions/main`
		);

		console.log('Imported quarto template extension\n');
	}

	await copy(
		`${__dirname}/public`,
		`${project.name}/${type}s/${appName}/public`
	);
	console.log('Copied over personal public directory\n');

	await sleep(1000);
};

const handleCleanup = async project => {
	if (project.action === 'new') {
		execFileSync(`${__dirname}/common/packages/setuppyr/index.bat`);

		console.log(chalk.gray.bold('Setup or reset pyr\n'));
	}

	rm(`${project.name}/node_modules`, { recursive: true, force: true }, () => {
		exec(`yarn install`, { cwd: `${project.name}` }, () =>
			exec(`code ${project.name}`, err => {
				if (err) throw err;
				// clear();
				console.log(chalk.green.bold('Done!!'));
				console.log(chalk.blue.bold('Opening project in VS Code...\n'));
			})
		);
	});
};

//
//
//
//
// Main
//
//
//
//

clear();

cli.input.includes('--help') && console.log('help');

console.log(
	chalk.cyan.bold('New Project Creator'),
	chalk.bgYellow.bold('', packageJson.version, '')
);
console.log(chalk.gray(packageJson.description));

const newOrUpdate = cli.flags.new
	? 'new'
	: cli.flags.update
	? 'update'
	: undefined;

const withWebApp = cli.flags.web ? true : cli.flags.noweb ? false : undefined;

const withDoc = cli.flags.doc ? true : cli.flags.nodoc ? false : undefined;

const action = await inquirer.prompt({
	type: 'list',
	name: 'choice',
	message: 'What do you want to do?',
	choices: ['Create a new project', 'Update an existing project', 'Exit'],
	default: 'Create a new project',
	when: () => newOrUpdate === undefined
});

let project = {
	name: undefined,
	action: undefined
};

if (!newOrUpdate)
	switch (action.choice) {
		case 'Create a new project':
			project.action = 'new';
			break;
		case 'Update an existing project':
			project.action = 'update';
			break;
		case 'Exit':
			console.log(chalk.red.bold('Exiting...\n'));
			process.exit(0);
	}
else project.action = newOrUpdate;

switch (project.action) {
	case 'new':
		// const api = await axios.get('https://api.api-ninjas.com/v1/randomword', {
		// 	headers: {
		// 		'X-Api-Key': 'N85w2VKcIHGeWBKG2s2c/g==K2lmmrY2G2E508CO'
		// 	}
		// });

		if (cli.flags.name) project.name = cli.flags.name;
		else {
			// let api = await axios.get(
			// 	`https://latinwordnet.exeter.ac.uk/api/index/r/?limit=1`
			// );
			// const count = api.data.count;

			// api = await axios.get(
			// 	`https://latinwordnet.exeter.ac.uk/api/index/r/?limit=1&offset=${Math.ceil(
			// 		Math.random() * count
			// 	)}`
			// );

			// // const name = await handleAPIRequest(api.error, api.status, api.data);
			// const name = api.data.results[0].lemma;

			// project.name = name
			// 	?.toLowerCase()
			// 	?.replaceAll('\r', '')
			// 	?.replaceAll('\n', '')
			// 	?.replaceAll(' ', '')
			// 	?.slice(0, 6);
			const api = await axios.get(
				'https://random-word-api.herokuapp.com/word?length=6'
			);

			project.name = api.data[0];
		}

		console.log(chalk.greenBright('Creating a new project\n'));
		console.log(chalk.bold('>>'), chalk.bold(project.name), '\n');

		break;
	case 'update':
		const existingProject = await inquirer.prompt({
			type: 'input',
			name: 'name',
			message: 'Enter the name of the project to update:',
			validate: input => {
				if (!existsSync(input)) {
					return `${chalk.red(
						`Project does not exist!\n`
					)} Please try again or press Ctrl+C to exit.`;
				} else {
					console.log(chalk.green('Project found!\n'));
					return true;
				}
			}
		});

		project.name = existingProject.name;

		console.log(chalk.yellow.bold('Updating existing project...\n'));
		console.log(chalk.bold('>>'), chalk.bold(project.name), '\n');
		break;
}

if (project.action === 'new') await createNewProject(project);

const repos = await inquirer.prompt([
	{
		type: 'confirm',
		name: 'app',
		message: 'Create a new web app?',
		default: withWebApp === undefined ? false : withWebApp,
		when: () => withWebApp === undefined
	},
	{
		type: 'confirm',
		name: 'doc',
		message: 'Create a new doc?',
		default: withDoc === undefined ? false : withDoc,
		when: () => withDoc === undefined
	}
]);

await sleep();

if (repos.app || repos.doc || withDoc || withWebApp) {
	console.log('Creating repos...\n');
	if (repos.app || withWebApp) await createApp(project, 'app');
	await sleep();
	if (repos.doc || withDoc) await createApp(project, 'doc');
} else console.log('No repos to create\n');

await handleCleanup(project);
