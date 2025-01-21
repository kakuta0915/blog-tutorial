import { FC } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { client } from "../../../libs/client";

export const getStaticPaths: GetStaticPaths = async () => {
  // microCMSから記事データを取得
  const data = await client.get({ endpoint: "blog" });

  // 記事ごとのパスを生成
  const paths = data.contents.map((content: { id: string }) => ({
    params: { id: content.id },
  }));

  return {
    paths,
    fallback: false, // 存在しないパスは404エラーを表示
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  // パスから記事IDを取得
  const id = context.params?.id;

  // microCMSから記事データを取得
  const data = await client.get({
    endpoint: "blog",
    contentId: id as string,
  });

  return {
    props: {
      blog: data,
    },
  };
};

type BlogProps = {
  blog: {
    title: string;
    publishedAt: string;
    body: string;
  };
};

const Blog: FC<BlogProps> = ({ blog }) => {
  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: blog.body,
        }}
      />
    </div>
  );
};

export default Blog;
