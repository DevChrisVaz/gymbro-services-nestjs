export abstract class UseCaseContract<Input, Output> {
  abstract run(input: Input): Output;
}

export abstract class FindOneUseCaseContract<Output> extends UseCaseContract<
  string,
  Output
> {}
