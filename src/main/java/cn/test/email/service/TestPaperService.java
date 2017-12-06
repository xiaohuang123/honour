package cn.test.email.service;

import java.util.List;

import cn.test.email.model.TestPaper;

public interface TestPaperService {

	void addTestPaper(TestPaper testPaper)throws Exception;

	List<TestPaper> selectAllTestPaper()throws Exception;

//	List<SeedPaper> selectSeedPaper(SeedPaper seedPaper)throws Exception;

//	void addSeedPaper(SeedPaper seedPaper);

	List<TestPaper> selectTestPaperById();


}
