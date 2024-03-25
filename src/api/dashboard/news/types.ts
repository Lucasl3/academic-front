export interface IGetNewDTO {
  coNews: number
  dtCreatedAt: string
  dtUpdatedAt: string
  dtDeletedAt: string
  isDeleted: boolean
  noNews: string
  dsNews: string
  dtNews: string
}

export interface INewDTOBase {
  noNews: string
  dsNews: string
  dtNews: string
}

export interface IPostNewDTO extends INewDTOBase {}

export interface IPutNewDTO extends INewDTOBase {
  coNews: number
}

export type TGetNewParams = { id: number }
export type TGetNewsResponse = Array<IGetNewDTO>
export type TGetNewResponse = IGetNewDTO
export type TPostNewParams = IPostNewDTO
export type TPostNewResponse = IGetNewDTO
export type TPutNewParams = IPutNewDTO
export type TPutNewResponse = IGetNewDTO
