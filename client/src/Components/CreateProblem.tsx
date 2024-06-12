import React, { useState } from 'react'
import { Socket } from 'socket.io-client';

const CreateProblem = ({ socket, roomId }: { socket: Socket, roomId: string }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [answer, setAnswer] = useState(0);
    const [options, setOptions] = useState([
        {
            id: 1,
            title: ""
        },
        {
            id: 2,
            title: ""
        },
        {
            id: 3,
            title: ""
        },
        {
            id: 4,
            title: ""
        }
    ])

    return (
        <div>
            <p>CreateProblem</p>

            Title : <input type="text"
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
                value={title} />
   Description - <input type="text" onChange={(e) => {
            setDescription(e.target.value)
        }}></input>
            {
                [1, 2, 3, 4].map(optionId =>
                    <div>
                        <input type='radio' checked={optionId == answer} onChange={(e) => setAnswer(answer => optionId)} />
                        option {optionId}

                        <input type="text" className="bg-gray-500 my-1" onChange={(e) => {
                            setOptions(options => options.map(x => {
                                return x.id == optionId ? { ...x, title: e.target.value } : x
                            }))
                        }} />
                    </div>)
            }
            <button onClick={() => {
                socket?.emit("createProblem", {
                    roomId,
                    problem: {
                        title,
                        description,
                        options,
                        answer

                    }
                });
            }}>Add a Problem</button>

        </div>
    )
}

export default CreateProblem