#!/bin/bash
cd /home/kavia/workspace/code-generation/tictactoe-classic-107722-1bb8d68a/tic_tac_toe_game
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

