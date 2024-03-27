export interface IGeFormularioDTO {
  coFormulario: number
  noFormulario: string
  dsFormulario: string
  dtLimiteFormulario: string
  dtCreatedAt: string
  dtUpdatedAt: string
  dtDeletedAt: string
  isDeleted: boolean
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

export type TGetFormularioParams = { id: number }
export type TGetFormsResponse = Array<IGeFormularioDTO>
export type TGetFormularioResponse = IGeFormularioDTO
export type TPostFormularioParams = IPostTutorialDTO
export type TPostFormularioResponse = IGeFormularioDTO
export type TPutFormularioParams = IPutTutorialDTO
export type TPutFormularioResponse = IGeFormularioDTO
