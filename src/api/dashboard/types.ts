export interface IGetTutorialDTO {
  co_tutorial: number
  dt_create_at: string
  dt_update_at: string
  dt_delete_at: string
  is_deleted: boolean
  no_tutorial: string
  ds_tutorial: string
  content_tutorial: string
}

export interface ITutorialDTOBase {
  no_tutorial: string
  ds_tutorial: string
  content_tutorial: string
}

export interface IPostTutorialDTO extends ITutorialDTOBase {}

export interface IPutTutorialDTO extends ITutorialDTOBase {
  co_tutorial: number
}

export type TGetTutorialParams = { id: number }
export type TGetTutorialsResponse = Array<IGetTutorialDTO>
export type TGetTutorialResponse = IGetTutorialDTO
export type TPostTutorialParams = IPostTutorialDTO
export type TPostTutorialResponse = IGetTutorialDTO
export type TPutTutorialParams = IPutTutorialDTO
export type TPutTutorialResponse = IGetTutorialDTO
