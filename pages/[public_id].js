import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

import { Image, Transformation, Placeholder } from "cloudinary-react";
import { useRouter } from "next/router";

export default function Photo() {
  const router = useRouter();
  const publicId = router.query.public_id;

  return (
    <div className={styles.container}>
      <Head>
        <title> Image Gallery - Cloudinary & Lightroom</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 style={{ textAlign: "center", color: "#0070f3", textDecoration:"underline" }}>
        <Link href="/">
          <a>Home</a>
        </Link>
      </h2>

      <Image
        cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD}
        publicId={publicId}
        secure="true"
      >
        <Transformation effect="lightroom:whitebalance_auto" />
        <Transformation width="800" fetchFormat="auto" crop="fill" />

        <Placeholder type="blur" />
      </Image>
      <h1
        className={styles.title}
        style={{ marginBottom: "1rem", color: "teal" }}
      >
        {publicId}
      </h1>
    </div>
  );
}
