export abstract class UseCaseContract<Incoming, Outgoing> {
    abstract run(incoming: Incoming): Outgoing;
}