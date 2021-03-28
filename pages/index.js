import Head from "next/head";
import useSWR from "swr";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import {
  Image,
  Transformation,
  CloudinaryContext,
  Placeholder,
} from "cloudinary-react";

export default function Home() {
  const { data, error } = useSWR("/api/getAllPhotos");

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className={styles.container}>
      <Head>
        <title> Next.js Image Gallery with Cloudinary & Lightroom</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{" "}
          <a href="https://cloudinary.com">
            Image Gallery - Cloudinary & Lightroom{" "}
          </a>
        </h1>
        <CloudinaryContext
          className={styles.grid}
          cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD}
        >
          {data != undefined &&
            data.resources.map((pic) => (
              <Link key={pic.public_id} href={`/${pic.public_id}`}>
                <a>
                  <Image
                    className={styles.card}
                    publicId={pic.public_id}
                    secure="true"
                  >
                    <Transformation effect="lightroom:whitebalance_auto" />

                    <Transformation
                      width="800"
                      fetchFormat="auto"
                      crop="fill"
                    />
                    <Placeholder type="blur" />
                  </Image>
                </a>
              </Link>
            ))}
        </CloudinaryContext>
      </main>
    </div>
  );
}
