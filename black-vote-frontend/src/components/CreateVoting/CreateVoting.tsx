import { useState } from 'react';
import axios from 'axios';

interface CreateVotingProps {
    account: string | null;
}

const CreateVoting: React.FC<CreateVotingProps> = ({ account }) => {
    const [votingName, setVotingName] = useState<string>('');
    const [candidates, setCandidates] = useState<string>('');

    const createVoting = async () => {
        try {
            const response = await axios.post(
                `http://localhost:3000/blockchain/create-voting/${votingName}`,
                null,
                {
                    params: { candidates: candidates },
                    headers: { 'eth-account': account },
                }
            );
            alert(`Voting created! ID: ${response.data.votingId}`);
        } catch (error) {
            console.error('Error creating voting:', error);
        }
    };

    return (
        <div>
            <h2>Create New Voting</h2>
            <input
                type='text'
                placeholder='Voting Name'
                value={votingName}
                onChange={(e) => setVotingName(e.target.value)}
            />
            <textarea
                placeholder='Candidates (comma separated)'
                value={candidates}
                onChange={(e) => setCandidates(e.target.value)}
            />
            <button onClick={createVoting}>Create</button>
        </div>
    );
};

export default CreateVoting;
