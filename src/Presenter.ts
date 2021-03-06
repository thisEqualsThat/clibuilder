import { Command, CommandBase, Argument } from './Command'
import { DisplayLevel } from './Display'

export interface CommandModel extends CommandBase {
  description?: string
  commands?: CommandModel[]
  arguments?: Argument[],
  alias?: string[]
  options?: Command.Options
}

export interface LogPresenter {
  setDisplayLevel(displayLevel: DisplayLevel): void
  info(...args: any[]): void
  warn(...args: any[]): void
  error(...args: any[]): void
  debug(...args: any[]): void
}

export interface PromptPresenter{
  prompt(...args: any[]): Promise<any[]>
}

export interface HelpPresenter {
  showHelp(command: CommandModel): void
}
export interface VersionPresenter {
  showVersion(version: string): void
}

export interface PresenterOption {
  name: string
}
