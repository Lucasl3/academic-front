export type FormValues = {
  noForm: string
  dsForm: string
  dtLimit: string
  ncoStep: Array<SecaoValues>
}

export type SecaoValues = {
  noFormStep: string
  dsFormStep: string
  ncoFormQuestion: Array<QuestaoValues>
}

export type QuestaoValues = {
  noQuestion: string
  dsQuestion: string
  coTypeQuestion: string
  isRequired: boolean
  ncoFormItem?: Array<ItemValues>
}

export type ItemValues = { dsItem: string }

export type SecaoItemProps = {
  secao: SecaoValues
  indexSecao: number
  remove: (indexSecao: number) => void
}

export type QuestaoItemProps = {
  questao: QuestaoValues
  indexQuestao: number
  indexSecao: number
  remove: (indexQuestao: number) => void
}
