/*
SQLyog v10.2 
MySQL - 5.5.25 
*********************************************************************
*/
/*!40101 SET NAMES utf8 */;

create table `question_type` (
	`id` int (11),
	`type` varchar (30)
); 
insert into `question_type` (`id`, `type`) values('1','单选题');
insert into `question_type` (`id`, `type`) values('2','填空题');
insert into `question_type` (`id`, `type`) values('3','多选题');
insert into `question_type` (`id`, `type`) values('4','填空题');
insert into `question_type` (`id`, `type`) values('5','问答题');
insert into `question_type` (`id`, `type`) values('6','不定项选择题');
