



DROP TABLE IF EXISTS account CASCADE;

CREATE TABLE account (
id    	 		SERIAL    	 	PRIMARY KEY,
email    		VARCHAR(256)    NOT NULL,
password_hash	VARCHAR(60)		NOT NULL,
join_date		DATE 			NOT NULL
);


INSERT INTO account ( email, password_hash, join_date )
VALUES ('smithb@icloud.com' , '1234#', '2018-06-27');

SELECT * FROM logactivity;


CREATE TABLE activity(
id 		SERIAL		PRIMARY KEY,
name	VARCHAR(30)	NOT NULL
);

INSERT INTO activity(name)
VALUES ('running'), ('yoga'), ('weight lift');


DROP TABLE IF EXISTS logactivity CASCADE;

CREATE TABLE IF NOT EXISTS logactivity (
  id          SERIAL   PRIMARY KEY,
  activity_id INTEGER  NOT NULL REFERENCES activity (id),
  durations   INTERVAL NOT NULL,
  myeffort    INTEGER  NOT NULL,
  post_date   DATE     NOT NULL DEFAULT now()
);

INSERT INTO logactivity (activity_id, durations, myeffort)
  VALUES ((SELECT id FROM activity WHERE name = 'running'), '00:30:10', 8);



SELECT
  activity.name,
  logactivity.durations,
  logactivity.myeffort
FROM logactivity
INNER JOIN activity
  ON logactivity.activity_id = activity.id;




