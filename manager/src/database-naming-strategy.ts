import { DefaultNamingStrategy } from 'typeorm'
import { snakeCase } from 'typeorm/util/StringUtils'

export class DatabaseNamingStrategy extends DefaultNamingStrategy {
  tableName(targetName: string, userSpecifiedName: string | undefined): string {
    return super
      .tableName(targetName, userSpecifiedName)
      .replace(/_entity$/, '')
  }

  columnName(propertyName: string, userSpecifiedName: string | undefined): string {
    return userSpecifiedName ? userSpecifiedName : snakeCase(propertyName)
  }
}

