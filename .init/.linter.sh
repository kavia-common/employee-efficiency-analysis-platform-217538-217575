#!/bin/bash
cd /home/kavia/workspace/code-generation/employee-efficiency-analysis-platform-217538-217575/employee_efficiency_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

