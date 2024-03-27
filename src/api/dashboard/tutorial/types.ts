export interface IGetTutorialDTO {
  coTutorial: number
  dtCreatedAt: string
  dtUpdatedAt: string
  dtDeletedAt: string
  isDeleted: boolean
  noTutorial: string
  dsTutorial: string
  coStatus: boolean
  contentTutorial: string
}

export interface ITutorialDTOBase {
  noTutorial: string
  dsTutorial: string
  contentTutorial: string
}

export interface IPostTutorialDTO extends ITutorialDTOBase {}

export interface IPutTutorialDTO extends ITutorialDTOBase {
  coTutorial: number
}

export type TGetTutorialParams = { id: number }
export type TGetTutorialsResponse = Array<IGetTutorialDTO>
export type TGetTutorialResponse = IGetTutorialDTO
export type TPostTutorialParams = IPostTutorialDTO
export type TPostTutorialResponse = IGetTutorialDTO
export type TPutTutorialParams = IPutTutorialDTO
export type TPutTutorialResponse = IGetTutorialDTO
