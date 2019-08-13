export interface IBotController {
    move(): void | string;
    left(): void | string;
    right(): void | string;
    report(): void | string;
    place(spot: string): void | string;
}