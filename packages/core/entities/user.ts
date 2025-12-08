export class User {
  constructor(
    public readonly email: string,
    public readonly name: string,
    public readonly createdAt: Date
  ) {}

  public isValidEmail(): boolean {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(this.email);
  }

  public getDisplayName(): string {
    return this.name ?? this.email.split("@")[0];
  }
}
