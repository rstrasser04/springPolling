import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import API from '@aws-amplify/api';
import Storage from '@aws-amplify/storage';
import { createPoll as createPollMutation, createCandidate as createCandidateMutation } from './graphql/mutations';
import { getPoll as getPollQuery } from './graphql/queries';
import slugify from './utils/slugify';
import Button from './Button';

let counter;
let pollId;

const initialState = {
  pollType: null,
  candidateType: null,
  candidate1: null,
  candidate2: null,
  candidate3: null,
  candidate4: null,
  candidate5: null,
  candidate6: null,
  candidate7: null,
  candidate8: null,
  candidate9: null,
  pollName: null,
  isUploading: false
}

export default function CreatePoll() {
  const [state, setState] = useState(initialState);
  const history = useHistory();
  function setPollType(type) {
    setState(() => ({ ...initialState, pollType: type }))
  }

  function onChangeText(e) {
    const { name, value } = e.target
    setState(currentState => ({ ...currentState, [name]: value }))
  }

  async function createPoll() {
    /* Check if poll name is already taken, if so append a version # to the name
    *  then create the poll.
    */
    const { pollType } = state;
    const { candidateType } = state;
    let { pollName } = state;
    try {
      pollId = slugify(pollName);
      if (counter) {
        pollId = `${pollId}-v-${counter}`;
      }
      const data = await API.graphql({
        query: getPollQuery,
        variables: {
          id: pollId
        }
      })
      if (data.data.getPoll) {
        counter ? counter = counter + 1 : counter = 2;
        return createPoll();
      }
    } catch (err) {}
    try {
      if (counter) {
        pollName = `${pollName}-v-${counter}`;
      }
      const pollData = { id: pollId, itemType: "Poll", type: pollType, name: pollName };

      const isImage = pollType === 'image';

      const isCandidate = candidateType === "Answer"

      const candidate1Data = {
        pollCandidatesId: pollId,
        upvotes: 0,
        name: !candidate1 ? "N/A" : candidate1,
        image: isImage ? candidate1.fileName : null,
        candidateType: "Answer"
      }
      const candidate2Data = {
        pollCandidatesId: pollId,
        upvotes: 0,
        name: !candidate2 ? "N/A" : candidate2,
        image: isImage ? candidate2.fileName : null,
        candidateType: "Answer"
      }
      const candidate3Data = {
        pollCandidatesId: pollId,
        upvotes: 0,
        name: !candidate3 ? "N/A" : candidate3,
        image: isImage ? candidate3.fileName : null,
        candidateType: "Answer"
      }
      const candidate4Data = {
        pollCandidatesId: pollId,
        upvotes: 0,
        name: !candidate4 ? "N/A" : candidate4,
        image: isImage ? candidate4.fileName : null,
        candidateType: "Answer"
      }
      const candidate5Data = {
        pollCandidatesId: pollId,
        upvotes: 0,
        name: !candidate5 ? "N/A" : candidate5,
        image: isImage ? candidate5.fileName : null,
        candidateType: "Answer"
      }
      const candidate6Data = {
        pollCandidatesId: pollId,
        upvotes: 0,
        name: !candidate6 ? "N/A" : candidate6,
        image: isImage ? candidate5.fileName : null,
        candidateType: "Answer"
      }
      const candidate7Data = {
        pollCandidatesId: pollId,
        upvotes: 0,
        name: !candidate7 ? "N/A" : candidate7,
        image: isImage ? candidate5.fileName : null,
        candidateType: "Answer"
      }
      const candidate8Data = {
        pollCandidatesId: pollId,
        upvotes: 0,
        name: !candidate8 ? "N/A" : candidate8,
        image: isImage ? candidate5.fileName : null,
        candidateType: "Answer"
      }
      const candidate9Data = {
        pollCandidatesId: pollId,
        upvotes: 0,
        name: !candidate9 ? "N/A" : candidate9,
        image: isImage ? candidate5.fileName : null,
        candidateType: "Answer"
      }

      const createPollPromise = API.graphql({ query: createPollMutation, variables: { input: pollData } });
      const createCandidate1Promise = API.graphql({ query: createCandidateMutation, variables: { input: candidate1Data } });
      const createCandidate2Promise = API.graphql({ query: createCandidateMutation, variables: { input: candidate2Data } });
      const createCandidate3Promise = API.graphql({ query: createCandidateMutation, variables: { input: candidate3Data } });
      const createCandidate4Promise = API.graphql({ query: createCandidateMutation, variables: { input: candidate4Data } });
      const createCandidate5Promise = API.graphql({ query: createCandidateMutation, variables: { input: candidate5Data } });
      const createCandidate6Promise = API.graphql({ query: createCandidateMutation, variables: { input: candidate6Data } });
      const createCandidate7Promise = API.graphql({ query: createCandidateMutation, variables: { input: candidate7Data } });
      const createCandidate8Promise = API.graphql({ query: createCandidateMutation, variables: { input: candidate8Data } });
      const createCandidate9Promise = API.graphql({ query: createCandidateMutation, variables: { input: candidate9Data } });
      await Promise.all([createPollPromise, createCandidate1Promise, createCandidate2Promise, createCandidate3Promise, createCandidate4Promise, createCandidate5Promise, createCandidate6Promise, createCandidate7Promise, createCandidate8Promise, createCandidate9Promise])

      const url = `/${pollId}`
      history.go(url)
    } catch(err) {
      console.log('error: ', err)
    }
  }

  const {
    pollType, candidate1, candidate2, candidate3, candidate4, candidate5, candidate6, candidate7, candidate8, candidate9, pollName, isUploading
  } = state
  const isDisabled = (!pollType || !candidate1 || !candidate2 || !candidate3 || !candidate4 || !candidate5 || candidate5 || !candidate6 || candidate7 || candidate8 || candidate9 || !pollName)

  return (
    <div>
      <h1 className="
      text-3xl
      sm:text-5xl leading-8
      ">Create a new poll</h1>
      <div>
        <p  className="text-xl mt-6">What type of poll would you like to create?</p>
        <div className="flex mb-14 mt-8">
          <Button
            onClick={() => setPollType('text')}
            title="Text"
            emoji="🦄"
          />
        </div>
      </div>
      {
        pollType === 'text' && (
          <div className="mt-8">
            <p className="mb-2 font-bold">What question do you want to ask?</p>
            <input
              placeholder="Question"
              name="pollName"
              onChange={onChangeText}
              autoComplete="off"
              className="w-full text-xl px-2 py-1 outline-none border rounded text-gray-400 bg-gray-900 border-gray-800"
            />
            <p className="mb-2 mt-4 font-bold">First answer</p>
            <input
              placeholder="Answer 1"
              name="candidate1"
              onChange={onChangeText}
              autoComplete="off"
              className="w-full text-xl px-2 py-1 outline-none border rounded text-gray-400 bg-gray-800 bg-gray-900 border-gray-800"

            />
            <p className="mb-2 mt-4 font-bold">Second answer</p>
            <input
              placeholder="Answer 2"
              name="candidate2"
              onChange={onChangeText}
              autoComplete="off"
              className="w-full text-xl px-2 py-1 outline-none border rounded text-gray-400 bg-gray-900 border-gray-800"

            />
            <p className="mb-2 mt-4 font-bold">Third answer</p>
            <input
              placeholder="Answer 3"
              name="candidate3"
              onChange={onChangeText}
              autoComplete="off"
              className="w-full text-xl px-2 py-1 outline-none border rounded text-gray-400 bg-gray-900 border-gray-800"

            />
            <p className="mb-2 mt-4 font-bold">Fourth answer</p>
            <input
              placeholder="Answer 4"
              name="candidate4"
              onChange={onChangeText}
              autoComplete="off"
              className="w-full text-xl px-2 py-1 outline-none border rounded text-gray-400 bg-gray-900 border-gray-800"

            />
            <p className="mb-2 mt-4 font-bold">Fifth answer</p>
            <input
              placeholder="Answer 5"
              name="candidate5"
              onChange={onChangeText}
              autoComplete="off"
              className="w-full text-xl px-2 py-1 outline-none border rounded text-gray-400 bg-gray-900 border-gray-800"
            />
            <p className="mb-2 mt-4 font-bold">Sixth answer</p>
            <input
              placeholder="Answer 6"
              name="candidate6"
              onChange={onChangeText}
              autoComplete="off"
              className="w-full text-xl px-2 py-1 outline-none border rounded text-gray-400 bg-gray-900 border-gray-800"
            />
            <p className="mb-2 mt-4 font-bold">Seventh answer</p>
            <input
              placeholder="Answer 7"
              name="candidate7"
              onChange={onChangeText}
              autoComplete="off"
              className="w-full text-xl px-2 py-1 outline-none border rounded text-gray-400 bg-gray-900 border-gray-800"
            />
            <p className="mb-2 mt-4 font-bold">Eighth answer</p>
            <input
              placeholder="Answer 8"
              name="candidate8"
              onChange={onChangeText}
              autoComplete="off"
              className="w-full text-xl px-2 py-1 outline-none border rounded text-gray-400 bg-gray-900 border-gray-800"
            />
            <p className="mb-2 mt-4 font-bold">Ninth answer</p>
            <input
              placeholder="Answer 9"
              name="candidate9"
              onChange={onChangeText}
              autoComplete="off"
              className="w-full text-xl px-2 py-1 outline-none border rounded text-gray-400 bg-gray-900 border-gray-800"
            />
          </div>
        )
      }
      {
        pollType && (
          <div className="mt-10">
            <Button
              onClick={createPoll}
              title="Create Poll"
              emoji="🚀"
              backgroundColor="#0090ff"
              /* disabled={isDisabled || isUploading} */
            />
          </div>
        )
      }
    </div>
  )
}

const imageStyle = {
  width: '100%',
  maxWidth: 500,
  borderRadius: 5,
  marginTop: 10,
  marginBottom: 20,
  boxShadow: '0px 0px 30px #ff00e4',
}

const inputFileStyle = {
  width: '0.1px',
  height:'0.1px',
  opacity: 0,
  overflow: 'hidden',
  position: 'absolute',
  zIndex: -1
}

const inputLabelStyle = {
  fontSize: '1.25em',
  backgroundColor: '#ff00e4',
  fontWeight: 700,
  padding: '8px 18px',
  color: 'white',
  display: 'inlineBlock',
  cursor: 'pointer'
}