package cn.test.email.model;

public class ErrorQuestion {

	private Integer id;
	private Integer qid;
	private Integer uid;
	private Integer state;
	private Integer num;
	private String time;
	private String erroranswer;
	private TExamQuestion teExamQuestion;
	
	
	
	public TExamQuestion getTeExamQuestion() {
		return teExamQuestion;
	}
	public void setTeExamQuestion(TExamQuestion teExamQuestion) {
		this.teExamQuestion = teExamQuestion;
	}
	public String getErroranswer() {
		return erroranswer;
	}
	public void setErroranswer(String erroranswer) {
		this.erroranswer = erroranswer;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getQid() {
		return qid;
	}
	public void setQid(Integer qid) {
		this.qid = qid;
	}
	public Integer getUid() {
		return uid;
	}
	public void setUid(Integer uid) {
		this.uid = uid;
	}
	public Integer getState() {
		return state;
	}
	public void setState(Integer state) {
		this.state = state;
	}
	public Integer getNum() {
		return num;
	}
	public void setNum(Integer num) {
		this.num = num;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	
}
