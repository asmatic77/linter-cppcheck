# linter-ccpcheck package

Linter plugin for [Linter](https://github.com/AtomLinter/Linter), provides an interface to cppcheck.

This is my fist attempt to do a atom plugin. Use it at your own risk.

Used with files with grammar "C" and "C++".

Clone of [linter-gcc](https://github.com/hebaishi/linter-gcc) by [Hebaishi](https://github.com/hebaishi).

## Screenshot

[//] ![linter-gcc screenshot](https://github.com/hebaishi/images/blob/master/lintergcc-screenshot.png?raw=true)

## Project-Specific settings

Just place a file called ```.cppcheck-cfg.json``` in your project root, with the following content:

```json
{
  "execPath": "/usr/bin/cppcheck",
  "cppcheckEnabledChecks": "all",
  "cppcheckSomeFlag": true
}
```
### Debugging
The command executed by linter-cppcheck is written to the console on file save, so simply open the console to see the full command.
