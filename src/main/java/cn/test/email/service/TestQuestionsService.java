package cn.test.email.service;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.aspectj.weaver.patterns.TypePatternQuestions.Question;

import cn.test.email.model.ErrorQuestion;
import cn.test.email.model.ErrorQuestionVo;
import cn.test.email.model.PageBean;
import cn.test.email.model.TExamQuestion;
import cn.test.email.model.TExamQuestionVo;
import cn.test.email.model.Users;

public interface TestQuestionsService {

	void addQuestion(TExamQuestion tExamQuestion)throws Exception;

	PageBean<TExamQuestion> selectAllQuestion(Integer pageIndex,TExamQuestionVo tqv,Integer pageCount);

	void deleteDo(Integer id) throws Exception;

	TExamQuestion selectQuestionById(Integer id);

	void updateDo(TExamQuestion tExamQuestion,String[] options) throws Exception;

	void selectDelete(List<Integer> ids)throws Exception;

	List<TExamQuestion> selectBySid(Integer sid);

	void saveErrorQuestion(String countExam,HttpSession session) throws Exception;

	PageBean<ErrorQuestion> selectErrorQuestionAll(HttpSession session, ErrorQuestionVo eqv, Integer pageIndex,Integer pageCount);

	List<TExamQuestion> findAll();

	List<TExamQuestion> selectByRank(Integer rank);


}
