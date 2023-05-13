// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import { ByteHasher } from "./helpers/ByteHasher.sol";
import { IWorldID } from "./interfaces/IWorldID.sol";

contract Vote {
    using ByteHasher for bytes;

    IWorldID internal immutable worldId;

    /// @dev The contract's external nullifier hash
    uint256 internal immutable externalNullifier;

    struct Poll {
        string title;
        string description;
        uint256 yes;
        uint256 no;
        string fileHash;
        uint256[] voters;
    }

    Poll[] polls;

    uint256 pollCounter = 0;

    event PollCreated(uint256 pollId);
    event VoteCast(uint256 pollId, bool voteType);

    /// @param _worldId The WorldID instance that will verify the proofs
    /// @param _appId The World ID app ID
    constructor(
        IWorldID _worldId,
        string memory _appId
    ) {
        worldId = _worldId;
        externalNullifier = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), address(this))
            .hashToField();
    }

    function createPoll(string memory _title, string memory _description, string memory _fileHash) public returns(uint256) {
        Poll memory poll = Poll(_title, _description, 0, 0, _fileHash, new uint256[](0));
        polls.push(poll);

        emit PollCreated(pollCounter);
        pollCounter++;
        return pollCounter-1;
    }

    function getAllPolls() public view returns(Poll[] memory) {
        return polls;
    }

    function getPoll(uint256 pollId) public view returns(Poll memory) {
        require(isValidPoll(pollId), "invalid poll");
        return polls[pollId];
    }

    function vote(
        uint256 pollId,
        bool voteType,
        address signal,
        uint256 root,
        uint256 nullifierhash,
        uint256[8] calldata proof
    ) public {
        require(isValidPoll(pollId), "invalid poll");
        // check to make sure person hasn't voted yet
        require(verifyVoter(signal, root, nullifierhash, proof, pollId), "user already voted");

        if (voteType) {
            polls[pollId].yes++;
        } else if (!voteType) {
            polls[pollId].no++;
        }

        polls[pollId].voters.push();

        emit VoteCast(pollId, voteType);
    }

    function verifyVoter(
      address signal,
      uint256 root,
      uint256 nullifierhash,
      uint256[8] calldata proof,
      uint256 pollId
    ) private returns(bool) {
        Poll storage poll = polls[pollId];
        if (alreadyVoted(poll, nullifierhash)) return false;

        // verify the provided proof
        worldId.verifyProof(
            root,
            1,
            abi.encodePacked(signal).hashToField(),
            nullifierhash,
            externalNullifier,
            proof
        );

        poll.voters.push(nullifierhash);
        return true;
    }

    // returns true if nullifierhash is in poll.voters array; otherwise false
    function alreadyVoted(Poll memory poll, uint256 nullifierhash) internal pure returns(bool) {
        for (uint i = 0; i < poll.voters.length; i++) {
            if (poll.voters[i] == nullifierhash) {
                return true;
            }
        }
        return false;
    }

    function isValidPoll(uint256 pollId) private view returns (bool) {
        if (pollId < polls.length) {
            return true;
        } else {
            return false;
        }
    }
}