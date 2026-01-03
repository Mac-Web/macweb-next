export type CredentialsType = {
  username: string;
  password: string;
  display?: string;
};

export type UserType = {
  username: string;
  display?: string;
  password?: string;
  email?: string;
  image?: string;
  provider?: string;
  createdAt: Date;
  _id: string;
  about?: string;
};
