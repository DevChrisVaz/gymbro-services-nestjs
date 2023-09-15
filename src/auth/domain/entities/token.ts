export interface TokenContract {
    ref: string;
    token: string;
}

export class Token implements TokenContract {
    ref: string;
    token: string;
}