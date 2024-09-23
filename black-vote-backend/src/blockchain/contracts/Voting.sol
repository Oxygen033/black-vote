// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    event VotingCreated(bytes32 votingId, string voteName);

    struct OpenVoting {
        address author;
        string[] candidates;
        mapping(address => string) voterChoices;
        mapping(string => uint256) votes;
    }

    mapping(bytes32 => OpenVoting) private openVotings;

    function vote(bytes32 voteId, string memory candidate) public {
        bool validCandidate = false;
        for (uint i = 0; i < openVotings[voteId].candidates.length; i++) {
            if (
                keccak256(
                    abi.encodePacked(openVotings[voteId].candidates[i])
                ) == keccak256(abi.encodePacked(candidate))
            ) {
                validCandidate = true;
                break;
            }
        }
        require(validCandidate, 'Invalid candidate');

        OpenVoting storage voting = openVotings[voteId];

        if (bytes(voting.voterChoices[msg.sender]).length != 0) {
            string memory previousVote = voting.voterChoices[msg.sender];
            voting.votes[previousVote]--;
        }

        voting.voterChoices[msg.sender] = candidate;
        voting.votes[candidate]++;
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
