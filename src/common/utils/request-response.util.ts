export function res(code: number, data: any) {
  return { status: 'Success', code: code, result: data };
}

export function pagination(page: string | number, lim: string | number) {
  const skip = Number(page) || 1;
  const limit = Number(lim) || 10;
  const start = limit * (skip - 1);

  return { start, limit };
}
