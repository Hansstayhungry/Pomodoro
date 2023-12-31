-- schema/04_interruptions.sql
DROP TABLE IF EXISTS interruptions CASCADE;
-- CREATE INTERRUPTIONS
CREATE TABLE interruptions ( 
  id SERIAL PRIMARY KEY NOT NULL, 
  start_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  end_time TIMESTAMP WITH TIME ZONE,   
  pomodoros_id INTEGER NOT NULL REFERENCES pomodoros (id) ON DELETE CASCADE
);