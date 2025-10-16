import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

import { TASK_MESSAGES } from '@/constants/tasks.constants'

@ValidatorConstraint({ async: false })
export class IsNotPastDateConstraint implements ValidatorConstraintInterface {
  validate(value: unknown): boolean {
    if (value === null || value === undefined) {
      return true
    }

    if (!(value instanceof Date)) {
      return false
    }

    const now = new Date()
    now.setHours(0, 0, 0, 0)

    const deadline = new Date(value)
    deadline.setHours(0, 0, 0, 0)

    return deadline >= now
  }

  defaultMessage(): string {
    return TASK_MESSAGES.DEADLINE_CANNOT_BE_IN_PAST
  }
}

export function IsNotPastDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotPastDateConstraint,
    })
  }
}
