import { format, parseISO } from 'date-fns';

export const compareDates = (a, b) => parseISO(b.date) - parseISO(a.date);

export const formatDate = date => format(new Date(date), 'dd MMM yyyy');
