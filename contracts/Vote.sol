// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Vote {
    struct Votes {
        uint256 yes;
        uint256 no;
    }

    address[] currentPolls;

    mapping(address => Votes) polls;

    event PollCreated(address pollId);
    event VoteCast(address pollId, bool voteType);

    function createPoll(address pollId) public {
        currentPolls.push(pollId);
        
        polls[pollId].yes = 0;
        polls[pollId].no = 0;

        emit PollCreated(pollId);
    }

    function vote(address pollId, bool voteType) public {
        require(isValidPoll(pollId), "invalid poll");
        if (voteType) {
            polls[pollId].yes++;
        } else if (!voteType) {
            polls[pollId].no++;
        }

        emit VoteCast(pollId, voteType);
    }

    function isValidPoll(address pollId) private view returns (bool) {
        for (uint256 i = 0; i < currentPolls.length; i++) {
            if (currentPolls[i] == pollId) {
                return true;
            }
        }
        return false;
    }
}