const _ = require('lodash');
const minimist = require('minimist');

class Chirp {

	constructor(config) {
		this.config = Object.assign({
			name: '',
			description: '',
			version: '',
			commands: {}
		}, config);

		this.pkg = require.main.require('./package');
		this.overrideConfig();
		this.parseCommands();
		this.parseInputs();
		this.title = process.title = this.pkg.bin ? Object.keys(this.pkg.bin)[0] : this.config.name;
		this.buildHelp();
		this.run();
	}

	overrideConfig() {
		let config = this.config;
		let pkg = this.pkg;

		if (! config.name) {
			config.name = pkg.name;
		}

		if (! config.description) {
			config.description = pkg.description;
		}

		if (! config.version) {
			config.version = pkg.version;
		}
	}

	parseInputs() {
		this.argv = minimist(process.argv.slice(2));
	}

	parseCommands() {
		this.commands = _.mapValues(this.config.commands, (command, name) => {
			if (_.isFunction(command)) {
				return {
					_: command,
					size: command.length
				};
			}

			return command;
		});
	}

	buildHelp() {
		let help = [];
		let c = this.config;

		help.push(`${c.name} ${c.version}`)
		help.push(c.description);
		help.push('');
		help.push('Usage');
		help.push(`$ ${this.title} <${ _.keys(this.commands).join('|')}>`);
		help.push('');
		help.push('Commands');
		_.forEach(this.commands, (command, name) => {
			help.push(`${name}${command.args ? ' ['+command.args.join('] [')+']' : ''} ${command.help ? command.help : ''}`);
		});

		this.help = help.join('\n');
	}

	run() {
		this.showHelp();
	}

	showHelp() {
		this.log(this.help);
	}

	log(message = '') {
		console.log(message);

		return this;
	}

}

module.exports = Chirp;
