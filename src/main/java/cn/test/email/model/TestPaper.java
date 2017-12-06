package cn.test.email.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("serial")
public class TestPaper implements Serializable{

	private Integer id;
	private String pname;
	private Integer seednum;
	private Integer qnum;
	private Integer minute;
	private	String time;
	private Integer rank=1;
//	private List<SeedPaper> seedPapers=new ArrayList<SeedPaper>();
	
	
	
	/*public List<SeedPaper> getSeedPapers() {
		return seedPapers;
	}
	public void setSeedPapers(List<SeedPaper> seedPapers) {
		this.seedPapers = seedPapers;
	}*/
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getPname() {
		return pname;
	}
	public void setPname(String pname) {
		this.pname = pname;
	}
	public Integer getSeednum() {
		return seednum;
	}
	public void setSeednum(Integer seednum) {
		this.seednum = seednum;
	}
	
	public Integer getQnum() {
		return qnum;
	}
	public void setQnum(Integer qnum) {
		this.qnum = qnum;
	}
	public Integer getMinute() {
		return minute;
	}
	public void setMinute(Integer minute) {
		this.minute = minute;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public Integer getRank() {
		return rank;
	}
	public void setRank(Integer rank) {
		this.rank = rank;
	}
	
	
}
