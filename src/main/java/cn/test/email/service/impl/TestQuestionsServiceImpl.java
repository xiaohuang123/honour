package cn.test.email.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.aspectj.weaver.patterns.TypePatternQuestions.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mysql.cj.api.io.ServerSession;

import cn.test.email.mapping.TExamQuestionMapper;
import cn.test.email.model.ErrorQuestion;
import cn.test.email.model.ErrorQuestionVo;
import cn.test.email.model.PageBean;
import cn.test.email.model.TExamQuestion;
import cn.test.email.model.TExamQuestionVo;
import cn.test.email.model.Users;
import cn.test.email.service.TestQuestionsService;
@Service
public class TestQuestionsServiceImpl implements TestQuestionsService {

	@Autowired
	private TExamQuestionMapper tExamQuestionMapper;

	/**
	 * 添加试题
	 */
	@Override
	public void addQuestion(TExamQuestion tExamQuestion) throws Exception{
		tExamQuestionMapper.insert(tExamQuestion);
	}

	/**
	 * 查找试题
	 * 分页显示
	 */
	@Override
	public PageBean<TExamQuestion> selectAllQuestion(Integer pageIndex,TExamQuestionVo tqv,Integer pageCount) {
		
		//获取分页实体类的对象
		PageBean<TExamQuestion> pb=new PageBean<TExamQuestion>();
		pb.setPageNum(pageIndex);
		pb.setPageCount(pageCount);
		
		tqv.setDbBegin(pb.getDbBegin());
		tqv.setPageCount(pb.getPageCount());
		
		List<TExamQuestion> list = tExamQuestionMapper.selectAll(tqv);
		pb.setDataList(list);
		
		for (TExamQuestion teq : list) {
			String option = teq.get_option();
			if(option!=null){
				
				String[] split = option.split(",");
				List<String> ops = teq.getOps();
				for (int i = 0; i < split.length; i++) {
					ops.add(split[i]);
				}
				
			}
		}
		
		
		int count = tExamQuestionMapper.selectCount(tqv);
		pb.setTotalCount(count);
		System.out.println(pb.getTotalPage());
		
		return pb;
	}

	/**
	 * 删除试题
	 */
	@Override
	public void deleteDo(Integer id) throws Exception{
		tExamQuestionMapper.deleteById(id);
	}

	/**
	 * 根据ID查询试题
	 */
	@Override
	public TExamQuestion selectQuestionById(Integer id) {
		// TODO Auto-generated method stub
		TExamQuestion teq = tExamQuestionMapper.selectById(id);
		String option = teq.get_option();
		if(option!=null){
			
			String[] split = option.split(",");
			List<String> ops = teq.getOps();
			for (int i = 0; i < split.length; i++) {
				ops.add(split[i]);
			}
		}
		return teq;
	}

	/**
	 * 根据ID修改
	 */
	@Override
	public void updateDo(TExamQuestion tExamQuestion,String[] options) throws Exception {
		if(options!=null && options.length>1){
			String st="";
			for (int i = 0; i < options.length; i++) {
				st+=options[i]+",";
			}
			tExamQuestion.set_option(st);
		}else if(options!=null && options.length==1){
			tExamQuestion.set_option(options[0]);
		}
		
		tExamQuestionMapper.updateById(tExamQuestion);
	}

	/**
	 * 根据ID批量删除
	 */
	@Override
	public void selectDelete(List<Integer> ids) throws Exception {
		TExamQuestionVo tqv=new TExamQuestionVo();
		tqv.setIds(ids);
		tExamQuestionMapper.selectDeleteById(tqv);
	}

	/**
	 * 根据sid 查询试题
	 */
	@Override
	public List<TExamQuestion> selectBySid(Integer sid) {
		// TODO Auto-generated method stub
		List<TExamQuestion> list = tExamQuestionMapper.selectBySid(sid);
		
		for (TExamQuestion teq : list) {
			String option = teq.get_option();
			if(option!=null){
				
				String[] split = option.split(",");
				List<String> ops = teq.getOps();
				for (int i = 0; i < split.length; i++) {
					ops.add(split[i]);
				}
				
			}
		}
		
		return list;
	}

