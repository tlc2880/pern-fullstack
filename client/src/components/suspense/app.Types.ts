export type userType = {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
    catchPhrase: string;
  }
};

export type postType = {
  id: number;
  userId: number;
  title: string;
  body: string;
};