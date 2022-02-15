


export type BooleanInput = string | boolean | null | undefined;

export function coerceBooleanProperty(value: any): boolean {
    return value != null && `${value}` !== 'false';
  }