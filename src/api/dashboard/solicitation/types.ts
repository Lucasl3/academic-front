export interface IGetSolicitationDTO {
  coSolicitation: number
  dtCreatedAt: string
  dtUpdatedAt: string
  dtDeletedAt: string
  isDeleted: boolean
  coStatus: number
  coForm: number
  coUser: number
  ncoAnswerFormQuestion: any
}

export interface ISolicitationDTOBase {
  coForm: number
  coUser: number
  ncoAnswerFormQuestion: any
}

export interface IPostSolicitationDTO extends ISolicitationDTOBase {}

export interface IPutSolicitationDTO extends ISolicitationDTOBase {
  coSolicitation: number
}

export type TGetSolicitationParams = { id: number }
export type TGetSolicitationsResponse = Array<IGetSolicitationDTO>
export type TGetSolicitationResponse = IGetSolicitationDTO
export type TPostSolicitationParams = IPostSolicitationDTO
export type TPostSolicitationResponse = IGetSolicitationDTO
export type TPutSolicitationParams = IPutSolicitationDTO
export type TPutSolicitationResponse = IGetSolicitationDTO
