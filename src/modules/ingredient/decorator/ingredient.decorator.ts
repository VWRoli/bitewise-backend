import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsBiggerThanSaturatedFat(
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsBiggerThanSaturatedFat',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const totalFat = args.object['totalFat'];
          const saturatedFat = args.object['saturatedFat'];

          return totalFat >= saturatedFat ? true : false;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be greater than or equal to saturatedFat`;
        },
      },
    });
  };
}
