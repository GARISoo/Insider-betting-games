import morgan from 'morgan';
import chalk from 'chalk';
import { format } from 'date-fns';

const date = new Date();

morgan.token('date', () => format(date, 'yyyy-MM-dd HH:mm:ss'));

morgan.token('status', (req: any, res: { headersSent: any; header: any; statusCode: any; }) => {
  // get the status code of response written
  const status = (typeof res.headersSent !== 'boolean' ? Boolean(res.header) : res.headersSent)
    ? res.statusCode
    : undefined;

  function getColor() {
    // Red
    if (status >= 500) return 31;

    // Yellow
    if (status >= 400) return 33;

    // Cyan
    if (status >= 300) return 36;

    // Green
    if (status >= 200) return 32;

    // White
    return 0;
  }

  const color = getColor();

  return `\x1b[${color}m${status}\x1b[0m`;
});

const morganChalk = morgan((tokens: { [x: string]: (arg0: any, arg1: any) => any; date: (arg0: any, arg1: any) => unknown; method: (arg0: any, arg1: any) => unknown; status: (arg0: any, arg1: any) => unknown; url: (arg0: any, arg1: any) => unknown; }, req: any, res: any) => [
  chalk.white(tokens.date(req, res)),
  chalk.green.bold(tokens.method(req, res)),
  chalk.bold(tokens.status(req, res)),
  chalk.white(tokens.url(req, res)),
  chalk.yellow(`${tokens['response-time'](req, res)} ms`),
].join(' '));

export default morganChalk;
