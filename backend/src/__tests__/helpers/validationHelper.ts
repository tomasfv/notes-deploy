import { validationResult } from 'express-validator';
import { Request } from 'express';
import { createNoteValidation, updateNoteValidation } from '../../validations/note';
import { createCategoryValidation, updateCategoryValidation } from '../../validations/category';

export async function runValidation(
  type: 'create' | 'update',
  body: Record<string, any>
): Promise<{ field: string; message: string }[]> {
  const fakeReq = {
    body,
    params: type === 'update' ? { id: '550e8400-e29b-41d4-a716-446655440000' } : {},
    query: {},
    headers: {},
    get: () => '',
    header: () => '',
    accepts: () => '',
    acceptsCharsets: () => [],
    acceptsEncodings: () => [],
    acceptsLanguages: () => [],
    is: () => false,
  } as unknown as Request;

  const chains = body.title !== undefined || body.content !== undefined
    ? (type === 'create' ? createNoteValidation : updateNoteValidation)
    : (type === 'create' ? createCategoryValidation : updateCategoryValidation);

  for (const chain of chains) {
    await chain.run(fakeReq, {} as any);
  }

  const errors = validationResult(fakeReq);
  if (!errors.isEmpty()) {
    return errors.array().map((e) => ({
      field: 'path' in e ? e.path : 'unknown',
      message: e.msg,
    }));
  }
  return [];
}
