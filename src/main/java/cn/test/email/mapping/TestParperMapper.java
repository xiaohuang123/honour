package cn.test.email.mapping;

import java.util.List;

import cn.test.email.model.TestPaper;

public interface TestParperMapper {

	void insert(TestPaper testPaper)throws Exception;

	List<TestPaper> selectAll();

//	List<SeedPaper> selectSeedPaper(SeedPaper sp);

//	void insertSeedPaper(SeedPaper seedPaper);

	List<TestPaper> selectTestPaperById();

	

}
