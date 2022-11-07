const {
  TASK_QUEUE_AVAILABILITY,
  TASK_QUEUE_RESERVATION,
} = process.env

export const AVAILABILITY = TASK_QUEUE_AVAILABILITY || 'availability'
export const RESERVATION = TASK_QUEUE_RESERVATION || 'reservation'
