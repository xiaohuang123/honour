/*
SQLyog v10.2 
MySQL - 5.5.25 
*********************************************************************
*/
/*!40101 SET NAMES utf8 */;

create table `t_seed_paper` (
	`id` int (11),
	`spname` varchar (765),
	`sqnum` int (11),
	`sminute` int (11),
	`stime` varchar (150),
	`pid` int (11)
); 
insert into `t_seed_paper` (`id`, `spname`, `sqnum`, `sminute`, `stime`, `pid`) values('2','填空题','5','50','30','2');
insert into `t_seed_paper` (`id`, `spname`, `sqnum`, `sminute`, `stime`, `pid`) values('3','单选题','10','30','25','2');
insert into `t_seed_paper` (`id`, `spname`, `sqnum`, `sminute`, `stime`, `pid`) values('4','多选题','5','20','25','2');
insert into `t_seed_paper` (`id`, `spname`, `sqnum`, `sminute`, `stime`, `pid`) values('5','单选题','10','40','30','5');
insert into `t_seed_paper` (`id`, `spname`, `sqnum`, `sminute`, `stime`, `pid`) values('6','多选题','5','30','25分钟','5');
