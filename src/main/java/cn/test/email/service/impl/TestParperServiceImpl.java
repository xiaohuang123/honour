package cn.test.email.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.test.email.mapping.TestParperMapper;
import cn.test.email.model.TestPaper;
import cn.test.email.service.TestPaperService;
@Service
public class TestParperServiceImpl implements TestPaperService {


	@Autowired
	private TestParperMapper testParperMapper;

	/**
	 * 添加试卷
	 */
	@Override
	public void addTestPaper(TestPaper testPaper) throws Exception {
		testParperMapper.insert(testPaper);
	}

	/**
	 * 查询所有试卷
	 */
	@Override
	public List<TestPaper> selectAllTestPaper() throws Exception {
		// TODO Auto-generated method stub
		return testParperMapper.selectAll();
	}

//	@Override
//	public List<SeedPaper> selectSeedPaper(SeedPaper sp) throws Exception{
//		// TODO Auto-generated method stub
//		return testParperMapper.selectSeedPaper(sp);
//	}

//	@Override
//	public void addSeedPaper(SeedPaper seedPaper) {
//		testParperMapper.insertSeedPaper(seedPaper);
//	}

	/**
	 * 根据用户的级别查询用户所能用的试卷
	 */
	@Override
	public List<TestPaper> selectTestPaperById() {
		// TODO Auto-generated method stub
		return testParperMapper.selectTestPaperById();
	}

	

}
