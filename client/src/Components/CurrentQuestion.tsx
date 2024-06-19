import { useState } from "react"

type currentQuestionProps = {
    question: any
}

const CurrentQuestion = ({ question }: currentQuestionProps) => {
    const [selectedOption, setSelectedOption] = useState("")
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    return (
        <div className="flex flex-col items-center w-full h-[100vh]">
            <h1 className="mt-[40px] text-[40px] font-bold">Quizzily</h1>
            <div className="w-[500px] mt-8">

                <div className="text-[25px] font-medium">
                    <h1>{question.description}</h1>
                </div>

                <div className="flex-col mt-4">
                    {question.options.map((item:any)=>{
                        return(
                            <div className="mb-4 text-[20px] font-medium w-[300px] " key = {item.id}>
                                <input checked={item.id === selectedOption} onClick={(e) => {setSelectedOption(selectedOption => item.id)}} type="radio" className=" mx-4"/>{item.title}
                            </div>
                        )
                            
                        
                    })}
                </div>
            </div>
            <button disabled = {isSubmitted} className="bg-[#4374a1] text-white text-[18px] hover:opacity-90 mt-6 px-4 py-2 rounded-xl font-medium">Submit</button>
        </div>
    )
}

export default CurrentQuestion