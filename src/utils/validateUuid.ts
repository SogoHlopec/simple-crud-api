import { validate as uuidValidate } from 'uuid';

const validateUuid = (id: string): boolean => {
  return uuidValidate(id);
};

export { validateUuid };
