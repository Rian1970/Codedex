import { useState, useEffect } from 'react'
import { UserProvider } from './components/UserContext'
import { Route, Routes, useLocation } from 'react-router-dom'
import UserForm from './components/UserForm'
import Results from './components/Results'
import Header from './components/Header'
import Question from './components/Question'

export default function App() {

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0) //state that loops through the array
  const [answers, setAnswers] = useState([]) //store the users anwers
  const [userName, setUserName] = useState("") //store the user name
  const [element, setElement] = useState("") //set the element
  const [artwork, setArtwork] = useState(null) //state for the fetching data
  const [loading, setLoading] = useState(false); //state for show a message while fetch data
  const location = useLocation(); //update the current route

  //Array with the questions and anwers
  const questions = [
    {
        question: "What's your favorite color?",
        options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
    },
    {
        question: "What's your favorite season?",
        options: ["Spring 🌸", "Summer ☀️", "Autumn 🍂", "Winter ❄️"],
    },
    {
        question: "Which pet do you prefer?",
        options: ["Dog 🐶", "Cat 🐱", "Bird 🐦", "Fish 🐟"],
    },
    {
        question: "What's your favorite time of day?",
        options: ["Morning 🌅", "Afternoon 🌞", "Evening 🌇", "Night 🌙"],
    },
  ];

  //Array for the diferents elements
  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  };

  //Value of the element for each answer
  const elements = {
    "Red 🔴": "Fire",
    "Blue 🔵": "Water",
    "Green 🟢": "Earth",
    "Yellow 🟡": "Air",
    "Spring 🌸": "Air", 
    "Summer ☀️": "Fire",
    "Autumn 🍂": "Earth", 
    "Winter ❄️": "Water",
    "Dog 🐶": "Earth", 
    "Cat 🐱": "Fire", 
    "Bird 🐦": "Air", 
    "Fish 🐟": "Water",
    "Morning 🌅": "Earth",
    "Afternoon 🌞": "Fire", 
    "Evening 🌇": "Air", 
    "Night 🌙": "Water"
  };

  //Update the state the array with the users answers and the state with the current question
  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  
  //update the user name
  function handleUserFormSubmit(name) {
    setUserName(name);
  };
  
  //Count the value of the element for each answer and determine the element 
  function determineElement(answers) {
    const counts = {};
    answers.forEach(function(answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function(a, b) {
      return counts[a] > counts[b] ? a : b
    });
  };

  //fetch the random image from the dog api
  async function fetchArtwork(keyword) {
    try {
      setLoading(true);

      const response = await fetch("https://dog.ceo/api/breed/shiba/images/random");
      
      const data = await response.json();

      setArtwork(data)

    } catch (error) {
      
      console.log("Error fetching data: ", error);
      setArtwork(null);
    
    } finally {

      setLoading(false);
    
    }
  }

  // finish the quiz and show the result
  useEffect(
    function () {
      if (currentQuestionIndex === questions.length) {
        const selectedElement = determineElement(answers);
        setElement(selectedElement);
        fetchArtwork(keywords[selectedElement]);
      }
    },
    [currentQuestionIndex]
  );

  // update the quiz if the user return the home
  useEffect(
    function () {
      if (location.pathname !== "/quiz") {
        resetQuiz();
      }
    },
    [location]
  );

  // reset all states 
  function resetQuiz() {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setElement("");
    setArtwork(null);
  }

  return (
    <>
    <UserProvider value={{ name: userName, setName: setUserName }}>
          <Header />
          <Routes>
            <Route
              path="/"
              element={<UserForm onSubmit={handleUserFormSubmit} />}
            />
          <Route
            path="/quiz"
            element={
              currentQuestionIndex < questions.length ? (
                <Question
                  question={questions[currentQuestionIndex].question}
                  options={questions[currentQuestionIndex].options}
                  onAnswer={handleAnswer}
                />
              ) : (
                <Results element={element} artwork={artwork} loading={loading} />
              )
            }
          />
        </Routes>
    </UserProvider>
    </>
    
  );
} 