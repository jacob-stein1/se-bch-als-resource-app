import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { useBookmarks } from "../contexts/BookmarkContext";
import ResourcesHandouts from "../components/MainBody/SolutionPageContent/ResourcesHandouts";
import Title from "../components/Title/Titles";
import { bodyContentUseStyles } from "../components/MainBody/HelperFunctions/BodyContentStyle";
import { Text, Button } from "@mantine/core";
import getSolutionContent from "@/utils/GetSolutionPageForChoice";

const Bookmarks = () => {
  const { classes } = bodyContentUseStyles();
  const { bookmarks, addBookmark } = useBookmarks();
  const image = useRef("/titleimghome.PNG");
  const [bookmarkURL, setBookmarkURL] = useState("");
  const router = useRouter();

  interface TruncatedUrlProps {
    text: string;
  }

  const TruncatedUrl: React.FC<TruncatedUrlProps> = ({ text }) => {
    const maxLength = 100;
    const truncated =
      text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    return <Text>{truncated}</Text>;
  };

  useEffect(() => {
    const fetchAndAddBookmark = async (id: string) => {
      try {
        const data = await getSolutionContent(id);
        const resourceLink = data[2];
        resourceLink[0].id = id;
        addBookmark(resourceLink[0]);
      } catch (error) {
        console.error("Error fetching bookmark data:", error);
      }
    };

    if (typeof router.query.ids === "string") {
      const ids = router.query.ids.split(",");
      ids.forEach((id) => {
        if (bookmarks.some((bookmark) => bookmark.id === id)) {
          return;
        } else {
          fetchAndAddBookmark(id);
        }
      });
    }
  }, [router.query.ids, addBookmark]);

  const sortedBookmarks = [...bookmarks].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  useEffect(() => {
    const bookmarkIds = sortedBookmarks
      .map((bookmark) => bookmark.id)
      .join(",");
    const newUrl = `localhost:3000/bookmarks?ids=${encodeURIComponent(
      bookmarkIds
    )}`;
    setBookmarkURL(newUrl);
  }, [sortedBookmarks, router]);

  return (
    <div>
      <Link href="/">
        <Title
          hasPrev={true}
          prevQuestion={() => {}}
          titleImg={image.current}
          title={"Bookmarks"}
        />
      </Link>

      {sortedBookmarks.length > 0 ? (
        <div>
          <div className={classes.outer} style={{ marginBottom: "2rem" }}>
            <ResourcesHandouts title={""} data={sortedBookmarks} />
          </div>
          <div className={classes.outer}>
            <Text style={{ color: "#254885", marginBottom: "20px" }}>
              Copy the link below to automatically load and access your
              bookmarks
            </Text>
            <div
              className={classes.bookmarkContainer}
              onClick={() => navigator.clipboard.writeText(bookmarkURL)}
            >
              <Image
                src={"./copy-icon.svg"}
                alt={"Copy Icon"}
                className={classes.copyIcon}
                width={30}
                height={30}
                layout="fixed"
              />
              <TruncatedUrl text={bookmarkURL} />
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.outer}>
          <Text>You don't have any bookmarks.</Text>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
