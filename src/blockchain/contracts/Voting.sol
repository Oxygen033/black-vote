// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    mapping(address => bool) public voters;
    mapping(string => uint256) public votes;

    string[] public candidates;

    constructor(string[] memory candidateNames) {
        candidates = candidateNames;
    }

    function vote(string memory candidate) public {
        require(!voters[msg.sender], 'You have already voted.');
        voters[msg.sender] = true;
        votes[candidate]++;
    }

    function getVotes(string memory candidate) public view returns (uint256) {
        return votes[candidate];
    }
}
