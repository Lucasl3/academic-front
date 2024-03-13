export const SECRETARY = 1
export const STUDENT = 2

export type TProfiles = 1 | 2

export const profilesLabels = (profile: TProfiles) => {
  switch (profile) {
    case 1:
      return 'Secretaria'
    case 2:
      return 'Aluno'
    default:
      return 'Aluno'
  }
}
