package cn.test.email.mapping;

import java.util.List;

import cn.test.email.model.QuestionType;
import cn.test.email.model.Users;

public interface StatisticsMapper {
	
	// 根据用户获取所有错题
	public List<QuestionType> getErrorCount(Users users);
	
	// 获取题库里所有的题
	public List<QuestionType> getQuestionCount();

}
