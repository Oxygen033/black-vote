// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct OpenVote {
        string[] candidates;
        mapping(address => bool) voters;
        mapping(string => uint256) votes;
    }

    mapping(bytes32 => OpenVote) private openVotes;

    function vote(bytes32 voteId, string memory candidate) public {
        require(
            !openVotes[voteId].voters[msg.sender],
            'You have already voted.'
        );
        openVotes[voteId].voters[msg.sender] = true;
        openVotes[voteId].votes[candidate]++;
    }

    function getVotes(
        bytes32 voteId,
        string memory candidate
    ) public view returns (uint256) {
        return openVotes[voteId].votes[candidate];
    }

    function createVote(
        string memory voteName,
        string[] memory _candidates
    ) public {
        OpenVote storage newVote = openVotes[
            keccak256(abi.encodePacked(voteName))
        ];
        newVote.candidates = _candidates;
    }

    function getCandidates(
        bytes32 voteId
    ) public view returns (string[] memory) {
        return openVotes[voteId].candidates;
    }
}
