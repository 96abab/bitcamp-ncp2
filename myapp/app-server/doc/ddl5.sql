drop table if exists hms_mem restrict;

create table hms_mem(
  member_id int not null,
  email varchar(50) not null,
  pwd varchar(20) not null,
  name varchar(50) not null,
  tel varchar(20),
   nick varchar(15),
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

  
  insert into hms_mem(member_id, email, pwd,name)
values (1,  'root@root', sha2('1111',256),'root');
  








  