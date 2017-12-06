package cn.test.email.service;

import java.util.List;

import cn.test.email.model.QuestionType;
import cn.test.email.model.Users;

public interface StatisticsService {
	
	public List<QuestionType> getErrorCount(Users users);
	
	// 获取题库里所有的题
	public List<QuestionType> getQuestionCount();
}
