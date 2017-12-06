/*
SQLyog v10.2 
MySQL - 5.5.25 
*********************************************************************
*/
/*!40101 SET NAMES utf8 */;

create table `t_exam_question` (
	`id` int (11),
	`title` varchar (1500),
	`_option` varchar (1500),
	`answer` varchar (1500),
	`type` varchar (3),
	`sid` int (11),
	`rank` int (11)
); 
insert into `t_exam_question` (`id`, `title`, `_option`, `answer`, `type`, `sid`, `rank`) values('7','赵云的武器是什么？','龙胆亮银枪,青龙偃月刀,百鸟朝凤枪,丈八蛇矛,','A','1','3','1');
insert into `t_exam_question` (`id`, `title`, `_option`, `answer`, `type`, `sid`, `rank`) values('8','西游记的作者是谁？','施耐庵,张晨,吴承恩,曹雪芹,','C','1','3','1');
insert into `t_exam_question` (`id`, `title`, `_option`, `answer`, `type`, `sid`, `rank`) values('9','分页的关键字是什么？','limit,update,order,group,','A','1','3','1');
insert into `t_exam_question` (`id`, `title`, `_option`, `answer`, `type`, `sid`, `rank`) values('11','出师表是谁写的？','司马懿,诸葛亮,赵云,黄忠,','B','1','3','1');
insert into `t_exam_question` (`id`, `title`, `_option`, `answer`, `type`, `sid`, `rank`) values('12','QQ是哪个公司发明的？','阿里巴巴,百度,腾讯,京东,','C','1','3','1');
insert into `t_exam_question` (`id`, `title`, `_option`, `answer`, `type`, `sid`, `rank`) values('20','我爱你','爱,恨,仇,情,','A','1','3','1');
insert into `t_exam_question` (`id`, `title`, `_option`, `answer`, `type`, `sid`, `rank`) values('31','王政是个什么样的人？','好人,贱人,坏人,骚年,','A','1','3','1');
insert into `t_exam_question` (`id`, `title`, `_option`, `answer`, `type`, `sid`, `rank`) values('38','常见的XML解析方式有哪些（至少写三种）？','dom4j,jaxp,sax,','其实还有很多，真的有奥','2','2','1');
insert into `t_exam_question` (`id`, `title`, `_option`, `answer`, `type`, `sid`, `rank`) values('40','下列哪些是李白的诗？','静夜思,望庐山瀑布,赠汪伦,诗经,','ABC','3','4','1');
insert into `t_exam_question` (`id`, `title`, `_option`, `answer`, `type`, `sid`, `rank`) values('43','中国的三皇五帝中三皇是指那三皇？','天皇伏羲,地皇神农,大尧,人皇黄帝,','ABD','3','4','1');
insert into `t_exam_question` (`id`, `title`, `_option`, `answer`, `type`, `sid`, `rank`) values('46','springMVC和struts2的区别有哪些','springMVC用方法接收参数，struts2是用属性接收参数,springMVC是方法级别的拦截，Struts2是类级别的拦截,springMVC目前还没有漏洞，struts2有漏洞,springMVC是单例的，并且建议单例，struts2是多例的,','ABCD','3','4','3');
insert into `t_exam_question` (`id`, `title`, `_option`, `answer`, `type`, `sid`, `rank`) values('49','下面那个域的范围最大?','session,application,page,request,','B','1','5','2');
insert into `t_exam_question` (`id`, `title`, `_option`, `answer`, `type`, `sid`, `rank`) values('50','springMVC的控制层用什么注解?','@Controller,@Service,@RequestMapping,@ResponseBody,','A','1','3','3');
insert into `t_exam_question` (`id`, `title`, `_option`, `answer`, `type`, `sid`, `rank`) values('51','下面list集合与map集合的区别那个说法正确？','list无序，map有序,list只能储存单例，map可以储存双列,list没有重复值,map的key可以重复,','B','1','3','1');
insert into `t_exam_question` (`id`, `title`, `_option`, `answer`, `type`, `sid`, `rank`) values('52','Tomcat的默认端口号是多少？','8080,3306,80,10,','A','1','3','1');
insert into `t_exam_question` (`id`, `title`, `_option`, `answer`, `type`, `sid`, `rank`) values('53','中国的全称','中华人民共和国','','2','2','1');
