export interface IGetFormularioDTO {
  coForm: number
  noForm: string
  dsForm: string
  dtLimit: string
  dtCreatedAt: string
  dtUpdatedAt: string
  dtDeletedAt: string
  isDeleted: boolean
}

export interface IFormularioDTOBase {
  noForm: string
  dsForm: string
  dtLimit: string
  ncoStep: object[]
}

export interface IPostFormularioDTO extends IFormularioDTOBase {}

export interface IPutFormularioDTO extends IFormularioDTOBase {
  coFormulario: number
}

export type TGetFormularioParams = { id: number }
export type TGetFormsResponse = Array<IGetFormularioDTO>
export type TGetFormularioResponse = IGetFormularioDTO
export type TPostFormularioParams = IPostFormularioDTO
export type TPostFormularioResponse = IGetFormularioDTO
export type TPutFormularioParams = IPutFormularioDTO
export type TPutFormularioResponse = IGetFormularioDTO
