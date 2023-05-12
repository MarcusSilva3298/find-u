import { v4 } from 'uuid';

export class User {
  public readonly id: string;

  public email: string;
  public password: string;

  public name: string;

  public created_at?: Date;
  public updated_at?: Date;

  constructor(props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = v4();
    else this.id = id;

    this.created_at = new Date();
    this.updated_at = new Date();
  }
}
