import React, {useState} from 'react'
import { useParams , Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import copy from 'copy-to-clipboard'

import upvote from '../../assets/sort-up.svg'
import downvote from '../../assets/sort-down.svg'
import './Questions.css'
import Avatar from '../../components/Avatar/Avatar'
import DisplayAnswer from './DisplayAnswer'
import { postAnswer } from '../../actions/questions'
import { deleteQuestion, voteQuestion } from '../../actions/questions'


const QuestionsDetails =() =>{


    const { id } = useParams()
    const questionsList = useSelector( (state) => state.questionsReducer)
    console.log(questionsList)
    

    // var questionsList = [{

    //     _id:'1',
    //     upVotes:3,
    //     downVotes:2,
    //     noOfAnswers:2,
    //     questionTitle: 'What is a function?',
    //     questionBody: 'It is meant to be',
    //     questionTags: ["java", "node js", "mongoDB"],
    //     userPosted:"mano",
    //     askedOn:"jan 1",
    //     userId:1,
    //     answer:[{
    //         answerBody:'Answer',
    //         userAnswered: 'kumar',
    //         answeredOn:'jan 2',
    //         userId: 2,
    //     }]
    // },{
    //     _id:'2',
    //     upVotes:3,
    //     downVotes:2,
    //     noOfAnswers:0,
    //     questionTitle: 'What is a function?',
    //     questionBody: 'It is meant to be',
    //     questionTags: ["javascript", "R", "python"],
    //     userPosted:"mano",
    //     askedOn:"jan 1",
    //     userId:1,
    //     answer:[{
    //         answerBody:'Answer',
    //         userAnswered: 'kumar',
    //         answeredOn:'jan 2',
    //         userId: 2,
    //     }]


    // },{
    //     _id:'3',
    //     upVotes:3,
    //     downVotes:2,
    //     noOfAnswers:0,
    //     questionTitle: 'What is a function?',
    //     questionBody: 'It is meant to be',
    //     questionTags: ["javascript", "R", "python"],
    //     userPosted:"mano",
    //     askedOn:"jan 1",
    //     userId:1,
    //     answer:[{
    //         answerBody:'Answer',
    //         userAnswered: 'kumar',
    //         answeredOn:'jan 2',
    //         userId: 2,
    //     }]




    // }]

    const[Answer, setAnswer ] = useState("")
    const Navigate = useNavigate('')
    const dispatch = useDispatch()
    const User = useSelector((state) => (state.currentUserReducer))
    const location = useLocation()
    const url = 'http://localhost:3000'
    
    const handlePostAns = (e, answerLength) =>{
        e.preventDefault()
        if(User === null){
            alert('Login or Signup to answer a question' )
            Navigate('/Auth')

        }else{
            if(Answer === ''){
                alert('Enter an answer before submitting')
            }else{
                dispatch(postAnswer({ id, noOfAnswers: answerLength + 1, answerBody:Answer, userAnswered: User.result.name, userId: User.result._id }))

            }
        }

    }

    const handleShare = () =>{
        copy(url+location.pathname)
        alert('Copied url :' +url+location.pathname)


    }

    const handleDelete = () =>{
        dispatch(deleteQuestion(id, Navigate))
    }

    const handleUpVote = () => {
        if (User === null) {
          alert("Login or Signup to up vote a question");
          Navigate("/Auth");
        } else {
          dispatch(voteQuestion(id, "upVote", User.result._id));
        }
      };
    
      const handleDownVote = () => {
        if (User === null) {
          alert("Login or Signup to down vote a question");
          Navigate("/Auth");
        } else {
          dispatch(voteQuestion(id, "downVote", User.result._id ));
        }
      };

    return(
        <div className='question-details-page'>
            {
                questionsList.data === null ?
                <h1>Loading...</h1>:
                <>
                  { 
                  questionsList.data.filter(question => question._id === id).map(question => (
                    <div key ={question._id}>
                        
                        <section className='question-details-container'>
                            <h1>{question.questionTitle}</h1>
                            <div className='question-details-container-2'>
                                <div className="question-votes">
                                    <img src={upvote}   className="votes-icon" alt='' width='18'  onClick ={ handleUpVote }/>
                                    <p>{question.upVote.length - question.downVote.length} </p>
                                    <img src={downvote}  className="votes-icon" alt='' width='18' onClick ={ handleDownVote }  />
                                </div>
                                <div style={{width: "100%"}}>
                                    <p className='question-body'>{question.questionBody}</p>
                                    <div className="question-details-tags">
                                        {
                                            question.questionTags.map((tag) => (
                                                <p key={tag}> {tag} </p>
                                            ))
                                        }
                                    </div>
                                    <div className="question-actions-user">
                                        <div className='edit-question-btn'>
                                            <button type='button' onClick={handleShare}>Share</button>
                                            {
                                                User?.result?._id === question?.userId && (
                                                    <button type= 'button' onClick={handleDelete}>Delete</button>
                                                )
                                            }

                                
                                            
                                            
                                        </div>
                                        <div>
                                            <p>asked {moment(question.askedOn).fromNow()}</p>
                                            <Link to={`/Users/${question.userId}`} className='user-link' style={{color: 'blue'}}>
                                                <Avatar backgroundColor='orange ' px='8px' py='5px'>{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                                <div>
                                                    {question.userPosted}
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section>
                        {
                            question.noOfAnswers !== 0 && (
                                <section className='posting-ans'>
                                    <h3>{question.noOfAnswers} Answers</h3>
                                    <DisplayAnswer key={question._id} question={question}  handleShare = {handleShare} />
                                </section>
                            )
                        }
                        <section className='post-ans-container'>
                                <h3>Your Answer</h3>
                                <form onSubmit={ (e) => handlePostAns(e, question.answer.length ) }>
                                    <textarea cols='30' rows='10' onChange={e => setAnswer(e.target.value)}></textarea><br />
                                    <input type='submit' className='post-ans-btn' value='Post Your Answer' />
                                </form>

                            
                            <p>
                            Browse other Question tagged
                            {
                                question.questionTags.map((tag) =>(
                                    <Link to='/Tags' key={tag} className='ans-tags' style={{textDecoration: "none", color:'rgb(72, 73, 170)', backgroundColor:'rgb(180, 215, 219)'}}>{tag}</Link>
                                ))
                            } or {
                                <Link to ='/AskQuestion' style={{textDecoration:'none', color:'blue'}}>ask your own question.</Link>
                            } 

                            </p>
                        </section>

                    </div>
                  ))
                  }

                </>
            }
            

        </div>
    )
}

export default QuestionsDetails