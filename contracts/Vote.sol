// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Vote {
    struct Poll {
        string title;
        string description;
        uint256 yes;
        uint256 no;
        string fileHash;
    }

    Poll[] polls;

    uint256 pollCounter = 0;

    event PollCreated(uint256 pollId);
    event VoteCast(uint256 pollId, bool voteType);

    function createPoll(string memory _title, string memory _description, string memory _fileHash) public {
        polls[pollCounter].title = _title;
        polls[pollCounter].description = _description;
        polls[pollCounter].yes = 0;
        polls[pollCounter].no = 0;
        polls[pollCounter].fileHash = _fileHash;

        emit PollCreated(pollCounter);

        pollCounter++;
    }

    function getAllPolls() public view returns(Poll[] memory) {
        return polls;
    }

    function getPoll(uint256 pollId) public view returns(Poll memory) {
        require(isValidPoll(pollId), "invalid poll");
        return polls[pollId];
    }

    function vote(uint256 pollId, bool voteType) public {
        require(isValidPoll(pollId), "invalid poll");
        if (voteType) {
            polls[pollId].yes++;
        } else if (!voteType) {
            polls[pollId].no++;
        }

        emit VoteCast(pollId, voteType);
    }

    function isValidPoll(uint256 pollId) private view returns (bool) {
        if (pollId < polls.length) {
            return true;
        } else {
            return false;
        }
    }
}