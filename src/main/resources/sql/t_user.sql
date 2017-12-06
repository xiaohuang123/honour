/*
SQLyog v10.2 
MySQL - 5.5.25 
*********************************************************************
*/
/*!40101 SET NAMES utf8 */;

create table `t_user` (
	`uid` int (11),
	`name` varchar (150),
	`pass` varchar (150),
	`rank` int (11)
); 
insert into `t_user` (`uid`, `name`, `pass`, `rank`) values('1','王潞瑶','890910','0');
insert into `t_user` (`uid`, `name`, `pass`, `rank`) values('2','王政','wwwwwww','1');
insert into `t_user` (`uid`, `name`, `pass`, `rank`) values('3','admin','admin','4');
insert into `t_user` (`uid`, `name`, `pass`, `rank`) values('4','米琪','mmmmmm','1');
insert into `t_user` (`uid`, `name`, `pass`, `rank`) values('5','菲菲','ffffff','1');
insert into `t_user` (`uid`, `name`, `pass`, `rank`) values('6','火火','hhhhhh','1');
insert into `t_user` (`uid`, `name`, `pass`, `rank`) values('7','无始','222222','1');
insert into `t_user` (`uid`, `name`, `pass`, `rank`) values('8','12345678','123456','1');
insert into `t_user` (`uid`, `name`, `pass`, `rank`) values('9','张晨','199292','1');
insert into `t_user` (`uid`, `name`, `pass`, `rank`) values('10','123','123','2');
