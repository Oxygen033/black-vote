import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './App.css';
import { ethers } from 'ethers';

Modal.setAppElement('#root');

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const [votingId, setVotingId] = useState('');
  const [candidates, setCandidates] = useState<{ name: string; votes: number }[]>([]);
  const [voteModalOpen, setVoteModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newVotingName, setNewVotingName] = useState('');
  const [newCandidates, setNewCandidates] = useState('');
  const [createdVotingId, setCreatedVotingId] = useState<string | null>(null);
  const [votedCandidate, setVotedCandidate] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        console.error('User rejected connection:', error);
      }
    } else {
      alert('MetaMask is not installed.');
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const votingIdFromUrl = urlParams.get('votingId');
    if (votingIdFromUrl) {
      fetchCandidates(votingIdFromUrl);
    }
  }, []);

  const updateUrlWithVotingId = (votingId: string) => {
    window.history.pushState(null, '', `?votingId=${votingId}`);
  };

  const fetchCandidates = async (votingId: string) => {
    try {
      if (createModalOpen) {
        closeCreateModal();
      }

      const candidatesResponse = await fetch(`http://localhost:3000/blockchain/get-candidates/${votingId}`);
      const candidatesData: string[] = await candidatesResponse.json();

      const candidatesWithVotes = await Promise.all(candidatesData.map(async (candidate) => {
        const votesResponse = await fetch(`http://localhost:3000/blockchain/get-votes/${votingId}/${candidate}`);
        const votes = await votesResponse.json();
        return { name: candidate, votes: parseInt(votes) };
      }));

      setCandidates(candidatesWithVotes);
      setVoteModalOpen(true);
      updateUrlWithVotingId(votingId);
    } catch (error) {
      console.error('Error fetching candidates and votes:', error);
    }
  };

  const submitVote = async (votingId: string, candidate: string) => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();

        await fetch(`http://localhost:3000/blockchain/vote/${votingId}/${candidate}`, {
          method: 'POST',
        });

        setVotedCandidate(candidate);
        fetchCandidates(votingId);
      }
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };

  const createNewVoting = async () => {
    try {
      const candidatesList = newCandidates.split(',').map((candidate) => candidate.trim());
      const response = await fetch(`http://localhost:3000/blockchain/create-voting/${newVotingName}?candidates=${candidatesList.join(',')}`, {
        method: 'POST',
      });
      const { votingId } = await response.json();
      setCreatedVotingId(votingId);
    } catch (error) {
      console.error('Error creating voting:', error);
      setCreatedVotingId(null);
    }
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
    setNewVotingName('');
    setNewCandidates('');
    setCreatedVotingId(null);
  };

  return (
    <>
      <div className='half-block'>
        <img alt='logo' className='logo-image'></img>
      </div>
      <div className='half-block-lower'>
        <h1>Black Vote</h1>
        <h3>Blockchain voting platform</h3>
        <div className='voting-search-container'>
          <label htmlFor='voting-find'>Find a voting by id</label>
          <input
            type='text'
            id='voting-find'
            placeholder='Voting address'
            value={votingId}
            onChange={(e) => setVotingId(e.target.value)}
          />
          <button onClick={() => fetchCandidates(votingId)}>Search</button>
        </div>
        <button onClick={() => setCreateModalOpen(true)}>Or create new voting</button>
        <button onClick={connectWallet}>Connect MetaMask</button>
      </div>

      <Modal isOpen={voteModalOpen} onRequestClose={() => setVoteModalOpen(false)} contentLabel="Vote Modal">
        <h2>Candidates</h2>
        {candidates.map((candidate) => (
          <div
            key={candidate.name}
            className={`candidate-card ${votedCandidate === candidate.name ? 'voted' : ''}`}
            onClick={() => submitVote(votingId, candidate.name)}
          >
            <p>{candidate.name}</p>
            <span>Votes: {candidate.votes}</span>
          </div>
        ))}
        <button onClick={() => setVoteModalOpen(false)}>Close</button>
      </Modal>

      <Modal isOpen={createModalOpen} onRequestClose={closeCreateModal} contentLabel="Create Voting Modal">
        <h2>Create New Voting</h2>
        <input
          type='text'
          placeholder='Voting Name'
          value={newVotingName}
          onChange={(e) => setNewVotingName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Candidates (comma separated)'
          value={newCandidates}
          onChange={(e) => setNewCandidates(e.target.value)}
        />
        <button onClick={createNewVoting}>Create</button>
        {createdVotingId && (
          <>
            <p>Voting created with ID: {createdVotingId}</p>
            <button onClick={() => fetchCandidates(createdVotingId)}>Go to Voting</button>
          </>
        )}
        <button onClick={closeCreateModal}>Close</button>
      </Modal>
    </>
  );
}

export default App;
