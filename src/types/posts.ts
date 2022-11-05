export interface PostBody<T> {
  title: string;
  body: string;
  userId: T;
}
export interface Post extends PostBody<number> {
  id: number;
}
