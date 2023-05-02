import { Stack, Text} from '@mantine/core';
import { useEffect, useState } from "react";
import  Title from "@/components/Title/Titles"
import { IQuestion, IChoice , IBodyContent, ISolution} from '@/types/api_types';
import search_questions_choices_from_json from '../utils/TempGetNextQuestion';
import { bodyContentUseStyles } from '@/components/MainBody/HelperFunctions/BodyContentStyle';
import ToggleButton from '@/components/MainBody/TogglebButton';
import SolutionPages from '../utils/SolutionContent';

let prevSelectedContent : IBodyContent[] = []

const QuestionaireBodyContent: React.FC = () => {
  const { classes } = bodyContentUseStyles();

  let [currQuestion, setCurrQuestion] = useState<IQuestion>({id: "2", title:"How can I assist you?"});
  let [currChoices, setCurChoices] = useState<IChoice[] >([])
  let [clickedChoice, setClickedChoice] = useState<IChoice>({id:"1", title:"Home"})
  let [solution, setSolution] = useState<ISolution>({id:"", title:""})

  let [hasSolution, setHasSolution] = useState(false)

  let [pageTitle, setPageTitle] = useState("Home")
  let [image, setImage] = useState("/titleimghome.PNG")
  // let [prevSelectedContent, setPrevSelectedContent] = useState< IBodyContent[]>([])
  // let prevSelectedContent : IBodyContent[] = []

  // do not know where to update button content

  const updateChoicesAndQuestions = async (choice : IChoice) => {
    let [question, choices_list, hasSol, sol] = await search_questions_choices_from_json(choice)
    console.log(choices_list)
    setHasSolution(hasSol)
    if (hasSol){
      setSolution(sol)
    }else{
      setSolution({id:"", title:""})
      setClickedChoice(choice)
    }
    console.log(hasSol)
    if (question.title != ''){
      prevSelectedContent.push({question: currQuestion, prevChoice: clickedChoice, choiceList:  currChoices})
      setCurChoices(choices_list)
      setCurrQuestion(question)
    }

    if(choice.title == "Communication"){
      setPageTitle("Communication")
      // setImage("/titleImgCommunication.PNG")
    } 
    

    console.log("updateq"+prevSelectedContent.length)
    for (const element of prevSelectedContent) {
      console.log("prev content: "+element.question.title)
    }
  }

  useEffect(() => {
    console.log(clickedChoice)
    if (clickedChoice != null){
      updateChoicesAndQuestions(clickedChoice)
    }
  }, [])

  const prevQuestion = () => {
      if (prevSelectedContent.length > 1) {
          let i = 1
        if (hasSolution){
          console.log(clickedChoice)
          updateChoicesAndQuestions(clickedChoice)
        }
        setCurrQuestion(prevSelectedContent[prevSelectedContent.length-i].question);
        setClickedChoice(prevSelectedContent[prevSelectedContent.length-i].prevChoice)
        setCurChoices(prevSelectedContent[prevSelectedContent.length-i].choiceList)
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