package cn.test.email.mapping;



import java.util.List;

import org.aspectj.weaver.patterns.TypePatternQuestions.Question;

import cn.test.email.model.ErrorQuestion;
import cn.test.email.model.ErrorQuestionVo;
import cn.test.email.model.TExamQuestion;
import cn.test.email.model.TExamQuestionVo;

public interface TExamQuestionMapper {
    
    int insert(TExamQuestion record);

	List<TExamQuestion> selectAll(TExamQuestionVo tqv);

	int selectCount(TExamQuestionVo tqv);

	void deleteById(Integer id) throws Exception;

	TExamQuestion selectById(Integer id);

	void updateById(TExamQuestion tExamQuestion);

	void selectDeleteById(TExamQuestionVo tqv) throws Exception;

	List<TExamQuestion> selectBySid(Integer sid);

	ErrorQuestion selectErrorQuestionById(ErrorQuestion erq);

	void insertErrorQuestion(ErrorQuestion erq);

	void updateErrorQuestion(ErrorQuestion erq);

	List<ErrorQuestion> selectErrorQuestionByUid(ErrorQuestionVo eqv);

	int errorQuestionCount(ErrorQuestionVo eqv);

	List<TExamQuestion> findAll();

	List<TExamQuestion> selectByRank(Integer rank);
}