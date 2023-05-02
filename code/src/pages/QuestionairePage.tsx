import { Stack, Text } from '@mantine/core';
import { useEffect, useMemo, useState } from "react";
import Title from "@/components/Title/Titles"
import { IQuestion, IChoice , IBodyContent, ISolution} from '@/types/api_types';
import search_questions_choices_from_json from '../utils/TempGetNextQuestion';
import { bodyContentUseStyles } from '@/components/MainBody/HelperFunctions/BodyContentStyle';
import ToggleButton from '@/components/MainBody/TogglebButton';
import SolutionPages from '../utils/SolutionContent';

const QuestionaireBodyContent: React.FC = () => {
  const { classes } = bodyContentUseStyles();

  const [currQuestion, setCurrQuestion] = useState<IQuestion>({id: "2", title:"How can I assist you?"});
  const [currChoices, setCurChoices] = useState<IChoice[]>([]);
  const [clickedChoice, setClickedChoice] = useState<IChoice>({id:"1", title:"Home"});
  const [solution, setSolution] = useState<ISolution>({id:"", title:""});
  const [hasSolution, setHasSolution] = useState(false);
  const [pageTitle, setPageTitle] = useState("Home");
  const [image, setImage] = useState("/titleimghome.PNG");

  const prevSelectedContent: IBodyContent[] = useMemo(() => [], []);

  const updateChoicesAndQuestions = async (choice : IChoice) => {
    const [question, choices_list, hasSol, sol] = await search_questions_choices_from_json(choice);
    setHasSolution(hasSol);
    if (hasSol) {
      setSolution(sol);
    } else {
      setSolution({id:"", title:""});
      setClickedChoice(choice);
    }
    if (question.title !== '') {
      prevSelectedContent.push({question: currQuestion, prevChoice: clickedChoice, choiceList:  currChoices});
      setCurChoices(choices_list);
      setCurrQuestion(question);
    }

    if (choice.title === "Communication") {
      setPageTitle("Communication");
      // setImage("/titleImgCommunication.PNG")
    }
  };

  useEffect(() => {
    if (clickedChoice != null) {
      updateChoicesAndQuestions(clickedChoice);
    }
  }, []);

  const prevQuestion = () => {
    if (prevSelectedContent.length > 1) {
      let i = 1;
      if (hasSolution) {
        updateChoicesAndQuestions(clickedChoice);
      }
      setCurrQuestion(prevSelectedContent[prevSelectedContent.length-i].question);
      setClickedChoice(prevSelectedContent[prevSelectedContent.length-i].prevChoice);
      setCurChoices(prevSelectedContent[prevSelectedContent.length-i].choiceList);
      prevSelectedContent.pop();
    }
  };

  return (
    <div>
      <Title hasPrev={prevSelectedContent.length > 1} prevQuestion={prevQuestion} titleImg={image} title={pageTitle} />
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