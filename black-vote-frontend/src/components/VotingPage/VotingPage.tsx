import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';

interface VotingPageProps {
    account: string | null;
}

const VotingPage: React.FC<VotingPageProps> = ({ account }) => {
    const { votingId } = useParams<{ votingId: string }>();
    const [candidates, setCandidates] = useState<string[]>([]); // Initialize as an array
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/blockchain/get-candidates/${votingId}`);

                // Check if response is JSON
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const result = await response.json();

                // Ensure that the result is an array
                if (Array.isArray(result)) {
                    setCandidates(result);
                } else {
                    throw new Error("Candidates data is not an array");
                }
            } catch (err) {
                setError("Failed to load candidates");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCandidates();
    }, [votingId]);


    const voteForCandidate = async (candidate: string) => {
        try {
            // Blockchain vote logic here
            const response = await fetch(`/blockchain/vote/${votingId}/${candidate}`, {
                method: 'POST'
            });
            console.log("Voted successfully", await response.json());
        } catch (error) {
            console.error("Voting failed:", error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Voting Page for {votingId}</h2>
            <div className="candidates-list">
                {candidates.length > 0 ? (
                    candidates.map((candidate) => (
                        <div key={candidate} className="candidate-card">
                            <h3>{candidate}</h3>
                            <button onClick={() => voteForCandidate(candidate)}>Vote</button>
                        </div>
                    ))
                ) : (
                    <p>No candidates found.</p>
                )}
            </div>
        </div>
    );
};

export default VotingPage;
