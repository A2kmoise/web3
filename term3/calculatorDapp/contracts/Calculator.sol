// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Calculator {
    function add(int256 a, int256 b) public pure returns (int256) {
        return a + b;
    }

    function subtract(int256 a, int256 b) public pure returns (int256) {
        return a - b;
    }

    function multiply(int256 a, int256 b) public pure returns (int256) {
        return a * b;
    }

    function divide(int256 a, int256 b) public pure returns (int256) {
        require(b != 0, "Division by zero");
        return a / b;
    }
}
