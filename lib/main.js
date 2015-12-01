"use babel";

export default {
	config: {
		// It should be noted that I, Kepler, hate these Config names. However these
		//  are the names in use by many people. Changing them for the sake of clean
		//  of clean code would cause a mess for our users. Because of this we
		//  override the titles the editor gives them in the settings pane.
		execPath: {
			type: "string",
			default: "/usr/bin/cppcheck"
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
		if(!atom.packages.getLoadedPackages("linter")) {
      atom.notifications.addError(
        "Linter package not found.",
        {
          detail: "Please install the `linter` package in your Settings view."
        }
      );
    }
		console.log("linter cppcheck activated damnit!!!");
	},

	provideLinter: () => {
		console.log("linter cppcheck about to proviode linters damnit!!!");
		const helpers = require("atom-linter");
		//const regex = "(?<file>.+):(?<line>\\d+):(?<col>\\d+):\\s*\\w*\\s*(?<type>(error|warning)):(?<message>.*)";
		const regex = "(?<file>.+):(?<line>\\d+):\\s*\\w*\\s*(?<type>(warning|style|performance|portability|information|unusedFunction|missingInclude)):(?<message>.*)";

		// Read configuration data from JSON file .gcc-config.json
		// in project root
		return {
			name: 'Linter CppCheck',
			grammarScopes: ["source.c", "source.cpp"],
			scope: 'file',
			lintOnFly: false,
			lint: (activeEditor) => {
				fileConfig = require("./config");
				var path = require('path');
				fileConfig.settings();
				var file = activeEditor.getPath();
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
				command = atom.config.get("linter-cppcheck.execPath");

				// Expand path if necessary
				if (command.substring(0,1) == ".") {
						command = path.join(cwd, command);
				}

				args = [];
				// const args = ["-fsyntax-only",
				//   "-fno-caret-diagnostics",
				//   "-fno-diagnostics-fixit-info",
				//   "-fdiagnostics-print-source-range-info",
				//   "-fexceptions"];
				//
				if((activeEditor.getGrammar().name === "C++") || (activeEditor.getGrammar().name === "C")) {
					//const language = "c++";
					s = atom.config.get("linter-ccpcheck.cppcheckEnabledChecks");
					args.push("--enable="+s)
				}
				// if(atom.config.get("linter-ccpcheck.verboseDebug")) {
				//   args.push("--verbose");
				// }
				//
				//
				// New set of arguments
				args.push(file);

				full_command = "linter-gcc: " + command;
				args.forEach(function(entry){
						full_command = full_command + " " + entry;
				});

				console.log(full_command);
				return helpers.exec(command, args, {stream: "stderr"}).then(output =>
					helpers.parse(output, regex)
				);
			}
		};
	}
};
