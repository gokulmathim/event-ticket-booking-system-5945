#!/bin/bash
cd /home/kavia/workspace/code-generation/event-ticket-booking-system-5945/ticket_booking_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

