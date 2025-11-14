export class User {
  constructor(
    public readonly email: string,
    public readonly name: string,
    public readonly createdAt: Date
  ) {}

  public isValidEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  public getDisplayName(): string {
    return this.name ?? this.email.split("@")[0];
  }
}
