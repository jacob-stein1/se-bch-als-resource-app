import React, { Suspense, useEffect, useState } from 'react'
import { bodyContentUseStyles } from '../components/MainBody/HelperFunctions/BodyContentStyle';
import { Stack, Text } from '@mantine/core';
import ResourcesHandouts from '../components/MainBody/SolutionPageContent/ResourcesHandouts';
import { ISolution } from '../types/api_types';
import { HandoutOrTestimonialLink, PageContentType, ResourceLink } from '../types/dataTypes';
import getSolutionContent from './GetSolutionPageForChoice';
import PageContent from '../components/MainBody/SolutionPageContent/PageContent';

interface SolutionContentProps {
  solution: ISolution,
  hasSolution: boolean
}

/**
 * This component displays the content for a solution page, including page content, resources,
 * and handouts/testimonials.
 *
 * @param solution - The solution to display content for.
 * @param hasSolution - Whether or not the solution has content to display.
 */
const SolutionPages: React.FC<SolutionContentProps> = ({ solution, hasSolution }): JSX.Element => {
  const { classes } = bodyContentUseStyles();

  // State variables to hold page content data
  let [resourceList, setResourceList] = useState<ResourceLink[]>([])
  let [handoutTestimonialList, setHandoutTestimonialList] = useState<HandoutOrTestimonialLink[]>([])
  let [pageContent, setPageContent] = useState<PageContentType[]>([])
  let [error, setError] = useState<string>("")

  /**
   * Fetches the solution page content (resources, handouts/testimonials, and page content).
   */
  const getSolutionPageContent = async (): Promise<void> => {
    try {
      let [_, resource_list, handouts_testimonials_list, page_content] = await getSolutionContent(solution.id)
      setResourceList(resource_list)
      setHandoutTestimonialList(handouts_testimonials_list)
      setPageContent(page_content)
    } catch (e) {
      setError("Error fetching solution page content")
    }
  }

  // Fetches solution page content if it has a solution and an id
  useEffect(() => {
    if (hasSolution && solution.id !== "") {
      getSolutionPageContent()
    }
  }, [hasSolution])

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <Stack
        spacing="xl"
        className={classes.outer}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        })}
      >
        {/* Title */}
        <Text className={classes.text}> {solution.title} </Text>

        {/* Page content */}
        {!pageContent.length ? (
          <></>
        ) : (
          <div>
            <Suspense fallback={<div>Loading page content...</div>}>
              <PageContent data={pageContent} />
            </Suspense>
          </div>
        )}

        {/* Resources */}
        {!resourceList.length ? (
          <></>
        ) : (
          <ResourcesHandouts title={"Resources"} data={resourceList} />
        )}

        {/* Handouts/testimonials */}
        {!handoutTestimonialList.length ? (
          <></>
        ) : (
          <ResourcesHandouts
            title={"Handouts/Testimonials"}
            data={handoutTestimonialList}
          />
        )}
      </Stack>
    </div>
  )
}

export default SolutionPages
