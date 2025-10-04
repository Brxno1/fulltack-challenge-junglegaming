import { applyDecorators } from '@nestjs/common'

export function applySwaggerDocs(
  operation: () => any,
  responses: () => any[],
  bodyExample?: any,
) {
  const decorators = [operation(), ...responses()]

  if (bodyExample) {
    decorators.push(bodyExample)
  }

  return applyDecorators(...decorators)
}
