package cn.test.email.model;

import java.io.Serializable;
import java.util.Date;

public class TQuestionHistory implements Serializable{

	private Integer qhid;
	
	private Integer uid;//用户id
	
	private Integer qid;//试题id
	
	private Integer pid;//试卷id
	
	private String uanswer;//用户答案
	
	private Integer state;//状态，0：对，1：错，2：待定
	
	private Date created;//创建时间

	public Integer getQhid() {
		return qhid;
	}

	public void setQhid(Integer qhid) {
		this.qhid = qhid;
	}

	public Integer getUid() {
		return uid;
	}

	public void setUid(Integer uid) {
		this.uid = uid;
	}

	public Integer getQid() {
		return qid;
	}

	public void setQid(Integer qid) {
		this.qid = qid;
	}

	public Integer getPid() {
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	public String getUanswer() {
		return uanswer;
	}

	public void setUanswer(String uanswer) {
		this.uanswer = uanswer;
	}

	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}
	
	
}
