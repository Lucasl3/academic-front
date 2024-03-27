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
export type TGetFormsResponse = Array<IGeFormularioDTO>
export type TGetFormularioResponse = IGeFormularioDTO
export type TPostFormularioParams = IPostFormularioDTO
export type TPostFormularioResponse = IGeFormularioDTO
export type TPutFormularioParams = IPutFormularioDTO
export type TPutFormularioResponse = IGeFormularioDTO
