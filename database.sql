DROP TABLE IF EXISTS comment CASCADE;
DROP TABLE IF EXISTS video CASCADE;
DROP TABLE IF EXISTS account CASCADE;



DROP TABLE IF EXISTS account CASCADE;

CREATE TABLE account (
id    	 		SERIAL    	 	PRIMARY KEY,
email    		VARCHAR(256)    NOT NULL,
password_hash	VARCHAR(60)		NOT NULL,
join_date		DATE 			NOT NULL DEFAULT now()
);


INSERT INTO account (email, password_hash)
  VALUES ('smithb@icloud.com' , '1234#');

SELECT * FROM account;



CREATE TABLE video (
  id          SERIAL      PRIMARY KEY,
  account_id  INTEGER     NOT NULL REFERENCES account(id) ON DELETE CASCADE,
  title       VARCHAR(64) NOT NULL,
  youtube_str VARCHAR(11) NOT NULL,
  share_date  DATE        NOT NULL DEFAULT now()
);

INSERT INTO video (account_id, title, youtube_str)
  VALUES (1, 'BIG CATS like boxes too!', 'J11uu8L8FTY');

SELECT
  id,
  account_id,
  title,
  CONCAT('https://www.youtube.com/watch?v=', youtube_str) AS url,
  share_date
FROM video;



CREATE TABLE comment (
  id         SERIAL  PRIMARY KEY,
  account_id INTEGER NOT NULL REFERENCES account(id) ON DELETE CASCADE,
  video_id   INTEGER NOT NULL REFERENCES video(id) ON DELETE CASCADE,
  content    TEXT    NOT NULL,
  post_date  DATE    NOT NULL DEFAULT now()
);

INSERT INTO comment (account_id, video_id, content)
  VALUES (1, 1, 'Aw. How cute!'),
    (1, 1, 'This is another comment'),
    (1, 1, 'So Sweet!');

SELECT * FROM comment;



CREATE OR REPLACE VIEW video_view AS
  SELECT
    video.id,
    video.title,
    video_author.id AS author_id,
    video_author.email,
    video.youtube_str,
    CONCAT('https://www.youtube.com/watch?v=', video.youtube_str) AS url,
    video.share_date,
    jsonb_agg(jsonb_build_object(
      'content',   comment.content,
      'author',    account.email,
      'post_date', comment.post_date
    )) AS comments
  FROM video
  INNER JOIN account AS video_author
    ON video.account_id = video_author.id
  LEFT JOIN comment
    ON video.id = comment.video_id
  LEFT JOIN account
    ON comment.account_id = account.id
  GROUP BY
    video.id,
    video.title,
    video.youtube_str,
    video.share_date,
    video_author.id,
    video_author.email;



SELECT * FROM video_view WHERE id = 1;

