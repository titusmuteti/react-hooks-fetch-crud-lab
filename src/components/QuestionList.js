import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(res => res.json())
    .then(data => setQuestions(data))
    .catch(err => console.log(err))
  }, [])

  const quizzes = questions.map(quiz => {
    return (
      <QuestionItem
      key={quiz.id}
      question={quiz}
      handleDelete = {()=>handleDelete(quiz)}
      onAnswerChange ={handleChange} 
      />
    )
  })

  function handleChange(updated){
    const updatedQuestions = questions.map(item=> {
      if(item.id === updated.id){
        return updated
      }else{
        return item
      }
    })
    setQuestions(updatedQuestions)
  }

  function handleDelete(deleted){
    //console.log(questions);
    const newList = questions.filter(quiz => quiz.id !== deleted.id)
    //console.log(newList);
    setQuestions(newList)
  }
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{quizzes}</ul>
    </section>
  );
}

export default QuestionList;
