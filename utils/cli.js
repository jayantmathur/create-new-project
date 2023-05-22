import meow from 'meow';
import meowHelp from 'cli-meow-help';

const flags = {
	name: {
		type: `string`,
		desc: `Project name`,
		alias: `i`
	},
	new: {
		type: `boolean`,
		default: false,
		desc: `Create a new project`,
		alias: `n`
	},
	update: {
		type: `boolean`,
		default: false,
		desc: `Add to an existing project`,
		alias: `u`
	},
	web: {
		type: `boolean`,
		default: false,
		desc: `With web app`,
		alias: `w`
	},
	doc: {
		type: `boolean`,
		default: false,
		desc: `With doc`,
		alias: `d`
	},
	noweb: {
		type: `boolean`,
		default: false,
		desc: `Without web app`
	},
	nodoc: {
		type: `boolean`,
		default: false,
		desc: `Without doc`
	}
};

const commands = {
	help: { desc: `Print help info` }
};

const helpText = meowHelp({
	name: `create-new-project`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

export default meow(helpText, options);
