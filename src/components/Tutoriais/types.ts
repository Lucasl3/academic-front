export interface ITutorial {
  id: number
  title: string
  description: string
  image?: string
  url: string
}

export interface ITutorialsProps {
  tutorials: Array<ITutorial>
  isLoading?: boolean
}
