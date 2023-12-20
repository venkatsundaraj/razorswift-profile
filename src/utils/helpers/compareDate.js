import { format, parseISO } from 'date-fns';

export const compareDates = (a, b) => parseISO(a.date) - parseISO(b.date);

export const formatDate = date => format(new Date(date), 'dd MMM yyyy');
