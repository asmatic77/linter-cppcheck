"use babel";

export default {
	config: {
		// It should be noted that I, Kepler, hate these Config names. However these
		//	are the names in use by many people. Changing them for the sake of clean
		//	of clean code would cause a mess for our users. Because of this we
		//	override the titles the editor gives them in the settings pane.
		execPath: {
			type: "string",
			default: "cppcheck"
		},
		cppcheckEnabledChecks: {
			type: "string",
			default: "all"
		},
		cppcheckSomeFlag: {
			type: "boolean",
			default: false
		}
	},

	activate: () => {
		require("atom-package-deps").install("linter-clang");
	},

	provideLinter: () => {
		const helpers = require("atom-linter");
		//const regex = "(?<file>.+):(?<line>\\d+):(?<col>\\d+):\\s*\\w*\\s*(?<type>(error|warning)):(?<message>.*)";
		const regex = "\\[(?<file>.+):(?<line>\\d+)\\]:\\s\\((?<type>(warning|style|performance|portability|information|unusedFunction|missingInclude))\\)\\s(?<message>.*)";

		// Read configuration data from JSON file .gcc-config.json
		// in project root
		return {
			name: "cppcheck",
			grammarScopes: ["source.c", "source.cpp"],
			scope: "file",
			lintOnFly: false,
			lint: (activeEditor) => {
				//fileConfig = require("./config");
				const command = atom.config.get("linter-cppcheck.execPath");
				var file = activeEditor.getPath();
				const grammar = activeEditor.getGrammar().name;

				var path = require('path');
				//fileConfig.settings();
				var cwd = atom.project.getPaths()[0]
				if (!cwd) {
						editor = atom.workspace.getActivePaneItem();
						if (editor) {
								file = editor.buffer.file;
								if (file) {
										cwd = file.getParent().getPath();
								}
						}
				}
				//console.log("linter cppcheck return provideLint!");
				args = [];
				console.log(grammar);
				if((grammar === "C++") || (grammar === "C") || (grammar === "C++14")) {
					//const language = "c++";
					s = atom.config.get("linter-ccpcheck.cppcheckEnabledChecks");
					//args.push("--enable="+s)
					args.push("--enable=all")
				}
				// if(atom.config.get("linter-ccpcheck.verboseDebug")) {
				//	 args.push("--verbose");
				// }
				//
				//
				// New set of arguments
				args.push(file);
				full_command = "linter-cppcheck: " + command;
				args.forEach(function(entry){
						full_command = full_command + " " + entry;
				});
				console.log(full_command);
				//const regex = "(?<file>.+):(?<line>\\d+):\\s*\\w*\\s*(?<type>(warning|style|performance|portability|information|unusedFunction|missingInclude)):(?<message>.*)";
				return helpers.exec(command, args, {stream: "stderr"}).then(output =>
          helpers.parse(output, regex)
        );
			}
		};
	}
};
