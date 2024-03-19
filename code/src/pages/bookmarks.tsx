import React, { useRef } from "react";

import { useBookmarks } from "../contexts/BookmarkContext";

import ResourcesHandouts from "../components/MainBody/SolutionPageContent/ResourcesHandouts";
import Title from "../components/Title/Titles";

const bookmarks = () => {
  const { bookmarks } = useBookmarks();
  const image = useRef("/titleimghome.PNG");
  return (
    <div>
      <Title
        hasPrev={true}
        prevQuestion={() => {}}
        titleImg={image.current}
        title={"Bookmarks"}
      />
      <ResourcesHandouts title={""} data={bookmarks} />
    </div>
  );
};

export default bookmarks;
