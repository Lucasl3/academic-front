import moment from 'moment'
import 'moment/locale/pt-br'

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

export const formatDateWithDayOfWeek = (
  timestamp: string,
  format: string = 'DD/MM/YYYY',
) => {
  if (!timestamp) return ''
  moment.locale('pt-br')
  const date = moment(timestamp)
  const formattedDate = date.format(format)
  const dayOfWeek = date.format('dddd')
  const time = date.format('HH:mm')

  return `${dayOfWeek.toUpperCase()}, ${formattedDate} às ${time}`
}
