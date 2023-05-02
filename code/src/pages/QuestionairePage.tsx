import { Stack, Text } from '@mantine/core';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Title from '@/components/Title/Titles';
import { IQuestion, IChoice, IBodyContent, ISolution } from '@/types/api_types';
import searchQuestionsChoicesFromJson from '@/utils/TempGetNextQuestion';
import { bodyContentUseStyles } from '@/components/MainBody/HelperFunctions/BodyContentStyle';
import ToggleButton from '@/components/MainBody/TogglebButton';
import SolutionPages from '@/utils/SolutionContent';




interface Props {}

const QuestionaireBodyContent: React.FC<Props> = () => {
  const { classes } = bodyContentUseStyles();

  const [currQuestion, setCurrQuestion] = useState<IQuestion>({ id: '2', title: 'How can I assist you?' });
  const [currChoices, setCurrChoices] = useState<IChoice[]>([]);
  const [clickedChoice, setClickedChoice] = useState<IChoice>({ id: '1', title: 'Home' });
  const [solution, setSolution] = useState<ISolution>({ id: '', title: '' });

  const [hasSolution, setHasSolution] = useState(false);

  const pageTitle = useRef('Home');
  const image = useRef('/titleimghome.PNG');

  const prevSelectedContent = useRef<IBodyContent[]>([]);

  const memoizedSearchQuestionsChoicesFromJson = useMemo(() => {
    return async (choice: IChoice): Promise<[IQuestion, IChoice[], boolean, ISolution]> => {
      return await searchQuestionsChoicesFromJson(choice);
    };
  }, []);

  const updateChoicesAndQuestions = useCallback(async (choice: IChoice) => {
    const [question, choicesList, hasSol, sol] = await memoizedSearchQuestionsChoicesFromJson(choice);
    setHasSolution(hasSol);
    if (hasSol) {
      setSolution(sol);
    } else {
      setSolution({ id: '', title: '' });
      setClickedChoice(choice);
    }
    console.log(prevSelectedContent.current.length)
    if (question.title !== '') {
      prevSelectedContent.current.push({ question: currQuestion, prevChoice: clickedChoice, choiceList: currChoices });
      setCurrChoices(choicesList);
      setCurrQuestion(question);
    }
    if (choice.title === 'Communication') {
      // setPageTitle('Communication');
      pageTitle.current = 'Communication'
      image.current = '/titleImgCommunication.PNG'
      // setImage('/titleImgCommunication.PNG')
    }
  }, [clickedChoice, currChoices, currQuestion]);

  useEffect(() => {
    if (clickedChoice !== null) {
      updateChoicesAndQuestions(clickedChoice);
    }
  }, []);

  const prevQuestion = () => {
    if (prevSelectedContent.current.length > 1) {
      const i = 1;
      if (hasSolution) {
        updateChoicesAndQuestions(clickedChoice);
      }
      setCurrQuestion(prevSelectedContent.current[prevSelectedContent.current.length-i].question);
      setClickedChoice(prevSelectedContent.current[prevSelectedContent.current.length-i].prevChoice)
      setCurrChoices(prevSelectedContent.current[prevSelectedContent.current.length-i].choiceList)
      prevSelectedContent.current.pop()
      if (prevSelectedContent.current.length < 2){
        pageTitle.current ="Home"
        image.current = "/titleimghome.PNG"
      }
      console.log("its length"+prevSelectedContent.current.length)
      console.log("hassol"+hasSolution)
      }
  };

  return (
    <div>
    <Title hasPrev={(prevSelectedContent.current.length > 1)} prevQuestion={prevQuestion} titleImg={image.current} title={pageTitle.current} />
    {!hasSolution ? 
    <Stack
      spacing="xl"
      className={classes.outer}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
      })}
    >
      <Text className={classes.text}> {currQuestion.title} </Text>
      {currChoices.map((choice) => (  
        <div key={choice.id}>
        <ToggleButton updateContent={updateChoicesAndQuestions} className={classes.inner} choice={choice} />
        </div>
      ))} 
    </Stack>
    : 
    <SolutionPages solution={solution} hasSolution={hasSolution}/>
    }
    </div>
  );
};

export default QuestionaireBodyContent