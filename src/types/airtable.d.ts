declare module 'airtable' {
  function configure(options: { apiKey: string }): void

  function base(baseId: string): BaseGetterFunction
  type BaseGetterFunction = <RecordType>(baseName: string) => Base<RecordType>

  class Base<RecordType> {
    select: () => BaseSelection<RecordType>
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
    records: Array<Record<RecordType>>
  ) => void
  type UpdateCallback = (err: Error) => void

  class BaseSelection<RecordType> {
    firstPage: (callback: SelectionCallback<RecordType>) => void
  }

  class Record<Fields> {
    id: string
    // TODO: Use Fields to properly type this fn
    get: (key: string) => any
  }
}
