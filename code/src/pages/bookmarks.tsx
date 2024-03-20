import React, { useRef } from "react";

import { useBookmarks } from "../contexts/BookmarkContext";

import ResourcesHandouts from "../components/MainBody/SolutionPageContent/ResourcesHandouts";
import Title from "../components/Title/Titles";

const Bookmarks = () => {
  const { bookmarks } = useBookmarks();
  const image = useRef("/titleimghome.PNG");
  const sortedBookmarks = [...bookmarks].sort((a, b) =>
    a.id.localeCompare(b.id)
  );

  const pageStyle = {
    marginLeft: "2in",
    marginRight: "2in",
  };

  return (
    <div>
      <Title
        hasPrev={true}
        prevQuestion={() => {}}
        titleImg={image.current}
        title={"Bookmarks"}
      />
      <div style={pageStyle}>
        <ResourcesHandouts title={""} data={sortedBookmarks} />
      </div>
    </div>
  );
};

export default Bookmarks;
