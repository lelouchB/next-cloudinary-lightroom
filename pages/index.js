import Head from "next/head";
import useSWR from "swr";
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
        <title> Next Image Gallery with Cloudinary & Lightroom</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to
          <a href="https://cloudinary.com">
            Next Image Gallery with Cloudinary & Lightroom
          </a>
        </h1>
          <CloudinaryContext  className={styles.grid} cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD}>
            {data != undefined &&
              data.resources.map((pic) => (
                  <Image key={pic.public_id} className={styles.card} publicId={pic.public_id} loading="lazy" secure="true">
                    <Transformation width="800" crop="fill" />
                    <Placeholder type="blur" />
                    {/* <Transformation effect="lightroom:saturation_-100:clarity_25:contrast_73:vignetteamount_60" /> */}
                  </Image>
              ))}
          </CloudinaryContext>
      </main>
    </div>
  );
}
