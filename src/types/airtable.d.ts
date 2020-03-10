declare module 'airtable' {
  function configure(options: { apiKey: string }): void

  function base(baseId: string): BaseGetterFunction
  type BaseGetterFunction = <RecordType>(baseName: string) => Base<RecordType>

  class Base<RecordType> {
    select: (params?: SelectParams) => BaseSelection<RecordType>
    find(id: string): BaseSelection<RecordType>
    create(
      record: RecordType,
      opts?: { typecast: boolean }
    ): Promise<Record<RecordType>>
    update: (
      updates: Array<{ id: string; fields: Partial<RecordType> }>,
      callback: UpdateCallback
    ) => void
  }

  type SelectionCallback<RecordType> = (
    err: Error,
    records: Records<RecordType>
  ) => void
  type UpdateCallback = (err: Error) => void

  class BaseSelection<RecordType> {
    firstPage: (callback: SelectionCallback<RecordType>) => void
    all: (callback: SelectionCallback<RecordType>) => void
  }

  class Record<Fields> {
    id: string
    // TODO: Use Fields to properly type this fn
    get: (key: string) => any
    fields: Fields
  }
  type Records<TFields> = ReadonlyArray<Record<TFields>>
  type SelectParams = {
    fields?: string[]
    filterByFormula?: string
    maxRecords?: number
    pageSize?: number
    sort?: {
      field: string
      direction?: 'asc' | 'desc'
    }[]
    view?: string
    cellFormat?: 'json' | 'string'
    timeZone?: string
    userLocale?: string
  }
  type Attachments = {
    id: string
    url: string
    filename: string
    size: number
    type: string
    thumbnails: {
      small: Thumbnail
      large: Thumbnail
      full: Thumbnail
    }
  }[]
  type Thumbnail = {
    url: string
    width: number
    height: number
  }
}
