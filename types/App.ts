export type ParagraphType = {
  title: string;
  content: string;
};

export type ContentType = {
  description: string;
  paragraphs: ParagraphType[];
  others: string[];
  menulinks: string[];
};

export type PostType = {
  id: number;
  slug: string;
  category: "Update" | "Tip";
  title: string;
  sidetitle: string;
  description?: string;
  date: string;
  author: string;
  content: ContentType;
};

export type AppType = {
  id: number;
  slug: string;
  name: string;
  link: string;
  releaseDate: string;
  logo: string;
  description: string;
  posts: PostType[];
};
