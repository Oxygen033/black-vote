// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    event VotingCreated(bytes32 votingId, string voteName);

    struct OpenVoting {
        address author;
        string[] candidates;
        mapping(address => bool) voters;
        mapping(string => uint256) votes;
    }

    mapping(bytes32 => OpenVoting) private openVotings;

    function vote(bytes32 voteId, string memory candidate) public {
        require(
            !openVotings[voteId].voters[msg.sender],
            'You have already voted.'
        );
        openVotings[voteId].voters[msg.sender] = true;
        openVotings[voteId].votes[candidate]++;
    }

    function getVotes(
        bytes32 voteId,
        string memory candidate
    ) public view returns (uint256) {
        return openVotings[voteId].votes[candidate];
    }

    function createVote(
        string memory votingName,
        string[] memory _candidates
    ) public {
        bytes32 votingId = keccak256(
            abi.encodePacked(votingName, msg.sender, block.timestamp)
        );
        OpenVoting storage newVote = openVotings[votingId];
        newVote.candidates = _candidates;
        newVote.author = msg.sender;
        emit VotingCreated(votingId, votingName);
    }

    function getCandidates(
        bytes32 voteId
    ) public view returns (string[] memory) {
        return openVotings[voteId].candidates;
    }

    function addCandidate(bytes32 votingId, string memory candidate) public {
        require(
            openVotings[votingId].author == msg.sender,
            'You are not author of voting!'
        );
        openVotings[votingId].candidates.push(candidate);
    }
}
