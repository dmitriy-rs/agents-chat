import { v4 } from 'uuid'

export function uuid<T extends string>() {
  return v4() as T
}
