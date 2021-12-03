export function fieldToDocument(data: any){
  let fields: any = []

  data.forEach((item: any) => {
    fields.push({
      fields: resolveFields(item)
    })
  })

  return fields
}

export function resolveFields(item: any){
  let fields: any = []

  Object.keys(item).forEach((name: string) => {
    fields = [...fields, {
      key: name,
      value: item[name]
    }]
  })

  return fields
}

export function documentToField(document: any){
  let fields: any = {}

  if(document && document.length > 0){
   for (let index = 0; index < document.length; index++) {
    const field = document[index];
    fields = {
      ...fields,
      [field.key]: field.value
    }
   }
  }

  return fields
}
