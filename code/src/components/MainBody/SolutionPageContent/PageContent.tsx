import React from 'react'
import { Stack} from '@mantine/core';
import { PageContentType } from '@/types/dataTypes';
import Video from './PageContentHelpers/Video';
import Paragraph from './PageContentHelpers/Paragraph';


const PageContent = ({data}: {data: PageContentType[]}) => {


  return (
    <div>
      <Stack
      spacing="xl"
    >
      {data.map((pageContent) => ( 
         <React.Fragment key={pageContent.id}>
        {pageContent.videoURL != "" ? <Video url={pageContent.videoURL}/> : <></> }
        {pageContent.paragraph != "" ? <Paragraph paragraph={pageContent.paragraph}/> : <></> }
        </React.Fragment>
      ))}
    </Stack>
    </div> 
  )
}

export default PageContent