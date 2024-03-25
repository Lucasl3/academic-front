import moment from 'moment'

export const formatDate = (
  timestamp: string,
  format: string = 'DD/MM/YYYY',
) => {
  if (!timestamp) return ''
  const date = moment(timestamp)

  return date.format(format)
}

export const getCurrentDate = (format: string = 'DD/MM/YYYY') => {
  return moment().format(format)
}
