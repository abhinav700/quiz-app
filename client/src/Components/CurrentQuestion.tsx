type currentQuestionProps = {
    question: any
}

const CurrentQuestion = ({question}:currentQuestionProps) =>{
    
    return(
        <div>This is the current Question element
            <div className="">
                {JSON.stringify(question)};
            </div>
        </div>
    )
}

export default CurrentQuestion