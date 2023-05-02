import { Stack, Text } from '@mantine/core';
import { useState, useEffect, useMemo, useCallback } from 'react';
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

  const [pageTitle, setPageTitle] = useState('Home');
  const [image, setImage] = useState('/titleimghome.PNG');

  const prevSelectedContent: IBodyContent[] = useMemo(() => [], []);

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
    if (question.title !== '') {
      prevSelectedContent.push({ question: currQuestion, prevChoice: clickedChoice, choiceList: currChoices });
      setCurrChoices(choicesList);
      setCurrQuestion(question);
    }
    if (choice.title === 'Communication') {
      setPageTitle('Communication');
      // setImage('/titleImgCommunication.PNG')
    }
  }, [clickedChoice]);

  useEffect(() => {
    if (clickedChoice !== null) {
      updateChoicesAndQuestions(clickedChoice);
    }
  }, []);

  const prevQuestion = () => {
    if (prevSelectedContent.length > 1) {
      const i = 1;
      if (hasSolution) {
        updateChoicesAndQuestions(clickedChoice);
      }
        setCurrQuestion(prevSelectedContent[prevSelectedContent.length-i].question);
        setClickedChoice(prevSelectedContent[prevSelectedContent.length-i].prevChoice)
        setCurrChoices(prevSelectedContent[prevSelectedContent.length-i].choiceList)
        prevSelectedContent.pop()
        // if (prevSelectedContent[prevSelectedContent.length-i-1].prevChoice.title == "Home"){
        //   setPageTitle("Home")
        //   setImage("/titleimghome.PNG")
        // }
        console.log("its length"+prevSelectedContent.length)
        console.log("hassol"+hasSolution)
      }
  };

  return (
    <div>
    <Title hasPrev={(prevSelectedContent.length > 1)} prevQuestion={prevQuestion} titleImg={image} title={pageTitle} />
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