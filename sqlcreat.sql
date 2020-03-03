create database `net`;
use `net` ;
create table `user`
(
	`id` int,
	`loginname` char(20),
	`password` int,
	`username` char(20),
	`sex` char(5),
	`phonenumber` int,
	`city` char(20)
);

insert user values (1,'John','123456','Thomas','male','123456789','London');

create user 'boy'@'%' identified by '';
grant all on net.user to 'boy'@'%' with grant option; 
