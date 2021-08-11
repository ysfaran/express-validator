import { extend } from './extend';
import { ValidatorsImpl } from './chain';

const extensionMock = jest.fn();
const isSomethingMock = jest.fn();
const isSomethingElseMock = jest.fn();

jest.mock('./chain', () => {
  return {
    ValidatorsImpl: class {
      extension = extensionMock;
    },
  };
});

describe('#validators()', () => {
  beforeAll(() => {
    extend.validators({
      isSomething: isSomethingMock,
      isSomethingElse: isSomethingElseMock,
    });
  });

  it('adds extensions to prototype', () => {
    expect((ValidatorsImpl.prototype as any).isSomething).toEqual(expect.any(Function));
    expect((ValidatorsImpl.prototype as any).isSomethingElse).toEqual(expect.any(Function));
  });

  it('calls ValidatorsImpl.extension with validator and options when extension is used', () => {
    const validatorImpl: any = new ValidatorsImpl(undefined as any, undefined as any);

    validatorImpl.isSomething({ customOption: true });
    expect(extensionMock).toHaveBeenCalledWith(isSomethingMock, { customOption: true });

    validatorImpl.isSomethingElse(1);
    expect(extensionMock).toHaveBeenCalledWith(isSomethingElseMock, 1);

    expect(extensionMock).toHaveBeenCalledTimes(2);
  });
});
