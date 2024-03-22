import React, { useRef } from "react";
import Link from "next/link";

import { useBookmarks } from "../contexts/BookmarkContext";

import ResourcesHandouts from "../components/MainBody/SolutionPageContent/ResourcesHandouts";
import Title from "../components/Title/Titles";
import { bodyContentUseStyles } from "../components/MainBody/HelperFunctions/BodyContentStyle";
import { Text } from "@mantine/core";

const Bookmarks = () => {
  const { classes } = bodyContentUseStyles();
  const { bookmarks } = useBookmarks();
  const image = useRef("/titleimghome.PNG");
  const sortedBookmarks = [...bookmarks].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return (
    <div>
      <Link href="./">
        <Title
          hasPrev={true}
          prevQuestion={() => {}}
          titleImg={image.current}
          title={"Bookmarks"}
        />
      </Link>

      {sortedBookmarks.length > 0 ? (
        <div className={classes.outer} style={{ marginBottom: "2rem" }}>
          <ResourcesHandouts title={""} data={sortedBookmarks} />
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
