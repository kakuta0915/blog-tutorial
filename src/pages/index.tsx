import Link from "next/link";
import { GetStaticProps } from "next";
import { client } from "../../libs/client";

interface Blog {
  id: string;
  title: string;
}

interface HomeProps {
  blogs: Blog[];
}

export default function Home({ blogs }: HomeProps) {
  return (
    <div>
      <h1>ブログ記事一覧</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// getStaticProps を使って静的データを取得
export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });

  return {
    props: {
      blogs: data.contents,
    },
  };
};
