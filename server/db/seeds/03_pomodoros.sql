INSERT INTO pomodoros (start_time, end_time, duration, task_id, user_id) VALUES 
 (now() - interval '1 hour' , now() - interval '35 minutes' , age(now() - interval '35 minutes' , now() - interval '1 hour') , 1 , 1) , 
 (now() - interval '2 hours' , now() - interval '1:35:00' , age(now() - interval '1:35:00' , now() - interval '2 hours') , 2 , 2), 
 (now() - interval '3 hours' , now() - interval '2:35:00' , age(now() - interval '2:35:00' , now() - interval '3 hours') , 3 , 3),
 (now() - interval '1 hour' , now() - interval '35 minutes' , age(now() - interval '35 minutes' , now() - interval '1 hour') , 4 , 4) , 
 (now() - interval '2 hours' , now() - interval '1:35:00' , age(now() - interval '1:35:00' , now() - interval '2 hours') , 5 , 5), 
 (now() - interval '3 hours' , now() - interval '2:35:00' , age(now() - interval '2:35:00' , now() - interval '3 hours') , 6 , 6),
 (now() - interval '1 hour' , now() - interval '35 minutes' , age(now() - interval '35 minutes' , now() - interval '1 hour') , 7 , 7) , 
 (now() - interval '2 hours' , now() - interval '1:35:00' , age(now() - interval '1:35:00' , now() - interval '2 hours') , 8 , 8), 
 (now() - interval '3 hours' , now() - interval '2:35:00' , age(now() - interval '2:35:00' , now() - interval '3 hours') , 9 , 9),
 (now() - interval '1 hour' , now() - interval '35 minutes' , age(now() - interval '35 minutes' , now() - interval '1 hour') , 10 , 10) ,
 (now() - interval '3 hours' , now() - interval '2:35:00' , age(now() - interval '2:35:00' , now() - interval '3 hours') , 11 , 11),
 (now() - interval '1 hour' , now() - interval '35 minutes' , age(now() - interval '35 minutes' , now() - interval '1 hour') , 12 , 12);