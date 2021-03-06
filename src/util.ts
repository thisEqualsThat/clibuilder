import merge = require('lodash.merge')

import { Command, CommandSpec } from './Command'

export function createCommand(spec: CommandSpec, { cwd }): Command {
  const result = merge({
    run: () => { return },
    cwd
  }, spec)

  if (result.commands) {
    result.commands.forEach(c => c.parent = result)
  }

  return result as any
}

export function getCommand(nameOrAlias, commands: Command[]) {
  return commands.find(cmd => {
    const match = cmd.name === nameOrAlias ||
      (!!cmd.alias && cmd.alias.indexOf(nameOrAlias) !== -1)
    if (!match && cmd.commands) {
      return getCommand(nameOrAlias, cmd.commands)
    }
    return match
  })
}

export function getCommandAndAliasNames(commands: { name: string, alias?: string[] }[]) {
  const names: string[] = []
  commands.forEach(cmd => {
    names.push(cmd.name)
    if (cmd.alias) {
      names.push(...cmd.alias)
    }
  })
  return names.sort()
}
