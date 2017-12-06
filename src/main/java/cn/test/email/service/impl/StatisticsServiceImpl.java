package cn.test.email.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.test.email.mapping.StatisticsMapper;
import cn.test.email.model.QuestionType;
import cn.test.email.model.Users;
import cn.test.email.service.StatisticsService;

@Service
public class StatisticsServiceImpl implements StatisticsService {
	
	@Autowired
	private StatisticsMapper statisticsMapper;

	@Override
	public List<QuestionType> getErrorCount(Users users) {
		// TODO Auto-generated method stub
		return statisticsMapper.getErrorCount(users);
	}

	@Override
	public List<QuestionType> getQuestionCount() {
		// TODO Auto-generated method stub
		return statisticsMapper.getQuestionCount();
	}

}
