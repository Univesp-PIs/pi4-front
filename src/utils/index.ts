import { format, isValid, parse } from 'date-fns'

export const meses: Record<number, string> = {
  1: 'Jan',
  2: 'Fev',
  3: 'Mar',
  4: 'Abr',
  5: 'Mai',
  6: 'Jun',
  7: 'Jul',
  8: 'Ago',
  9: 'Set',
  10: 'Out',
  11: 'Nov',
  12: 'Dez',
}

// Aceita string em "dd/MM/yyyy", "yyyy-MM-dd" ou Date
export function toInputDate(date?: string | Date): string {
  if (!date) return ''
  let d: Date

  if (date instanceof Date) {
    d = date
  } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
    d = parse(date, 'dd/MM/yyyy', new Date())
  } else if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    d = parse(date, 'yyyy-MM-dd', new Date())
  } else {
    return ''
  }

  return isValid(d) ? format(d, 'yyyy-MM-dd') : ''
}

// Aceita string em "dd/MM/yyyy", "yyyy-MM-dd" ou Date
export function toBackendDate(date?: string | Date): string {
  if (!date) return ''
  let d: Date

  if (date instanceof Date) {
    d = date
  } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
    d = parse(date, 'dd/MM/yyyy', new Date())
  } else if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    d = parse(date, 'yyyy-MM-dd', new Date())
  } else {
    return ''
  }

  return isValid(d) ? format(d, 'dd/MM/yyyy') : ''
}