	/**
	 * 储存用户的错误的试题信息
	 */
	@Override
	public void saveErrorQuestion(String countExam,HttpSession session) throws Exception {
		/**
		 * 创建错误试题类的实体对象
		 */
		ErrorQuestion erq=new ErrorQuestion();
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy年MM月dd日  hh:mm:ss");
		Users u = (Users) session.getAttribute("loginUser");
		if(u!=null){
			String[] s1 = countExam.split("/");
			for (int i = 0; i < s1.length; i++) {
				String[] s2 = s1[i].split(",");
				erq.setUid(u.getUid());
				erq.setQid(Integer.parseInt(s2[0]));
				//查找用户是否已有这条错误试题
				ErrorQuestion errorQuestion = tExamQuestionMapper.selectErrorQuestionById(erq);
				if(errorQuestion!=null){
					//如果有就修改
					erq.setErroranswer(s2[1]);
					Integer num = errorQuestion.getNum();
					num++;
					erq.setNum(num);//错误题又错一次，再加一次
					erq.setState(1);//状态为1
					erq.setTime(sdf.format(new Date()));//储存时间
					tExamQuestionMapper.updateErrorQuestion(erq);
				}else{
					//如果没有直接添加
					erq.setErroranswer(s2[1]);
					erq.setNum(1);//第一次添加数量是一
					erq.setState(1);//状态为1
					//储存时间
					erq.setTime(sdf.format(new Date()));
					tExamQuestionMapper.insertErrorQuestion(erq);
				}
				
			}
		}
	}

	/**
	 * 分页展示用户的错误试题
	 */
	@Override
	public PageBean<ErrorQuestion> selectErrorQuestionAll(HttpSession session,
			ErrorQuestionVo eqv, Integer pageIndex,Integer pageCount) {
		Users u = (Users) session.getAttribute("loginUser");
		//创建分页实体类对象
		PageBean<ErrorQuestion> pb=new PageBean<ErrorQuestion>();
		pb.setPageNum(pageIndex);
		pb.setPageCount(pageCount);
		if(u!=null){
			eqv.setUid(u.getUid());
			eqv.setDbBegin(pb.getDbBegin());
			eqv.setPageCount(pb.getPageCount());
			List<ErrorQuestion>  eqs = tExamQuestionMapper.selectErrorQuestionByUid(eqv);
			pb.setDataList(eqs);
			
			int questionCount = tExamQuestionMapper.errorQuestionCount(eqv);
			pb.setTotalCount(questionCount);
			
			
			List<TExamQuestion> list=new ArrayList<TExamQuestion>();
			for (ErrorQuestion e : eqs) {
				list.add(e.getTeExamQuestion());
			}
			
			for (TExamQuestion teq : list) {
				String option = teq.get_option();
				if(option!=null){
					
					String[] split = option.split(",");
					List<String> ops = teq.getOps();
					for (int i = 0; i < split.length; i++) {
						ops.add(split[i]);
					}
					
				}
			}
		}
		
		return pb;
	}

	/**
	 * 查找所有的试题不分页
	 */
	@Override
	public List<TExamQuestion> findAll() {
		// TODO Auto-generated method stub
		List<TExamQuestion> list = tExamQuestionMapper.findAll();

		for (TExamQuestion teq : list) {
			String option = teq.get_option();
			if(option!=null){
				
				String[] split = option.split(",");
				List<String> ops = teq.getOps();
				for (int i = 0; i < split.length; i++) {
					ops.add(split[i]);
				}
				
			}
		}
		return list;
	}

	/**
	 * 根据rank用户级别查询试题
	 */
	@Override
	public List<TExamQuestion> selectByRank(Integer rank) {
		// TODO Auto-generated method stub
		List<TExamQuestion> list = tExamQuestionMapper.selectByRank(rank);
		
		for (TExamQuestion teq : list) {
			String option = teq.get_option();
			if(option!=null){
				
				String[] split = option.split(",");
				List<String> ops = teq.getOps();
				for (int i = 0; i < split.length; i++) {
					ops.add(split[i]);
				}
				
			}
		}
		
		return list;
	}
}
