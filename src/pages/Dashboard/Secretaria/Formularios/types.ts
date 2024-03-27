export type FormValues = {
  nome: string
  descricao: string
  bloqueado: boolean
  dataInicio: string
  dataFim: string
  secoes: Array<SecaoValues>
}

export type SecaoValues = {
  titulo: string
  descricao: string
  questoes: Array<QuestaoValues>
}

export type QuestaoValues = {
  titulo: string
  descricao: string
  tipo: string
  obrigatorio: boolean
  itens?: Array<ItemValues>
}

export type ItemValues = { label: string; value: string }

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
