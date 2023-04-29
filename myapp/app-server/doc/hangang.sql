create table hms_mem(
  member_id int not null,
  email varchar(50) not null,
  pwd varchar(15) not null,
  name varchar(4) not null,
  tel varchar(14),
  nick varchar(5),
  intro LONGTEXT,
  hob TEXT,
  created_date datetime default now()
);

alter table hms_mem
  add constraint primary key (member_id),
  modify column member_id int not null auto_increment;

alter table hms_mem
  add constraint app_member_uk unique (email);
  
alter table hms_mem
  modify column pwd varchar(100) not null;
  
alter table hms_mem
  add column inter varchar(50);

  
  
create table hms_gall (
  board_id int not null,
  title varchar(15) not null,
  content text not null,
  pwd varchar(10),
  comment varchar(30),
  created_date datetime default now(),
  view_cnt int default 0
);

alter table hms_gall
  add constraint primary key (board_id),
  modify column board_id int not null auto_increment;

alter table hms_gall
  add column writer int,
  add constraint hms_gall_fk foreign key (writer) references hms_mem(member_id);
  
  alter table hms_gall
  add column comment int,
  add constraint hms_gall_fk_comment foreign key (comment) references hms_comm(comment_id);

  
create table hms_gall_file (
  boardfile_id int not null,
  filepath varchar(255) not null,
  origin_filename varchar(255) not null,
  mime_type varchar(30) not null,
  board_id int not null
);

alter table hms_gall_file
  add constraint primary key (boardfile_id),
  modify column boardfile_id int not null auto_increment;
  
alter table hms_gall_file
add constraint hms_gall_file_fk foreign key (board_id) references hms_gall (board_id);
  
  
  alter table hms_gall_file
  add column writer int,
  add constraint hms_gall_file_writerfk foreign key (writer) references hms_mem(member_id);
  
  
  create table hms_comm(
  comment_id int ,
  content varchar(30),
  board_id int,
  created_date datetime default now()
);

alter table hms_comm
  add constraint primary key (comment_id),
  modify column comment_id int not null auto_increment;


alter table hms_comm
  add column writer int,
  add constraint hms_comm_fk_writer foreign key (writer) references hms_mem(member_id);
  
alter table hms_comm
  add constraint hms_comm_fk_board_id foreign key (board_id) references hms_gall(board_id);
  
CREATE TABLE hms_like ( like_id INT AUTO_INCREMENT PRIMARY KEY, board_id INT NOT NULL, member_id INT NOT NULL, 
  FOREIGN KEY (board_id) REFERENCES hms_gall(board_id), FOREIGN KEY (member_id) REFERENCES hms_mem(member_id) );
  
  
  

create table hms_mem_file (
  memberfile_id int not null,
  filepath varchar(255) not null,
  origin_filename varchar(255) not null,
  mime_type varchar(30) not null,
  member_id int not null
);

alter table hms_mem_file
  add constraint primary key (memberfile_id),
  modify column memberfile_id int not null auto_increment;

  alter table hms_mem_file
  add constraint hms_mem_fk_file foreign key (member_id) references hms_mem(member_id);
alter table hms_mem_file
  add column board_id int
  
alter table hms_mem_file
  add constraint hms_mem_fk_file2 foreign key (board_id) references hms_gall(board_id);

  
CREATE TABLE hms_follow (
  follow_id INT(11) NOT NULL AUTO_INCREMENT,
  follower_id INT(11) NOT NULL,
  followed_id INT(11) NOT NULL,
  created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (follow_id),
  FOREIGN KEY (follower_id) REFERENCES hms_mem(member_id) ON DELETE CASCADE,
  FOREIGN KEY (followed_id) REFERENCES hms_mem(member_id) ON DELETE CASCADE,
  UNIQUE (follower_id, followed_id)
);

create table hms_qna(
  qna_id int not null,
  nick varchar(5),
  content varchar(100),
  created_date datetime default now()
);
  
alter table hms_qna
  add constraint primary key (qna_id),
  modify column qna_id int not null auto_increment;

  alter table hms_qna
  add column writer int,
  add constraint hms_qna_fk foreign key (writer) references hms_mem(member_id);
  
    alter table hms_qna
  add column title varchar(15);


  