import { IChoice, IQuestion, ISolution } from '@/types/api_types';
import { API_URL } from '@/constants/globals';

const fetchAnyData = async (APIURL:string): Promise<any> => {
  const res = await fetch(APIURL, {
    method: "GET",
    });

  return await res.json();
}

export default async function tempNextChoiceSelectionFromJson(clickedChoice : IChoice): Promise<[IQuestion, IChoice[], boolean, ISolution]> {
  const choice_selected_id = clickedChoice.id
  let choices_list : IChoice[] = []
  let question : IQuestion = {id:"", title:""}
  let hasSolution = false
  let solution : ISolution = {id: "", title: ""}
  // console.log(choice_selected_id)

  if (clickedChoice.title == "Home"){
    const question_json = await fetchAnyData(API_URL+"/api/first-entries/1?populate=*")

    // console.log(question_json)
    // console.log("question_json.data.attributes.choice_to_question.data"+question_json.data.attributes.question_to_choice_maps.data[0].id)

    question = {id: question_json.data.attributes.question_to_choice_maps.data[0].id, title:  question_json.data.attributes.question_to_choice_maps.data[0].attributes.QuestionName}
    // console.log(question)
  
  }else{
    const question_json = await fetchAnyData(API_URL+"/api/choice-to-question-maps/"+choice_selected_id+"?populate=*")

    // console.log(question_json)
    // console.log("question_json.data.attributes.choice_to_question.data"+question_json.data.attributes.choice_to_question.data)

    //if next question does not exist
    if (question_json.data.attributes.choice_to_question.data == null){
      if (question_json.data.attributes.ChoiceToSolutionMap.data != null){
        hasSolution = true
        solution = {id: question_json.data.attributes.ChoiceToSolutionMap.data.id, title: question_json.data.attributes.ChoiceToSolutionMap.data.attributes.Title}
      }
      return [question, choices_list, hasSolution, solution]
    }
    question = {id: question_json.data.attributes.choice_to_question.data.id, title:  question_json.data.attributes.choice_to_question.data.attributes.QuestionName}
    // console.log(question)
  }

  const choice_json = await fetchAnyData(API_URL+"/api/question-to-choice-maps/"+question.id+"?populate=*")

  // console.log(choice_json)


  let temp_choicesjson = choice_json.data.attributes.question_to_choices.data
  // console.log(temp_choicesjson)
  for (const element of temp_choicesjson) {
      choices_list.push({id: element.id, title: element.attributes.ChoiceName})
      // console.log(temp_choicesjson[j].attributes.ChoiceName)
  }

  return [question, choices_list, hasSolution, solution]

}