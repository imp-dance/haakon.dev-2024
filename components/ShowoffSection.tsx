import classNames from "classnames";
import Image from "next/image";
import { getShowoffFiles } from "../services/fs";
import { Button } from "./Button";
import { Disclose } from "./Disclose";
import { RenderHTML } from "./RenderHTML";
import styles from "./ShowoffSection.module.css";

export async function ShowoffSection() {
  const files = await getShowoffFiles();

  const fileMapper = (file: (typeof files)[number]) => {
    const isCurrent =
      file.frontMatter.subTitle &&
      file.frontMatter.subTitle.toString().includes("now");

    return (
      <div key={file.name}>
        <div className={styles.imageContainer}>
          <Image
            src={file.frontMatter.image}
            alt={file.frontMatter.title}
            width={200}
            height={200}
          />
        </div>
        <div
          className={classNames(styles.entry, {
            [styles.current]: isCurrent,
          })}
        >
          <h2>{file.frontMatter.title}</h2>
          <h3>{file.frontMatter.subTitle}</h3>
          <p>{file.frontMatter.body}</p>
          <Disclose
            showText="Read more"
            hideText="Collapse"
            variant="ghost"
            renderButton={
              <Button
                variant="ghost"
                style={{
                  width: "max-content",
                  border: "none",
                  boxShadow: "none",
                }}
              />
            }
          >
            <div
              style={{
                height: "1px",
                background: "var(--gray-9)",
              }}
            />
            <div className="anim-fadedown">
              <RenderHTML html={file.content} />
            </div>
          </Disclose>
        </div>
      </div>
    );
  };

  return (
    <section className={styles.container}>
      {files.slice(0, 4).map(fileMapper)}
      <Disclose
        showText="See older projects"
        hideText="Show less"
        variant="ghost"
      >
        {files.slice(4).map(fileMapper)}
      </Disclose>
    </section>
  );
}
