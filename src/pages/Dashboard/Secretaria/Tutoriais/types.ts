export interface IOption {
  value: string
  label: JSX.Element
}

export type TFormValues = {
  title: string
  description: string
  content: string
  status?: IOption | null
}
