import { ExtensionValidators } from './base';
import { ValidatorsImpl } from './chain';

export const extend = {
  validators(extensionValidators: ExtensionValidators) {
    for (const [name, validator] of Object.entries(extensionValidators)) {
      (ValidatorsImpl.prototype as any)[name] = function (this: ValidatorsImpl<any>, options: any) {
        return this.extension(validator, options);
      } as any;
    }
  },
};
