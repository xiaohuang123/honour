/*
SQLyog v10.2 
MySQL - 5.5.25 
*********************************************************************
*/
/*!40101 SET NAMES utf8 */;

create table `t_error_question` (
	`id` int (11),
	`qid` int (11),
	`uid` int (11),
	`state` int (11),
	`num` int (11),
	`time` varchar (150),
	`erroranswer` varchar (150)
); 
insert into `t_error_question` (`id`, `qid`, `uid`, `state`, `num`, `time`, `erroranswer`) values('1','7','1','1','8','2017年09月27日  02:48:40','C');
insert into `t_error_question` (`id`, `qid`, `uid`, `state`, `num`, `time`, `erroranswer`) values('2','8','1','1','8','2017年09月27日  01:45:34','B');
insert into `t_error_question` (`id`, `qid`, `uid`, `state`, `num`, `time`, `erroranswer`) values('3','9','1','1','3','2017年09月27日  01:13:35','C');
insert into `t_error_question` (`id`, `qid`, `uid`, `state`, `num`, `time`, `erroranswer`) values('4','31','1','1','5','2017年09月27日  01:45:34','C');
insert into `t_error_question` (`id`, `qid`, `uid`, `state`, `num`, `time`, `erroranswer`) values('5','12','1','1','3','2017年09月27日  01:45:34','A');
insert into `t_error_question` (`id`, `qid`, `uid`, `state`, `num`, `time`, `erroranswer`) values('6','20','1','1','1','2017年09月27日  01:13:35','B');
insert into `t_error_question` (`id`, `qid`, `uid`, `state`, `num`, `time`, `erroranswer`) values('7','11','1','1','1','2017年09月27日  01:22:30','C');
insert into `t_error_question` (`id`, `qid`, `uid`, `state`, `num`, `time`, `erroranswer`) values('8','40','1','1','1','2017年09月27日  01:51:47','AC');
insert into `t_error_question` (`id`, `qid`, `uid`, `state`, `num`, `time`, `erroranswer`) values('9','43','1','1','1','2017年09月27日  01:51:47','AB');
insert into `t_error_question` (`id`, `qid`, `uid`, `state`, `num`, `time`, `erroranswer`) values('10','46','1','1','1','2017年09月27日  01:51:47','BC');
insert into `t_error_question` (`id`, `qid`, `uid`, `state`, `num`, `time`, `erroranswer`) values('11','7','2','1','1','2017年09月30日  04:03:32','B');
insert into `t_error_question` (`id`, `qid`, `uid`, `state`, `num`, `time`, `erroranswer`) values('12','8','2','1','1','2017年09月30日  04:03:32','B');
insert into `t_error_question` (`id`, `qid`, `uid`, `state`, `num`, `time`, `erroranswer`) values('13','9','2','1','1','2017年09月30日  04:03:32','A');
insert into `t_error_question` (`id`, `qid`, `uid`, `state`, `num`, `time`, `erroranswer`) values('14','11','2','1','1','2017年09月30日  04:03:32','C');
insert into `t_error_question` (`id`, `qid`, `uid`, `state`, `num`, `time`, `erroranswer`) values('15','12','2','1','1','2017年09月30日  04:03:32','A');
insert into `t_error_question` (`id`, `qid`, `uid`, `state`, `num`, `time`, `erroranswer`) values('16','40','3','1','1','2017年10月01日  08:12:12','ABCD');
insert into `t_error_question` (`id`, `qid`, `uid`, `state`, `num`, `time`, `erroranswer`) values('17','46','3','1','1','2017年10月01日  08:12:12','AV');
insert into `t_error_question` (`id`, `qid`, `uid`, `state`, `num`, `time`, `erroranswer`) values('18','40','9','1','1','2017年10月09日  10:29:32','A');
